import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * share holder (shareholder)
 * 
 * Source: LanguageTool (HOLDER_COMPOUNDS)
 * Category: grammar
 */
export const holderCompoundsRule: GrammarRule = {
  id: 'holder-compounds',
  name: 'share holder (shareholder)',
  description: 'This noun is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bpolicy|candle|share|stock|stake|house|title|place|slave|stadt|stall|lease|bond|card|land|copy|tool|key|cup\b\s+\bholders?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This noun is normally spelled as one word.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
