
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "save_as_webp",
    title: "Save image as WebP",
    contexts: ["image"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"]
  }, () => {
    chrome.tabs.sendMessage(tab.id, { imageUrl: info.srcUrl });
  });
});

chrome.runtime.onMessage.addListener(msg => {
  if (msg.downloadUrl) {
    chrome.downloads.download({
      url: msg.downloadUrl,
      filename: `image_${Date.now()}.webp`
    });
  }
});
