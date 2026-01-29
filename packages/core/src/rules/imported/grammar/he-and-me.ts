import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * He (and me -> I)
 * 
 * Source: LanguageTool (HE_AND_ME)
 * Category: grammar
 */
export const heAndMeRule: GrammarRule = {
  id: 'he-and-me',
  name: 'He (and me -> I)',
  description: 'In this context, the pronoun I should be used.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\.\s+\band\b\s+\bme\b\s+\.\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In this context, the pronoun I should be used.',
        suggestions: ["I"],
      });
    }
    
    return issues;
  },
};
