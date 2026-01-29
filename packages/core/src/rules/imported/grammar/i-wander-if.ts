import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I wander (wonder) if
 * 
 * Source: LanguageTool (I_WANDER_IF)
 * Category: grammar
 */
export const iWanderIfRule: GrammarRule = {
  id: 'i-wander-if',
  name: 'I wander (wonder) if',
  description: 'Did you mean wonder?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bI\b\s+\bwander\b\s+\bif|whether\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean wonder?',
        suggestions: ["wonder"],
      });
    }
    
    return issues;
  },
};
