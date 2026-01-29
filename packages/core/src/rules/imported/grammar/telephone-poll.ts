import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * telephone/... poll (pole)
 * 
 * Source: LanguageTool (TELEPHONE_POLL)
 * Category: grammar
 */
export const telephonePollRule: GrammarRule = {
  id: 'telephone-poll',
  name: 'telephone/... poll (pole)',
  description: 'Did you mean pole?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btele(phone|graph)|totem\b\s+\bpoll\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean pole?',
        suggestions: ["pole"],
      });
    }
    
    return issues;
  },
};
