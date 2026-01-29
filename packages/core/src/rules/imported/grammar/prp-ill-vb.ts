import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * We ill (will) do
 * 
 * Source: LanguageTool (PRP_ILL_VB)
 * Category: grammar
 */
export const prpIllVbRule: GrammarRule = {
  id: 'prp-ill-vb',
  name: 'We ill (will) do',
  description: 'Did you mean will?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bs?he|it|we|they|you|I\b\s+\bill\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean will?',
        suggestions: ["will"],
      });
    }
    
    return issues;
  },
};
