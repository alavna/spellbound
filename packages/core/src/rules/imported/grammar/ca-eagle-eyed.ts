import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Compound adjective: eagle eyed
 * 
 * Source: LanguageTool (CA_EAGLE_EYED)
 * Category: grammar
 */
export const caEagleEyedRule: GrammarRule = {
  id: 'ca-eagle-eyed',
  name: 'Compound adjective: eagle eyed',
  description: '\'\\1 \\2\' seems to be a compound adjective before a noun. Use a hyphen: \\1-\\2.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\beagle\b\s+\beyed\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\'\\1 \\2\' seems to be a compound adjective before a noun. Use a hyphen: \\1-\\2.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
