import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * free lance (freelance)
 * 
 * Source: LanguageTool (FREE_LANCE)
 * Category: grammar
 */
export const freeLanceRule: GrammarRule = {
  id: 'free-lance',
  name: 'free lance (freelance)',
  description: 'Did you mean freelance?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfree\b\s+\blance\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean freelance?',
        suggestions: ["freelance"],
      });
    }
    
    return issues;
  },
};
