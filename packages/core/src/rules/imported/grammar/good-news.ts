import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * the good new (news) is ...
 * 
 * Source: LanguageTool (GOOD_NEWS)
 * Category: grammar
 */
export const goodNewsRule: GrammarRule = {
  id: 'good-news',
  name: 'the good new (news) is ...',
  description: 'Did you mean news?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe\b\s+\bgood|bad\b\s+\bnew\b\s+\byes\b\s+\bthat\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean news?',
        suggestions: ["news"],
      });
    }
    
    return issues;
  },
};
