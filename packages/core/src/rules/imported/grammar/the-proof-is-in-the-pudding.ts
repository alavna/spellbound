import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * the proof is in the pudding (the proof of the pudding is in the eating)
 * 
 * Source: LanguageTool (THE_PROOF_IS_IN_THE_PUDDING)
 * Category: grammar
 */
export const theProofIsInThePuddingRule: GrammarRule = {
  id: 'the-proof-is-in-the-pudding',
  name: 'the proof is in the pudding (the proof of the pudding is in the eating)',
  description: 'If you don\'t want to look for proofs hidden in your pudding, you probably meant the proof of the pudding is in the eating.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bthe\b\s+\bproof\b\s+\bis\b\s+\bin\b\s+\bthe\b\s+\bpudding\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'If you don\'t want to look for proofs hidden in your pudding, you probably meant the proof of the pudding is in the eating.',
        suggestions: ["the proof of the pudding is in the eating"],
      });
    }
    
    return issues;
  },
};
