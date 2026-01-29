import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * about face (about-face)
 * 
 * Source: LanguageTool (ABOUT_FACE_HYPHEN)
 * Category: grammar
 */
export const aboutFaceHyphenRule: GrammarRule = {
  id: 'about-face-hyphen',
  name: 'about face (about-face)',
  description: 'The noun \\3-\\4 is normally spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?|the|my|your\b\s+\S+\s+\babout\b\s+\bface|turn\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun \\3-\\4 is normally spelled with a hyphen.',
        suggestions: ["\\3-\\4"],
      });
    }
    
    return issues;
  },
};
