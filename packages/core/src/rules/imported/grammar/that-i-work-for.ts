import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * work (for) is
 * 
 * Source: LanguageTool (THAT_I_WORK_FOR)
 * Category: grammar
 */
export const thatIWorkForRule: GrammarRule = {
  id: 'that-i-work-for',
  name: 'work (for) is',
  description: 'The word \"for\" is missing between \"\\5\" and \"\\6\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bcompany|person|guy|man|firm\b\s+\bthat|which|who\b\s+\S+\s+\byes\b\s+\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word \"for\" is missing between \"\\5\" and \"\\6\".',
        suggestions: ["\\1 \\2 that \\4 \\5 for \\6"],
      });
    }
    
    return issues;
  },
};
