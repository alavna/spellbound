import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * there for (therefore)
 * 
 * Source: LanguageTool (THERE_FOR)
 * Category: grammar
 */
export const thereForRule: GrammarRule = {
  id: 'there-for',
  name: 'there for (therefore)',
  description: 'Did you mean therefore?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthere\b\s+\bfor\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean therefore?',
        suggestions: ["therefore"],
      });
    }
    
    return issues;
  },
};
