import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * formally known as (formerly known as)
 * 
 * Source: LanguageTool (FORMALLY_KNOWN_AS)
 * Category: grammar
 */
export const formallyKnownAsRule: GrammarRule = {
  id: 'formally-known-as',
  name: 'formally known as (formerly known as)',
  description: 'Did you mean formerly \\2 \\3 (=known earlier under the name of)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bformally\b\s+\bknown\b\s+\bas\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean formerly \\2 \\3 (=known earlier under the name of)?',
        suggestions: ["formerly \\2 \\3"],
      });
    }
    
    return issues;
  },
};
