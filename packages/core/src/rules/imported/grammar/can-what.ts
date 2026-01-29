import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing verb (can what / can see what)
 * 
 * Source: LanguageTool (CAN_WHAT)
 * Category: grammar
 */
export const canWhatRule: GrammarRule = {
  id: 'can-what',
  name: 'missing verb (can what / can see what)',
  description: 'A verb may be missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcan|must|should\b\s+\bwh(at|o|ere|ich|ose|ether)|how\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'A verb may be missing.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
