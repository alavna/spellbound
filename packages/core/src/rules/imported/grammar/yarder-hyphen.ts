import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * a 42 yarder (42-yarder)
 * 
 * Source: LanguageTool (YARDER_HYPHEN)
 * Category: grammar
 */
export const yarderHyphenRule: GrammarRule = {
  id: 'yarder-hyphen',
  name: 'a 42 yarder (42-yarder)',
  description: 'It appears that a hyphen is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban?|the|another\b\s+\S+\s+\d+\s+\byarder\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a hyphen is missing.',
        suggestions: ["\\3-\\4"],
      });
    }
    
    return issues;
  },
};
