import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Dos vs Does
 * 
 * Source: LanguageTool (DOS)
 * Category: grammar
 */
export const dosRule: GrammarRule = {
  id: 'dos',
  name: 'Dos vs Does',
  description: 'Did you mean the verb does?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Dd]os\b\s+\S+\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the verb does?',
        suggestions: ["does"],
      });
    }
    
    return issues;
  },
};
