import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * lot's of (lots of)
 * 
 * Source: LanguageTool (LOT_S)
 * Category: grammar
 */
export const lotSRule: GrammarRule = {
  id: 'lot-s',
  name: 'lot\'s of (lots of)',
  description: 'Did you mean lots?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\blot\b\s+'s\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean lots?',
        suggestions: ["lots"],
      });
    }
    
    return issues;
  },
};
