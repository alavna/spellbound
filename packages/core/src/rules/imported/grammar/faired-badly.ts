import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * faired (fared) badly
 * 
 * Source: LanguageTool (FAIRED_BADLY)
 * Category: grammar
 */
export const fairedBadlyRule: GrammarRule = {
  id: 'faired-badly',
  name: 'faired (fared) badly',
  description: 'Did you mean fared ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfaired\b\s+\bbadly|better|far|less|little|much|poorly|quite|rather|slightly|somewhat|well|worse\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean fared ?',
        suggestions: ["fared"],
      });
    }
    
    return issues;
  },
};
