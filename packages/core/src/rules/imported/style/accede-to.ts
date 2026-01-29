import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * accede to (give in)
 * 
 * Source: LanguageTool (ACCEDE_TO)
 * Category: style
 */
export const accedeToRule: GrammarRule = {
  id: 'accede-to',
  name: 'accede to (give in)',
  description: 'Unless it is a throne that is acceded to, change into allow, agree to or give in to.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Unless it is a throne that is acceded to, change into allow, agree to or give in to.',
        suggestions: ["allow, agree to or give in to"],
      });
    }
    
    return issues;
  },
};
