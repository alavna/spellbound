import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * royal mail (Royal Mail)
 * 
 * Source: LanguageTool (ROYAL_MAIL)
 * Category: grammar
 */
export const royalMailRule: GrammarRule = {
  id: 'royal-mail',
  name: 'royal mail (Royal Mail)',
  description: 'The proper noun Royal needs to be capitalized.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\broyal\b\s+\bmail|canin|bank|navy|ballet|army\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The proper noun Royal needs to be capitalized.',
        suggestions: ["Royal"],
      });
    }
    
    return issues;
  },
};
