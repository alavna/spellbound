import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * faired (fared) as well
 * 
 * Source: LanguageTool (FAIRED_AS_WELL)
 * Category: grammar
 */
export const fairedAsWellRule: GrammarRule = {
  id: 'faired-as-well',
  name: 'faired (fared) as well',
  description: 'Did you mean fared as well?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfaired\b\s+\bas\b\s+\bwell\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean fared as well?',
        suggestions: ["fared as well"],
      });
    }
    
    return issues;
  },
};
