import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Command, Search, Sparkles } from 'lucide-react';

const CommandPalette = ({ actions, onClose, onSelect }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const filteredActions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return actions;
    }

    return actions.filter((action) => {
      const searchSpace = [action.label, action.subtitle, ...(action.keywords || [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchSpace.includes(normalizedQuery);
    });
  }, [actions, query]);

  const safeSelectedIndex = Math.min(selectedIndex, Math.max(0, filteredActions.length - 1));

  useEffect(() => {
    window.setTimeout(() => inputRef.current?.focus(), 0);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setSelectedIndex((prev) => {
          if (!filteredActions.length) {
            return 0;
          }

          return (prev + 1) % filteredActions.length;
        });
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setSelectedIndex((prev) => {
          if (!filteredActions.length) {
            return 0;
          }

          return prev === 0 ? filteredActions.length - 1 : prev - 1;
        });
        return;
      }

      if (event.key === 'Enter') {
        const targetAction = filteredActions[safeSelectedIndex];

        if (targetAction) {
          event.preventDefault();
          onSelect(targetAction);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredActions, onClose, onSelect, safeSelectedIndex]);

  return (
    <div className="command-palette-overlay" onClick={onClose}>
      <div className="command-palette" onClick={(event) => event.stopPropagation()}>
        <div className="command-palette-head">
          <Command size={16} />
          <span>Command Palette</span>
          <kbd>Ctrl + K</kbd>
        </div>

        <div className="command-palette-search">
          <Search size={16} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search commands and apps..."
          />
        </div>

        <div className="command-palette-list">
          {filteredActions.length ? (
            filteredActions.map((action, index) => (
              <button
                key={action.id}
                type="button"
                className={`command-palette-item ${safeSelectedIndex === index ? 'active' : ''}`}
                style={{ '--item-index': index }}
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={() => {
                  onSelect(action);
                  onClose();
                }}
              >
                <div>
                  <strong>{action.label}</strong>
                  {action.subtitle ? <span>{action.subtitle}</span> : null}
                </div>
                {action.hint ? <kbd>{action.hint}</kbd> : null}
              </button>
            ))
          ) : (
            <div className="command-palette-empty">
              <Sparkles size={16} />
              <p>No matching commands</p>
              <span>Try searching by app name, action, or keyword.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
