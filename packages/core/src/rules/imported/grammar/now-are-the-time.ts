import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Now are (is) the time
 * 
 * Source: LanguageTool (NOW_ARE_THE_TIME)
 * Category: grammar
 */
export const nowAreTheTimeRule: GrammarRule = {
  id: 'now-are-the-time',
  name: 'Now are (is) the time',
  description: 'Did you mean is?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bnow\b\s+\bare\b\s+\S+\s+\S+\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean is?',
        suggestions: ["is"],
      });
    }
    
    return issues;
  },
};
