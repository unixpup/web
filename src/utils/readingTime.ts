/**
 * Calculate the estimated reading time for a given text
 * @param content The text content to analyze
 * @param wordsPerMinute Average reading speed (words per minute)
 * @returns Formatted reading time string (e.g. "3 min read")
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 225): string {
  // Remove code blocks as they take longer to read/scan but have fewer words
  const textWithoutCodeBlocks = content.replace(/```[\s\S]*?```/g, '');

  // Count words (split by spaces and filter out empty strings)
  const words = textWithoutCodeBlocks
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const wordCount = words.length;

  // Calculate reading time in minutes
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

  return `${minutes} min read`;
}