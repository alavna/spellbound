import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * marriage (wedding) anniversary
 * 
 * Source: LanguageTool (MARRIAGE_ANNIVERSARY)
 * Category: grammar
 */
export const marriageAnniversaryRule: GrammarRule = {
  id: 'marriage-anniversary',
  name: 'marriage (wedding) anniversary',
  description: 'Wedding anniversaries are the proper term to describe the anniversary of the day of a wedding.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmarriage\b\s+\banniversary\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Wedding anniversaries are the proper term to describe the anniversary of the day of a wedding.',
        suggestions: ["wedding"],
      });
    }
    
    return issues;
  },
};
