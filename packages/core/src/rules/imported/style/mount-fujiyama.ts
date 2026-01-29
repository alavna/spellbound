import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * Mount Fuji
 * 
 * Source: LanguageTool (MOUNT_FUJIYAMA)
 * Category: style
 */
export const mountFujiyamaRule: GrammarRule = {
  id: 'mount-fujiyama',
  name: 'Mount Fuji',
  description: 'As “Yama” means “mountain” in Japanese, better write Mount Fuji?',
  category: 'style',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bMount\b\s+\bFujiyama\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'As “Yama” means “mountain” in Japanese, better write Mount Fuji?',
        suggestions: ["Mount Fuji"],
      });
    }
    
    return issues;
  },
};
