import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ground beef/minced beef
 * 
 * Source: LanguageTool (GROUND_VS_MINCED)
 * Category: grammar
 */
export const groundVsMincedRule: GrammarRule = {
  id: 'ground-vs-minced',
  name: 'ground beef/minced beef',
  description: 'The term \'\\1 \\2\' is common for American English. Did you mean minced \\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bground\b\s+\bbeef\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The term \'\\1 \\2\' is common for American English. Did you mean minced \\2?',
        suggestions: ["minced \\2"],
      });
    }
    
    return issues;
  },
};
