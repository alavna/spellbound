import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Additional (Additionally)
 * 
 * Source: LanguageTool (ADDITIONAL)
 * Category: grammar
 */
export const additionalRule: GrammarRule = {
  id: 'additional',
  name: 'Additional (Additionally)',
  description: 'Did you mean the introductory adverb \\2ly?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bAdditional|Usual|Hopeful|Occasional|Thankful\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the introductory adverb \\2ly?',
        suggestions: ["\\2ly"],
      });
    }
    
    return issues;
  },
};
