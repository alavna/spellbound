import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * president-elect
 * 
 * Source: LanguageTool (PRESIDENT_ELECT)
 * Category: grammar
 */
export const presidentElectRule: GrammarRule = {
  id: 'president-elect',
  name: 'president-elect',
  description: 'This word is normally spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bpresident|vp\b\s+\belect\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This word is normally spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
