import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * first come, first serve(d)
 * 
 * Source: LanguageTool (FIRST_SERVED)
 * Category: grammar
 */
export const firstServedRule: GrammarRule = {
  id: 'first-served',
  name: 'first come, first serve(d)',
  description: 'Did you mean served (as in the idiom \'first come, first served\')?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfirst\b\s+\bcome\b\s+\bfirst\b\s+\bserve\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean served (as in the idiom \'first come, first served\')?',
        suggestions: ["served"],
      });
    }
    
    return issues;
  },
};
