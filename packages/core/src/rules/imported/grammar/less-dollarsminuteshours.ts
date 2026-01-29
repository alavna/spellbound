import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * less (fewer) dollars
 * 
 * Source: LanguageTool (LESS_DOLLARSMINUTESHOURS)
 * Category: grammar
 */
export const lessDollarsminuteshoursRule: GrammarRule = {
  id: 'less-dollarsminuteshours',
  name: 'less (fewer) dollars',
  description: 'Did you mean fewer ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bless\b\s+\bdollars|minutes|hours|seconds|calories\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean fewer ?',
        suggestions: ["fewer"],
      });
    }
    
    return issues;
  },
};
