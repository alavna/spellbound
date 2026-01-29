import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * verb accomplish (do, archive, finish)
 * 
 * Source: LanguageTool (ACCOMPLISH)
 * Category: style
 */
export const accomplishRule: GrammarRule = {
  id: 'accomplish',
  name: 'verb accomplish (do, archive, finish)',
  description: 'Try one of: do or achieve or finish.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Try one of: do or achieve or finish.',
        suggestions: ["do","achieve","finish"],
      });
    }
    
    return issues;
  },
};
