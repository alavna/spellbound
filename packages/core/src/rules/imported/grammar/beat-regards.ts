import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * beat (best) regards
 * 
 * Source: LanguageTool (BEAT_REGARDS)
 * Category: grammar
 */
export const beatRegardsRule: GrammarRule = {
  id: 'beat-regards',
  name: 'beat (best) regards',
  description: 'Did you mean best?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbea?t\b\s+\bregards\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean best?',
        suggestions: ["best"],
      });
    }
    
    return issues;
  },
};
