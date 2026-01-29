import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * with out (without)
 * 
 * Source: LanguageTool (WITH_OUT)
 * Category: grammar
 */
export const withOutRule: GrammarRule = {
  id: 'with-out',
  name: 'with out (without)',
  description: 'This word is usually spelled as one word. Did you mean without?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwith\b\s+\bout\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This word is usually spelled as one word. Did you mean without?',
        suggestions: ["without"],
      });
    }
    
    return issues;
  },
};
