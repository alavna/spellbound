import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * on the look out (lookout)
 * 
 * Source: LanguageTool (ON_THE_LOOK_OUT)
 * Category: grammar
 */
export const onTheLookOutRule: GrammarRule = {
  id: 'on-the-look-out',
  name: 'on the look out (lookout)',
  description: 'In this idiom, lookout is spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bon\b\s+\bthe\b\s+\blook\b\s+\bout\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'In this idiom, lookout is spelled as one word.',
        suggestions: ["lookout"],
      });
    }
    
    return issues;
  },
};
