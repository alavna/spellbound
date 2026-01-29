import { capitalizationRules } from './capitalization';
import { punctuationRules } from './punctuation';
import { commonMistakesRules } from './common-mistakes';
import { repetitionRules } from './repetition';
import { articleRules } from './articles';
import { agreementRules } from './agreement';
import { typographyRules } from './typography';
import type { GrammarRule } from '../../types';

/**
 * All built-in grammar rules
 */
export const builtInRules: GrammarRule[] = [
  ...capitalizationRules,
  ...punctuationRules,
  ...commonMistakesRules,
  ...repetitionRules,
  ...articleRules,
  ...agreementRules,
  ...typographyRules,
];

// Export individual rule collections
export {
  capitalizationRules,
  punctuationRules,
  commonMistakesRules,
  repetitionRules,
  articleRules,
  agreementRules,
  typographyRules,
};

// Export individual rules for cherry-picking
export * from './capitalization';
export * from './punctuation';
export * from './common-mistakes';
export * from './repetition';
export * from './articles';
export * from './agreement';
export * from './typography';
