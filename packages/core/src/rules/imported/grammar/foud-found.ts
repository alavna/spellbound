import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * foud vs found
 * 
 * Source: LanguageTool (FOUD_FOUND)
 * Category: grammar
 */
export const foudFoundRule: GrammarRule = {
  id: 'foud-found',
  name: 'foud vs found',
  description: 'Did you mean the verb found (= past tense of \"to find\")?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwe|they|you|it|s?he|I|have|ve|had|has|been|were|was|is|'s|am|'m|are|'re|be|can(not)?\s+[Ff]oud\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the verb found (= past tense of \"to find\")?',
        suggestions: ["found"],
      });
    }
    
    return issues;
  },
};
