import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * splitted (split)
 * 
 * Source: LanguageTool (SPLITTED)
 * Category: grammar
 */
export const splittedRule: GrammarRule = {
  id: 'splitted',
  name: 'splitted (split)',
  description: 'The past tense and past participle of the verb \"to split\" is split. Alternatively you could use separated or divided.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsplitted\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The past tense and past participle of the verb \"to split\" is split. Alternatively you could use separated or divided.',
        suggestions: ["split","separated","divided"],
      });
    }
    
    return issues;
  },
};
