import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * rod (wrought) iron
 * 
 * Source: LanguageTool (RODROT_IRON)
 * Category: grammar
 */
export const rodrotIronRule: GrammarRule = {
  id: 'rodrot-iron',
  name: 'rod (wrought) iron',
  description: 'Did you mean wrought iron?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bro[dt]\s+\biron\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean wrought iron?',
        suggestions: ["wrought iron"],
      });
    }
    
    return issues;
  },
};
