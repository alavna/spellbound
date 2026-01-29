import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * writ vs write
 * 
 * Source: LanguageTool (WRIT_WRITE)
 * Category: grammar
 */
export const writWriteRule: GrammarRule = {
  id: 'writ-write',
  name: 'writ vs write',
  description: 'Did you mean the verb write?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bwrit\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the verb write?',
        suggestions: ["write"],
      });
    }
    
    return issues;
  },
};
