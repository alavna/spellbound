import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Hellos (Hello)
 * 
 * Source: LanguageTool (HELLOS)
 * Category: grammar
 */
export const hellosRule: GrammarRule = {
  id: 'hellos',
  name: 'Hellos (Hello)',
  description: 'Did you mean Hello?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bHellos\b\s+\byou|,|world|folks|guys|friends?|again|kitty|mates|my|all|there|[A-Z][a-zäöü]+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Hello?',
        suggestions: ["Hello"],
      });
    }
    
    return issues;
  },
};
