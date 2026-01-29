import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * bu (by, bus, but)
 * 
 * Source: LanguageTool (BU)
 * Category: grammar
 */
export const buRule: GrammarRule = {
  id: 'bu',
  name: 'bu (by, bus, but)',
  description: 'Make sure that \'\\1\' is an abbreviation (bureau, bushel). Did you mean by, but, bug, or bus?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Bb]u\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Make sure that \'\\1\' is an abbreviation (bureau, bushel). Did you mean by, but, bug, or bus?',
        suggestions: ["by","but","bug","bus"],
      });
    }
    
    return issues;
  },
};
