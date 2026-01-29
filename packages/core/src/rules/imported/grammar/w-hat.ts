import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * w hat (what)
 * 
 * Source: LanguageTool (W_HAT)
 * Category: grammar
 */
export const wHatRule: GrammarRule = {
  id: 'w-hat',
  name: 'w hat (what)',
  description: 'Did you mean \\1\\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[tw]\s+\bh(at|is|ere)/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1\\2?',
        suggestions: ["\\1\\2"],
      });
    }
    
    return issues;
  },
};
