import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Ive have (I have)
 * 
 * Source: LanguageTool (IVE_HAVE)
 * Category: grammar
 */
export const iveHaveRule: GrammarRule = {
  id: 'ive-have',
  name: 'Ive have (I have)',
  description: 'Did you mean have?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bI|you|we|they\b\s+'ve\b\s+\bhave\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean have?',
        suggestions: ["have"],
      });
    }
    
    return issues;
  },
};
