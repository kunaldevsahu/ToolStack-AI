// Helper functions for text formatting and manipulation

export function truncateText(text, length) {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

export function capitalizeFirst(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
