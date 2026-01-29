import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * PowerShell
 * 
 * Source: LanguageTool (POWER_SHELL)
 * Category: grammar
 */
export const powerShellRule: GrammarRule = {
  id: 'power-shell',
  name: 'PowerShell',
  description: 'Did you mean PowerShell (= task automation from Microsoft)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bpower\b\s+\bshell\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean PowerShell (= task automation from Microsoft)?',
        suggestions: ["PowerShell"],
      });
    }
    
    return issues;
  },
};
