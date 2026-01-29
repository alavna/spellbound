import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing 'be' in 'to able'
 * 
 * Source: LanguageTool (TO_ABLE)
 * Category: grammar
 */
export const toAbleRule: GrammarRule = {
  id: 'to-able',
  name: 'missing \'be\' in \'to able\'',
  description: 'Did you mean \\1 be \\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bto\b\s+(un)?able\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 be \\2?',
        suggestions: ["\\1 be \\2"],
      });
    }
    
    return issues;
  },
};
