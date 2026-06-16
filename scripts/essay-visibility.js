function isVisible(postDate, now, tzOffsetHours = 8) {
  if (!postDate) return true;
  const shifted = new Date(now.getTime() + tzOffsetHours * 3600 * 1000);
  const today = shifted.toISOString().slice(0, 10);
  return postDate <= today;
}

module.exports = { isVisible };
