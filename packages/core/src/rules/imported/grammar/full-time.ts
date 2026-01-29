import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I'm working full(-)time
 * 
 * Source: LanguageTool (FULL_TIME)
 * Category: grammar
 */
export const fullTimeRule: GrammarRule = {
  id: 'full-time',
  name: 'I\'m working full(-)time',
  description: '\" time\" is usually hyphenated in this context.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfull|part\b\s+\btime\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\" time\" is usually hyphenated in this context.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
