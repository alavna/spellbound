import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * tongue and (in) cheek
 * 
 * Source: LanguageTool (TONGUE_AND_CHEEK)
 * Category: grammar
 */
export const tongueAndCheekRule: GrammarRule = {
  id: 'tongue-and-cheek',
  name: 'tongue and (in) cheek',
  description: 'Did you mean tongue in cheek?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btongue\b\s+\band\b\s+\bcheek\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean tongue in cheek?',
        suggestions: ["tongue in cheek"],
      });
    }
    
    return issues;
  },
};
