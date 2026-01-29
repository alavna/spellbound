import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * stripped (striped)
 * 
 * Source: LanguageTool (STRIPPED_STRIPED)
 * Category: grammar
 */
export const strippedStripedRule: GrammarRule = {
  id: 'stripped-striped',
  name: 'stripped (striped)',
  description: 'Did you mean striped (= having stripes)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bstripped\b\s+\banimals?|dress(es)?|hyenas?|jackets?|marlins?|pants|pattern|pyjamas|socks|suits?|sweaters?|(T-)?shirts?|ties?|trousers?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean striped (= having stripes)?',
        suggestions: ["striped"],
      });
    }
    
    return issues;
  },
};
