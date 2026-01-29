import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * He'd wrote (write / written)
 * 
 * Source: LanguageTool (HE_D_VBD)
 * Category: grammar
 */
export const heDVbdRule: GrammarRule = {
  id: 'he-d-vbd',
  name: 'He\'d wrote (write / written)',
  description: 'The verb form seems incorrect. The \'\\1\\2\' contraction requires either the past participle (\"\\1 had gone\") or the base form (\"\\1 would go\").',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bs?he|it|they|we|I|you\b\s+'d\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The verb form seems incorrect. The \'\\1\\2\' contraction requires either the past participle (\"\\1 had gone\") or the base form (\"\\1 would go\").',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
