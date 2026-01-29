import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Cap Coral
 * 
 * Source: LanguageTool (CAP_CORAL)
 * Category: grammar
 */
export const capCoralRule: GrammarRule = {
  id: 'cap-coral',
  name: 'Cap Coral',
  description: 'Did you mean Cape ?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcap\b\s+\bcoral|cod|town|verde|canaveral|breton|kennedy\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean Cape ?',
        suggestions: ["Cape"],
      });
    }
    
    return issues;
  },
};
