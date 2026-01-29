import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * have twitter (have Twitter / have twittered)
 * 
 * Source: LanguageTool (HAVE_TWITTER)
 * Category: grammar
 */
export const haveTwitterRule: GrammarRule = {
  id: 'have-twitter',
  name: 'have twitter (have Twitter / have twittered)',
  description: 'Did you mean the proper noun or did you want to use it as a verb?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bha[ds]|(?:ha)?ve|used?\s+\btwitter|skype|excel|google|zoom|slack|photoshop|sketch|visa|react\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the proper noun or did you want to use it as a verb?',
        suggestions: ["\\1","\\1"],
      });
    }
    
    return issues;
  },
};
