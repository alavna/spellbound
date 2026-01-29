import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Kin (kind) regards
 * 
 * Source: LanguageTool (KIN_REGARDS)
 * Category: grammar
 */
export const kinRegardsRule: GrammarRule = {
  id: 'kin-regards',
  name: 'Kin (kind) regards',
  description: 'Did you mean kind \\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bkin|kid\b\s+\bregards|wishes|reminders?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean kind \\2?',
        suggestions: ["kind \\2"],
      });
    }
    
    return issues;
  },
};
