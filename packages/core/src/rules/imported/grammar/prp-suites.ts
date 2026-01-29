import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * he suites (suits)
 * 
 * Source: LanguageTool (PRP_SUITES)
 * Category: grammar
 */
export const prpSuitesRule: GrammarRule = {
  id: 'prp-suites',
  name: 'he suites (suits)',
  description: 'Did you mean suits (= verb)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bs?he|it\b\s+\S+\s+\bsuites?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean suits (= verb)?',
        suggestions: ["suits"],
      });
    }
    
    return issues;
  },
};
