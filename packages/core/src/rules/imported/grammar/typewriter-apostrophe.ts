import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * require typewriter (straight) apostrophe (')
 * 
 * Source: LanguageTool (TYPEWRITER_APOSTROPHE)
 * Category: grammar
 */
export const typewriterApostropheRule: GrammarRule = {
  id: 'typewriter-apostrophe',
  name: 'require typewriter (straight) apostrophe (\')',
  description: 'Consider using the typewriter apostrophe.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /'.+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using the typewriter apostrophe.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
