import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * busses (buses)
 * 
 * Source: LanguageTool (BUSSES)
 * Category: style
 */
export const bussesRule: GrammarRule = {
  id: 'busses',
  name: 'busses (buses)',
  description: 'The more common plural form of \"bus\" (= motor vehicle) is buses.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbusses\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The more common plural form of \"bus\" (= motor vehicle) is buses.',
        suggestions: ["buses"],
      });
    }
    
    return issues;
  },
};
