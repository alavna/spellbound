import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * through out (throughout)
 * 
 * Source: LanguageTool (THROUGH_OUT)
 * Category: grammar
 */
export const throughOutRule: GrammarRule = {
  id: 'through-out',
  name: 'through out (throughout)',
  description: 'Did you mean throughout?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthrough\b\s+\bout\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean throughout?',
        suggestions: ["throughout"],
      });
    }
    
    return issues;
  },
};
