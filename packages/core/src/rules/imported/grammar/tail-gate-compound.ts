import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * tail gate (tailgate)
 * 
 * Source: LanguageTool (TAIL_GATE_COMPOUND)
 * Category: grammar
 */
export const tailGateCompoundRule: GrammarRule = {
  id: 'tail-gate-compound',
  name: 'tail gate (tailgate)',
  description: 'This word is normally spelled as one.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btail\b\s+\bgate[ds]|gaters?|gating\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This word is normally spelled as one.',
        suggestions: ["tail"],
      });
    }
    
    return issues;
  },
};
