import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * it (is)
 * 
 * Source: LanguageTool (VBZ_VBD)
 * Category: grammar
 */
export const vbzVbdRule: GrammarRule = {
  id: 'vbz-vbd',
  name: 'it (is)',
  description: 'Did you mean it?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Ii]s\b\s+\bwasn?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean it?',
        suggestions: ["it"],
      });
    }
    
    return issues;
  },
};
