import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Missing comma 'first come first serve'
 * 
 * Source: LanguageTool (FIRST_COME_FIRST_SERVED_COMMA)
 * Category: grammar
 */
export const firstComeFirstServedCommaRule: GrammarRule = {
  id: 'first-come-first-served-comma',
  name: 'Missing comma \'first come first serve\'',
  description: 'It seems that a comma is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfirst\b\s+\bcome\b\s+\bfirst\b\s+\bserved\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It seems that a comma is missing.',
        suggestions: ["\\2,"],
      });
    }
    
    return issues;
  },
};
