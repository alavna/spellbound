import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * a bail out (bailout)
 * 
 * Source: LanguageTool (DT_BAIL_OUT)
 * Category: grammar
 */
export const dtBailOutRule: GrammarRule = {
  id: 'dt-bail-out',
  name: 'a bail out (bailout)',
  description: 'Did you mean bailout?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbail\b\s+\bout\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean bailout?',
        suggestions: ["bailout"],
      });
    }
    
    return issues;
  },
};
