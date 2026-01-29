import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * bar keeper (barkeeper)
 * 
 * Source: LanguageTool (KEEPER_COMPOUNDS)
 * Category: grammar
 */
export const keeperCompoundsRule: GrammarRule = {
  id: 'keeper-compounds',
  name: 'bar keeper (barkeeper)',
  description: 'This noun is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bgrounds|greens|house|peace|score|store|green|stock|goal|gate|shop|game|time|door|lock|book|inn|bee|zoo|bar\b\s+\bkeepers?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This noun is normally spelled as one word.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
