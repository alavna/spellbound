import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'anti-Semitism'
 * 
 * Source: LanguageTool (ANTI_AMERICAN_HYPHEN)
 * Category: grammar
 */
export const antiAmericanHyphenRule: GrammarRule = {
  id: 'anti-american-hyphen',
  name: 'missing hyphen in \'anti-Semitism\'',
  description: 'This expression is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\banti\b\s+\bSemitism|Semitic|American|Americanism\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This expression is usually spelled with a hyphen.',
        suggestions: ["anti-"],
      });
    }
    
    return issues;
  },
};
