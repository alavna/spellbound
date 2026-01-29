import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * number + (th, nd, st, rd)
 * 
 * Source: LanguageTool (CD_TH)
 * Category: grammar
 */
export const cdThRule: GrammarRule = {
  id: 'cd-th',
  name: 'number + (th, nd, st, rd)',
  description: 'Did you mean \\1\\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\d{1,2}\s+\bth|nd|st|rd\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1\\2?',
        suggestions: ["\\1\\2"],
      });
    }
    
    return issues;
  },
};
