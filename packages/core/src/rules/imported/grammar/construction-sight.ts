import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * construction sight (site)
 * 
 * Source: LanguageTool (CONSTRUCTION_SIGHT)
 * Category: grammar
 */
export const constructionSightRule: GrammarRule = {
  id: 'construction-sight',
  name: 'construction sight (site)',
  description: 'Did you mean construction site?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bconstruction\b\s+\bsight\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean construction site?',
        suggestions: ["construction site"],
      });
    }
    
    return issues;
  },
};
