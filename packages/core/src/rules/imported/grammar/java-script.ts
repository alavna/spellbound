import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * JavaScript
 * 
 * Source: LanguageTool (JAVA_SCRIPT)
 * Category: grammar
 */
export const javaScriptRule: GrammarRule = {
  id: 'java-script',
  name: 'JavaScript',
  description: 'Did you mean JavaScript (= programming language)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bjava\b\s+\bscript\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean JavaScript (= programming language)?',
        suggestions: ["JavaScript"],
      });
    }
    
    return issues;
  },
};
