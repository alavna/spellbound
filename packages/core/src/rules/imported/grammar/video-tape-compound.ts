import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * video tape (videotape)
 * 
 * Source: LanguageTool (VIDEO_TAPE_COMPOUND)
 * Category: grammar
 */
export const videoTapeCompoundRule: GrammarRule = {
  id: 'video-tape-compound',
  name: 'video tape (videotape)',
  description: 'The word video is normally spelled as one word.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\bvideo\b\s+\byes\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'The word video is normally spelled as one word.',
        suggestions: ["video"],
      });
    }
    
    return issues;
  },
};
