import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Forest (Forrest) Gump
 * 
 * Source: LanguageTool (FORREST_GUMP)
 * Category: grammar
 */
export const forrestGumpRule: GrammarRule = {
  id: 'forrest-gump',
  name: 'Forest (Forrest) Gump',
  description: 'Did you mean the person Forrest ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bforest\b\s+\bgump|mars|griffin|tucker\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the person Forrest ?',
        suggestions: ["Forrest"],
      });
    }
    
    return issues;
  },
};
