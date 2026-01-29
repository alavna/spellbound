import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * sky diving (skydiving)
 * 
 * Source: LanguageTool (SKY_DIVING)
 * Category: grammar
 */
export const skyDivingRule: GrammarRule = {
  id: 'sky-diving',
  name: 'sky diving (skydiving)',
  description: 'Did you mean skydiving?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsky\b\s+\bdiving\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean skydiving?',
        suggestions: ["skydiving"],
      });
    }
    
    return issues;
  },
};
