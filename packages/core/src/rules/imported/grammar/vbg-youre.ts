import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * VBG you're (your)
 * 
 * Source: LanguageTool (VBG_YOURE)
 * Category: grammar
 */
export const vbgYoureRule: GrammarRule = {
  id: 'vbg-youre',
  name: 'VBG you\'re (your)',
  description: 'Did you mean your?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byou\b\s+'re\b/gi;
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
