import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Change two hyphens to em dash
 * 
 * Source: LanguageTool (TWO_HYPHENS)
 * Category: grammar
 */
export const twoHyphensRule: GrammarRule = {
  id: 'two-hyphens',
  name: 'Change two hyphens to em dash',
  description: 'Consider using an em dash (—) instead of \'--\'.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /-\s+-/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using an em dash (—) instead of \'--\'.',
        suggestions: ["—"],
      });
    }
    
    return issues;
  },
};
