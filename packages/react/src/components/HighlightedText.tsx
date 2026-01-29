import React, { useMemo, Fragment } from 'react';
import type { HighlightedTextProps, HighlightPosition } from '../types';
import type { SpellCheckResult, GrammarIssue } from '@spellbound/core';

/**
 * Default styles for highlights
 */
const defaultSpellingStyle: React.CSSProperties = {
  textDecoration: 'underline wavy red',
  textDecorationSkipInk: 'none',
  cursor: 'pointer',
};

const defaultGrammarStyle: React.CSSProperties = {
  textDecoration: 'underline wavy blue',
  textDecorationSkipInk: 'none',
  cursor: 'pointer',
};

interface MergedHighlight {
  start: number;
  end: number;
  type: 'spelling' | 'grammar';
  data: SpellCheckResult | GrammarIssue;
}

/**
 * Merge and sort highlights, handling overlapping ranges
 */
function mergeHighlights(
  spellingErrors: SpellCheckResult[] = [],
  grammarIssues: GrammarIssue[] = []
): MergedHighlight[] {
  const highlights: MergedHighlight[] = [];
  
  // Add spelling errors
  for (const error of spellingErrors) {
    highlights.push({
      start: error.start,
      end: error.end,
      type: 'spelling',
      data: error,
    });
  }
  
  // Add grammar issues
  for (const issue of grammarIssues) {
    highlights.push({
      start: issue.start,
      end: issue.end,
      type: 'grammar',
      data: issue,
    });
  }
  
  // Sort by start position, then by end position (longer ranges first)
  highlights.sort((a, b) => {
    if (a.start !== b.start) return a.start - b.start;
    return b.end - a.end;
  });
  
  // Remove overlapping highlights (keep first one in sorted order)
  const filtered: MergedHighlight[] = [];
  let lastEnd = -1;
  
  for (const highlight of highlights) {
    if (highlight.start >= lastEnd) {
      filtered.push(highlight);
      lastEnd = highlight.end;
    }
  }
  
  return filtered;
}

/**
 * Component that renders text with highlighted spelling errors and grammar issues
 * 
 * @example
 * ```tsx
 * <HighlightedText
 *   text="This is a tset with som errors."
 *   spellingErrors={spellingErrors}
 *   grammarIssues={grammarIssues}
 *   onHighlightClick={(position, event) => {
 *     // Show suggestions popover at click position
 *     showPopover(position, { x: event.clientX, y: event.clientY });
 *   }}
 * />
 * ```
 */
export function HighlightedText({
  text,
  spellingErrors = [],
  grammarIssues = [],
  spellingClassName,
  grammarClassName,
  onHighlightClick,
  renderHighlight,
  className,
  style,
}: HighlightedTextProps) {
  const segments = useMemo(() => {
    const highlights = mergeHighlights(spellingErrors, grammarIssues);
    const result: React.ReactNode[] = [];
    let currentIndex = 0;
    
    for (let i = 0; i < highlights.length; i++) {
      const highlight = highlights[i];
      
      // Add text before this highlight
      if (currentIndex < highlight.start) {
        result.push(
          <Fragment key={`text-${currentIndex}`}>
            {text.slice(currentIndex, highlight.start)}
          </Fragment>
        );
      }
      
      // Add the highlighted segment
      const highlightedText = text.slice(highlight.start, highlight.end);
      const position: HighlightPosition = {
        start: highlight.start,
        end: highlight.end,
        type: highlight.type,
        data: highlight.data,
      };
      
      const highlightStyle = highlight.type === 'spelling' 
        ? defaultSpellingStyle 
        : defaultGrammarStyle;
      
      const highlightClass = highlight.type === 'spelling'
        ? spellingClassName
        : grammarClassName;
      
      const handleClick = (event: React.MouseEvent) => {
        onHighlightClick?.(position, event);
      };
      
      const defaultElement = (
        <span
          key={`highlight-${highlight.start}-${highlight.end}`}
          style={highlightClass ? undefined : highlightStyle}
          className={highlightClass}
          onClick={handleClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onHighlightClick?.(position, e as unknown as React.MouseEvent);
            }
          }}
          aria-label={
            highlight.type === 'spelling'
              ? `Spelling error: ${highlightedText}`
              : `Grammar issue: ${(highlight.data as GrammarIssue).message}`
          }
        >
          {highlightedText}
        </span>
      );
      
      if (renderHighlight) {
        result.push(
          <Fragment key={`custom-${highlight.start}-${highlight.end}`}>
            {renderHighlight(highlightedText, position, defaultElement)}
          </Fragment>
        );
      } else {
        result.push(defaultElement);
      }
      
      currentIndex = highlight.end;
    }
    
    // Add remaining text after last highlight
    if (currentIndex < text.length) {
      result.push(
        <Fragment key={`text-end-${currentIndex}`}>
          {text.slice(currentIndex)}
        </Fragment>
      );
    }
    
    return result;
  }, [text, spellingErrors, grammarIssues, spellingClassName, grammarClassName, onHighlightClick, renderHighlight]);
  
  return (
    <span className={className} style={style}>
      {segments}
    </span>
  );
}
