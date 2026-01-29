import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * add salt to injury (insult to injury)
 * 
 * Source: LanguageTool (SALT_TO_INJURY)
 * Category: grammar
 */
export const saltToInjuryRule: GrammarRule = {
  id: 'salt-to-injury',
  name: 'add salt to injury (insult to injury)',
  description: 'Did you mean \'insult to injury\'?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\byes\b\s+\bsalt\b\s+\bto\b\s+\binjury\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean \'insult to injury\'?',
        suggestions: ["insult \\3"],
      });
    }
    
    return issues;
  },
};
