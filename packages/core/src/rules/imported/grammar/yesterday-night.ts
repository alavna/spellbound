import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Wrong phrase: 'yesterday night' (last night)
 * 
 * Source: LanguageTool (YESTERDAY_NIGHT)
 * Category: grammar
 */
export const yesterdayNightRule: GrammarRule = {
  id: 'yesterday-night',
  name: 'Wrong phrase: \'yesterday night\' (last night)',
  description: 'This is a non-standard collocation. Normally, last night is used.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byesterday\b\s+\bnight\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This is a non-standard collocation. Normally, last night is used.',
        suggestions: ["last night"],
      });
    }
    
    return issues;
  },
};
