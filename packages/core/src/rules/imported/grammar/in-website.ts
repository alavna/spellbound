import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * on (the) website
 * 
 * Source: LanguageTool (IN_WEBSITE)
 * Category: grammar
 */
export const inWebsiteRule: GrammarRule = {
  id: 'in-website',
  name: 'on (the) website',
  description: 'It appears that an article is missing.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[oiOI]n|[Oo]f|[Ff]or|[Tt]o\b\s+\bwebsite|homepage\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that an article is missing.',
        suggestions: ["\\2"],
      });
    }
    
    return issues;
  },
};
