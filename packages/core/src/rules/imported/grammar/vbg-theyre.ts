import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * VBG they're (their)
 * 
 * Source: LanguageTool (VBG_THEYRE)
 * Category: grammar
 */
export const vbgTheyreRule: GrammarRule = {
  id: 'vbg-theyre',
  name: 'VBG they\'re (their)',
  description: 'Did you mean their?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthey\b\s+'re\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean their?',
        suggestions: ["their"],
      });
    }
    
    return issues;
  },
};
