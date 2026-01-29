import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * look (lock) the door
 * 
 * Source: LanguageTool (LOOK_DOOR)
 * Category: grammar
 */
export const lookDoorRule: GrammarRule = {
  id: 'look-door',
  name: 'look (lock) the door',
  description: 'Possible typo: Did you mean ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\blook(s|ed|ing)?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Possible typo: Did you mean ?',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
