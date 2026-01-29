import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * hyphen in 'first person shooter'
 * 
 * Source: LanguageTool (FIRST_PERSON_SHOOTER)
 * Category: grammar
 */
export const firstPersonShooterRule: GrammarRule = {
  id: 'first-person-shooter',
  name: 'hyphen in \'first person shooter\'',
  description: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bfirst|second|third\b\s+\bperson\b\s+\bshooters?|singular|plural|(pro)?nouns?|verbs?|narrators?|narratives?|perspectives?|forms?|pov|analysis|voice|descriptors?|masculine|feminine|subject\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
