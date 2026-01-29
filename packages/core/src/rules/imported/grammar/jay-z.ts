import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Jay Z (Jay-Z)
 * 
 * Source: LanguageTool (JAY_Z)
 * Category: grammar
 */
export const jayZRule: GrammarRule = {
  id: 'jay-z',
  name: 'Jay Z (Jay-Z)',
  description: 'The name of this rapper is spelled with a hyphen Jay-Z.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bJay\b\s+\bZ\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The name of this rapper is spelled with a hyphen Jay-Z.',
        suggestions: ["Jay-Z"],
      });
    }
    
    return issues;
  },
};
