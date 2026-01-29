import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * political gaff (gaffe)
 * 
 * Source: LanguageTool (WRITINGPOLITICALSCIENCE_GAFF)
 * Category: grammar
 */
export const writingpoliticalscienceGaffRule: GrammarRule = {
  id: 'writingpoliticalscience-gaff',
  name: 'political gaff (gaffe)',
  description: 'Did you mean gaffe?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bwriting|political|science|cultural|grammatical\b\s+\bgaff\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean gaffe?',
        suggestions: ["gaffe"],
      });
    }
    
    return issues;
  },
};
