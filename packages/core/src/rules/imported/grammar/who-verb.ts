import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Who + verb (who know's/knows)
 * 
 * Source: LanguageTool (WHO_VERB)
 * Category: grammar
 */
export const whoVerbRule: GrammarRule = {
  id: 'who-verb',
  name: 'Who + verb (who know\'s/knows)',
  description: 'Did you mean \\1 \\2s?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwho\b\s+'s\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 \\2s?',
        suggestions: ["\\1 \\2s"],
      });
    }
    
    return issues;
  },
};
