import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * bare (bear) in mind
 * 
 * Source: LanguageTool (BARE_IN_MIND)
 * Category: grammar
 */
export const bareInMindRule: GrammarRule = {
  id: 'bare-in-mind',
  name: 'bare (bear) in mind',
  description: 'Did you mean bear in mind?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbare\b\s+\bin\b\s+\bmind\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean bear in mind?',
        suggestions: ["bear in mind"],
      });
    }
    
    return issues;
  },
};
