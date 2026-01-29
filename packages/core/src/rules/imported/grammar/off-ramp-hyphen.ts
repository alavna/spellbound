import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * off ramp (off-ramp)
 * 
 * Source: LanguageTool (OFF_RAMP_HYPHEN)
 * Category: grammar
 */
export const offRampHyphenRule: GrammarRule = {
  id: 'off-ramp-hyphen',
  name: 'off ramp (off-ramp)',
  description: 'The noun \\3-\\4 is spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\S+\s+\boff\b\s+\bramp\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun \\3-\\4 is spelled with a hyphen.',
        suggestions: ["\\3-\\4"],
      });
    }
    
    return issues;
  },
};
