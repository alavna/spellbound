import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * out of sink (sync)
 * 
 * Source: LanguageTool (OUT_OF_SINK)
 * Category: grammar
 */
export const outOfSinkRule: GrammarRule = {
  id: 'out-of-sink',
  name: 'out of sink (sync)',
  description: 'Did you mean out of sync?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bout\b\s+\bof\b\s+\bsink\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean out of sync?',
        suggestions: ["out of sync"],
      });
    }
    
    return issues;
  },
};
