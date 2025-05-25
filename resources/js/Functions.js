function formatRelativeTime(dateString) {
  // console.log(dateString);

  // const date = new Date(dateString);
  // const now = new Date();

  // const diffInSeconds = Math.floor((now - date) / 1000);

  // if (diffInSeconds < 60) {
  //   return "now";
  // }

  // const diffInMinutes = Math.floor(diffInSeconds / 60);
  // if (diffInMinutes < 60) {
  //   return `${diffInMinutes} minutes ago`;
  // }

  // const diffInHours = Math.floor(diffInMinutes / 60);
  // if (diffInHours < 24) {
  //   return `${diffInHours} hours ago`;
  // }

  // const diffInDays = Math.floor(diffInHours / 24);
  // return `${diffInDays} days ago`;

  const date = new Date(dateString);
  const now = new Date();
  const diffHours = Math.floor((now - date) / (1000 * 60 * 60));

  if (date.toDateString() === now.toDateString()) {
    return "today";
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  } else if (diffHours < 48) {
    return "yesterday";
  } else {
    return date.toLocaleDateString();
  }
}
function isImage(file) {
  file = file?.file ? file.file : file;
  let mime = file?.mime || file?.type;
  mime = mime ? mime?.split("/") : "";
  return mime[0] && mime[0]?.toLowerCase() == "image";
}
function MessageIsImage(file) {
  file = file?.file ? file.file : file;
  let mime = file?.mime || file?.type;
  mime = mime ? mime?.split("/") : "";
  return mime[0]?.toLowerCase() === "image";
}
function MessageIsVideo(file) {
  file = file?.file ? file.file : file;
  let mime = file?.mime || file?.type;
  mime = mime ? mime?.split("/") : "";
  return mime[0]?.toLowerCase() == "video";
}
function MessageIsAudio(file) {
  file = file?.file ? file.file : file;
  let mime = file?.mime || file?.type;
  mime = mime ? mime?.split("/") : "";
  return mime[0]?.toLowerCase() === "audio";
}
function MessageIsPDF(file) {
  file = file?.file ? file.file : file;
  let mime = file?.mime || file?.type;
  return mime == "application/pdf";
  // mime = mime ? mime.split("/") : "";
  // return mime[0].toLowerCase() === "pdf";
}
const isPreviewAble = (attachment) => {
  return (
    MessageIsImage(attachment) ||
    MessageIsVideo(attachment) ||
    MessageIsAudio(attachment) ||
    MessageIsPDF(attachment)
  );
};
const formatBytes = (bytes, decimals = 2) => {
  if (bytes == 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  let sizes = ["Bytes", "KB", "MB", "GB"];
  let i = 0;
  let size = bytes;
  while (size >= k) {
    size /= k;
    i++;
  }
  return parseFloat(size.toFixed(dm)) + " " + sizes[i];
};
export {
  formatRelativeTime,
  isImage,
  MessageIsImage,
  MessageIsVideo,
  MessageIsAudio,
  MessageIsPDF,
  isPreviewAble,
  formatBytes,
};
