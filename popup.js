
document.getElementById("save").onclick=()=>{
  chrome.storage.sync.set({
    watermarkText: text.value,
    position: pos.value,
    opacity: parseFloat(opacity.value||0.5),
    quality: parseFloat(quality.value||0.9)
  });
};
