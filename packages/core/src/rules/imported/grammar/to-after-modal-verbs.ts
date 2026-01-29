import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * to after modal verbs
 * 
 * Source: LanguageTool (TO_AFTER_MODAL_VERBS)
 * Category: grammar
 */
export const toAfterModalVerbsRule: GrammarRule = {
  id: 'to-after-modal-verbs',
  name: 'to after modal verbs',
  description: 'Modal verbs like \'\' are typically followed directly by the bare infinitive. Did you mean \\1 \\3?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcan\.could\.may\.should\.shall\b\s+\bto\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Modal verbs like \'\' are typically followed directly by the bare infinitive. Did you mean \\1 \\3?',
        suggestions: ["\\1 \\3"],
      });
    }
    
    return issues;
  },
};
