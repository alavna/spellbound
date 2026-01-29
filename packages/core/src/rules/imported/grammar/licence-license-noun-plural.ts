import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Licenses/Licences (noun)
 * 
 * Source: LanguageTool (LICENCE_LICENSE_NOUN_PLURAL)
 * Category: grammar
 */
export const licenceLicenseNounPluralRule: GrammarRule = {
  id: 'licence-license-noun-plural',
  name: 'Licenses/Licences (noun)',
  description: 'must be spelled with a \"c\" when used as a noun in British English. Use licences.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\blicenses\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'must be spelled with a \"c\" when used as a noun in British English. Use licences.',
        suggestions: ["licences"],
      });
    }
    
    return issues;
  },
};
