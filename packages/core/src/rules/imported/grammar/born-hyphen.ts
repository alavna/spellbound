import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Missing hyphen in 'An American born scientist'
 * 
 * Source: LanguageTool (BORN_HYPHEN)
 * Category: grammar
 */
export const bornHyphenRule: GrammarRule = {
  id: 'born-hyphen',
  name: 'Missing hyphen in \'An American born scientist\'',
  description: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bSaudi|American|German|French|Dutch|Ukrainian|Indian|Czech|Danish|Canadian|Mexican|Panamanian|Spanish|Russian|Polish|Irish|Italian|Austrian|Swiss|Belgium|Egyptian|Australian|Bahraini|English|Swedish|California|York|Cuban|Texas|Florida|Norwegian|Chinese|Scottish|Japanese|European|Asian|Brazilian|British|Portuguese|Iranian\b\s+\bborn\b/gi;
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
