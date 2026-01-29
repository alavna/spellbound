import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * You need to sign-in (sign in) somewhere
 * 
 * Source: LanguageTool (SIGN_IN)
 * Category: grammar
 */
export const signInRule: GrammarRule = {
  id: 'sign-in',
  name: 'You need to sign-in (sign in) somewhere',
  description: 'When \'sign in\' is used as a verb, it does not need to be hyphenated.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /(sign|log)-(in|up|off)/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'When \'sign in\' is used as a verb, it does not need to be hyphenated.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
