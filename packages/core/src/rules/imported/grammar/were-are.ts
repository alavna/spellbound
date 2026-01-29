import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * were are (we are)
 * 
 * Source: LanguageTool (WERE_ARE)
 * Category: grammar
 */
export const wereAreRule: GrammarRule = {
  id: 'were-are',
  name: 'were are (we are)',
  description: 'Did you mean are?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwe|they|who|you\b\s+'re\b\s+\bare\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean are?',
        suggestions: ["are"],
      });
    }
    
    return issues;
  },
};
