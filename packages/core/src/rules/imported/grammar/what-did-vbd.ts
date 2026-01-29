import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * What did happened (happen)?
 * 
 * Source: LanguageTool (WHAT_DID_VBD)
 * Category: grammar
 */
export const whatDidVbdRule: GrammarRule = {
  id: 'what-did-vbd',
  name: 'What did happened (happen)?',
  description: 'The base form of the verb is expected after \"do\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /(what|who|when|which|where)(ever)?\s+\bdid|does\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The base form of the verb is expected after \"do\".',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
