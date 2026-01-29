import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * 'economical (economic) growth' etc.
 * 
 * Source: LanguageTool (ECONOMICAL_ECONOMIC)
 * Category: grammar
 */
export const economicalEconomicRule: GrammarRule = {
  id: 'economical-economic',
  name: '\'economical (economic) growth\' etc.',
  description: 'Did you mean economic (=connected with economy)?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\beconomical\b\s+\bgrowth|development|policy|activity|recovery|reform|policies|crisis|cooperation|co-operation|problems|conditions|system|reforms|performance|history|climate|indicators|relations|power|situation|community|life|planning|affairs|theory|recession|change|review|factors|aid|benefits|circumstances|decline|sanctions|interests|analysis|strategy|difficulties|integration|issues|efficiency|assistance|position|terms|management|base|programme|digest|environment|union|activities|modelling|structure|success|reasons|sense|changes|forces|order|progress|loss|consequences|prosperity|resources|pressures|commission|depression|systems|miracle|regeneration|structures|trends|blockade|adviser|impact|restructuring|developments|measures|prospects|independence|stability|status|support|expansion\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean economic (=connected with economy)?',
        suggestions: ["economic"],
      });
    }
    
    return issues;
  },
};
