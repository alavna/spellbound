import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * rearranges final comma in reported speech
 * 
 * Source: LanguageTool (QUOTATION_MARKS_COMMA)
 * Category: grammar
 */
export const quotationMarksCommaRule: GrammarRule = {
  id: 'quotation-marks-comma',
  name: 'rearranges final comma in reported speech',
  description: 'When punctuating reported speech in US English, the comma is usually placed before the closing quotation mark.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\S+\s+\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'When punctuating reported speech in US English, the comma is usually placed before the closing quotation mark.',
        suggestions: [",\""],
      });
    }
    
    return issues;
  },
};
