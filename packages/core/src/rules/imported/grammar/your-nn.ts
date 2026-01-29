import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * your (you're)
 * 
 * Source: LanguageTool (YOUR_NN)
 * Category: grammar
 */
export const yourNnRule: GrammarRule = {
  id: 'your-nn',
  name: 'your (you\'re)',
  description: 'Did you mean your?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bno\b\s+'re\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean your?',
        suggestions: ["your"],
      });
    }
    
    return issues;
  },
};
