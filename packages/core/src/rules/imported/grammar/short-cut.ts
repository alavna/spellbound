import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * short cut (shortcut)
 * 
 * Source: LanguageTool (SHORT_CUT)
 * Category: grammar
 */
export const shortCutRule: GrammarRule = {
  id: 'short-cut',
  name: 'short cut (shortcut)',
  description: 'Did you mean short?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bshort\b\s+\bcuts?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean short?',
        suggestions: ["short"],
      });
    }
    
    return issues;
  },
};
