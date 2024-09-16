function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return "now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} days ago`;
}
function isImage(file) {
  file = file.file ? file.file : file;
  let mime = file.mime || file.type;
  mime = mime.split("/");
  return mime[0].toLowerCase() === "image";
}

export { formatRelativeTime, isImage };
