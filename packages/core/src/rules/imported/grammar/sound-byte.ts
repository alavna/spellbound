import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * sound byte (bite)
 * 
 * Source: LanguageTool (SOUND_BYTE)
 * Category: grammar
 */
export const soundByteRule: GrammarRule = {
  id: 'sound-byte',
  name: 'sound byte (bite)',
  description: 'Did you mean sound bite?',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bsound\b\s+\bbyte\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'Did you mean sound bite?',
        suggestions: ["sound bite"],
      });
    }
    
    return issues;
  },
};
