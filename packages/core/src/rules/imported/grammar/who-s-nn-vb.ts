import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Who's (whose) idea was that?
 * 
 * Source: LanguageTool (WHO_S_NN_VB)
 * Category: grammar
 */
export const whoSNnVbRule: GrammarRule = {
  id: 'who-s-nn-vb',
  name: 'Who\'s (whose) idea was that?',
  description: 'It appears that the correct determiner here is whose.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /[Ww]ho\b\s+'s\b\s+\S+\s+\S+\s+\bwas|am|were|are|is|will|[cw]ould|should|must|can|do|did|does|have|has\b\s+\S+\s+\./gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'It appears that the correct determiner here is whose.',
        suggestions: ["whose"],
      });
    }
    
    return issues;
  },
};
