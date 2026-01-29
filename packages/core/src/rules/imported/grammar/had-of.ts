import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * had of (had)
 * 
 * Source: LanguageTool (HAD_OF)
 * Category: grammar
 */
export const hadOfRule: GrammarRule = {
  id: 'had-of',
  name: 'had of (had)',
  description: 'It\'s never correct to use \'of\' after \'had\' to form a \'pluperfect\' tense. Use had.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhad\b\s+\bof\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It\'s never correct to use \'of\' after \'had\' to form a \'pluperfect\' tense. Use had.',
        suggestions: ["had"],
      });
    }
    
    return issues;
  },
};
