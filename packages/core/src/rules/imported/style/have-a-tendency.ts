import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * have a tendency (tends)
 * 
 * Source: LanguageTool (HAVE_A_TENDENCY)
 * Category: style
 */
export const haveATendencyRule: GrammarRule = {
  id: 'have-a-tendency',
  name: 'have a tendency (tends)',
  description: 'Did you mean tends?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\ba\b\s+\btendency\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean tends?',
        suggestions: ["tends"],
      });
    }
    
    return issues;
  },
};
