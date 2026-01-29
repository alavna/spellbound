import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * buttload (boatload)
 * 
 * Source: LanguageTool (BUTTLOAD)
 * Category: grammar
 */
export const buttloadRule: GrammarRule = {
  id: 'buttload',
  name: 'buttload (boatload)',
  description: 'Did you mean boatload?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbuttload\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean boatload?',
        suggestions: ["boatload"],
      });
    }
    
    return issues;
  },
};
