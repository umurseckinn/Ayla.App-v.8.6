import re
import json

def clean_rtf(content):
    if not content.strip().startswith('{\\rtf'):
        return content
        
    def decode_rtf_hex(match):
        hex_val = match.group(1)
        try:
            return bytes.fromhex(hex_val).decode('cp1254')
        except:
            return match.group(0)

    def decode_rtf_unicode(match):
        codepoint = int(match.group(1))
        if codepoint < 0:
            codepoint += 65536
        return chr(codepoint)

    text = content
    # RTF unicode \uN followed by a placeholder character
    text = re.sub(r'\\u(-?\d+).', decode_rtf_unicode, text)
    # RTF hex \'XX
    text = re.sub(r"\\'([0-9a-f]{2})", decode_rtf_hex, text)
    
    # Remove RTF control words: \word or \wordN
    # They usually end with a space, another backslash, or a brace.
    text = re.sub(r'\\[a-z]+(-?\d+)? ?', '', text)
    
    # Now we have the text with some { } and the JSON.
    # Let's find the outermost [ ] or { }
    first_bracket = text.find('[')
    last_bracket = text.rfind(']')
    if first_bracket != -1 and last_bracket != -1:
        return text[first_bracket:last_bracket+1]
    
    first_brace = text.find('{')
    last_brace = text.rfind('}')
    if first_brace != -1 and last_brace != -1:
        return text[first_brace:last_brace+1]
        
    return text

sample = r"""{\rtf1\ansi\ansicpg1254\cocoartf2706
\f0\fs24 \cf0 [
{
  "ozellik": "Benlik Evi",
  "burc_eslesmesi": "Ko\'e7-Ko\'e7",
  "yorum": "\uc0\u304 ki ate\u351  enerjisinin yan yana gelmesi"
}]
}"""

cleaned = clean_rtf(sample)
print(f"Cleaned:\n{cleaned}")
try:
    data = json.loads(cleaned)
    print(f"Success! Found {len(data)} items.")
    print(f"First item: {data[0]}")
except Exception as e:
    print(f"Failed: {e}")
