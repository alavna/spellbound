import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * addend vs attend
 * 
 * Source: LanguageTool (ADDEND_ATTEND)
 * Category: grammar
 */
export const addendAttendRule: GrammarRule = {
  id: 'addend-attend',
  name: 'addend vs attend',
  description: '\"Addend\" is a noun. Did you mean the verb attend (= to participate in an event)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\baddend\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: '\"Addend\" is a noun. Did you mean the verb attend (= to participate in an event)?',
        suggestions: ["attend"],
      });
    }
    
    return issues;
  },
};
