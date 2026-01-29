import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Collocation: a diversity of colors OR diverse colors
 * 
 * Source: LanguageTool (DIVERSITY_OF)
 * Category: grammar
 */
export const diversityOfRule: GrammarRule = {
  id: 'diversity-of',
  name: 'Collocation: a diversity of colors OR diverse colors',
  description: 'The word \"of\" is missing between \"\\2\" and \"\\3\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bdiversity|diversitie\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \"of\" is missing between \"\\2\" and \"\\3\".',
        suggestions: ["\\2 of \\3","diverse \\3"],
      });
    }
    
    return issues;
  },
};
