import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * he wasent (wasn't)
 * 
 * Source: LanguageTool (WASENT)
 * Category: grammar
 */
export const wasentRule: GrammarRule = {
  id: 'wasent',
  name: 'he wasent (wasn\'t)',
  description: 'Typo detected. Did you mean wasn\'t?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwas[ie]nt\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Typo detected. Did you mean wasn\'t?',
        suggestions: ["wasn't"],
      });
    }
    
    return issues;
  },
};
