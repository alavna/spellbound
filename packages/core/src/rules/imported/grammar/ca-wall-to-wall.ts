import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Compound adjective: wall to wall
 * 
 * Source: LanguageTool (CA_WALL_TO_WALL)
 * Category: grammar
 */
export const caWallToWallRule: GrammarRule = {
  id: 'ca-wall-to-wall',
  name: 'Compound adjective: wall to wall',
  description: '\'\\1 \\2 \\3\' seems to be a compound adjective before a noun. Use a hyphen: \\1-\\2-\\3.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwall\b\s+\bto\b\s+\bwall\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\'\\1 \\2 \\3\' seems to be a compound adjective before a noun. Use a hyphen: \\1-\\2-\\3.',
        suggestions: ["\\1-\\2-\\3"],
      });
    }
    
    return issues;
  },
};
