import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * sigh vs sign
 * 
 * Source: LanguageTool (SIGH_SIGN)
 * Category: grammar
 */
export const sighSignRule: GrammarRule = {
  id: 'sigh-sign',
  name: 'sigh vs sign',
  description: 'Did you mean the verb sign?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bup|in|off\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the verb sign?',
        suggestions: ["sign"],
      });
    }
    
    return issues;
  },
};
