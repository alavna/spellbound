import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * anymore (any more)
 * 
 * Source: LanguageTool (ANYMORE)
 * Category: grammar
 */
export const anymoreRule: GrammarRule = {
  id: 'anymore',
  name: 'anymore (any more)',
  description: 'In British English, the spelling \'\\1\' is sometimes considered incorrect. Did you mean any more?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\banymore\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In British English, the spelling \'\\1\' is sometimes considered incorrect. Did you mean any more?',
        suggestions: ["any more"],
      });
    }
    
    return issues;
  },
};
