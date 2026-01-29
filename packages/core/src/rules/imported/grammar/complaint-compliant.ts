import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * complaint (compliant) with
 * 
 * Source: LanguageTool (COMPLAINT_COMPLIANT)
 * Category: grammar
 */
export const complaintCompliantRule: GrammarRule = {
  id: 'complaint-compliant',
  name: 'complaint (compliant) with',
  description: 'Did you mean compliant (= in agreement with rules, standards, or requirements)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+\s+\bcomplaint\b\s+\bwith\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean compliant (= in agreement with rules, standards, or requirements)?',
        suggestions: ["compliant"],
      });
    }
    
    return issues;
  },
};
