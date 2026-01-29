import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * crowd sourcing (crowdsourcing)
 * 
 * Source: LanguageTool (CROWD_SOURCING)
 * Category: grammar
 */
export const crowdSourcingRule: GrammarRule = {
  id: 'crowd-sourcing',
  name: 'crowd sourcing (crowdsourcing)',
  description: 'Did you mean crowdsourcing?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcrowd\b\s+\bsourcing\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean crowdsourcing?',
        suggestions: ["crowdsourcing"],
      });
    }
    
    return issues;
  },
};
