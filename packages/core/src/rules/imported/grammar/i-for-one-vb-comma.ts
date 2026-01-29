import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I(,) for one(,) think
 * 
 * Source: LanguageTool (I_FOR_ONE_VB_COMMA)
 * Category: grammar
 */
export const iForOneVbCommaRule: GrammarRule = {
  id: 'i-for-one-vb-comma',
  name: 'I(,) for one(,) think',
  description: 'Consider adding two commas here.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bI|s?he\b\s+\bfor\b\s+\bone\b\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider adding two commas here.',
        suggestions: ["\\1, \\2 \\3,"],
      });
    }
    
    return issues;
  },
};
