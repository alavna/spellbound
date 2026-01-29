import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * it's is (it is)
 * 
 * Source: LanguageTool (ITS_IS)
 * Category: grammar
 */
export const itsIsRule: GrammarRule = {
  id: 'its-is',
  name: 'it\'s is (it is)',
  description: 'Did you mean \\3?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwhat|it|who|she|he|there|that|w?here\b\s+'s\b\s+\bis|was\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\3?',
        suggestions: ["\\3"],
      });
    }
    
    return issues;
  },
};
