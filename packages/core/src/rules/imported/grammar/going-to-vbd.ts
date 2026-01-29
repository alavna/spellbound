import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Use of past form with 'going to ...'
 * 
 * Source: LanguageTool (GOING_TO_VBD)
 * Category: grammar
 */
export const goingToVbdRule: GrammarRule = {
  id: 'going-to-vbd',
  name: 'Use of past form with \'going to ...\'',
  description: 'The verb after \'going to\' requires the base form.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bgoing\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The verb after \'going to\' requires the base form.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
