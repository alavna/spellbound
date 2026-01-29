import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Werner (Wernher) von Braun
 * 
 * Source: LanguageTool (WERNHER_VON_BRAUN)
 * Category: grammar
 */
export const wernherVonBraunRule: GrammarRule = {
  id: 'wernher-von-braun',
  name: 'Werner (Wernher) von Braun',
  description: 'Did you mean the German-born aerospace engineer Wernher von Braun?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwernh?err?\s+\bv[ao][mn]\s+\bbrown|brauh?n\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the German-born aerospace engineer Wernher von Braun?',
        suggestions: ["Wernher von Braun"],
      });
    }
    
    return issues;
  },
};
