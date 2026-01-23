"use strict";
class RouteMessenger {
    constructor(options = {}) {
        this.hasInitialized = false;
        this.options = {
            targetOrigin: "*",
            messageType: "ROUTE_CHANGE",
            includeSearchParams: true,
            sendInitialRoute: true,
            customData: {},
            onlyInIframe: true,
            debug: false,
            ...options,
        };
        this.currentPath = "";
        this.currentSearch = "";
        this.isInIframe = window.self !== window.top;
        this.init();
    }
    init() {
        if (this.options.onlyInIframe && !this.isInIframe) {
            return;
        }
        if (this.options.sendInitialRoute) {
            this.updateRoute();
        }
        this.setupListeners();
    }
    setupListeners() {
        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;
        history.pushState = (...args) => {
            originalPushState.apply(history, args);
            setTimeout(() => this.updateRoute(), 0);
        };
        history.replaceState = (...args) => {
            originalReplaceState.apply(history, args);
            setTimeout(() => this.updateRoute(), 0);
        };
        window.addEventListener("popstate", () => {
            setTimeout(() => this.updateRoute(), 0);
        });
        window.addEventListener("hashchange", () => {
            setTimeout(() => this.updateRoute(), 0);
        });
        setInterval(() => {
            const newPath = window.location.pathname;
            const newSearch = window.location.search;
            if (newPath !== this.currentPath || newSearch !== this.currentSearch) {
                this.updateRoute();
            }
        }, 1000);
    }
    updateRoute() {
        const pathname = window.location.pathname;
        const search = this.options.includeSearchParams ? window.location.search : "";
        if (pathname === this.currentPath && search === this.currentSearch && this.hasInitialized) {
            return;
        }
        this.currentPath = pathname;
        this.currentSearch = search;
        this.sendMessage(pathname, search);
        this.hasInitialized = true;
    }
    sendMessage(pathname, search) {
        const fullUrl = search ? `${pathname}${search}` : pathname;
        const message = {
            type: this.options.messageType,
            data: {
                pathname,
                search: search.replace("?", ""),
                fullUrl,
                timestamp: Date.now(),
                origin: window.location.origin,
                ...this.options.customData,
            },
        };
        try {
            if (window.parent && window.parent !== window) {
                window.parent.postMessage(message, this.options.targetOrigin);
            }
        }
        catch (error) {
            console.error("[RouteMessenger] Failed to send message:", error);
        }
    }
    sendCurrentRoute() {
        this.updateRoute();
    }
    updateOptions(newOptions) {
        this.options = { ...this.options, ...newOptions };
    }
}
function initRouteMessenger(options = {}) {
    return new RouteMessenger(options);
}
if (typeof window !== "undefined") {
    const scriptTag = document.currentScript;
    let options = {};
    if (scriptTag) {
        const dataset = scriptTag.dataset;
        options = {
            targetOrigin: dataset.targetOrigin || "*",
            messageType: dataset.messageType || "ROUTE_CHANGE",
            includeSearchParams: dataset.includeSearchParams !== "false",
            sendInitialRoute: dataset.sendInitialRoute !== "false",
            onlyInIframe: dataset.onlyInIframe !== "false",
            debug: dataset.debug === "true",
            customData: dataset.customData ? JSON.parse(dataset.customData) : {},
        };
    }
    if (window.ROUTE_MESSENGER_CONFIG) {
        options = { ...options, ...window.ROUTE_MESSENGER_CONFIG };
    }
    const messenger = initRouteMessenger(options);
    window.routeMessenger = messenger;
    window.initRouteMessenger = initRouteMessenger;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = { RouteMessenger, initRouteMessenger };
}
