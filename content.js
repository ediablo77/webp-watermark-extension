
chrome.runtime.onMessage.addListener(async (message) => {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = message.imageUrl;

  img.onload = async () => {
    const s = await chrome.storage.sync.get({
      watermarkText: "",
      opacity: 0.5,
      quality: 0.9,
      position: "bottom-right"
    });

    const c = document.createElement("canvas");
    c.width = img.width;
    c.height = img.height;
    const ctx = c.getContext("2d");
    ctx.drawImage(img,0,0);

    if (s.watermarkText) {
      ctx.globalAlpha = s.opacity;
      ctx.font = `${Math.floor(img.width/25)}px Arial`;
      ctx.fillStyle = "white";

      const textWidth = ctx.measureText(s.watermarkText).width;
      let x=0,y=0;

      switch(s.position){
        case "top-left": x=20; y=40; break;
        case "top-right": x=c.width-textWidth-20; y=40; break;
        case "bottom-left": x=20; y=c.height-20; break;
        case "center": x=(c.width-textWidth)/2; y=c.height/2; break;
        default: x=c.width-textWidth-20; y=c.height-20;
      }
      ctx.fillText(s.watermarkText,x,y);
    }

    c.toBlob(blob=>{
      chrome.runtime.sendMessage({ downloadUrl: URL.createObjectURL(blob) });
    },"image/webp",s.quality);
  };
});
