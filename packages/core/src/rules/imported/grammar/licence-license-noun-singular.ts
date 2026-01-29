import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * License/Licence (noun)
 * 
 * Source: LanguageTool (LICENCE_LICENSE_NOUN_SINGULAR)
 * Category: grammar
 */
export const licenceLicenseNounSingularRule: GrammarRule = {
  id: 'licence-license-noun-singular',
  name: 'License/Licence (noun)',
  description: 'must be spelled with a \"c\" when used as a noun in British English. Use licence.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\blicense\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'must be spelled with a \"c\" when used as a noun in British English. Use licence.',
        suggestions: ["licence"],
      });
    }
    
    return issues;
  },
};
