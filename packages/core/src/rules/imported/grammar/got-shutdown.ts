import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * got shutdown (shut down)
 * 
 * Source: LanguageTool (GOT_SHUTDOWN)
 * Category: grammar
 */
export const gotShutdownRule: GrammarRule = {
  id: 'got-shutdown',
  name: 'got shutdown (shut down)',
  description: 'Did you mean \\1 shut down?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bgot|to\b\s+\bshutdown\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \\1 shut down?',
        suggestions: ["\\1 shut down"],
      });
    }
    
    return issues;
  },
};
