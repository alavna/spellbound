import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Société Générale
 * 
 * Source: LanguageTool (SOCIETE_GENERALE)
 * Category: grammar
 */
export const societeGeneraleRule: GrammarRule = {
  id: 'societe-generale',
  name: 'Société Générale',
  description: 'Did you mean Société (= Bank)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bSoci.t.\s+\bG.n.ral.?s?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Société (= Bank)?',
        suggestions: ["Société"],
      });
    }
    
    return issues;
  },
};
