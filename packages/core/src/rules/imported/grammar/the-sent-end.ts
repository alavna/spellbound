import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Sentence ending with 'the' or 'a'
 * 
 * Source: LanguageTool (THE_SENT_END)
 * Category: grammar
 */
export const theSentEndRule: GrammarRule = {
  id: 'the-sent-end',
  name: 'Sentence ending with \'the\' or \'a\'',
  description: 'A word may be missing after \'\\2\'.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /.*[a-z0-9,:;].*\s+[Tt]he|[Aa]n|a\b\s+\.|\.|!/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'A word may be missing after \'\\2\'.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
