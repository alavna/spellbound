import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * as a matter of fact (in fact, actually, omit) 
 * 
 * Source: LanguageTool (AS_A_MATTER_OF_FACT)
 * Category: style
 */
export const asAMatterOfFactRule: GrammarRule = {
  id: 'as-a-matter-of-fact',
  name: 'as a matter of fact (in fact, actually, omit) ',
  description: 'Replace with less wordy in fact or actually, or remove completely.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bas\b\s+\ba\b\s+\bmatter\b\s+\bof\b\s+\bfact\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Replace with less wordy in fact or actually, or remove completely.',
        suggestions: ["in fact","actually"],
      });
    }
    
    return issues;
  },
};
