import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * We need control of all process(es)
 * 
 * Source: LanguageTool (OF_ALL_PLURAL)
 * Category: grammar
 */
export const ofAllPluralRule: GrammarRule = {
  id: 'of-all-plural',
  name: 'We need control of all process(es)',
  description: 'With the quantifier \'all\', the plural form may be more appropriate here.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bof\b\s+\ball\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'With the quantifier \'all\', the plural form may be more appropriate here.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
