import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * it's are (it is)
 * 
 * Source: LanguageTool (ITS_ARE)
 * Category: grammar
 */
export const itsAreRule: GrammarRule = {
  id: 'its-are',
  name: 'it\'s are (it is)',
  description: 'Did you mean \\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bit|she|he\b\s+'s\b\s+\bare|were\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\2?',
        suggestions: ["\\2"],
      });
    }
    
    return issues;
  },
};
