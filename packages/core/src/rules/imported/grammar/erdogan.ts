import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Erdogan (Erdoğan)
 * 
 * Source: LanguageTool (ERDOGAN)
 * Category: grammar
 */
export const erdoganRule: GrammarRule = {
  id: 'erdogan',
  name: 'Erdogan (Erdoğan)',
  description: 'The name of the Turkish politician is spelled Erdoğan (= Recep Tayyip Erdoğan).',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bErdogan\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The name of the Turkish politician is spelled Erdoğan (= Recep Tayyip Erdoğan).',
        suggestions: ["Erdoğan"],
      });
    }
    
    return issues;
  },
};
