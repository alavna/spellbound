import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * sigh vs sight
 * 
 * Source: LanguageTool (SIGH_SIGHT)
 * Category: grammar
 */
export const sighSightRule: GrammarRule = {
  id: 'sigh-sight',
  name: 'sigh vs sight',
  description: 'Did you mean the noun sight?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bout\b\s+\bof\b\s+\bsigh\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the noun sight?',
        suggestions: ["sight"],
      });
    }
    
    return issues;
  },
};
