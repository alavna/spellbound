import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * musn't → mustn't
 * 
 * Source: LanguageTool (MUSN_T)
 * Category: grammar
 */
export const musnTRule: GrammarRule = {
  id: 'musn-t',
  name: 'musn\'t → mustn\'t',
  description: 'Typo detected. Did you mean mustn\\2\\3?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmusn\b\s+&apostrophe;\s+\bt\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Typo detected. Did you mean mustn\\2\\3?',
        suggestions: ["mustn\\2\\3"],
      });
    }
    
    return issues;
  },
};
