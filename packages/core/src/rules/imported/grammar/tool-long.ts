import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * tool long (too long)
 * 
 * Source: LanguageTool (TOOL_LONG)
 * Category: grammar
 */
export const toolLongRule: GrammarRule = {
  id: 'tool-long',
  name: 'tool long (too long)',
  description: 'Did you mean too long?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\btool\b\s+\blong\b\s+(?!\bago\b)\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean too long?',
        suggestions: ["too long"],
      });
    }
    
    return issues;
  },
};
