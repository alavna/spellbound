import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * hardwares → pieces of hardware
 * 
 * Source: LanguageTool (HARDWARES)
 * Category: grammar
 */
export const hardwaresRule: GrammarRule = {
  id: 'hardwares',
  name: 'hardwares → pieces of hardware',
  description: 'In standard English, the noun \"\\1\" is uncountable. Consider using an alternative.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhardwares\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In standard English, the noun \"\\1\" is uncountable. Consider using an alternative.',
        suggestions: ["pieces of hardware","hardware products","hardware modules"],
      });
    }
    
    return issues;
  },
};
