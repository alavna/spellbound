import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * It's an allusion (illusion) of not being lonely
 * 
 * Source: LanguageTool (CONFUSION_ALLUSION_ILLUSION)
 * Category: grammar
 */
export const confusionAllusionIllusionRule: GrammarRule = {
  id: 'confusion-allusion-illusion',
  name: 'It\'s an allusion (illusion) of not being lonely',
  description: 'In most contexts, you allude \"to\" something. Did you mean to write \"illusion\" here?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\ballusion\b\s+\bof\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In most contexts, you allude \"to\" something. Did you mean to write \"illusion\" here?',
        suggestions: ["illusion of","allusion to"],
      });
    }
    
    return issues;
  },
};
