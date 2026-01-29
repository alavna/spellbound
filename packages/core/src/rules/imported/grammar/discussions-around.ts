import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * discussions around (about)
 * 
 * Source: LanguageTool (DISCUSSIONS_AROUND)
 * Category: grammar
 */
export const discussionsAroundRule: GrammarRule = {
  id: 'discussions-around',
  name: 'discussions around (about)',
  description: 'Did you mean about?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdiscussions\b\s+\baround\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean about?',
        suggestions: ["about"],
      });
    }
    
    return issues;
  },
};
