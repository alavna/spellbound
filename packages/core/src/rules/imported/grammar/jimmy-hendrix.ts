import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Jimmy (Jimi) Hendrix
 * 
 * Source: LanguageTool (JIMMY_HENDRIX)
 * Category: grammar
 */
export const jimmyHendrixRule: GrammarRule = {
  id: 'jimmy-hendrix',
  name: 'Jimmy (Jimi) Hendrix',
  description: 'Did you mean Jimi Hendrix?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bJimmy\b\s+\bHendrix\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Jimi Hendrix?',
        suggestions: ["Jimi Hendrix"],
      });
    }
    
    return issues;
  },
};
