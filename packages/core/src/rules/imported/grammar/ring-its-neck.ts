import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ring (wring) its neck
 * 
 * Source: LanguageTool (RING_ITS_NECK)
 * Category: grammar
 */
export const ringItsNeckRule: GrammarRule = {
  id: 'ring-its-neck',
  name: 'ring (wring) its neck',
  description: 'Did you mean wring its neck?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bring\b\s+\bits\b\s+\bneck\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean wring its neck?',
        suggestions: ["wring its neck"],
      });
    }
    
    return issues;
  },
};
