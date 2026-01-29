import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * relieve vs relief
 * 
 * Source: LanguageTool (RELIEVE_RELIEF)
 * Category: grammar
 */
export const relieveReliefRule: GrammarRule = {
  id: 'relieve-relief',
  name: 'relieve vs relief',
  description: 'It appears the correct noun in this context is relief.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bin|of\b\s+\S+\s+\brelie?[fv]e|releaf|relift|releif\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears the correct noun in this context is relief.',
        suggestions: ["relief"],
      });
    }
    
    return issues;
  },
};
