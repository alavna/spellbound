import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * I didn't saw (see)
 * 
 * Source: LanguageTool (DIDN_T_SAW)
 * Category: grammar
 */
export const didnTSawRule: GrammarRule = {
  id: 'didn-t-saw',
  name: 'I didn\'t saw (see)',
  description: 'The verb \"saw\" means \"to cut\" something using a saw. The past tense of \"see\" is incorrect in this context.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdid|do|does\b\s+\bn't|not\b\s+\S+\s+[Ss]aw\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The verb \"saw\" means \"to cut\" something using a saw. The past tense of \"see\" is incorrect in this context.',
        suggestions: ["see"],
      });
    }
    
    return issues;
  },
};
