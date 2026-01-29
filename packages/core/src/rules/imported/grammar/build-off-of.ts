import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * build off of (build on)
 * 
 * Source: LanguageTool (BUILD_OFF_OF)
 * Category: grammar
 */
export const buildOffOfRule: GrammarRule = {
  id: 'build-off-of',
  name: 'build off of (build on)',
  description: 'Did you mean build on?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbuild\b\s+\boff\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean build on?',
        suggestions: ["build on"],
      });
    }
    
    return issues;
  },
};
