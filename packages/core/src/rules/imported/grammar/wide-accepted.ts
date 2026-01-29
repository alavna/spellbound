import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * It is wide(ly) accepted that...
 * 
 * Source: LanguageTool (WIDE_ACCEPTED)
 * Category: grammar
 */
export const wideAcceptedRule: GrammarRule = {
  id: 'wide-accepted',
  name: 'It is wide(ly) accepted that...',
  description: 'Did you mean to use the adverb \"widely\" here?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwide\b\s+\baccepted|acceptable|used\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean to use the adverb \"widely\" here?',
        suggestions: ["widely"],
      });
    }
    
    return issues;
  },
};
