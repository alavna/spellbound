import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Regarding to (regard to/regarding)
 * 
 * Source: LanguageTool (REGARDING_TO)
 * Category: grammar
 */
export const regardingToRule: GrammarRule = {
  id: 'regarding-to',
  name: 'Regarding to (regard to/regarding)',
  description: 'The phrase \'\\1 \\2\' is not correct. Use or regard .',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bregarding\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The phrase \'\\1 \\2\' is not correct. Use or regard .',
        suggestions: ["regard"],
      });
    }
    
    return issues;
  },
};
