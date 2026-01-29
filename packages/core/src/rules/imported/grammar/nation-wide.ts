import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * nation wide (nationwide)
 * 
 * Source: LanguageTool (NATION_WIDE)
 * Category: grammar
 */
export const nationWideRule: GrammarRule = {
  id: 'nation-wide',
  name: 'nation wide (nationwide)',
  description: 'Did you mean nationwide?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bnation\b\s+\bwide\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean nationwide?',
        suggestions: ["nationwide"],
      });
    }
    
    return issues;
  },
};
