import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ask wether/weather (whether)
 * 
 * Source: LanguageTool (ASK_WETHER)
 * Category: grammar
 */
export const askWetherRule: GrammarRule = {
  id: 'ask-wether',
  name: 'ask wether/weather (whether)',
  description: 'Did you mean whether?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bwea?ther\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean whether?',
        suggestions: ["whether"],
      });
    }
    
    return issues;
  },
};
