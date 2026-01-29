import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * dis (this)
 * 
 * Source: LanguageTool (DIS)
 * Category: style
 */
export const disRule: GrammarRule = {
  id: 'dis',
  name: 'dis (this)',
  description: 'Did you mean this?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Dd]is\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean this?',
        suggestions: ["this"],
      });
    }
    
    return issues;
  },
};
