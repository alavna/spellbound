import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Inconsistent case: She'S (She's)
 * 
 * Source: LanguageTool (APOSTROPHE_UPPERCASE_LETTER)
 * Category: grammar
 */
export const apostropheUppercaseLetterRule: GrammarRule = {
  id: 'apostrophe-uppercase-letter',
  name: 'Inconsistent case: She\'S (She\'s)',
  description: 'Inconsistent capitalization in contraction.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /'(S|D|Ve|VE|vE|rE|Re|RE|T|Ll|lL|LL)/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Inconsistent capitalization in contraction.',
        suggestions: ["\\1"],
      });
    }
    
    return issues;
  },
};
