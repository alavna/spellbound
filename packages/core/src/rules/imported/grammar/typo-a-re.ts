import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * There a re (are) a few items missing
 * 
 * Source: LanguageTool (TYPO_A_RE)
 * Category: grammar
 */
export const typoAReRule: GrammarRule = {
  id: 'typo-a-re',
  name: 'There a re (are) a few items missing',
  description: 'Possible typo detected: Did you mean to write \'are\'?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ba\b\s+\bre\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Possible typo detected: Did you mean to write \'are\'?',
        suggestions: ["are"],
      });
    }
    
    return issues;
  },
};
