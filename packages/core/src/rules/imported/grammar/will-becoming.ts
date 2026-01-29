import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * will becoming (be coming)
 * 
 * Source: LanguageTool (WILL_BECOMING)
 * Category: grammar
 */
export const willBecomingRule: GrammarRule = {
  id: 'will-becoming',
  name: 'will becoming (be coming)',
  description: 'Did you mean be coming?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bbecoming\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean be coming?',
        suggestions: ["be coming"],
      });
    }
    
    return issues;
  },
};
