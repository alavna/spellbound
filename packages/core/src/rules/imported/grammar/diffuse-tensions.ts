import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * diffuse (defuse) tensions
 * 
 * Source: LanguageTool (DIFFUSE_TENSIONS)
 * Category: grammar
 */
export const diffuseTensionsRule: GrammarRule = {
  id: 'diffuse-tensions',
  name: 'diffuse (defuse) tensions',
  description: 'Did you mean defuse, as in removing the fuse from a bomb? \"Diffuse\" as a verb means to spread out.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean defuse, as in removing the fuse from a bomb? \"Diffuse\" as a verb means to spread out.',
        suggestions: ["defuse"],
      });
    }
    
    return issues;
  },
};
