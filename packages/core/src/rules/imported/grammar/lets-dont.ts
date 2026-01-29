import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * let's don't (let's not)
 * 
 * Source: LanguageTool (LETS_DONT)
 * Category: grammar
 */
export const letsDontRule: GrammarRule = {
  id: 'lets-dont',
  name: 'let\'s don\'t (let\'s not)',
  description: 'This usage of \'let\' is nonstandard.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\blet\b\s+'s\b\s+\bdo\b\s+\bn't\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This usage of \'let\' is nonstandard.',
        suggestions: ["\\1\\2 not"],
      });
    }
    
    return issues;
  },
};
