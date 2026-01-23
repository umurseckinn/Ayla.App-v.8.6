(function() {
  'use strict';

  const host = (window.location?.hostname || '').toLowerCase();
  const isAllowedHost = host.endsWith('orchids.page');
  if (!isAllowedHost) return;

  // Get projectId from the script element's data attribute
  let projectId = null;
  try {
    const script = document.querySelector('script[data-orchids-project-id]');
    projectId = script ? script.getAttribute('data-orchids-project-id') : null;
  } catch {}

  const config = {
    projectId: projectId,
    batchSize: 10,
    batchInterval: 2000,
  };

  const ORCHIDS_LOG_PREFIX = '[Orchids Browser Logs]';

  if (!config.projectId) {
    try {
      console.warn(ORCHIDS_LOG_PREFIX, 'projectId not provided. Logs will not be captured.');
    } catch {}
    return;
  }

  const consoleLogBuffer = [];
  const networkLogBuffer = [];
  let batchTimer = null;
  let isCapturing = false;
  const originalFetch = window.fetch;

  function shouldSkipNetworkRequest(url) {
    if (!url || typeof url !== 'string') return false;
    try {
      const rawUrl = url.trim();
      const parsedUrl = new URL(rawUrl, window.location.origin);
      const pathname = parsedUrl.pathname || '';
      if (pathname.startsWith('/api/health-check')) return true;
      return false;
    } catch {
      return false;
    }
  }

  const recentLogHashes = new Set();
  const maxRecentLogs = 100;

  function simpleHash(str) {
    if (!str || str.length === 0) return '';
    let hash = 0;
    const maxLen = Math.min(str.length, 200);
    for (let i = 0; i < maxLen; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString();
  }

  function shouldSkipLog(message) {
    if (!message || typeof message !== 'string') return false;
    if (message.includes('[Fast Refresh]')) return true;
    return false;
  }

  function isDuplicateLog(message) {
    if (!message || typeof message !== 'string') return false;
    const hash = simpleHash(message);
    if (recentLogHashes.has(hash)) return true;
    recentLogHashes.add(hash);
    if (recentLogHashes.size > maxRecentLogs) {
      recentLogHashes.clear();
      recentLogHashes.add(hash);
    }
    return false;
  }

  function sendLogs(type, logs) {
    if (!logs || logs.length === 0) return;
    const inIframe = window.parent !== window;
    if (!inIframe) return;
    try {
      const messageType = type === 'console' ? 'CONSOLE_LOGS_BATCH' : 'NETWORK_LOGS_BATCH';
      window.parent.postMessage({
        type: messageType,
        projectId: config.projectId,
        logs: logs,
        timestamp: Date.now()
      }, '*');
      if (type === 'console') {
        consoleLogBuffer.splice(0, logs.length);
      } else {
        networkLogBuffer.splice(0, logs.length);
      }
    } catch {}
  }

  function flushLogs() {
    if (consoleLogBuffer.length > 0) {
      const logsToSend = consoleLogBuffer.slice(0, config.batchSize);
      sendLogs('console', logsToSend);
    }
    if (networkLogBuffer.length > 0) {
      const logsToSend = networkLogBuffer.slice(0, config.batchSize);
      sendLogs('network', logsToSend);
    }
  }

  function startBatchTimer() {
    if (batchTimer) return;
    batchTimer = setInterval(() => { flushLogs(); }, config.batchInterval);
  }

  function stopBatchTimer() {
    if (batchTimer) {
      clearInterval(batchTimer);
      batchTimer = null;
    }
  }

  if (!window.__ORCHIDS_CONSOLE_PATCHED__) {
    const originalConsole = {
      log: console.log, info: console.info, warn: console.warn, error: console.error, debug: console.debug,
    };

    const createConsoleWrapper = (level) => {
      return function(...args) {
        if (isCapturing) {
          try { originalConsole[level].apply(console, args); } catch {}
          return;
        }
        try { originalConsole[level].apply(console, args); } catch {}
        try {
          isCapturing = true;
          let message = '';
          const maxArgs = 5;
          const maxMessageLength = 2000;
          for (let i = 0; i < Math.min(args.length, maxArgs) && message.length < maxMessageLength; i++) {
            const arg = args[i];
            let str = '';
            if (arg === null || arg === undefined) {
              str = String(arg);
            } else if (typeof arg === 'object') {
              try {
                let keyCount = 0;
                try {
                  for (const key in arg) {
                    if (Object.prototype.hasOwnProperty.call(arg, key)) {
                      keyCount++;
                      if (keyCount >= 50) break;
                    }
                  }
                } catch { keyCount = 100; }
                if (keyCount < 50) {
                  str = JSON.stringify(arg);
                  if (str.length > 500) str = str.substring(0, 500) + '...';
                } else {
                  str = '[Object with ' + keyCount + '+ keys]';
                }
              } catch { str = '[Object]'; }
            } else {
              str = String(arg);
            }
            if (message.length > 0) message += ' ';
            message += str;
            if (message.length >= maxMessageLength) {
              message = message.substring(0, maxMessageLength) + '...';
              break;
            }
          }
          if (shouldSkipLog(message)) { isCapturing = false; return; }
          if (isDuplicateLog(message)) { isCapturing = false; return; }
          const logEntry = { timestamp: new Date().toISOString(), level: level, message: message };
          consoleLogBuffer.push(logEntry);
          if (consoleLogBuffer.length > 500) consoleLogBuffer.shift();
          startBatchTimer();
          if (consoleLogBuffer.length >= config.batchSize) flushLogs();
          isCapturing = false;
        } catch { isCapturing = false; }
      };
    };

    console.log = createConsoleWrapper('log');
    console.info = createConsoleWrapper('info');
    console.warn = createConsoleWrapper('warn');
    console.error = createConsoleWrapper('error');
    console.debug = createConsoleWrapper('debug');
    window.__ORCHIDS_CONSOLE_PATCHED__ = true;
  }

  if (!window.__ORCHIDS_FETCH_PATCHED__) {
    window.fetch = async function(...args) {
      const url = typeof args[0] === 'string' ? args[0] : args[0].url;
      const options = args[1] || {};
      const method = options.method || 'GET';
      if (!url || typeof url !== 'string') return originalFetch.apply(this, args);
      if (shouldSkipNetworkRequest(url)) return originalFetch.apply(this, args);
      let requestPayload;
      if (options.body) {
        try {
          requestPayload = typeof options.body === 'string' ? options.body : JSON.stringify(options.body);
        } catch { requestPayload = '[Unable to serialize]'; }
      }
      try {
        const response = await originalFetch.apply(this, args);
        const clonedResponse = response.clone();
        let responsePayload;
        try {
          const contentType = response.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            responsePayload = JSON.stringify(await clonedResponse.json());
          } else if (contentType.includes('text/')) {
            responsePayload = await clonedResponse.text();
          }
        } catch {}
        const headers = {};
        response.headers.forEach((value, key) => { headers[key] = value; });
        const hasNextServerInUrl = url && url.includes('.next/server');
        const hasNextServerInRequest = requestPayload && String(requestPayload).includes('.next/server');
        const hasNextServerInResponse = responsePayload && String(responsePayload).includes('.next/server');
        if (hasNextServerInUrl || hasNextServerInRequest || hasNextServerInResponse) return response;
        if (!url || typeof url !== 'string' || url.trim() === '') return response;
        const logEntry = {
          timestamp: new Date().toISOString(), url: url, method: method, status: response.status,
          headers: headers, requestPayload: requestPayload, responsePayload: responsePayload
        };
        networkLogBuffer.push(logEntry);
        if (networkLogBuffer.length > 500) networkLogBuffer.shift();
        startBatchTimer();
        if (networkLogBuffer.length >= config.batchSize) flushLogs();
        return response;
      } catch (error) {
        if (shouldSkipNetworkRequest(url)) throw error;
        const hasNextServerInUrl = url && url.includes('.next/server');
        const hasNextServerInRequest = requestPayload && String(requestPayload).includes('.next/server');
        if (hasNextServerInUrl || hasNextServerInRequest) throw error;
        if (!url || typeof url !== 'string' || url.trim() === '') throw error;
        const logEntry = {
          timestamp: new Date().toISOString(), url: url, method: method, status: 0,
          headers: {}, requestPayload: requestPayload, responsePayload: 'Request failed: ' + error.message
        };
        networkLogBuffer.push(logEntry);
        if (networkLogBuffer.length > 500) networkLogBuffer.shift();
        startBatchTimer();
        if (networkLogBuffer.length >= config.batchSize) flushLogs();
        throw error;
      }
    };
    window.__ORCHIDS_FETCH_PATCHED__ = true;
  }

  window.addEventListener('beforeunload', () => { stopBatchTimer(); flushLogs(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) flushLogs(); });
})();

