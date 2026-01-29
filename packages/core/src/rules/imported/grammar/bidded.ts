import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * bidded (bid)
 * 
 * Source: LanguageTool (BIDDED)
 * Category: grammar
 */
export const biddedRule: GrammarRule = {
  id: 'bidded',
  name: 'bidded (bid)',
  description: 'The past tense of the verb \"to bid\" is bid.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbidded\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The past tense of the verb \"to bid\" is bid.',
        suggestions: ["bid"],
      });
    }
    
    return issues;
  },
};
