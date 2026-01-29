import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * on off (on-off)
 * 
 * Source: LanguageTool (ON_OFF_HYPHEN)
 * Category: grammar
 */
export const onOffHyphenRule: GrammarRule = {
  id: 'on-off-hyphen',
  name: 'on off (on-off)',
  description: 'The adjective \\1-\\2 is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bon\b\s+\boff\b\s+\brelationships?|switch(es)?|affairs?|patterns?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adjective \\1-\\2 is spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
