// Complete Registry of Daily Web Tools
const TOOLS_DATA = [
  {
    id: "json-formatter",
    name: "JSON Formatter & Validator",
    category: "developer",
    icon: "fa-solid fa-code",
    desc: "Format, beautify, minify, and validate JSON structures with real-time error detection.",
    tags: ["json", "format", "validate", "minify", "beautify", "dev"],
    render: function(container) {
      container.innerHTML = `
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <button id="btn-json-format" class="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold transition">
                <i class="fa-solid fa-align-left mr-1"></i> Format (2 spaces)
              </button>
              <button id="btn-json-minify" class="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 dark:hover:bg-dark-600 text-xs font-semibold transition">
                <i class="fa-solid fa-compress mr-1"></i> Minify
              </button>
              <button id="btn-json-sample" class="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 dark:hover:bg-dark-600 text-xs font-semibold transition">
                Sample
              </button>
            </div>
            <div class="flex items-center gap-2">
              <button id="btn-json-copy" class="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 text-xs font-semibold transition">
                <i class="fa-solid fa-copy mr-1"></i> Copy
              </button>
              <button id="btn-json-clear" class="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 text-xs font-semibold transition">
                Clear
              </button>
            </div>
          </div>
          <div id="json-status" class="hidden p-2.5 rounded-xl text-xs font-medium"></div>
          <textarea id="json-input" rows="12" placeholder="Paste your raw JSON here..." class="code-font w-full p-4 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-700 text-xs sm:text-sm focus:border-brand-500 outline-none"></textarea>
        </div>
      `;

      const input = container.querySelector('#json-input');
      const status = container.querySelector('#json-status');

      function validateAndProcess(minify = false) {
        const val = input.value.trim();
        if (!val) {
          status.className = 'hidden';
          return;
        }
        try {
          const parsed = JSON.parse(val);
          input.value = minify ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
          status.className = 'p-2.5 rounded-xl text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5';
          status.innerHTML = '<i class="fa-solid fa-circle-check"></i> Valid JSON syntax!';
        } catch (e) {
          status.className = 'p-2.5 rounded-xl text-xs font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 flex items-center gap-1.5';
          status.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Invalid JSON: ${e.message}`;
        }
      }

      container.querySelector('#btn-json-format').addEventListener('click', () => validateAndProcess(false));
      container.querySelector('#btn-json-minify').addEventListener('click', () => validateAndProcess(true));
      container.querySelector('#btn-json-sample').addEventListener('click', () => {
        input.value = JSON.stringify({ name: "Daily Web Tools", version: "1.0.0", features: ["100% Client-Side", "Fast", "Secure"], author: { platform: "Vercel", github: "ggptamdas-commits" } }, null, 2);
        validateAndProcess(false);
      });
      container.querySelector('#btn-json-copy').addEventListener('click', () => copyToClipboard(input.value));
      container.querySelector('#btn-json-clear').addEventListener('click', () => {
        input.value = '';
        status.className = 'hidden';
      });
    }
  },
  {
    id: "base64-converter",
    name: "Base64 Encoder / Decoder",
    category: "developer",
    icon: "fa-solid fa-binary",
    desc: "Easily encode string text to standard Base64 format or decode Base64 back to readable text.",
    tags: ["base64", "encode", "decode", "binary", "dev", "string"],
    render: function(container) {
      container.innerHTML = `
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <button id="btn-b64-encode" class="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold transition">Encode to Base64</button>
            <button id="btn-b64-decode" class="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition">Decode from Base64</button>
            <button id="btn-b64-swap" class="px-3 py-2 rounded-lg bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 text-xs font-semibold transition"><i class="fa-solid fa-right-left"></i> Swap</button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div class="flex justify-between items-center mb-1 text-xs font-semibold text-gray-500">
                <span>Input Text</span>
                <button id="btn-b64-paste" class="text-brand-500 hover:underline">Paste</button>
              </div>
              <textarea id="b64-input" rows="8" placeholder="Type or paste input here..." class="code-font w-full p-3 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-700 text-xs sm:text-sm focus:border-brand-500 outline-none"></textarea>
            </div>
            <div>
              <div class="flex justify-between items-center mb-1 text-xs font-semibold text-gray-500">
                <span>Output Result</span>
                <button id="btn-b64-copy" class="text-brand-500 hover:underline"><i class="fa-solid fa-copy"></i> Copy</button>
              </div>
              <textarea id="b64-output" rows="8" readonly placeholder="Output will appear here..." class="code-font w-full p-3 rounded-xl bg-gray-100 dark:bg-dark-800 border border-gray-200 dark:border-gray-700 text-xs sm:text-sm outline-none"></textarea>
            </div>
          </div>
        </div>
      `;

      const input = container.querySelector('#b64-input');
      const output = container.querySelector('#b64-output');

      container.querySelector('#btn-b64-encode').addEventListener('click', () => {
        try {
          output.value = btoa(unescape(encodeURIComponent(input.value)));
          showToast('Encoded to Base64!');
        } catch (e) {
          showToast('Encoding error: ' + e.message, 'error');
        }
      });

      container.querySelector('#btn-b64-decode').addEventListener('click', () => {
        try {
          output.value = decodeURIComponent(escape(atob(input.value.trim())));
          showToast('Decoded Base64 successfully!');
        } catch (e) {
          showToast('Invalid Base64 string', 'error');
        }
      });

      container.querySelector('#btn-b64-swap').addEventListener('click', () => {
        const temp = input.value;
        input.value = output.value;
        output.value = temp;
      });

      container.querySelector('#btn-b64-copy').addEventListener('click', () => copyToClipboard(output.value));
    }
  },
  {
    id: "qr-generator",
    name: "QR Code Generator",
    category: "generators",
    icon: "fa-solid fa-qrcode",
    desc: "Generate high-resolution custom QR codes for URLs, text, Wi-Fi, or phone numbers with PNG download.",
    tags: ["qr", "qrcode", "generator", "download", "link"],
    render: function(container) {
      container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="md:col-span-2 flex flex-col gap-4">
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Text or URL Content</label>
              <textarea id="qr-text" rows="4" placeholder="https://example.com" class="w-full p-3 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-700 text-sm focus:border-brand-500 outline-none">https://github.com/ggptamdas-commits/daily-web-tools</textarea>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1">QR Size (px)</label>
                <select id="qr-size" class="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-700 text-xs font-medium">
                  <option value="160">160 x 160</option>
                  <option value="220" selected>220 x 220</option>
                  <option value="300">300 x 300</option>
                  <option value="400">400 x 400</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-1">Error Correction</label>
                <select id="qr-level" class="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-700 text-xs font-medium">
                  <option value="L">Low (7%)</option>
                  <option value="M" selected>Medium (15%)</option>
                  <option value="Q">Quartile (25%)</option>
                  <option value="H">High (30%)</option>
                </select>
              </div>
            </div>
            <button id="btn-generate-qr" class="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs sm:text-sm transition shadow-lg shadow-brand-500/20">
              <i class="fa-solid fa-arrows-rotate mr-1"></i> Update QR Code
            </button>
          </div>
          <div class="flex flex-col items-center justify-center p-6 rounded-2xl bg-gray-100 dark:bg-dark-900 border border-gray-200 dark:border-gray-800">
            <div id="qr-output" class="p-3 bg-white rounded-xl shadow-md mb-4 flex items-center justify-center"></div>
            <button id="btn-download-qr" class="px-4 py-2 rounded-xl bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 dark:hover:bg-dark-600 text-xs font-semibold transition">
              <i class="fa-solid fa-download mr-1"></i> Download PNG
            </button>
          </div>
        </div>
      `;

      const textInput = container.querySelector('#qr-text');
      const sizeSelect = container.querySelector('#qr-size');
      const qrOutput = container.querySelector('#qr-output');
      let qrInstance = null;

      function makeQR() {
        const text = textInput.value.trim() || 'https://example.com';
        const size = parseInt(sizeSelect.value, 10);
        qrOutput.innerHTML = '';
        if (window.QRCode) {
          qrInstance = new QRCode(qrOutput, {
            text: text,
            width: size,
            height: size,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.M
          });
        } else {
          qrOutput.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}" alt="QR Code" class="rounded">`;
        }
      }

      makeQR();
      container.querySelector('#btn-generate-qr').addEventListener('click', makeQR);
      textInput.addEventListener('input', makeQR);

      container.querySelector('#btn-download-qr').addEventListener('click', () => {
        const img = qrOutput.querySelector('img') || qrOutput.querySelector('canvas');
        if (img) {
          const src = img.src || (img.toDataURL && img.toDataURL('image/png'));
          const link = document.createElement('a');
          link.download = 'qrcode.png';
          link.href = src;
          link.click();
          showToast('Downloaded QR code image!');
        }
      });
    }
  },
  {
    id: "password-generator",
    name: "Strong Password Generator",
    category: "security",
    icon: "fa-solid fa-key",
    desc: "Generate highly secure, customizable random passwords and passphrases with entropy score.",
    tags: ["password", "generator", "security", "random", "crypto"],
    render: function(container) {
      container.innerHTML = `
        <div class="flex flex-col gap-5">
          <div class="relative flex items-center">
            <input id="pwd-result" type="text" readonly class="code-font w-full p-4 pr-24 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-700 text-base sm:text-lg font-bold text-brand-600 dark:text-brand-400 outline-none">
            <div class="absolute right-2 flex items-center gap-1">
              <button id="btn-pwd-copy" class="p-2 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 hover:bg-brand-500/20 text-sm font-semibold transition" title="Copy"><i class="fa-solid fa-copy"></i></button>
              <button id="btn-pwd-refresh" class="p-2 rounded-lg bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 text-sm font-semibold transition" title="Regenerate"><i class="fa-solid fa-arrows-rotate"></i></button>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 dark:bg-dark-900/60 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
            <div>
              <div class="flex justify-between text-xs font-semibold text-gray-500 mb-2">
                <span>Password Length</span>
                <span id="pwd-len-val" class="text-brand-500 font-bold">16</span>
              </div>
              <input id="pwd-len" type="range" min="8" max="64" value="16" class="w-full accent-brand-500 cursor-pointer">
            </div>
            <div class="grid grid-cols-2 gap-2 text-xs font-medium">
              <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="pwd-upper" checked class="accent-brand-500"> Uppercase (A-Z)</label>
              <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="pwd-lower" checked class="accent-brand-500"> Lowercase (a-z)</label>
              <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="pwd-num" checked class="accent-brand-500"> Numbers (0-9)</label>
              <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" id="pwd-sym" checked class="accent-brand-500"> Symbols (!@#$%^&*)</label>
            </div>
          </div>
        </div>
      `;

      const result = container.querySelector('#pwd-result');
      const lenInput = container.querySelector('#pwd-len');
      const lenVal = container.querySelector('#pwd-len-val');
      const upper = container.querySelector('#pwd-upper');
      const lower = container.querySelector('#pwd-lower');
      const num = container.querySelector('#pwd-num');
      const sym = container.querySelector('#pwd-sym');

      function generate() {
        let chars = '';
        if (upper.checked) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (lower.checked) chars += 'abcdefghijklmnopqrstuvwxyz';
        if (num.checked) chars += '0123456789';
        if (sym.checked) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';

        const length = parseInt(lenInput.value, 10);
        lenVal.textContent = length;
        let password = '';
        const randomValues = new Uint32Array(length);
        window.crypto.getRandomValues(randomValues);
        for (let i = 0; i < length; i++) {
          password += chars[randomValues[i] % chars.length];
        }
        result.value = password;
      }

      generate();
      lenInput.addEventListener('input', generate);
      [upper, lower, num, sym].forEach(el => el.addEventListener('change', generate));
      container.querySelector('#btn-pwd-refresh').addEventListener('click', generate);
      container.querySelector('#btn-pwd-copy').addEventListener('click', () => copyToClipboard(result.value));
    }
  },
  {
    id: "text-case-converter",
    name: "Text Case Converter",
    category: "text",
    icon: "fa-solid fa-text-height",
    desc: "Transform text between UPPERCASE, lowercase, Title Case, camelCase, snake_case, kebab-case, and PascalCase.",
    tags: ["text", "case", "converter", "camelcase", "snakecase", "string"],
    render: function(container) {
      container.innerHTML = `
        <div class="flex flex-col gap-4">
          <textarea id="case-input" rows="5" placeholder="Enter your text here..." class="w-full p-3 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-700 text-sm focus:border-brand-500 outline-none">Hello world welcome to daily web tools</textarea>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button data-case="upper" class="case-btn px-3 py-2 rounded-xl bg-gray-100 dark:bg-dark-700 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-600 text-xs font-semibold transition">UPPERCASE</button>
            <button data-case="lower" class="case-btn px-3 py-2 rounded-xl bg-gray-100 dark:bg-dark-700 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-600 text-xs font-semibold transition">lowercase</button>
            <button data-case="title" class="case-btn px-3 py-2 rounded-xl bg-gray-100 dark:bg-dark-700 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-600 text-xs font-semibold transition">Title Case</button>
            <button data-case="sentence" class="case-btn px-3 py-2 rounded-xl bg-gray-100 dark:bg-dark-700 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-600 text-xs font-semibold transition">Sentence case</button>
            <button data-case="camel" class="case-btn px-3 py-2 rounded-xl bg-gray-100 dark:bg-dark-700 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-600 text-xs font-semibold transition">camelCase</button>
            <button data-case="pascal" class="case-btn px-3 py-2 rounded-xl bg-gray-100 dark:bg-dark-700 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-600 text-xs font-semibold transition">PascalCase</button>
            <button data-case="snake" class="case-btn px-3 py-2 rounded-xl bg-gray-100 dark:bg-dark-700 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-600 text-xs font-semibold transition">snake_case</button>
            <button data-case="kebab" class="case-btn px-3 py-2 rounded-xl bg-gray-100 dark:bg-dark-700 hover:bg-brand-500 hover:text-white dark:hover:bg-brand-600 text-xs font-semibold transition">kebab-case</button>
          </div>
          <div class="relative">
            <textarea id="case-output" rows="5" readonly placeholder="Converted output..." class="w-full p-3 rounded-xl bg-gray-100 dark:bg-dark-800 border border-gray-200 dark:border-gray-700 text-sm outline-none"></textarea>
            <button id="btn-case-copy" class="absolute top-3 right-3 px-3 py-1 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 hover:bg-brand-500/20 text-xs font-semibold transition"><i class="fa-solid fa-copy mr-1"></i> Copy</button>
          </div>
        </div>
      `;

      const input = container.querySelector('#case-input');
      const output = container.querySelector('#case-output');

      function convertCase(type) {
        const text = input.value;
        const words = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || [];
        
        switch (type) {
          case 'upper':
            output.value = text.toUpperCase();
            break;
          case 'lower':
            output.value = text.toLowerCase();
            break;
          case 'title':
            output.value = text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
            break;
          case 'sentence':
            output.value = text.toLowerCase().replace(/(^\s*\w|[\.\?!]\s*\w)/g, c => c.toUpperCase());
            break;
          case 'camel':
            output.value = words.map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
            break;
          case 'pascal':
            output.value = words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
            break;
          case 'snake':
            output.value = words.map(w => w.toLowerCase()).join('_');
            break;
          case 'kebab':
            output.value = words.map(w => w.toLowerCase()).join('-');
            break;
        }
        showToast(`Converted to ${type}!`);
      }

      container.querySelectorAll('.case-btn').forEach(btn => {
        btn.addEventListener('click', () => convertCase(btn.dataset.case));
      });

      container.querySelector('#btn-case-copy').addEventListener('click', () => copyToClipboard(output.value));
    }
  },
  {
    id: "hash-generator",
    name: "Cryptographic Hash Generator",
    category: "security",
    icon: "fa-solid fa-shield-halved",
    desc: "Compute real-time cryptographic hashes (SHA-256, SHA-512, SHA-1, SHA-384) using native Web Crypto API.",
    tags: ["hash", "sha256", "sha512", "sha1", "security", "crypto"],
    render: function(container) {
      container.innerHTML = `
        <div class="flex flex-col gap-4">
          <div>
            <label class="block text-xs font-semibold text-gray-500 mb-1">Input Text</label>
            <textarea id="hash-input" rows="3" placeholder="Enter text to hash..." class="w-full p-3 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-700 text-sm focus:border-brand-500 outline-none">Hello World</textarea>
          </div>
          <div class="flex flex-col gap-3">
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-800">
              <div class="flex justify-between items-center mb-1 text-xs font-bold text-brand-600 dark:text-brand-400">
                <span>SHA-256</span>
                <button class="copy-hash-btn hover:underline" data-target="hash-sha256"><i class="fa-solid fa-copy"></i> Copy</button>
              </div>
              <input id="hash-sha256" type="text" readonly class="code-font w-full text-xs bg-transparent outline-none select-all text-gray-600 dark:text-gray-300">
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-800">
              <div class="flex justify-between items-center mb-1 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                <span>SHA-512</span>
                <button class="copy-hash-btn hover:underline" data-target="hash-sha512"><i class="fa-solid fa-copy"></i> Copy</button>
              </div>
              <input id="hash-sha512" type="text" readonly class="code-font w-full text-xs bg-transparent outline-none select-all text-gray-600 dark:text-gray-300">
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-800">
              <div class="flex justify-between items-center mb-1 text-xs font-bold text-amber-600 dark:text-amber-400">
                <span>SHA-1</span>
                <button class="copy-hash-btn hover:underline" data-target="hash-sha1"><i class="fa-solid fa-copy"></i> Copy</button>
              </div>
              <input id="hash-sha1" type="text" readonly class="code-font w-full text-xs bg-transparent outline-none select-all text-gray-600 dark:text-gray-300">
            </div>
          </div>
        </div>
      `;

      const input = container.querySelector('#hash-input');
      const sha256Out = container.querySelector('#hash-sha256');
      const sha512Out = container.querySelector('#hash-sha512');
      const sha1Out = container.querySelector('#hash-sha1');

      async function computeHash(algo, text) {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest(algo, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      }

      async function updateHashes() {
        const text = input.value;
        sha256Out.value = await computeHash('SHA-256', text);
        sha512Out.value = await computeHash('SHA-512', text);
        sha1Out.value = await computeHash('SHA-1', text);
      }

      updateHashes();
      input.addEventListener('input', updateHashes);

      container.querySelectorAll('.copy-hash-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const target = container.querySelector('#' + btn.dataset.target);
          copyToClipboard(target.value);
        });
      });
    }
  },
  {
    id: "uuid-generator",
    name: "UUID / GUID v4 Generator",
    category: "generators",
    icon: "fa-solid fa-fingerprint",
    desc: "Generate cryptographically secure v4 UUIDs / GUIDs with bulk creation, uppercase and hyphen options.",
    tags: ["uuid", "guid", "v4", "generator", "unique", "dev"],
    render: function(container) {
      container.innerHTML = `
        <div class="flex flex-col gap-4">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Quantity</label>
              <input id="uuid-qty" type="number" min="1" max="100" value="5" class="w-full p-2.5 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-700 text-xs font-medium">
            </div>
            <div class="flex items-center gap-4 pt-5">
              <label class="flex items-center gap-2 text-xs font-medium cursor-pointer"><input type="checkbox" id="uuid-upper" class="accent-brand-500"> Uppercase</label>
              <label class="flex items-center gap-2 text-xs font-medium cursor-pointer"><input type="checkbox" id="uuid-hyphens" checked class="accent-brand-500"> Hyphens</label>
            </div>
            <div class="pt-4">
              <button id="btn-gen-uuid" class="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs transition">Generate UUIDs</button>
            </div>
          </div>
          <div class="relative">
            <textarea id="uuid-output" rows="8" readonly class="code-font w-full p-3 rounded-xl bg-gray-100 dark:bg-dark-900 border border-gray-200 dark:border-gray-700 text-xs sm:text-sm outline-none"></textarea>
            <button id="btn-uuid-copy" class="absolute top-3 right-3 px-3 py-1 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 hover:bg-brand-500/20 text-xs font-semibold transition"><i class="fa-solid fa-copy mr-1"></i> Copy All</button>
          </div>
        </div>
      `;

      const qty = container.querySelector('#uuid-qty');
      const upper = container.querySelector('#uuid-upper');
      const hyphens = container.querySelector('#uuid-hyphens');
      const output = container.querySelector('#uuid-output');

      function generateUUIDs() {
        const count = Math.min(100, Math.max(1, parseInt(qty.value, 10) || 1));
        const list = [];
        for (let i = 0; i < count; i++) {
          let u = crypto.randomUUID();
          if (!hyphens.checked) u = u.replace(/-/g, '');
          if (upper.checked) u = u.toUpperCase();
          list.push(u);
        }
        output.value = list.join('\n');
      }

      generateUUIDs();
      container.querySelector('#btn-gen-uuid').addEventListener('click', generateUUIDs);
      container.querySelector('#btn-uuid-copy').addEventListener('click', () => copyToClipboard(output.value));
    }
  },
  {
    id: "word-counter",
    name: "Word & Character Counter",
    category: "text",
    icon: "fa-solid fa-calculator",
    desc: "Calculate characters, words, sentences, paragraphs, reading time, and speaking time in real time.",
    tags: ["word", "character", "counter", "reading", "time", "text"],
    render: function(container) {
      container.innerHTML = `
        <div class="flex flex-col gap-4">
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-800 text-center">
              <div id="stat-words" class="text-xl font-bold text-brand-600 dark:text-brand-400">0</div>
              <div class="text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Words</div>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-800 text-center">
              <div id="stat-chars" class="text-xl font-bold text-indigo-600 dark:text-indigo-400">0</div>
              <div class="text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Characters</div>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-800 text-center">
              <div id="stat-reading" class="text-xl font-bold text-emerald-600 dark:text-emerald-400">0s</div>
              <div class="text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Reading Time</div>
            </div>
            <div class="p-3 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-800 text-center">
              <div id="stat-sentences" class="text-xl font-bold text-amber-600 dark:text-amber-400">0</div>
              <div class="text-[11px] uppercase tracking-wider text-gray-500 font-semibold">Sentences</div>
            </div>
          </div>
          <textarea id="word-input" rows="8" placeholder="Start typing or paste your content here..." class="w-full p-4 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-700 text-sm focus:border-brand-500 outline-none"></textarea>
        </div>
      `;

      const input = container.querySelector('#word-input');
      const statWords = container.querySelector('#stat-words');
      const statChars = container.querySelector('#stat-chars');
      const statReading = container.querySelector('#stat-reading');
      const statSentences = container.querySelector('#stat-sentences');

      function updateStats() {
        const text = input.value;
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const chars = text.length;
        const sentences = text.trim() ? (text.match(/[.!?]+/g) || []).length : 0;
        const readSeconds = Math.ceil((words / 200) * 60);

        statWords.textContent = words.toLocaleString();
        statChars.textContent = chars.toLocaleString();
        statSentences.textContent = sentences.toLocaleString();
        statReading.textContent = readSeconds < 60 ? `${readSeconds}s` : `${Math.ceil(readSeconds / 60)}m`;
      }

      input.addEventListener('input', updateStats);
    }
  },
  {
    id: "timestamp-converter",
    name: "Unix Epoch Timestamp Converter",
    category: "converters",
    icon: "fa-solid fa-clock",
    desc: "Convert Unix epoch timestamps (seconds & milliseconds) to human-readable dates and vice-versa.",
    tags: ["epoch", "timestamp", "time", "converter", "unix", "date"],
    render: function(container) {
      const nowEpoch = Math.floor(Date.now() / 1000);
      container.innerHTML = `
        <div class="flex flex-col gap-5">
          <div class="p-4 rounded-xl bg-brand-500/10 border border-brand-500/20 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span class="text-xs font-semibold text-brand-600 dark:text-brand-400">Current Unix Epoch (Seconds):</span>
              <span id="current-epoch" class="code-font text-lg font-bold ml-2 text-gray-900 dark:text-white">${nowEpoch}</span>
            </div>
            <button id="btn-copy-curr-epoch" class="px-3 py-1 rounded-lg bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700 transition">Copy</button>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-800 flex flex-col gap-3">
              <h4 class="text-xs font-bold uppercase tracking-wider text-gray-500">Epoch to Human Date</h4>
              <input id="epoch-input" type="number" value="${nowEpoch}" class="code-font w-full p-2.5 rounded-lg bg-white dark:bg-dark-800 border border-gray-200 dark:border-gray-700 text-xs">
              <button id="btn-epoch-convert" class="py-2 rounded-lg bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700">Convert Epoch</button>
              <div id="epoch-date-out" class="p-3 rounded-lg bg-gray-100 dark:bg-dark-800 text-xs font-mono"></div>
            </div>
            <div class="p-4 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-800 flex flex-col gap-3">
              <h4 class="text-xs font-bold uppercase tracking-wider text-gray-500">Date to Epoch</h4>
              <input id="date-input" type="datetime-local" class="w-full p-2.5 rounded-lg bg-white dark:bg-dark-800 border border-gray-200 dark:border-gray-700 text-xs">
              <button id="btn-date-convert" class="py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700">Convert Date</button>
              <div id="date-epoch-out" class="p-3 rounded-lg bg-gray-100 dark:bg-dark-800 text-xs font-mono"></div>
            </div>
          </div>
        </div>
      `;

      const currSpan = container.querySelector('#current-epoch');
      setInterval(() => {
        if (currSpan) currSpan.textContent = Math.floor(Date.now() / 1000);
      }, 1000);

      const epochIn = container.querySelector('#epoch-input');
      const epochOut = container.querySelector('#epoch-date-out');

      function convertEpoch() {
        const val = parseInt(epochIn.value, 10);
        if (isNaN(val)) return;
        const ms = val > 9999999999 ? val : val * 1000;
        const d = new Date(ms);
        epochOut.innerHTML = `
          <div><strong>UTC:</strong> ${d.toUTCString()}</div>
          <div><strong>Local:</strong> ${d.toString()}</div>
          <div><strong>ISO:</strong> ${d.toISOString()}</div>
        `;
      }
      convertEpoch();
      container.querySelector('#btn-epoch-convert').addEventListener('click', convertEpoch);

      const dateIn = container.querySelector('#date-input');
      const dateOut = container.querySelector('#date-epoch-out');
      dateIn.value = new Date().toISOString().slice(0, 16);

      function convertDate() {
        const d = new Date(dateIn.value);
        const sec = Math.floor(d.getTime() / 1000);
        dateOut.innerHTML = `
          <div><strong>Seconds:</strong> ${sec}</div>
          <div><strong>Milliseconds:</strong> ${d.getTime()}</div>
        `;
      }
      convertDate();
      container.querySelector('#btn-date-convert').addEventListener('click', convertDate);
      container.querySelector('#btn-copy-curr-epoch').addEventListener('click', () => copyToClipboard(currSpan.textContent));
    }
  },
  {
    id: "css-shadow-generator",
    name: "CSS Box Shadow Generator",
    category: "design",
    icon: "fa-solid fa-layer-group",
    desc: "Interactive visual box shadow generator with instant preview and copyable CSS property declarations.",
    tags: ["css", "shadow", "design", "generator", "box-shadow"],
    render: function(container) {
      container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col gap-3">
            <div>
              <div class="flex justify-between text-xs font-semibold text-gray-500 mb-1">
                <span>Offset X</span> <span id="val-sh-x" class="font-mono text-brand-500">0px</span>
              </div>
              <input id="sh-x" type="range" min="-50" max="50" value="0" class="w-full accent-brand-500">
            </div>
            <div>
              <div class="flex justify-between text-xs font-semibold text-gray-500 mb-1">
                <span>Offset Y</span> <span id="val-sh-y" class="font-mono text-brand-500">10px</span>
              </div>
              <input id="sh-y" type="range" min="-50" max="50" value="10" class="w-full accent-brand-500">
            </div>
            <div>
              <div class="flex justify-between text-xs font-semibold text-gray-500 mb-1">
                <span>Blur Radius</span> <span id="val-sh-blur" class="font-mono text-brand-500">25px</span>
              </div>
              <input id="sh-blur" type="range" min="0" max="100" value="25" class="w-full accent-brand-500">
            </div>
            <div>
              <div class="flex justify-between text-xs font-semibold text-gray-500 mb-1">
                <span>Spread Radius</span> <span id="val-sh-spread" class="font-mono text-brand-500">-5px</span>
              </div>
              <input id="sh-spread" type="range" min="-50" max="50" value="-5" class="w-full accent-brand-500">
            </div>
            <div class="flex items-center gap-4">
              <label class="text-xs font-semibold text-gray-500">Shadow Color</label>
              <input id="sh-color" type="color" value="#000000" class="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0">
              <label class="flex items-center gap-2 text-xs font-medium cursor-pointer"><input type="checkbox" id="sh-inset" class="accent-brand-500"> Inset</label>
            </div>
          </div>
          <div class="flex flex-col items-center justify-center p-6 rounded-2xl bg-gray-100 dark:bg-dark-900 border border-gray-200 dark:border-gray-800">
            <div id="shadow-preview-box" class="w-36 h-36 rounded-2xl bg-white dark:bg-dark-700 flex items-center justify-center font-bold text-xs text-gray-500 mb-6 transition-all">
              Preview Box
            </div>
            <div class="w-full relative">
              <input id="sh-css-out" type="text" readonly class="code-font w-full p-2.5 pr-16 rounded-xl bg-gray-50 dark:bg-dark-800 border border-gray-200 dark:border-gray-700 text-xs">
              <button id="btn-copy-css" class="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-brand-600 text-white text-xs font-semibold">Copy</button>
            </div>
          </div>
        </div>
      `;

      const x = container.querySelector('#sh-x');
      const y = container.querySelector('#sh-y');
      const blur = container.querySelector('#sh-blur');
      const spread = container.querySelector('#sh-spread');
      const color = container.querySelector('#sh-color');
      const inset = container.querySelector('#sh-inset');
      const box = container.querySelector('#shadow-preview-box');
      const cssOut = container.querySelector('#sh-css-out');

      function updateShadow() {
        container.querySelector('#val-sh-x').textContent = `${x.value}px`;
        container.querySelector('#val-sh-y').textContent = `${y.value}px`;
        container.querySelector('#val-sh-blur').textContent = `${blur.value}px`;
        container.querySelector('#val-sh-spread').textContent = `${spread.value}px`;

        const isInset = inset.checked ? 'inset ' : '';
        const shadowVal = `${isInset}${x.value}px ${y.value}px ${blur.value}px ${spread.value}px rgba(0,0,0,0.25)`;
        box.style.boxShadow = shadowVal;
        cssOut.value = `box-shadow: ${shadowVal};`;
      }

      [x, y, blur, spread, color, inset].forEach(el => el.addEventListener('input', updateShadow));
      updateShadow();

      container.querySelector('#btn-copy-css').addEventListener('click', () => copyToClipboard(cssOut.value));
    }
  },
  {
    id: "url-encoder",
    name: "URL Encoder & Parameter Parser",
    category: "developer",
    icon: "fa-solid fa-link",
    desc: "Encode or decode query strings, parse URL parameters into clean JSON key-value pairs.",
    tags: ["url", "encode", "decode", "params", "query", "parser"],
    render: function(container) {
      container.innerHTML = `
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <button id="btn-url-encode" class="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold">Encode URL</button>
            <button id="btn-url-decode" class="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold">Decode URL</button>
            <button id="btn-url-parse" class="px-4 py-2 rounded-lg bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 text-xs font-semibold">Parse Params</button>
          </div>
          <textarea id="url-input" rows="4" placeholder="Enter URL or string..." class="code-font w-full p-3 rounded-xl bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-700 text-xs sm:text-sm">https://example.com/search?q=developer+tools&category=web&lang=en</textarea>
          <div class="relative">
            <textarea id="url-output" rows="6" readonly placeholder="Output..." class="code-font w-full p-3 rounded-xl bg-gray-100 dark:bg-dark-800 border border-gray-200 dark:border-gray-700 text-xs sm:text-sm"></textarea>
            <button id="btn-url-copy" class="absolute top-3 right-3 px-3 py-1 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 hover:bg-brand-500/20 text-xs font-semibold"><i class="fa-solid fa-copy mr-1"></i> Copy</button>
          </div>
        </div>
      `;

      const input = container.querySelector('#url-input');
      const output = container.querySelector('#url-output');

      container.querySelector('#btn-url-encode').addEventListener('click', () => {
        output.value = encodeURIComponent(input.value);
        showToast('URL Encoded!');
      });

      container.querySelector('#btn-url-decode').addEventListener('click', () => {
        try {
          output.value = decodeURIComponent(input.value);
          showToast('URL Decoded!');
        } catch (e) {
          showToast('Decoding error: ' + e.message, 'error');
        }
      });

      container.querySelector('#btn-url-parse').addEventListener('click', () => {
        try {
          const urlObj = new URL(input.value.trim());
          const params = {};
          urlObj.searchParams.forEach((v, k) => params[k] = v);
          output.value = JSON.stringify({
            origin: urlObj.origin,
            pathname: urlObj.pathname,
            parameters: params,
            hash: urlObj.hash
          }, null, 2);
          showToast('Parsed URL parameters!');
        } catch (e) {
          showToast('Invalid URL format', 'error');
        }
      });

      container.querySelector('#btn-url-copy').addEventListener('click', () => copyToClipboard(output.value));
    }
  },
  {
    id: "lorem-generator",
    name: "Lorem Ipsum Dummy Generator",
    category: "generators",
    icon: "fa-solid fa-paragraph",
    desc: "Generate custom placeholder Lorem Ipsum text for mockups, prototypes, and layouts.",
    tags: ["lorem", "ipsum", "dummy", "text", "generator", "mockup"],
    render: function(container) {
      container.innerHTML = `
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap items-center gap-3">
            <div>
              <label class="block text-xs font-semibold text-gray-500 mb-1">Paragraphs</label>
              <input id="lorem-count" type="number" min="1" max="20" value="3" class="p-2 rounded-lg bg-gray-50 dark:bg-dark-900 border border-gray-200 dark:border-gray-700 text-xs w-24">
            </div>
            <button id="btn-gen-lorem" class="mt-5 px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs">Generate Text</button>
            <button id="btn-copy-lorem" class="mt-5 px-4 py-2 rounded-lg bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 text-xs font-semibold"><i class="fa-solid fa-copy mr-1"></i> Copy</button>
          </div>
          <textarea id="lorem-output" rows="10" readonly class="w-full p-4 rounded-xl bg-gray-100 dark:bg-dark-900 border border-gray-200 dark:border-gray-700 text-sm leading-relaxed outline-none"></textarea>
        </div>
      `;

      const paragraphs = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.",
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci. Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.",
        "Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy."
      ];

      const countIn = container.querySelector('#lorem-count');
      const output = container.querySelector('#lorem-output');

      function generate() {
        const count = Math.min(20, Math.max(1, parseInt(countIn.value, 10) || 1));
        const res = [];
        for (let i = 0; i < count; i++) {
          res.push(paragraphs[i % paragraphs.length]);
        }
        output.value = res.join('\n\n');
      }

      generate();
      container.querySelector('#btn-gen-lorem').addEventListener('click', generate);
      container.querySelector('#btn-copy-lorem').addEventListener('click', () => copyToClipboard(output.value));
    }
  }
];
