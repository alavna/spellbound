import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * daily regiment (regimen)
 * 
 * Source: LanguageTool (DAILY_REGIMENT)
 * Category: grammar
 */
export const dailyRegimentRule: GrammarRule = {
  id: 'daily-regiment',
  name: 'daily regiment (regimen)',
  description: 'Did you mean daily regimen?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdaily\b\s+\bregiment\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean daily regimen?',
        suggestions: ["daily regimen"],
      });
    }
    
    return issues;
  },
};
