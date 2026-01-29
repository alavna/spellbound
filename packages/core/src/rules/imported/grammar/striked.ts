import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * striked (struck)
 * 
 * Source: LanguageTool (STRIKED)
 * Category: grammar
 */
export const strikedRule: GrammarRule = {
  id: 'striked',
  name: 'striked (struck)',
  description: 'The past tense or the past participle of the verb \"to strike\" is struck.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bstriked\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The past tense or the past participle of the verb \"to strike\" is struck.',
        suggestions: ["struck"],
      });
    }
    
    return issues;
  },
};
