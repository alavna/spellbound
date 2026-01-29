import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * intensive purposes (intents and purposes)
 * 
 * Source: LanguageTool (INTENSIVE_PURPOSES)
 * Category: grammar
 */
export const intensivePurposesRule: GrammarRule = {
  id: 'intensive-purposes',
  name: 'intensive purposes (intents and purposes)',
  description: 'Did you mean intents and \\3?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ball\b\s+\bintensive\b\s+\bpurposes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean intents and \\3?',
        suggestions: ["intents and \\3"],
      });
    }
    
    return issues;
  },
};
