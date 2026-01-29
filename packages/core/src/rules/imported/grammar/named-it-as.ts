import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * named it (as)
 * 
 * Source: LanguageTool (NAMED_IT_AS)
 * Category: grammar
 */
export const namedItAsRule: GrammarRule = {
  id: 'named-it-as',
  name: 'named it (as)',
  description: 'Consider skipping the word \"as\" here.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bnamed\b\s+\S+\s+[Aa]s\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider skipping the word \"as\" here.',
        suggestions: ["named \\2 \\4"],
      });
    }
    
    return issues;
  },
};
