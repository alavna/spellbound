import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * meta data (metadata)
 * 
 * Source: LanguageTool (META_DATA)
 * Category: grammar
 */
export const metaDataRule: GrammarRule = {
  id: 'meta-data',
  name: 'meta data (metadata)',
  description: 'Did you mean metadata?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmeta\b\s+\bdata\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean metadata?',
        suggestions: ["metadata"],
      });
    }
    
    return issues;
  },
};
