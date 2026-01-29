import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * inflected form of 'be'
 * 
 * Source: LanguageTool (BE_IS)
 * Category: grammar
 */
export const beIsRule: GrammarRule = {
  id: 'be-is',
  name: 'inflected form of \'be\'',
  description: 'Did you mean is or can be?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bbe\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean is or can be?',
        suggestions: ["is","can be"],
      });
    }
    
    return issues;
  },
};
