import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Britney Spears misspellings
 * 
 * Source: LanguageTool (IT_S_BRITNEY)
 * Category: grammar
 */
export const itSBritneyRule: GrammarRule = {
  id: 'it-s-britney',
  name: 'Britney Spears misspellings',
  description: 'Are you referring to the musical artist Britney Spears?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbritt?any|brittney|brite?ny|britte?ny|briney|brinte?y|britanny|britine?y|britnet|britaney|britnay|brithney|brtiney|birtney|brintney|briteney|bitney|brittaney|brittnay|britey|brittiny|bre?tney|britneys|britne|brytney|breatney|britiany|britnney|britnry\b\s+\bspears\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Are you referring to the musical artist Britney Spears?',
        suggestions: ["Britney Spears"],
      });
    }
    
    return issues;
  },
};
