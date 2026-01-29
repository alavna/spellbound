import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * no comma in 'reason, why'
 * 
 * Source: LanguageTool (REASON_WHY_NO_COMMA)
 * Category: grammar
 */
export const reasonWhyNoCommaRule: GrammarRule = {
  id: 'reason-why-no-comma',
  name: 'no comma in \'reason, why\'',
  description: 'It appears that a comma in \"\\2 \\4\" is not needed.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\breasons?\s+,\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that a comma in \"\\2 \\4\" is not needed.',
        suggestions: ["\\4"],
      });
    }
    
    return issues;
  },
};
