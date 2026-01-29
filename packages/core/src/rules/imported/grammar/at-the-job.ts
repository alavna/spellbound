import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Collocation: at/on the job
 * 
 * Source: LanguageTool (AT_THE_JOB)
 * Category: grammar
 */
export const atTheJobRule: GrammarRule = {
  id: 'at-the-job',
  name: 'Collocation: at/on the job',
  description: 'The usual collocation is on the job or at work.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe\b\s+\bjob\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The usual collocation is on the job or at work.',
        suggestions: ["on the job","at work"],
      });
    }
    
    return issues;
  },
};
