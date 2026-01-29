import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * bob/barb wire (barbed wire)
 * 
 * Source: LanguageTool (BOB_WIRE)
 * Category: grammar
 */
export const bobWireRule: GrammarRule = {
  id: 'bob-wire',
  name: 'bob/barb wire (barbed wire)',
  description: 'Did you mean barbed wire?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bb(o|ar)b\b\s+\bwire\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean barbed wire?',
        suggestions: ["barbed wire"],
      });
    }
    
    return issues;
  },
};
