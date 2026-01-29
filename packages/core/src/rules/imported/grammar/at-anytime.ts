import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * at anytime (any time)
 * 
 * Source: LanguageTool (AT_ANYTIME)
 * Category: grammar
 */
export const atAnytimeRule: GrammarRule = {
  id: 'at-anytime',
  name: 'at anytime (any time)',
  description: 'In this context, any time needs to be split into two words.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Aa]t\b\s+\banytime\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In this context, any time needs to be split into two words.',
        suggestions: ["any time"],
      });
    }
    
    return issues;
  },
};
