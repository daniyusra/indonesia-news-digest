
'use client';

import { useState } from 'react';
import { TopicSummary } from '../types/article';
import { createPortal } from 'react-dom';
import MediumArticle from './MarkdownArticle';

type Props = {
  title: string;
  summaries: TopicSummary[];
};

export default function SummaryGroup({ title, summaries }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSummary, setSelectedSummary] = useState<TopicSummary | null>(null);

  return (
    <div style={{ margin: "1rem 0rem" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: '#0070f3',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '9999px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        {isOpen ? `Hide ${title}` : `Show ${title}`}
      </button>
      
      {isOpen && (
      <div
        style={{
            margin: '1rem',
            padding: '1rem',
            borderRadius: '0.75rem',
            backgroundColor: '#f5f5f5',
            border: '1px solid #ccc',
        }}
        >
        
            <ul style={{ marginTop: '1rem', paddingLeft: '1rem' }}>
            {summaries.map((s, i) => (
                <li key={i} style={{ marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: '600' }}>{s.topic}</span>
                <button
                    onClick={() => setSelectedSummary(s)}
                    style={{
                    marginLeft: '1rem',
                    padding: '0.3rem 0.75rem',
                    backgroundColor: '#111',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    }}
                >
                    View Summary
                </button>
                </li>
            ))}
            </ul>

        {selectedSummary && createPortal(
 <>
          {/* Backdrop */}
          <div
            onClick={() => setSelectedSummary(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999,
            }}
          />

          {/* Modal */}
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              padding: '4rem',
              borderRadius: '0.75rem',
              zIndex: 1000,
              width: '90%',
              maxHeight: '80%',
              overflow: "scroll",
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
            }}
          >
            <button
              onClick={() => setSelectedSummary(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              aria-label="Close"
            >
              &times;
            </button>
            <MediumArticle 
                    markdown={selectedSummary.summary}
                    title={selectedSummary.topic}
            />
          </div>
        </>,
            document.body
        )}
        </div>
        )}
    </div>
  );
}