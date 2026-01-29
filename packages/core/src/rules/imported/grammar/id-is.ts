import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * id vs is
 * 
 * Source: LanguageTool (ID_IS)
 * Category: grammar
 */
export const idIsRule: GrammarRule = {
  id: 'id-is',
  name: 'id vs is',
  description: 'Did you mean the verb is?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bid\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the verb is?',
        suggestions: ["is"],
      });
    }
    
    return issues;
  },
};
