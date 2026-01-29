import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 737 max (Max)
 * 
 * Source: LanguageTool (BOEING_737_MAX)
 * Category: grammar
 */
export const boeing737MaxRule: GrammarRule = {
  id: 'boeing-737-max',
  name: '737 max (Max)',
  description: 'Capitalize the word if you mean Boeing\'s airliner.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /737\s+\bmax\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Capitalize the word if you mean Boeing\'s airliner.',
        suggestions: ["737 Max","737 MAX"],
      });
    }
    
    return issues;
  },
};
