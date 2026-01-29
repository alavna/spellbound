import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in '2 month cycle'
 * 
 * Source: LanguageTool (YEAR_HYPHEN)
 * Category: grammar
 */
export const yearHyphenRule: GrammarRule = {
  id: 'year-hyphen',
  name: 'missing hyphen in \'2 month cycle\'',
  description: 'When a time span like \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\byear\b\s+\S+\s+\bhalts?|routine|periods?|intervals?|cycles?|notice|plan|project|warranty|median|reign|span|sentences?|mortgages?|anniversar(y|ies)|refinance|milestones?|loans?|treat(y|ies)|history|battle|lease|hibernation|average|avg\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'When a time span like \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
