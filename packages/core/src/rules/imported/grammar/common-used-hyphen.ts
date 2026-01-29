import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * common (commonly) used
 * 
 * Source: LanguageTool (COMMON_USED_HYPHEN)
 * Category: grammar
 */
export const commonUsedHyphenRule: GrammarRule = {
  id: 'common-used-hyphen',
  name: 'common (commonly) used',
  description: 'In this context, the adverb commonly appears to be more likely.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcommon\b\s+(ab)?used|accepted|mistaken\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In this context, the adverb commonly appears to be more likely.',
        suggestions: ["commonly"],
      });
    }
    
    return issues;
  },
};
