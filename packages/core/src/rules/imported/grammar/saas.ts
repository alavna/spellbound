import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * SAAS (SaaS)
 * 
 * Source: LanguageTool (SAAS)
 * Category: grammar
 */
export const saasRule: GrammarRule = {
  id: 'saas',
  name: 'SAAS (SaaS)',
  description: 'The recommended spelling for the acronym for \"Software/Platform as a Service\" is .',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[PS]AAS|[psPS]aas\b\s+\bsolutions?|ceos?|ctos?|clouds?|configurations?|web|internet|configs?|apis?|business(es)?|start-?ups?|compan(y|ies)|enterprise|services?|apps?|applications?|markets?|industr(y|ies)|providers?|clients?|servers?|infrastructures?|websites?|stocks?|deployment|platforms?|products?|subscriptions?|models?|payments?|features?|(dis)?advantages?|benefits?|tech(nolog(y|ies))?|marketing|guide|investors?|on-premise|software|licenses?|licensing|databases?|budgets?|sales|hosting|hosters?|pricings?|prices?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The recommended spelling for the acronym for \"Software/Platform as a Service\" is .',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
