import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * son't (don't)
 * 
 * Source: LanguageTool (SON_T)
 * Category: grammar
 */
export const sonTRule: GrammarRule = {
  id: 'son-t',
  name: 'son\'t (don\'t)',
  description: 'Did you mean don\\2t?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bson\b\s+&apostrophe;\s+\bt\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean don\\2t?',
        suggestions: ["don\\2t"],
      });
    }
    
    return issues;
  },
};
