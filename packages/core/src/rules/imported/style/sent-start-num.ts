import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Number starting a sentence
 * 
 * Source: LanguageTool (SENT_START_NUM)
 * Category: style
 */
export const sentStartNumRule: GrammarRule = {
  id: 'sent-start-num',
  name: 'Number starting a sentence',
  description: 'Avoid numbers at the start of the sentence. Consider spelling out numbers using words or rephrasing the sentence.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\.\.\..\.\!\.\.?\./gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Avoid numbers at the start of the sentence. Consider spelling out numbers using words or rephrasing the sentence.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
