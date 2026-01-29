import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * near death (near-death)
 * 
 * Source: LanguageTool (NEAR_DEATH_HYPHEN)
 * Category: grammar
 */
export const nearDeathHyphenRule: GrammarRule = {
  id: 'near-death-hyphen',
  name: 'near death (near-death)',
  description: 'It appears that a hyphen is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bnear\b\s+\bdeath\b\s+\bexperiences?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a hyphen is missing.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
