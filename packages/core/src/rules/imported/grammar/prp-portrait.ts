import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * he portraits (portrays)
 * 
 * Source: LanguageTool (PRP_PORTRAIT)
 * Category: grammar
 */
export const prpPortraitRule: GrammarRule = {
  id: 'prp-portrait',
  name: 'he portraits (portrays)',
  description: 'Did you mean (= verb)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bs?he|it|they|you|I\b\s+\S+\s+\bportraits?/gi;
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
