import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * disc break (brakes)
 * 
 * Source: LanguageTool (DISC_BREAK)
 * Category: grammar
 */
export const discBreakRule: GrammarRule = {
  id: 'disc-break',
  name: 'disc break (brakes)',
  description: 'Did you mean disc brake?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdisc\b\s+\bbreak\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean disc brake?',
        suggestions: ["disc brake"],
      });
    }
    
    return issues;
  },
};
