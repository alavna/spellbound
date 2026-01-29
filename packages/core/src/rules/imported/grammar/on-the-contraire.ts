import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * on the contraire (au contraire)
 * 
 * Source: LanguageTool (ON_THE_CONTRAIRE)
 * Category: grammar
 */
export const onTheContraireRule: GrammarRule = {
  id: 'on-the-contraire',
  name: 'on the contraire (au contraire)',
  description: 'Did you mean au contraire or on the contrary?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bon\b\s+\bthe\b\s+\bcontraire\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean au contraire or on the contrary?',
        suggestions: ["au contraire","on the contrary"],
      });
    }
    
    return issues;
  },
};
