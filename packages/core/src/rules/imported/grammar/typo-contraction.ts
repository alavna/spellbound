import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * isn'r (isn't)
 * 
 * Source: LanguageTool (TYPO_CONTRACTION)
 * Category: grammar
 */
export const typoContractionRule: GrammarRule = {
  id: 'typo-contraction',
  name: 'isn\'r (isn\'t)',
  description: 'Did you mean \\1\\2t?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcan|don|doesn|ha[ds]n|haven|[cw]ouldn|shouldn|wasn|weren|mustn|aren|isn\b\s+&apostrophe;\s+[a-z]/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1\\2t?',
        suggestions: ["\\1\\2t"],
      });
    }
    
    return issues;
  },
};
