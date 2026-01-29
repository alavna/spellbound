import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * further more (furthermore)
 * 
 * Source: LanguageTool (FURTHER_MORE_COMPOUND)
 * Category: grammar
 */
export const furtherMoreCompoundRule: GrammarRule = {
  id: 'further-more-compound',
  name: 'further more (furthermore)',
  description: 'This adverb is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfurther\b\s+\bmore\b\s+\S+/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This adverb is normally spelled as one word.',
        suggestions: ["furthermore"],
      });
    }
    
    return issues;
  },
};
