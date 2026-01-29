import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'open heart'
 * 
 * Source: LanguageTool (OPEN_HEART_HYPHEN)
 * Category: grammar
 */
export const openHeartHyphenRule: GrammarRule = {
  id: 'open-heart-hyphen',
  name: 'missing hyphen in \'open heart\'',
  description: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bopen\b\s+\bheart\b\s+\S+\s+\bsurger(y|ies)|operations?|procedures?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
