// Dynamic date utilities for articles
export function getCurrentDate() {
  const today = new Date();
  // Use UTC to avoid timezone inconsistencies
  return today.toISOString().split('T')[0]; // YYYY-MM-DD
}

export function getCurrentDateTime() {
  const today = new Date();
  return today.toISOString(); // YYYY-MM-DDTHH:mm:ss.sssZ
}

export function getDisplayDate() {
  const today = new Date();
  return today.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    timeZone: 'UTC' // Use UTC to match formatDate behavior
  });
}

export function getDateTimeForDisplay() {
  const today = new Date();
  return today.toLocaleString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Centralized date formatting function for all pages
export function formatDate(dateString) {
  if (!dateString) return getDisplayDate();
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    timeZone: 'UTC' // Ensure consistent timezone handling
  });
}
