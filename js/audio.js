(function () {
  const audioA = new Audio("assets/audio.mp3");
  const audioB = new Audio("assets/eleven.mp3");

  window.AppAudio = {
    playA() { audioA.currentTime = 0; audioA.play().catch(()=>{}); },
    playB() { audioB.currentTime = 0; audioB.play().catch(()=>{}); }
  };
})();
