import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * TL DR (TL;DR)
 * 
 * Source: LanguageTool (TL_DR)
 * Category: grammar
 */
export const tlDrRule: GrammarRule = {
  id: 'tl-dr',
  name: 'TL DR (TL;DR)',
  description: 'Did you mean the internet acronym TL;DR or TLDR (short for \"Too Long; Didn\'t Read\")?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btl|TL\b\s+\bdr|DR\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the internet acronym TL;DR or TLDR (short for \"Too Long; Didn\'t Read\")?',
        suggestions: ["TL;DR","TLDR"],
      });
    }
    
    return issues;
  },
};
