import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * homo (Homo) sapiens
 * 
 * Source: LanguageTool (HOMO_SAPIENS)
 * Category: grammar
 */
export const homoSapiensRule: GrammarRule = {
  id: 'homo-sapiens',
  name: 'homo (Homo) sapiens',
  description: 'Did you mean Homo sapiens (= primate species, \"Homo\" needs to be capitalized)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhomo\b\s+\bsapiens?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Homo sapiens (= primate species, \"Homo\" needs to be capitalized)?',
        suggestions: ["Homo sapiens"],
      });
    }
    
    return issues;
  },
};
