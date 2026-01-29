import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * from X - Y (from X to Y)
 * 
 * Source: LanguageTool (FROM_X_Y)
 * Category: grammar
 */
export const fromXYRule: GrammarRule = {
  id: 'from-x-y',
  name: 'from X - Y (from X to Y)',
  description: 'Using a hyphen or dash in a “from … to …” expression is incorrect. Did you mean: to ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfrom\b\s+\.d\.\s+[\.–]\s+\.d\./gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Using a hyphen or dash in a “from … to …” expression is incorrect. Did you mean: to ?',
        suggestions: ["to"],
      });
    }
    
    return issues;
  },
};
