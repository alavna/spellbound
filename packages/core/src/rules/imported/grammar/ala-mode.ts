import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ala mode (a la mode)
 * 
 * Source: LanguageTool (ALA_MODE)
 * Category: grammar
 */
export const alaModeRule: GrammarRule = {
  id: 'ala-mode',
  name: 'ala mode (a la mode)',
  description: 'Did you mean à la mode?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bala\b\s+\bmode\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean à la mode?',
        suggestions: ["à la mode"],
      });
    }
    
    return issues;
  },
};
