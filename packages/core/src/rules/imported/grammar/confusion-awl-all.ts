import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * awl (all)
 * 
 * Source: LanguageTool (CONFUSION_AWL_ALL)
 * Category: grammar
 */
export const confusionAwlAllRule: GrammarRule = {
  id: 'confusion-awl-all',
  name: 'awl (all)',
  description: 'Did you mean all \\2 \\3?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bawl\b\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean all \\2 \\3?',
        suggestions: ["all \\2 \\3"],
      });
    }
    
    return issues;
  },
};
