import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * fare vs fair
 * 
 * Source: LanguageTool (FARE_FAIR)
 * Category: grammar
 */
export const fareFairRule: GrammarRule = {
  id: 'fare-fair',
  name: 'fare vs fair',
  description: 'Did you mean the adjective fair?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+(no)?t\b\s+\bfare\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the adjective fair?',
        suggestions: ["fair"],
      });
    }
    
    return issues;
  },
};
