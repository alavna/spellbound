import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * addicting (addictive)
 * 
 * Source: LanguageTool (CONFUSION_OF_ADDICTING_ADDICITVE)
 * Category: grammar
 */
export const confusionOfAddictingAddicitveRule: GrammarRule = {
  id: 'confusion-of-addicting-addicitve',
  name: 'addicting (addictive)',
  description: 'Did you mean the adjective addictive instead of the verb form \'addicting\'?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\baddicting\b\s+\bbehaviou\.rs\.\.drugs\.\.game\.play\.\.s\.\.nature\.opiods\.\.painkillers\.\.substances\./gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean the adjective addictive instead of the verb form \'addicting\'?',
        suggestions: ["addictive"],
      });
    }
    
    return issues;
  },
};
