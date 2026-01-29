import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * pee-configured (pre-configured)
 * 
 * Source: LanguageTool (PEE_INSTALLED)
 * Category: grammar
 */
export const peeInstalledRule: GrammarRule = {
  id: 'pee-installed',
  name: 'pee-configured (pre-configured)',
  description: 'Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /(pee|per)-(.{2,30}ed)/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
