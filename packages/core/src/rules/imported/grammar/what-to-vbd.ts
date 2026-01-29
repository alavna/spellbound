import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I know what to sent (send)
 * 
 * Source: LanguageTool (WHAT_TO_VBD)
 * Category: grammar
 */
export const whatToVbdRule: GrammarRule = {
  id: 'what-to-vbd',
  name: 'I know what to sent (send)',
  description: 'The base form is expected after \"to\".',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwhat|which|when|who|where|why|how\b\s+\bto\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The base form is expected after \"to\".',
        suggestions: ["to \\3"],
      });
    }
    
    return issues;
  },
};
