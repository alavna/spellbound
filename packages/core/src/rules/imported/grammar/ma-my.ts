import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ma vs my
 * 
 * Source: LanguageTool (MA_MY)
 * Category: grammar
 */
export const maMyRule: GrammarRule = {
  id: 'ma-my',
  name: 'ma vs my',
  description: 'Did you mean my?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Mm]a\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean my?',
        suggestions: ["my"],
      });
    }
    
    return issues;
  },
};
