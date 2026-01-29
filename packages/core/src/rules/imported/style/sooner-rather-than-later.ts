import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * sooner rather than later (soon, now)
 * 
 * Source: LanguageTool (SOONER_RATHER_THAN_LATER)
 * Category: style
 */
export const soonerRatherThanLaterRule: GrammarRule = {
  id: 'sooner-rather-than-later',
  name: 'sooner rather than later (soon, now)',
  description: 'Try soon or now meaning sooner than expected.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsooner\b\s+\brather\b\s+\bthan\b\s+\blater\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Try soon or now meaning sooner than expected.',
        suggestions: ["soon","now","sooner than expected"],
      });
    }
    
    return issues;
  },
};
