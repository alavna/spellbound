import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * on the same token (by the same token)
 * 
 * Source: LanguageTool (ON_THE_SAME_TOKEN)
 * Category: grammar
 */
export const onTheSameTokenRule: GrammarRule = {
  id: 'on-the-same-token',
  name: 'on the same token (by the same token)',
  description: 'Did you mean by the same token?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bon\b\s+\bthe\b\s+\bsame\b\s+\btoken\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean by the same token?',
        suggestions: ["by the same token"],
      });
    }
    
    return issues;
  },
};
