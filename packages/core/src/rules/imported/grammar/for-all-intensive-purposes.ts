import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * for all intensive purposes (for all intents and purposes)
 * 
 * Source: LanguageTool (FOR_ALL_INTENSIVE_PURPOSES)
 * Category: grammar
 */
export const forAllIntensivePurposesRule: GrammarRule = {
  id: 'for-all-intensive-purposes',
  name: 'for all intensive purposes (for all intents and purposes)',
  description: 'Did you mean \\1 all intents and purposes?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfor|to\b\s+\ball\b\s+\bintens(iv)?e\b\s+\bpurposes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 all intents and purposes?',
        suggestions: ["\\1 all intents and purposes"],
      });
    }
    
    return issues;
  },
};
