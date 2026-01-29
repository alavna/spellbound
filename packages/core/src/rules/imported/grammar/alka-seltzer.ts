import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Alka Seltzer (Alker-Seltzer)
 * 
 * Source: LanguageTool (ALKA_SELTZER)
 * Category: grammar
 */
export const alkaSeltzerRule: GrammarRule = {
  id: 'alka-seltzer',
  name: 'Alka Seltzer (Alker-Seltzer)',
  description: 'The name of this medicine is normally spelled with a hyphen Alka-Seltzer.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bAlk(a|er)\s+\bSelt?zer\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The name of this medicine is normally spelled with a hyphen Alka-Seltzer.',
        suggestions: ["Alka-Seltzer"],
      });
    }
    
    return issues;
  },
};
