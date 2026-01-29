import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * he ani't (ani't)
 * 
 * Source: LanguageTool (PRP_ANIT)
 * Category: grammar
 */
export const prpAnitRule: GrammarRule = {
  id: 'prp-anit',
  name: 'he ani\'t (ani\'t)',
  description: 'Did you mean ain\'t?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\S+\s+\banit\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean ain\'t?',
        suggestions: ["ain't"],
      });
    }
    
    return issues;
  },
};
