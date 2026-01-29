import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I thin (think)
 * 
 * Source: LanguageTool (I_THIN)
 * Category: grammar
 */
export const iThinRule: GrammarRule = {
  id: 'i-thin',
  name: 'I thin (think)',
  description: 'Did you mean think?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /(?!\bam|do|can|will\b)\S+\s+\bI\b\s+\bthin\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean think?',
        suggestions: ["think"],
      });
    }
    
    return issues;
  },
};
