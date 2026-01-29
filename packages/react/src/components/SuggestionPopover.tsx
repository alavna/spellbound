import React, { useEffect, useRef, useCallback } from 'react';
import type { SuggestionPopoverProps } from '../types';

/**
 * Default styles for the popover
 */
const defaultPopoverStyle: React.CSSProperties = {
  position: 'fixed',
  backgroundColor: 'white',
  border: '1px solid #ccc',
  borderRadius: '6px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  padding: '8px 0',
  minWidth: '200px',
  maxWidth: '300px',
  zIndex: 1000,
};

const defaultSuggestionStyle: React.CSSProperties = {
  padding: '8px 12px',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  borderBottom: '1px solid #eee',
};

const defaultSuggestionHoverStyle: React.CSSProperties = {
  backgroundColor: '#f5f5f5',
};

const defaultActionStyle: React.CSSProperties = {
  padding: '8px 12px',
  cursor: 'pointer',
  color: '#666',
  fontSize: '0.9em',
  borderTop: '1px solid #eee',
  marginTop: '4px',
};

/**
 * Component that displays suggestions for spelling/grammar corrections
 * 
 * @example
 * ```tsx
 * <SuggestionPopover
 *   isOpen={popoverOpen}
 *   anchorPosition={popoverPosition}
 *   word="tset"
 *   suggestions={[
 *     { text: 'test', type: 'spelling' },
 *     { text: 'set', type: 'spelling' },
 *   ]}
 *   onSelect={(suggestion) => {
 *     replaceWord(suggestion.text);
 *     setPopoverOpen(false);
 *   }}
 *   onAddToDictionary={() => {
 *     addToDictionary('tset');
 *     setPopoverOpen(false);
 *   }}
 *   onIgnore={() => {
 *     ignoreWord('tset');
 *     setPopoverOpen(false);
 *   }}
 *   onClose={() => setPopoverOpen(false)}
 *   type="spelling"
 * />
 * ```
 */
export function SuggestionPopover({
  isOpen,
  anchorPosition,
  word,
  suggestions,
  onSelect,
  onAddToDictionary,
  onIgnore,
  onClose,
  type,
  className,
  maxSuggestions = 5,
}: SuggestionPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  
  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
  
  // Position adjustment to keep popover in viewport
  const getAdjustedPosition = useCallback(() => {
    if (!anchorPosition || !popoverRef.current) {
      return anchorPosition;
    }
    
    const rect = popoverRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let x = anchorPosition.x;
    let y = anchorPosition.y;
    
    // Adjust horizontal position if overflowing
    if (x + rect.width > viewportWidth) {
      x = viewportWidth - rect.width - 10;
    }
    if (x < 10) {
      x = 10;
    }
    
    // Adjust vertical position if overflowing
    if (y + rect.height > viewportHeight) {
      y = anchorPosition.y - rect.height - 10;
    }
    if (y < 10) {
      y = 10;
    }
    
    return { x, y };
  }, [anchorPosition]);
  
  if (!isOpen || !anchorPosition) {
    return null;
  }
  
  const adjustedPosition = getAdjustedPosition();
  const limitedSuggestions = suggestions.slice(0, maxSuggestions);
  
  return (
    <div
      ref={popoverRef}
      className={className}
      style={{
        ...defaultPopoverStyle,
        left: adjustedPosition?.x ?? 0,
        top: adjustedPosition?.y ?? 0,
      }}
      role="listbox"
      aria-label={`Suggestions for "${word}"`}
    >
      {/* Header */}
      <div
        style={{
          padding: '8px 12px',
          fontWeight: 'bold',
          borderBottom: '1px solid #eee',
          color: type === 'spelling' ? '#c41e3a' : '#1e90ff',
        }}
      >
        {type === 'spelling' ? 'Spelling' : 'Grammar'}: {word}
      </div>
      
      {/* Suggestions */}
      {limitedSuggestions.length > 0 ? (
        limitedSuggestions.map((suggestion, index) => (
          <div
            key={`${suggestion.text}-${index}`}
            style={{
              ...defaultSuggestionStyle,
              ...(hoveredIndex === index ? defaultSuggestionHoverStyle : {}),
            }}
            onClick={() => onSelect(suggestion)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            role="option"
            aria-selected={hoveredIndex === index}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onSelect(suggestion);
              }
            }}
          >
            <span style={{ fontWeight: 500 }}>{suggestion.text}</span>
            {suggestion.description && (
              <span style={{ fontSize: '0.85em', color: '#666', marginTop: '2px' }}>
                {suggestion.description}
              </span>
            )}
          </div>
        ))
      ) : (
        <div style={{ padding: '8px 12px', color: '#999', fontStyle: 'italic' }}>
          No suggestions available
        </div>
      )}
      
      {/* Actions */}
      <div style={{ marginTop: '4px' }}>
        {type === 'spelling' && onAddToDictionary && (
          <div
            style={{
              ...defaultActionStyle,
              ...(hoveredIndex === -1 ? defaultSuggestionHoverStyle : {}),
            }}
            onClick={onAddToDictionary}
            onMouseEnter={() => setHoveredIndex(-1)}
            onMouseLeave={() => setHoveredIndex(null)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onAddToDictionary();
              }
            }}
          >
            ➕ Add to dictionary
          </div>
        )}
        
        {onIgnore && (
          <div
            style={{
              ...defaultActionStyle,
              borderTop: onAddToDictionary ? 'none' : '1px solid #eee',
              ...(hoveredIndex === -2 ? defaultSuggestionHoverStyle : {}),
            }}
            onClick={onIgnore}
            onMouseEnter={() => setHoveredIndex(-2)}
            onMouseLeave={() => setHoveredIndex(null)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onIgnore();
              }
            }}
          >
            🚫 Ignore
          </div>
        )}
      </div>
    </div>
  );
}
