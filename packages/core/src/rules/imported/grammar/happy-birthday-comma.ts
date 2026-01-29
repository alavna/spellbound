import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Happy Birthday (,) Peter
 * 
 * Source: LanguageTool (HAPPY_BIRTHDAY_COMMA)
 * Category: grammar
 */
export const happyBirthdayCommaRule: GrammarRule = {
  id: 'happy-birthday-comma',
  name: 'Happy Birthday (,) Peter',
  description: 'Consider putting a comma after the exclamatory statement.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bHappy\b\s+\bbirthday\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider putting a comma after the exclamatory statement.',
        suggestions: ["\\2 \\3 \\4,"],
      });
    }
    
    return issues;
  },
};
