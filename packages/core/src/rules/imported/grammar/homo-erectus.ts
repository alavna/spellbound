import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * homo (Homo) erectus
 * 
 * Source: LanguageTool (HOMO_ERECTUS)
 * Category: grammar
 */
export const homoErectusRule: GrammarRule = {
  id: 'homo-erectus',
  name: 'homo (Homo) erectus',
  description: 'Did you mean Homo erectus (= extinct hominid, \"Homo\" needs to be capitalized)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhomo\b\s+\berr?ectus\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Homo erectus (= extinct hominid, \"Homo\" needs to be capitalized)?',
        suggestions: ["Homo erectus"],
      });
    }
    
    return issues;
  },
};
