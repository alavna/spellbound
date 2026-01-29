import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * cyber security (cybersecurity)
 * 
 * Source: LanguageTool (CYBER_COMPOUNDS)
 * Category: grammar
 */
export const cyberCompoundsRule: GrammarRule = {
  id: 'cyber-compounds',
  name: 'cyber security (cybersecurity)',
  description: 'The word cyber is spelled as one.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcyber\b\s+\bsecurity|bully|bullie[ds]|bullying|attacks?|attacked|attacking|attackers?|space|cafes?|cafés?|wars?|stalkers?|stalking|terrorists?|terrorism\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word cyber is spelled as one.',
        suggestions: ["cyber"],
      });
    }
    
    return issues;
  },
};
