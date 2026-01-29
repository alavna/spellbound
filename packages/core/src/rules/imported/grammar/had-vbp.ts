import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Had + verb present tense
 * 
 * Source: LanguageTool (HAD_VBP)
 * Category: grammar
 */
export const hadVbpRule: GrammarRule = {
  id: 'had-vbp',
  name: 'Had + verb present tense',
  description: 'Possible agreement error — use the past participle here.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bhad\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Possible agreement error — use the past participle here.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
