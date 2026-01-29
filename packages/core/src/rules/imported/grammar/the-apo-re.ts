import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * the're
 * 
 * Source: LanguageTool (THE_APO_RE)
 * Category: grammar
 */
export const theApoReRule: GrammarRule = {
  id: 'the-apo-re',
  name: 'the\'re',
  description: 'Did you mean they\\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe\b\s+'re\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean they\\2?',
        suggestions: ["they\\2"],
      });
    }
    
    return issues;
  },
};
