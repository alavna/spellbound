import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I mite (might)
 * 
 * Source: LanguageTool (PRP_MIGHT)
 * Category: grammar
 */
export const prpMightRule: GrammarRule = {
  id: 'prp-might',
  name: 'I mite (might)',
  description: 'Did you mean \\1 might?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bI|you|s?he|they|we|it\b\s+\bmite\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 might?',
        suggestions: ["\\1 might"],
      });
    }
    
    return issues;
  },
};
