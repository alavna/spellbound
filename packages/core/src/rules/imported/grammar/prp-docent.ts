import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * he docent (doesn't)
 * 
 * Source: LanguageTool (PRP_DOCENT)
 * Category: grammar
 */
export const prpDocentRule: GrammarRule = {
  id: 'prp-docent',
  name: 'he docent (doesn\'t)',
  description: 'Did you mean \\1 doesn\'t instead of docent (= university teacher)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bs?he|it\b\s+\bdocent\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 doesn\'t instead of docent (= university teacher)?',
        suggestions: ["\\1 doesn't"],
      });
    }
    
    return issues;
  },
};
