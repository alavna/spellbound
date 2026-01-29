import type { GrammarRule, GrammarRuleContext } from '../../types';

/**
 * missing hyphen in '24 hour motel'
 * 
 * Source: LanguageTool (HOUR_HYPHEN)
 * Category: grammar
 */
export const hourHyphenRule: GrammarRule = {
  id: 'hour-hyphen',
  name: 'missing hyphen in \'24 hour motel\'',
  description: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
  category: 'grammar',
  severity: 'warning',
  tags: ['languagetool'],
  enabled: true,

  check(context: GrammarRuleContext) {
    const pattern = /\S+\s+\bhour|minute|min|(milli)?second\b\s+\bhalt|ad|dose|advertisements?|demo|pitch(es)?|commercials?|civics|show-?down|strategy|quiz|videos?|riddles?|scrubs?|walmarts?|runoffs?|pharmac(y|ies)|motels?|hotels?|convenience|walgreens|fitness|gyms?|laundromats?|autozones?|mcdonalds?|forecasts?|myster(y|ies)|weather|lag|jobs?|shifts?|workouts?|clock|desks?|drive|events?|lessons?|call|days?|timestamps?|timer|sessions?|services?|journeys?|hikes?|trainings?|sleep|meeting|deal|period|patrols|panic|operation|level|update|rule|standoffs?|response|timeframe|format|cycles?|surger(y|ies)|walk|delays?|notice|difference|countdown|battery|conversations?|naps?|projects?|ride|rescue|block|trips?|rest|visit|breaks?|delivery|queue|marathons?|window|contractors?|controllers?|workweeks?|workdays?|moment|plank|sprint|transcript|average|avg|movies?|film|episodes?|performance\b/gi;
    const issues: Array<{start: number; end: number; message: string; suggestions?: string[]}> = [];
    
    let match;
    while ((match = pattern.exec(context.text)) !== null) {
      issues.push({
        start: match.index,
        end: match.index + match[0].length,
        message: 'When \'\\1-\\2\' is used as a modifier, it is usually spelled with a hyphen.',
        suggestions: ["\\1-\\2"],
      });
    }
    
    return issues;
  },
};
