import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * CDROM (CD-ROM)
 * 
 * Source: LanguageTool (CDROM)
 * Category: style
 */
export const cdromRule: GrammarRule = {
  id: 'cdrom',
  name: 'CDROM (CD-ROM)',
  description: 'Consider using CD-ROM.',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bCDROM|CDRom|Cdrom\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Consider using CD-ROM.',
        suggestions: ["CD-ROM"],
      });
    }
    
    return issues;
  },
};
