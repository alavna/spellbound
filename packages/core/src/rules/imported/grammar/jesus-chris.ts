import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Jesus Chris (Christ)
 * 
 * Source: LanguageTool (JESUS_CHRIS)
 * Category: grammar
 */
export const jesusChrisRule: GrammarRule = {
  id: 'jesus-chris',
  name: 'Jesus Chris (Christ)',
  description: 'Did you mean Jesus Christ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bJesus\b\s+\bChris|Criest\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Jesus Christ?',
        suggestions: ["Jesus Christ"],
      });
    }
    
    return issues;
  },
};
