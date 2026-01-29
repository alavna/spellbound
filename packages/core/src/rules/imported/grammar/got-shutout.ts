import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * got shutout (shut out)
 * 
 * Source: LanguageTool (GOT_SHUTOUT)
 * Category: grammar
 */
export const gotShutoutRule: GrammarRule = {
  id: 'got-shutout',
  name: 'got shutout (shut out)',
  description: 'Did you mean got shut out?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bgot\b\s+\bshutout\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean got shut out?',
        suggestions: ["got shut out"],
      });
    }
    
    return issues;
  },
};
