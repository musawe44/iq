window.Tools = {
  qs(sel) { return document.querySelector(sel); },
  async pasteToInput(inputEl) {
    try {
      const text = await navigator.clipboard.readText();
      inputEl.value = (text || "").trim();
      return true;
    } catch {
      return false;
    }
  },
  async copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  },
  isProbablyInstagramUrl(url) {
    if (!url) return false;
    try {
      const u = new URL(url);
      return /instagram\.com$/i.test(u.hostname) || /instagram\.com$/i.test(u.hostname.replace(/^www\./,''));
    } catch {
      return false;
    }
  }
};
