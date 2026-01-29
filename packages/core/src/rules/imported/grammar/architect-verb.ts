import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Architect as a verb
 * 
 * Source: LanguageTool (ARCHITECT_VERB)
 * Category: grammar
 */
export const architectVerbRule: GrammarRule = {
  id: 'architect-verb',
  name: 'Architect as a verb',
  description: 'Architect is a noun, not a verb. Did you mean design or devise?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bto\b\s+\barchitect\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Architect is a noun, not a verb. Did you mean design or devise?',
        suggestions: ["design","devise"],
      });
    }
    
    return issues;
  },
};
