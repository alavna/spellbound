import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Leroy Sané
 * 
 * Source: LanguageTool (LEROY_SANE)
 * Category: grammar
 */
export const leroySaneRule: GrammarRule = {
  id: 'leroy-sane',
  name: 'Leroy Sané',
  description: 'Did you mean Leroy (the football player)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bLee?roy\b\s+\bSan./gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Leroy (the football player)?',
        suggestions: ["Leroy"],
      });
    }
    
    return issues;
  },
};
