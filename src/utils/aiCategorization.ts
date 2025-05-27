import { Server } from '../types/server';

// AI categorization rules
const categoryRules = [
  {
    category: 'Gaming',
    keywords: ['game', 'gaming', 'play', 'player', 'esport', 'stream', 'twitch', 'minecraft', 'fortnite', 'valorant', 'league of legends'],
  },
  {
    category: 'Art',
    keywords: ['art', 'artist', 'draw', 'drawing', 'paint', 'painting', 'creative', 'design', 'illustration', 'digital art'],
  },
  {
    category: 'Music',
    keywords: ['music', 'musician', 'song', 'singing', 'producer', 'beat', 'rap', 'hip hop', 'rock', 'jazz', 'playlist'],
  },
  {
    category: 'Technology',
    keywords: ['tech', 'technology', 'programming', 'code', 'developer', 'software', 'hardware', 'computer', 'ai', 'crypto'],
  },
  {
    category: 'Community',
    keywords: ['community', 'chat', 'social', 'hangout', 'friends', 'meet', 'talk', 'discussion'],
  },
];

export const suggestCategories = (server: Partial<Server>): string[] => {
  const suggestedCategories = new Set<string>();
  const textToAnalyze = `${server.name} ${server.description} ${server.fullDescription}`.toLowerCase();

  // Check each category's keywords against the server text
  categoryRules.forEach(({ category, keywords }) => {
    if (keywords.some(keyword => textToAnalyze.includes(keyword))) {
      suggestedCategories.add(category);
    }
  });

  // Always include "Community" as a fallback if no other categories match
  if (suggestedCategories.size === 0) {
    suggestedCategories.add('Community');
  }

  return Array.from(suggestedCategories);
};