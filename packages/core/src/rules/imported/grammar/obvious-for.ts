import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Wrong preposition: 'obvious for' (obvious to)
 * 
 * Source: LanguageTool (OBVIOUS_FOR)
 * Category: grammar
 */
export const obviousForRule: GrammarRule = {
  id: 'obvious-for',
  name: 'Wrong preposition: \'obvious for\' (obvious to)',
  description: 'The adjective \'\\1\' is normally used with \'to\'.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bobvious\b\s+\bfor\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adjective \'\\1\' is normally used with \'to\'.',
        suggestions: ["\\1 to \\3"],
      });
    }
    
    return issues;
  },
};
