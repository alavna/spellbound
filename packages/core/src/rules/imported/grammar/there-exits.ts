import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * there exits (there exists)
 * 
 * Source: LanguageTool (THERE_EXITS)
 * Category: grammar
 */
export const thereExitsRule: GrammarRule = {
  id: 'there-exits',
  name: 'there exits (there exists)',
  description: 'Did you mean exists?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthere\b\s+\bexits\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean exists?',
        suggestions: ["exists"],
      });
    }
    
    return issues;
  },
};
