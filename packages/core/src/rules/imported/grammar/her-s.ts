import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * her's (here's)
 * 
 * Source: LanguageTool (HER_S)
 * Category: grammar
 */
export const herSRule: GrammarRule = {
  id: 'her-s',
  name: 'her\'s (here\'s)',
  description: 'Did you mean here\\3?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bher\b\s+'s\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean here\\3?',
        suggestions: ["here\\3"],
      });
    }
    
    return issues;
  },
};
