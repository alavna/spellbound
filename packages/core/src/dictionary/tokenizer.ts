import type { Token, ContentType } from '../types';

/**
 * Tokenizer for splitting text into words, punctuation, and other elements.
 * Supports different content types for intelligent tokenization.
 */
export class Tokenizer {
  private contentType: ContentType;

  // Regex patterns for different token types
  private static readonly PATTERNS = {
    // URLs (http, https, ftp)
    url: /^(https?:\/\/|ftp:\/\/)[^\s]+/i,
    // Email addresses
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
    // Hashtags
    hashtag: /^#[a-zA-Z_][a-zA-Z0-9_]*/,
    // Mentions (@username)
    mention: /^@[a-zA-Z_][a-zA-Z0-9_]*/,
    // Numbers (including decimals, negatives, percentages)
    number: /^-?\d+([.,]\d+)?%?/,
    // Words (including contractions and hyphenated words)
    word: /^[a-zA-Z]+(?:[''][a-zA-Z]+)?(?:-[a-zA-Z]+)*/,
    // Whitespace
    whitespace: /^\s+/,
    // Punctuation
    punctuation: /^[^\w\s]+/,
  };

  // Markdown patterns to skip
  private static readonly MARKDOWN_PATTERNS = {
    // Code blocks ```...```
    codeBlock: /^```[\s\S]*?```/,
    // Inline code `...`
    inlineCode: /^`[^`]+`/,
    // Links [text](url)
    link: /^\[([^\]]+)\]\([^)]+\)/,
    // Images ![alt](url)
    image: /^!\[([^\]]*)\]\([^)]+\)/,
  };

  constructor(contentType: ContentType = 'plain') {
    this.contentType = contentType;
  }

  /**
   * Tokenize text into an array of tokens
   */
  tokenize(text: string): Token[] {
    const tokens: Token[] = [];
    let position = 0;

    while (position < text.length) {
      const remaining = text.slice(position);
      let matched = false;

      // Handle markdown-specific patterns
      if (this.contentType === 'markdown') {
        const mdToken = this.tryMatchMarkdown(remaining, position);
        if (mdToken) {
          // For code blocks/inline code, add as 'code' token type
          if (mdToken.type === 'code') {
            tokens.push(mdToken);
          } else {
            // For links/images, extract and tokenize the text part
            tokens.push(mdToken);
          }
          position = mdToken.end;
          continue;
        }
      }

      // Try to match URL
      const urlMatch = remaining.match(Tokenizer.PATTERNS.url);
      if (urlMatch) {
        tokens.push({
          value: urlMatch[0],
          start: position,
          end: position + urlMatch[0].length,
          type: 'url',
        });
        position += urlMatch[0].length;
        continue;
      }

      // Try to match email
      const emailMatch = remaining.match(Tokenizer.PATTERNS.email);
      if (emailMatch) {
        tokens.push({
          value: emailMatch[0],
          start: position,
          end: position + emailMatch[0].length,
          type: 'email',
        });
        position += emailMatch[0].length;
        continue;
      }

      // Try to match hashtag
      const hashtagMatch = remaining.match(Tokenizer.PATTERNS.hashtag);
      if (hashtagMatch) {
        tokens.push({
          value: hashtagMatch[0],
          start: position,
          end: position + hashtagMatch[0].length,
          type: 'hashtag',
        });
        position += hashtagMatch[0].length;
        continue;
      }

      // Try to match mention
      const mentionMatch = remaining.match(Tokenizer.PATTERNS.mention);
      if (mentionMatch) {
        tokens.push({
          value: mentionMatch[0],
          start: position,
          end: position + mentionMatch[0].length,
          type: 'mention',
        });
        position += mentionMatch[0].length;
        continue;
      }

      // Try to match number
      const numberMatch = remaining.match(Tokenizer.PATTERNS.number);
      if (numberMatch) {
        tokens.push({
          value: numberMatch[0],
          start: position,
          end: position + numberMatch[0].length,
          type: 'number',
        });
        position += numberMatch[0].length;
        continue;
      }

      // Try to match word
      const wordMatch = remaining.match(Tokenizer.PATTERNS.word);
      if (wordMatch) {
        tokens.push({
          value: wordMatch[0],
          start: position,
          end: position + wordMatch[0].length,
          type: 'word',
        });
        position += wordMatch[0].length;
        continue;
      }

      // Try to match whitespace
      const wsMatch = remaining.match(Tokenizer.PATTERNS.whitespace);
      if (wsMatch) {
        tokens.push({
          value: wsMatch[0],
          start: position,
          end: position + wsMatch[0].length,
          type: 'whitespace',
        });
        position += wsMatch[0].length;
        continue;
      }

      // Try to match punctuation
      const punctMatch = remaining.match(Tokenizer.PATTERNS.punctuation);
      if (punctMatch) {
        tokens.push({
          value: punctMatch[0],
          start: position,
          end: position + punctMatch[0].length,
          type: 'punctuation',
        });
        position += punctMatch[0].length;
        continue;
      }

      // If nothing matched, skip character (shouldn't happen)
      if (!matched) {
        position++;
      }
    }

    return tokens;
  }

  /**
   * Try to match markdown-specific patterns
   */
  private tryMatchMarkdown(text: string, position: number): Token | null {
    // Code block
    const codeBlockMatch = text.match(Tokenizer.MARKDOWN_PATTERNS.codeBlock);
    if (codeBlockMatch) {
      return {
        value: codeBlockMatch[0],
        start: position,
        end: position + codeBlockMatch[0].length,
        type: 'code',
      };
    }

    // Inline code
    const inlineCodeMatch = text.match(Tokenizer.MARKDOWN_PATTERNS.inlineCode);
    if (inlineCodeMatch) {
      return {
        value: inlineCodeMatch[0],
        start: position,
        end: position + inlineCodeMatch[0].length,
        type: 'code',
      };
    }

    // Image (must check before link due to similar pattern)
    const imageMatch = text.match(Tokenizer.MARKDOWN_PATTERNS.image);
    if (imageMatch) {
      return {
        value: imageMatch[0],
        start: position,
        end: position + imageMatch[0].length,
        type: 'url', // Treat as URL (skip spell checking)
      };
    }

    // Link
    const linkMatch = text.match(Tokenizer.MARKDOWN_PATTERNS.link);
    if (linkMatch) {
      return {
        value: linkMatch[0],
        start: position,
        end: position + linkMatch[0].length,
        type: 'url', // Treat as URL (skip spell checking)
      };
    }

    return null;
  }

  /**
   * Extract only word tokens (for spell checking)
   */
  extractWords(text: string): Token[] {
    return this.tokenize(text).filter((token) => token.type === 'word');
  }

  /**
   * Extract sentences from text
   */
  extractSentences(text: string): Array<{
    text: string;
    start: number;
    end: number;
    tokens: Token[];
  }> {
    const tokens = this.tokenize(text);
    const sentences: Array<{
      text: string;
      start: number;
      end: number;
      tokens: Token[];
    }> = [];

    let sentenceStart = 0;
    let sentenceTokens: Token[] = [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      sentenceTokens.push(token);

      // Check for sentence-ending punctuation
      const isSentenceEnd = token.type === 'punctuation' && /[.!?]/.test(token.value);

      // Also check if next token starts with capital (after whitespace)
      const nextToken = tokens[i + 1];
      const nextNextToken = tokens[i + 2];
      const nextIsNewSentence =
        isSentenceEnd &&
        nextToken?.type === 'whitespace' &&
        nextNextToken?.type === 'word' &&
        /^[A-Z]/.test(nextNextToken.value);

      if (isSentenceEnd && (nextIsNewSentence || i === tokens.length - 1)) {
        sentences.push({
          text: text.slice(sentenceStart, token.end),
          start: sentenceStart,
          end: token.end,
          tokens: sentenceTokens,
        });

        sentenceStart = token.end;
        sentenceTokens = [];
      }
    }

    // Add remaining tokens as last sentence
    if (sentenceTokens.length > 0) {
      const lastToken = sentenceTokens[sentenceTokens.length - 1];
      sentences.push({
        text: text.slice(sentenceStart, lastToken.end),
        start: sentenceStart,
        end: lastToken.end,
        tokens: sentenceTokens,
      });
    }

    return sentences;
  }

  /**
   * Set the content type
   */
  setContentType(contentType: ContentType): void {
    this.contentType = contentType;
  }
}

/**
 * Create a tokenizer instance
 */
export function createTokenizer(contentType: ContentType = 'plain'): Tokenizer {
  return new Tokenizer(contentType);
}
