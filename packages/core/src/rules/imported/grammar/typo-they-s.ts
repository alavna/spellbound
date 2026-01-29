import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * They's (They'd) already read his biography
 * 
 * Source: LanguageTool (TYPO_THEY_S)
 * Category: grammar
 */
export const typoTheySRule: GrammarRule = {
  id: 'typo-they-s',
  name: 'They\'s (They\'d) already read his biography',
  description: 'Typo detected: Did you mean to write \'\\1\'d\' (contracted form of \'\\1 had\' or \'\\1 would\')?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwe|they\b\s+'s\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Typo detected: Did you mean to write \'\\1\'d\' (contracted form of \'\\1 had\' or \'\\1 would\')?',
        suggestions: ["\\1'd"],
      });
    }
    
    return issues;
  },
};
