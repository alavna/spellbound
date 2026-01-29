import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * LinkedIn
 * 
 * Source: LanguageTool (LINKEDIN)
 * Category: grammar
 */
export const linkedinRule: GrammarRule = {
  id: 'linkedin',
  name: 'LinkedIn',
  description: 'The name of this social business platform is spelled with a capital \"I\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bLinkedin|linked[Ii]n\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The name of this social business platform is spelled with a capital \"I\".',
        suggestions: ["LinkedIn"],
      });
    }
    
    return issues;
  },
};
