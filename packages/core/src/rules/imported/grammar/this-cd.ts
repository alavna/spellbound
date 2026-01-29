import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * This (These) two are happy
 * 
 * Source: LanguageTool (THIS_CD)
 * Category: grammar
 */
export const thisCdRule: GrammarRule = {
  id: 'this-cd',
  name: 'This (These) two are happy',
  description: 'Use these if you are referring to a plural noun.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthis\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Use these if you are referring to a plural noun.',
        suggestions: ["these"],
      });
    }
    
    return issues;
  },
};
