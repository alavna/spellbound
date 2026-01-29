import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Missing hyphen: face first (face-first)
 * 
 * Source: LanguageTool (FACE_FIRST)
 * Category: grammar
 */
export const faceFirstRule: GrammarRule = {
  id: 'face-first',
  name: 'Missing hyphen: face first (face-first)',
  description: 'Did you mean the adverb \\1-\\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bface\b\s+\bfirst\b\s+\binto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the adverb \\1-\\2?',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
