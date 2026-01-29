import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * without out (without)
 * 
 * Source: LanguageTool (WITHOUT_OUT)
 * Category: grammar
 */
export const withoutOutRule: GrammarRule = {
  id: 'without-out',
  name: 'without out (without)',
  description: 'Did you mean without?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwithout\b\s+\bout\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean without?',
        suggestions: ["without"],
      });
    }
    
    return issues;
  },
};
