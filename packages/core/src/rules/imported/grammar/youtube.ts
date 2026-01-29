import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * YouTube
 * 
 * Source: LanguageTool (YOUTUBE)
 * Category: grammar
 */
export const youtubeRule: GrammarRule = {
  id: 'youtube',
  name: 'YouTube',
  description: 'The official name of this popular video platform is spelled with a capital \"T\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bYoutube|you[Tt]ube\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The official name of this popular video platform is spelled with a capital \"T\".',
        suggestions: ["YouTube"],
      });
    }
    
    return issues;
  },
};
