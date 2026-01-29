import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Bayern vs Bavaria
 * 
 * Source: LanguageTool (BAYERN)
 * Category: grammar
 */
export const bayernRule: GrammarRule = {
  id: 'bayern',
  name: 'Bayern vs Bavaria',
  description: 'The English name for this German state is Bavaria.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbayern\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The English name for this German state is Bavaria.',
        suggestions: ["Bavaria"],
      });
    }
    
    return issues;
  },
};
