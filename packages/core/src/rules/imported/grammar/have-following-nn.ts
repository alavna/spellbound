import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I have following (the following) questions
 * 
 * Source: LanguageTool (HAVE_FOLLOWING_NN)
 * Category: grammar
 */
export const haveFollowingNnRule: GrammarRule = {
  id: 'have-following-nn',
  name: 'I have following (the following) questions',
  description: 'The article \'the\' may be missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bfollowing\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The article \'the\' may be missing.',
        suggestions: ["the following"],
      });
    }
    
    return issues;
  },
};
