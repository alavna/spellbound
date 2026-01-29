import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * chalk full (chock-full)
 * 
 * Source: LanguageTool (CHALK_FULL)
 * Category: grammar
 */
export const chalkFullRule: GrammarRule = {
  id: 'chalk-full',
  name: 'chalk full (chock-full)',
  description: 'Did you mean chock-full?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bchalk\b\s+\bfull\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean chock-full?',
        suggestions: ["chock-full"],
      });
    }
    
    return issues;
  },
};
