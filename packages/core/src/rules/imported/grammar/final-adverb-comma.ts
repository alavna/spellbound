import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * comma before ending sentence with adverb
 * 
 * Source: LanguageTool (FINAL_ADVERB_COMMA)
 * Category: grammar
 */
export const finalAdverbCommaRule: GrammarRule = {
  id: 'final-adverb-comma',
  name: 'comma before ending sentence with adverb',
  description: 'Consider inserting a comma before \'\\2\'.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bactually|allegedly|apparently|certainly|fortunately|hopefully|however|maybe|obviously|perchance|perhaps|probably|surely|unfortunately\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider inserting a comma before \'\\2\'.',
        suggestions: [","],
      });
    }
    
    return issues;
  },
};
