import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * bare bones (bare-bones)
 * 
 * Source: LanguageTool (BARE_BONES_HYPHEN)
 * Category: grammar
 */
export const bareBonesHyphenRule: GrammarRule = {
  id: 'bare-bones-hyphen',
  name: 'bare bones (bare-bones)',
  description: 'This adjective is spelled bare-bones.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbare\b\s+\bbones?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This adjective is spelled bare-bones.',
        suggestions: ["bare-bones"],
      });
    }
    
    return issues;
  },
};
