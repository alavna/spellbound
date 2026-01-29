import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * it sooths (soothes)
 * 
 * Source: LanguageTool (PRP_SOOTHS)
 * Category: grammar
 */
export const prpSoothsRule: GrammarRule = {
  id: 'prp-sooths',
  name: 'it sooths (soothes)',
  description: 'Did you mean (= verb)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bs?he|it|we|they|I\b\s+\S+\s+\bsooths?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean (= verb)?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
