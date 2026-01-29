import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * please be prepare (prepared)
 * 
 * Source: LanguageTool (PLEASE_BE_VB)
 * Category: grammar
 */
export const pleaseBeVbRule: GrammarRule = {
  id: 'please-be-vb',
  name: 'please be prepare (prepared)',
  description: 'It seems the correct verb form here is .',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bplease|maybe|perhaps|always|never\b\s+\bbe\b\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It seems the correct verb form here is .',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
