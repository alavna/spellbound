import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Starting sentence with 'The truth/fact is'.
 * 
 * Source: LanguageTool (THE_TRUTH_OR_FACT_IS)
 * Category: style
 */
export const theTruthOrFactIsRule: GrammarRule = {
  id: 'the-truth-or-fact-is',
  name: 'Starting sentence with \'The truth/fact is\'.',
  description: 'Remove. Just say what the truth or fact is.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bThe\b\s+\btruth|fact\b\s+\bis\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Remove. Just say what the truth or fact is.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
