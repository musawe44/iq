(async function () {
  const input = Tools.qs("#igUrl");
  const pasteBtn = Tools.qs("#pasteBtn");
  const goBtn = Tools.qs("#goBtn");
  const copyBtn = Tools.qs("#copyBtn");
  const clearBtn = Tools.qs("#clearBtn");
  const soundBtn = Tools.qs("#soundBtn");
  const status = Tools.qs("#status");
  const resultBox = Tools.qs("#result");
  const resultText = Tools.qs("#resultText");

  function setStatus(msg) { status.textContent = msg; }

  pasteBtn?.addEventListener("click", async () => {
    const ok = await Tools.pasteToInput(input);
    setStatus(ok ? "Pasted ✅" : "Paste failed (browser permissions).");
    window.AppAudio?.playB();
  });

  copyBtn?.addEventListener("click", async () => {
    const ok = await Tools.copyText(input.value.trim());
    setStatus(ok ? "Copied ✅" : "Copy failed.");
  });

  clearBtn?.addEventListener("click", () => {
    input.value = "";
    resultBox.style.display = "none";
    setStatus("Cleared.");
  });

  soundBtn?.addEventListener("click", () => {
    window.AppAudio?.playA();
    setStatus("Sound 🎵");
  });

  goBtn?.addEventListener("click", async () => {
    const url = input.value.trim();

    if (!url) {
      setStatus("ضع رابط أولاً.");
      return;
    }

    if (!Tools.isProbablyInstagramUrl(url)) {
      setStatus("الرابط لا يبدو رابط Instagram صحيح.");
      return;
    }

    setStatus("Processing...");

    // إذا عندك API حقيقي: فعل هذا الجزء
    if (APP_CONFIG.apiEndpoint) {
      try {
        const resp = await fetch(APP_CONFIG.apiEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url })
        });

        if (!resp.ok) throw new Error("Bad response");
        const data = await resp.json();

        // توقع أن api يرجع directUrl
        const directUrl = data.directUrl || "";
        if (!directUrl) throw new Error("No directUrl");

        showResult(directUrl);
        setStatus("Done ✅");
        window.AppAudio?.playA();
        return;
      } catch (e) {
        setStatus("فشل الاتصال بالـ API.");
        showResult("⚠️ لم يتم الحصول على رابط تحميل مباشر.");
        return;
      }
    }

    // بدون API: نعرض فقط الرابط المدخل كـ “جاهز”
    showResult(`تم استلام الرابط: ${url}`);
    setStatus("Ready ✅ (no API configured)");
  });

  function showResult(text) {
    resultText.textContent = text;
    resultBox.style.display = "block";
  }

  // تسجيل Service Worker
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("sw.js");
      setStatus("Service Worker ✅");
    } catch {
      setStatus("Service Worker failed.");
    }
  }
})();
