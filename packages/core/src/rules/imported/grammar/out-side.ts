import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * out side (outside)
 * 
 * Source: LanguageTool (OUT_SIDE)
 * Category: grammar
 */
export const outSideRule: GrammarRule = {
  id: 'out-side',
  name: 'out side (outside)',
  description: 'Did you mean outside?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bout\b\s+\bside\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean outside?',
        suggestions: ["outside"],
      });
    }
    
    return issues;
  },
};
