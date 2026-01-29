import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Compound adjective: fly by night
 * 
 * Source: LanguageTool (CA_FLY_BY_NIGHT)
 * Category: grammar
 */
export const caFlyByNightRule: GrammarRule = {
  id: 'ca-fly-by-night',
  name: 'Compound adjective: fly by night',
  description: '\'\\1 \\2 \\3\' seems to be a compound adjective before a noun. Use a hyphen: \\1-\\2-\\3.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfly\b\s+\bby\b\s+\bnight\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\'\\1 \\2 \\3\' seems to be a compound adjective before a noun. Use a hyphen: \\1-\\2-\\3.',
        suggestions: ["\\1-\\2-\\3"],
      });
    }
    
    return issues;
  },
};
