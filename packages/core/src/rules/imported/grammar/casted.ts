import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * casted (cast)
 * 
 * Source: LanguageTool (CASTED)
 * Category: grammar
 */
export const castedRule: GrammarRule = {
  id: 'casted',
  name: 'casted (cast)',
  description: 'The past tense and past participle of the verb \"cast\" is cast.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcasted\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The past tense and past participle of the verb \"cast\" is cast.',
        suggestions: ["cast"],
      });
    }
    
    return issues;
  },
};
