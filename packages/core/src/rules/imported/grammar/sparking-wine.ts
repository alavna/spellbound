import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * sparking (sparkling) wine
 * 
 * Source: LanguageTool (SPARKING_WINE)
 * Category: grammar
 */
export const sparkingWineRule: GrammarRule = {
  id: 'sparking-wine',
  name: 'sparking (sparkling) wine',
  description: 'Possible typo. Did you mean sparkling \\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsparking\b\s+\bwines?|water\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Possible typo. Did you mean sparkling \\2?',
        suggestions: ["sparkling \\2"],
      });
    }
    
    return issues;
  },
};
