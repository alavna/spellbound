import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'in ear'
 * 
 * Source: LanguageTool (IN_EAR_HYPHEN)
 * Category: grammar
 */
export const inEarHyphenRule: GrammarRule = {
  id: 'in-ear-hyphen',
  name: 'missing hyphen in \'in ear\'',
  description: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\bear\b\s+\bbuds?|noise|noise\.?cancel.*|bluetooth|translators?|headsets?|earbuds?|apple|placement|versions?|(head|ear)phones?|monitors?|eegs?|monitoring|wireless|samsung|airpods?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
