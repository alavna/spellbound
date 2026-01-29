import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * smart phone (smartphone)
 * 
 * Source: LanguageTool (SMART_COMPOUNDS)
 * Category: grammar
 */
export const smartCompoundsRule: GrammarRule = {
  id: 'smart-compounds',
  name: 'smart phone (smartphone)',
  description: 'This is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsmart\b\s+\bwatch(es)?|grass(es)?|weeds?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This is normally spelled as one word.',
        suggestions: ["smart"],
      });
    }
    
    return issues;
  },
};
