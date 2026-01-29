import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * spinal chord (cord)
 * 
 * Source: LanguageTool (SPINAL_CHORD)
 * Category: grammar
 */
export const spinalChordRule: GrammarRule = {
  id: 'spinal-chord',
  name: 'spinal chord (cord)',
  description: 'Did you mean \\1 ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bspinal|vocal|umbilical|electrical\b\s+\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 ?',
        suggestions: ["\\1"],
      });
    }
    
    return issues;
  },
};
