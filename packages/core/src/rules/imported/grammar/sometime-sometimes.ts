import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * sometime vs sometimes
 * 
 * Source: LanguageTool (SOMETIME_SOMETIMES)
 * Category: grammar
 */
export const sometimeSometimesRule: GrammarRule = {
  id: 'sometime-sometimes',
  name: 'sometime vs sometimes',
  description: 'It seems that sometimes fits better in this context. Please check.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsometime\b\s+\bI|you|we|they|s?he|it|the|an?|my|y?our|his|her|its|that|there\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It seems that sometimes fits better in this context. Please check.',
        suggestions: ["sometimes"],
      });
    }
    
    return issues;
  },
};
