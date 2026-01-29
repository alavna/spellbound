import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * the and
 * 
 * Source: LanguageTool (THE_CC)
 * Category: grammar
 */
export const theCcRule: GrammarRule = {
  id: 'the-cc',
  name: 'the and',
  description: 'It appears that a noun is missing after \"\\1\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Tt]he\b\s+\bif|since|and|or|because|but|although\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a noun is missing after \"\\1\".',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
