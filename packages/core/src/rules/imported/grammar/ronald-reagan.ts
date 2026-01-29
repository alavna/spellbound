import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Ronald Reagan
 * 
 * Source: LanguageTool (RONALD_REAGAN)
 * Category: grammar
 */
export const ronaldReaganRule: GrammarRule = {
  id: 'ronald-reagan',
  name: 'Ronald Reagan',
  description: 'Did you mean the former president of the US Ronald Reagan?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[DR]onald|Roland|President\b\s+\bR(a|ae|e)g[ea]n\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the former president of the US Ronald Reagan?',
        suggestions: ["Ronald Reagan"],
      });
    }
    
    return issues;
  },
};
