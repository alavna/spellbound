import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * working (work in) progress
 * 
 * Source: LanguageTool (WORKING_PROGRESS)
 * Category: grammar
 */
export const workingProgressRule: GrammarRule = {
  id: 'working-progress',
  name: 'working (work in) progress',
  description: 'Did you mean work in progress?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bworking\b\s+\bprogress\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean work in progress?',
        suggestions: ["work in progress"],
      });
    }
    
    return issues;
  },
};
