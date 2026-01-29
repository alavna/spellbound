import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * worse-case (worst-case) scenario
 * 
 * Source: LanguageTool (WORSE-CASE_SCENARIO)
 * Category: grammar
 */
export const worseCaseScenarioRule: GrammarRule = {
  id: 'worse-case-scenario',
  name: 'worse-case (worst-case) scenario',
  description: 'Did you mean worst-case scenario?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bworse-case\b\s+\bscenario\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean worst-case scenario?',
        suggestions: ["worst-case scenario"],
      });
    }
    
    return issues;
  },
};
