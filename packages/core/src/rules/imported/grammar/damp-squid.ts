import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * damp squid (squib)
 * 
 * Source: LanguageTool (DAMP_SQUID)
 * Category: grammar
 */
export const dampSquidRule: GrammarRule = {
  id: 'damp-squid',
  name: 'damp squid (squib)',
  description: 'Did you mean damp squib?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdamp\b\s+\bsquid\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean damp squib?',
        suggestions: ["damp squib"],
      });
    }
    
    return issues;
  },
};
