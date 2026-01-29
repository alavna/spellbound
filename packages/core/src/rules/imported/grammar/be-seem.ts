import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * can be seem (seen)
 * 
 * Source: LanguageTool (BE_SEEM)
 * Category: grammar
 */
export const beSeemRule: GrammarRule = {
  id: 'be-seem',
  name: 'can be seem (seen)',
  description: 'Did you mean seen, the past participle of the verb \"to see\"?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbe\b\s+\bseem\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean seen, the past participle of the verb \"to see\"?',
        suggestions: ["seen"],
      });
    }
    
    return issues;
  },
};
