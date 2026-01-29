import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * driver's licence/driving licence
 * 
 * Source: LanguageTool (DRIVERS_LICENSE)
 * Category: grammar
 */
export const driversLicenseRule: GrammarRule = {
  id: 'drivers-license',
  name: 'driver\'s licence/driving licence',
  description: 'This term is chiefly North American English. Consider a replacement.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bdriver\b\s+'s\b\s+\blicences?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This term is chiefly North American English. Consider a replacement.',
        suggestions: ["driving \\4"],
      });
    }
    
    return issues;
  },
};
