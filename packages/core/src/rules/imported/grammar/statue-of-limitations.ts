import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * statue (statute) of limitations
 * 
 * Source: LanguageTool (STATUE_OF_LIMITATIONS)
 * Category: grammar
 */
export const statueOfLimitationsRule: GrammarRule = {
  id: 'statue-of-limitations',
  name: 'statue (statute) of limitations',
  description: 'Did you mean statute of limitations?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bstatue\b\s+\bof\b\s+\blimitations\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean statute of limitations?',
        suggestions: ["statute of limitations"],
      });
    }
    
    return issues;
  },
};
