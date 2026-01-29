import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * do you what (do you know what)
 * 
 * Source: LanguageTool (DO_YOU_WHAT)
 * Category: grammar
 */
export const doYouWhatRule: GrammarRule = {
  id: 'do-you-what',
  name: 'do you what (do you know what)',
  description: 'A verb may be missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'A verb may be missing.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
