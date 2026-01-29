import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * O Connor (O'Connor)
 * 
 * Source: LanguageTool (O_CONNOR)
 * Category: grammar
 */
export const oConnorRule: GrammarRule = {
  id: 'o-connor',
  name: 'O Connor (O\'Connor)',
  description: 'Did you mean the surname O\' or the interjection \\1h, ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bO\b\s+\bConor|Connor|Neill?|Brien|Brian|[DC]onnell|Casey|Carroll|Doherty|Donovan|Keeff?e|Kelly|Leary|Reilly|Shea|Kennedy|Rourke|Toole|Flaherty|Hanlon\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the surname O\' or the interjection \\1h, ?',
        suggestions: ["O'","\\1h,"],
      });
    }
    
    return issues;
  },
};
