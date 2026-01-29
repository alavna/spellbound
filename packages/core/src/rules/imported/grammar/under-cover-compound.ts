import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * under cover (undercover)
 * 
 * Source: LanguageTool (UNDER_COVER_COMPOUND)
 * Category: grammar
 */
export const underCoverCompoundRule: GrammarRule = {
  id: 'under-cover-compound',
  name: 'under cover (undercover)',
  description: 'The adjective undercover is spelled as one word if you mean it in the context of \"undercover agent\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bunder\b\s+\bcover\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The adjective undercover is spelled as one word if you mean it in the context of \"undercover agent\".',
        suggestions: ["undercover"],
      });
    }
    
    return issues;
  },
};
