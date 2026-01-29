import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I was wandering (wondering) if
 * 
 * Source: LanguageTool (WAS_WANDERING_IF)
 * Category: grammar
 */
export const wasWanderingIfRule: GrammarRule = {
  id: 'was-wandering-if',
  name: 'I was wandering (wondering) if',
  description: 'Did you mean wondering?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bam|was|is|been\b\s+\bwandering\b\s+\bif|whether\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean wondering?',
        suggestions: ["wondering"],
      });
    }
    
    return issues;
  },
};
