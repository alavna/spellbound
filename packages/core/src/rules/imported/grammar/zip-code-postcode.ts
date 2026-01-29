import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * zip code/postcode
 * 
 * Source: LanguageTool (ZIP_CODE_POSTCODE)
 * Category: grammar
 */
export const zipCodePostcodeRule: GrammarRule = {
  id: 'zip-code-postcode',
  name: 'zip code/postcode',
  description: 'The term \'\\1 \\2\' is common for American English. Did you mean postcode?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bzip\b\s+\bcodes?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The term \'\\1 \\2\' is common for American English. Did you mean postcode?',
        suggestions: ["postcode"],
      });
    }
    
    return issues;
  },
};
