import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * early adapter (early adopter)
 * 
 * Source: LanguageTool (EARLY_ADAPTER)
 * Category: grammar
 */
export const earlyAdapterRule: GrammarRule = {
  id: 'early-adapter',
  name: 'early adapter (early adopter)',
  description: 'Did you mean early adopter (=someone who takes something early on)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bearly\b\s+\badapter\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean early adopter (=someone who takes something early on)?',
        suggestions: ["early adopter"],
      });
    }
    
    return issues;
  },
};
