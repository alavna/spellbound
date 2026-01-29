import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * brain tissues (tissue)
 * 
 * Source: LanguageTool (BODY_TISSUE_UNCOUNTABLE)
 * Category: grammar
 */
export const bodyTissueUncountableRule: GrammarRule = {
  id: 'body-tissue-uncountable',
  name: 'brain tissues (tissue)',
  description: 'When talking about anatomy, \"tissue\" is an uncountable noun and therefore appears in the singular form.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\babdominal|adipose|brain|colon|cutaneous|glandular|intestinal|kidney|liver|lung|muscle|muscular|nerve|nervous|stomach|uterus|uterine\b\s+\btissues\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'When talking about anatomy, \"tissue\" is an uncountable noun and therefore appears in the singular form.',
        suggestions: ["tissue"],
      });
    }
    
    return issues;
  },
};
