import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * We should hang out some time (sometime)
 * 
 * Source: LanguageTool (PHRASAL_VERB_SOMETIME)
 * Category: grammar
 */
export const phrasalVerbSometimeRule: GrammarRule = {
  id: 'phrasal-verb-sometime',
  name: 'We should hang out some time (sometime)',
  description: 'Instead of the noun phrase \'some time\', did you mean to use the adverb?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bsome\b\s+\btime\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Instead of the noun phrase \'some time\', did you mean to use the adverb?',
        suggestions: ["sometime"],
      });
    }
    
    return issues;
  },
};
