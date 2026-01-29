import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * can (do) anything for you
 * 
 * Source: LanguageTool (CAN_ANYTHING)
 * Category: grammar
 */
export const canAnythingRule: GrammarRule = {
  id: 'can-anything',
  name: 'can (do) anything for you',
  description: 'A verb may be missing. Did you mean \\2 do?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bif|when|once\b\s+\bcan|could\b\s+(some|any)thing\b\s+\bfor|to\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'A verb may be missing. Did you mean \\2 do?',
        suggestions: ["\\2 do"],
      });
    }
    
    return issues;
  },
};
