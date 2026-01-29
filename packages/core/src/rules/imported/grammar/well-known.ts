import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * is well know
 * 
 * Source: LanguageTool (WELL_KNOWN)
 * Category: grammar
 */
export const wellKnownRule: GrammarRule = {
  id: 'well-known',
  name: 'is well know',
  description: 'Did you mean well-known?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\S+\s+\bwell\b\s+\bknow\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean well-known?',
        suggestions: ["well-known"],
      });
    }
    
    return issues;
  },
};
