import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * it drys (dries)
 * 
 * Source: LanguageTool (PRP_DRYS)
 * Category: grammar
 */
export const prpDrysRule: GrammarRule = {
  id: 'prp-drys',
  name: 'it drys (dries)',
  description: 'The word \"\\3\" is a plural noun. Did you mean the singular simple present verb dries?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bit|s?he|this|that\b\s+\S+\s+\bdrys\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \"\\3\" is a plural noun. Did you mean the singular simple present verb dries?',
        suggestions: ["dries"],
      });
    }
    
    return issues;
  },
};
