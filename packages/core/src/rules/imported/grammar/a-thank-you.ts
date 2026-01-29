import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * a/the + thank you
 * 
 * Source: LanguageTool (A_THANK_YOU)
 * Category: grammar
 */
export const aThankYouRule: GrammarRule = {
  id: 'a-thank-you',
  name: 'a/the + thank you',
  description: 'It appears that \'thank you\' is missing a hyphen or needs to be quoted.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ban\.\.the\.that\.which\.this\.those\.my\.his\.her\.their\.our\.your\.s\b\s+\S+\s+\bthank\b\s+\byou\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that \'thank you\' is missing a hyphen or needs to be quoted.',
        suggestions: ["thank-you","“Thank You”"],
      });
    }
    
    return issues;
  },
};
