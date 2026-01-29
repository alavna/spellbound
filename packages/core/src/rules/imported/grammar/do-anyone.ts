import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Do (Does) anyone
 * 
 * Source: LanguageTool (DO_ANYONE)
 * Category: grammar
 */
export const doAnyoneRule: GrammarRule = {
  id: 'do-anyone',
  name: 'Do (Does) anyone',
  description: 'Did you mean does \\4?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\S+\s+\bdo\b\s+(some|any)(one|body)/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean does \\4?',
        suggestions: ["does \\4"],
      });
    }
    
    return issues;
  },
};
