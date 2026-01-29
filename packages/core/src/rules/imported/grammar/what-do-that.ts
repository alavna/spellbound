import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Who do (does) that?
 * 
 * Source: LanguageTool (WHAT_DO_THAT)
 * Category: grammar
 */
export const whatDoThatRule: GrammarRule = {
  id: 'what-do-that',
  name: 'Who do (does) that?',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /(what|who|when|which|where|how)(ever)?\s+\bthis|that|t?here|now|when|if|once|before|after\b\s+\./gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
