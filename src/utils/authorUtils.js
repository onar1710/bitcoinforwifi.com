// Centralized author utilities for all articles
export function getRandomAuthor() {
  const authors = [
    { name: 'Michael Anderson', role: 'Founder & Editor in Chief', bio: 'Blockchain expert with 8+ years of experience' },
    { name: 'Sarah Johnson', role: 'Technical Analyst', bio: 'Specialist in trading and market analysis' },
    { name: 'David Thompson', role: 'Blockchain Developer', bio: 'Expert in smart contracts and DeFi' }
  ];
  return authors[Math.floor(Math.random() * authors.length)];
}
