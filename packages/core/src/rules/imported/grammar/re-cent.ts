import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * re cent (recent)
 * 
 * Source: LanguageTool (RE_CENT)
 * Category: grammar
 */
export const reCentRule: GrammarRule = {
  id: 're-cent',
  name: 're cent (recent)',
  description: 'Did you mean recent?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bre\b\s+\bcent\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean recent?',
        suggestions: ["recent"],
      });
    }
    
    return issues;
  },
};
