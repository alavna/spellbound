import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * some how (somehow)
 * 
 * Source: LanguageTool (SOME_HOW)
 * Category: grammar
 */
export const someHowRule: GrammarRule = {
  id: 'some-how',
  name: 'some how (somehow)',
  description: 'Did you mean somehow?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsome\b\s+\bhow\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean somehow?',
        suggestions: ["somehow"],
      });
    }
    
    return issues;
  },
};
