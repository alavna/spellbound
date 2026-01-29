import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * steel worker (steelworker)
 * 
 * Source: LanguageTool (WORKER_COMPOUNDS)
 * Category: grammar
 */
export const workerCompoundsRule: GrammarRule = {
  id: 'worker-compounds',
  name: 'steel worker (steelworker)',
  description: 'This noun is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bcraft|needle|piece|metal|steel|glass|iron|dock|auto|wage|wood|time|hand|farm|case|non|net\b\s+\bworkers?/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'This noun is normally spelled as one word.',
        suggestions: [],
      });
    }
    
    return issues;
  },
};
