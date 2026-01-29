import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * assist, assistance (help)
 * 
 * Source: LanguageTool (ASSIST_ASSISTANCE)
 * Category: style
 */
export const assistAssistanceRule: GrammarRule = {
  id: 'assist-assistance',
  name: 'assist, assistance (help)',
  description: 'Did you mean simpler help?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean simpler help?',
        suggestions: ["help"],
      });
    }
    
    return issues;
  },
};
