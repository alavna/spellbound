import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * he mus (must)
 * 
 * Source: LanguageTool (PRP_MUS)
 * Category: grammar
 */
export const prpMusRule: GrammarRule = {
  id: 'prp-mus',
  name: 'he mus (must)',
  description: 'Did you mean must?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bI|you|s?he|we|they|it\b\s+\bmus\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean must?',
        suggestions: ["must"],
      });
    }
    
    return issues;
  },
};
