import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * that's you're (your)
 * 
 * Source: LanguageTool (THATS_YOURE)
 * Category: grammar
 */
export const thatsYoureRule: GrammarRule = {
  id: 'thats-youre',
  name: 'that\'s you\'re (your)',
  description: 'Did you mean your?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthat|it|who|what|s?he|there\b\s+\bis|'s\b\s+\byou\b\s+'re\b/gi;
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
