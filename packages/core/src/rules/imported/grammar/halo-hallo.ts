import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Halo (Hallo)
 * 
 * Source: LanguageTool (HALO_HALLO)
 * Category: grammar
 */
export const haloHalloRule: GrammarRule = {
  id: 'halo-hallo',
  name: 'Halo (Hallo)',
  description: 'Did you mean Hallo, the greeting? A halo is an optical phenomenon.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bHalo\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Hallo, the greeting? A halo is an optical phenomenon.',
        suggestions: ["Hallo"],
      });
    }
    
    return issues;
  },
};
