import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Erwin Schroedinger (Schrödinger)
 * 
 * Source: LanguageTool (SCHROEDINGER)
 * Category: grammar
 */
export const schroedingerRule: GrammarRule = {
  id: 'schroedinger',
  name: 'Erwin Schroedinger (Schrödinger)',
  description: 'Did you refer to the Austrian physicist Erwin Schrödinger (1887–1961)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bSchroe?dinger\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you refer to the Austrian physicist Erwin Schrödinger (1887–1961)?',
        suggestions: ["Schrödinger"],
      });
    }
    
    return issues;
  },
};
