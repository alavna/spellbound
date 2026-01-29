import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * the/a responds (response)
 * 
 * Source: LanguageTool (DT_RESPONDS)
 * Category: grammar
 */
export const dtRespondsRule: GrammarRule = {
  id: 'dt-responds',
  name: 'the/a responds (response)',
  description: 'Did you mean response?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bresponds\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean response?',
        suggestions: ["response"],
      });
    }
    
    return issues;
  },
};
