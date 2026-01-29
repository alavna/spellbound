import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * ease off (of) use
 * 
 * Source: LanguageTool (EASE_OFF_USE)
 * Category: grammar
 */
export const easeOffUseRule: GrammarRule = {
  id: 'ease-off-use',
  name: 'ease off (of) use',
  description: 'Did you mean of?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bease\b\s+\boff\b\s+\buse\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean of?',
        suggestions: ["of"],
      });
    }
    
    return issues;
  },
};
