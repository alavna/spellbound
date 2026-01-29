import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * seas vs. sees
 * 
 * Source: LanguageTool (HE_SEAS)
 * Category: grammar
 */
export const heSeasRule: GrammarRule = {
  id: 'he-seas',
  name: 'seas vs. sees',
  description: 'Did you mean \\1 \\2 sees?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bs?he|it\b\s+\S+\s+\bseas\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 \\2 sees?',
        suggestions: ["\\1 \\2 sees"],
      });
    }
    
    return issues;
  },
};
