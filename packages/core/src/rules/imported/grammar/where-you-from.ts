import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Where you from?
 * 
 * Source: LanguageTool (WHERE_YOU_FROM)
 * Category: grammar
 */
export const whereYouFromRule: GrammarRule = {
  id: 'where-you-from',
  name: 'Where you from?',
  description: 'This question appears to be missing a verb.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bwhere\b\s+\byou\b\s+\bat|from\b\s+\./gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This question appears to be missing a verb.',
        suggestions: ["\\2 are \\3 \\4\\5"],
      });
    }
    
    return issues;
  },
};
