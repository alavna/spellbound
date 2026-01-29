import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * cumber some (cumbersome)
 * 
 * Source: LanguageTool (CUMBER_SOME)
 * Category: grammar
 */
export const cumberSomeRule: GrammarRule = {
  id: 'cumber-some',
  name: 'cumber some (cumbersome)',
  description: 'Did you mean the adjective cumbersome?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcumber\b\s+\bsome?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the adjective cumbersome?',
        suggestions: ["cumbersome"],
      });
    }
    
    return issues;
  },
};
