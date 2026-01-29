import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * bed room (bedroom)
 * 
 * Source: LanguageTool (ROOM_COMPOUNDS)
 * Category: grammar
 */
export const roomCompoundsRule: GrammarRule = {
  id: 'room-compounds',
  name: 'bed room (bedroom)',
  description: 'The noun \\1 is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bmush|bed|rest|bath|ball|board|class|school|court|lunch|sales|stock|show|news|head|work|wash|club|pool|coat|ware|tool|leg|tea|bar|gun\b\s+\brooms?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The noun \\1 is spelled as one word.',
        suggestions: ["\\1"],
      });
    }
    
    return issues;
  },
};
