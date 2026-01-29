import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * realms (realm) of possibility
 * 
 * Source: LanguageTool (REALMS_OF_POSSIBILITY)
 * Category: grammar
 */
export const realmsOfPossibilityRule: GrammarRule = {
  id: 'realms-of-possibility',
  name: 'realms (realm) of possibility',
  description: 'Did you mean realm of possibility?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\brealms\b\s+\bof\b\s+\bpossibility\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean realm of possibility?',
        suggestions: ["realm of possibility"],
      });
    }
    
    return issues;
  },
};
