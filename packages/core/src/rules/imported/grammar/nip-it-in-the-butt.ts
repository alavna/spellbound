import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * nip it in the butt (nip it in the bud)
 * 
 * Source: LanguageTool (NIP_IT_IN_THE_BUTT)
 * Category: grammar
 */
export const nipItInTheButtRule: GrammarRule = {
  id: 'nip-it-in-the-butt',
  name: 'nip it in the butt (nip it in the bud)',
  description: 'Did you mean nip it in the bud (=stop it from flowering completely)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bnip\b\s+\bit\b\s+\bin\b\s+\bthe\b\s+\bbutt\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean nip it in the bud (=stop it from flowering completely)?',
        suggestions: ["nip it in the bud"],
      });
    }
    
    return issues;
  },
};
