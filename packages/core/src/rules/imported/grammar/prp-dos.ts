import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * he dos (does)
 * 
 * Source: LanguageTool (PRP_DOS)
 * Category: grammar
 */
export const prpDosRule: GrammarRule = {
  id: 'prp-dos',
  name: 'he dos (does)',
  description: 'Did you mean does (= verb)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bs?he|it\b\s+\S+\s+\bdos\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean does (= verb)?',
        suggestions: ["does"],
      });
    }
    
    return issues;
  },
};
