import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * safe guard (safeguard)
 * 
 * Source: LanguageTool (SAFE_GUARD_COMPOUND)
 * Category: grammar
 */
export const safeGuardCompoundRule: GrammarRule = {
  id: 'safe-guard-compound',
  name: 'safe guard (safeguard)',
  description: 'This word is normally spelled as one.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Ss]afe\b\s+\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This word is normally spelled as one.',
        suggestions: ["\\1\\2"],
      });
    }
    
    return issues;
  },
};
