import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in 'call to action'
 * 
 * Source: LanguageTool (CALL_TO_ACTION_HYPHEN)
 * Category: grammar
 */
export const callToActionHyphenRule: GrammarRule = {
  id: 'call-to-action-hyphen',
  name: 'missing hyphen in \'call to action\'',
  description: 'It appears that two hyphens are missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcall\b\s+\bto\b\s+\baction\b\s+\bbuttons?|links?|strateg(y|ies)|marketing|overlays?|ads?|e?mail\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that two hyphens are missing.',
        suggestions: ["\\1-\\2-\\3"],
      });
    }
    
    return issues;
  },
};
