import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * tattle-tail (tattle-tale)
 * 
 * Source: LanguageTool (TATTLE-TAIL)
 * Category: grammar
 */
export const tattleTailRule: GrammarRule = {
  id: 'tattle-tail',
  name: 'tattle-tail (tattle-tale)',
  description: 'Did you mean tattle-tale?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btattle-tail\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean tattle-tale?',
        suggestions: ["tattle-tale"],
      });
    }
    
    return issues;
  },
};
