import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * were're → we're
 * 
 * Source: LanguageTool (WERE_RE)
 * Category: grammar
 */
export const wereReRule: GrammarRule = {
  id: 'were-re',
  name: 'were\'re → we\'re',
  description: 'Did you mean we\\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwere\b\s+'re\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean we\\2?',
        suggestions: ["we\\2"],
      });
    }
    
    return issues;
  },
};
