import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * worth (worse) than
 * 
 * Source: LanguageTool (WORTH_THAN)
 * Category: grammar
 */
export const worthThanRule: GrammarRule = {
  id: 'worth-than',
  name: 'worth (worse) than',
  description: 'Did you mean worse, the comparative of \'bad\'?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /(?!\bmore|less\b)\S+\s+\bworth\b\s+\bthan\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean worse, the comparative of \'bad\'?',
        suggestions: ["worse"],
      });
    }
    
    return issues;
  },
};
