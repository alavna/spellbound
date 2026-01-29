import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * looked over her should (shoulder)
 * 
 * Source: LanguageTool (SHOULD_VS_SHOULDER)
 * Category: grammar
 */
export const shouldVsShoulderRule: GrammarRule = {
  id: 'should-vs-shoulder',
  name: 'looked over her should (shoulder)',
  description: 'Did you mean shoulder?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\blook\b\s+\bover\b\s+\bshould\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean shoulder?',
        suggestions: ["shoulder"],
      });
    }
    
    return issues;
  },
};
