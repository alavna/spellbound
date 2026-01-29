import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * admin (admit)
 * 
 * Source: LanguageTool (ADMIN_ADMIT)
 * Category: grammar
 */
export const adminAdmitRule: GrammarRule = {
  id: 'admin-admit',
  name: 'admin (admit)',
  description: 'Did you mean admit (=confess)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmust\b\s+\badmin\b\s+\bthat\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean admit (=confess)?',
        suggestions: ["admit"],
      });
    }
    
    return issues;
  },
};
