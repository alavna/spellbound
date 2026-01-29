import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * let is (us) know
 * 
 * Source: LanguageTool (LET_IS_VB)
 * Category: grammar
 */
export const letIsVbRule: GrammarRule = {
  id: 'let-is-vb',
  name: 'let is (us) know',
  description: 'Did you mean us or it?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Ll]et\b\s+[Ii]s\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean us or it?',
        suggestions: ["us","it"],
      });
    }
    
    return issues;
  },
};
