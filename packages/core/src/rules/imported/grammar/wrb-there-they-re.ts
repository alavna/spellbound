import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'wherever there (they are) going'
 * 
 * Source: LanguageTool (WRB_THERE_THEY_RE)
 * Category: grammar
 */
export const wrbThereTheyReRule: GrammarRule = {
  id: 'wrb-there-they-re',
  name: '\'wherever there (they are) going\'',
  description: 'Did you mean they are?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bthere\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean they are?',
        suggestions: ["they are"],
      });
    }
    
    return issues;
  },
};
