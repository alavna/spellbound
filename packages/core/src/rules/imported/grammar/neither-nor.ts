import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * neither X or Y (neither X nor Y)
 * 
 * Source: LanguageTool (NEITHER_NOR)
 * Category: grammar
 */
export const neitherNorRule: GrammarRule = {
  id: 'neither-nor',
  name: 'neither X or Y (neither X nor Y)',
  description: 'Use nor with neither.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bneither\b\s+\bor\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Use nor with neither.',
        suggestions: ["nor"],
      });
    }
    
    return issues;
  },
};
