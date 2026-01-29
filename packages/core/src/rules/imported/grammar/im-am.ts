import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Im am (I am)
 * 
 * Source: LanguageTool (IM_AM)
 * Category: grammar
 */
export const imAmRule: GrammarRule = {
  id: 'im-am',
  name: 'Im am (I am)',
  description: 'Did you mean I am?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bI\b\s+'m\b\s+\bam\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean I am?',
        suggestions: ["I am"],
      });
    }
    
    return issues;
  },
};
