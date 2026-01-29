import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * in (on) Facebook
 * 
 * Source: LanguageTool (IN_FACEBOOK)
 * Category: grammar
 */
export const inFacebookRule: GrammarRule = {
  id: 'in-facebook',
  name: 'in (on) Facebook',
  description: 'The usual collocation for \"\\2\" is \"on\". Did you mean on \\2?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bin\b\s+\bFacebook|Twitter|Pinterest|Wikipedia|Amazon|LinkedIn|Yahoo|Blogger|YouTube|Instagram|Wordpress|Reddit|TikTok\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The usual collocation for \"\\2\" is \"on\". Did you mean on \\2?',
        suggestions: ["on \\2"],
      });
    }
    
    return issues;
  },
};
