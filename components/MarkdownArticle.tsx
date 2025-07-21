import React from 'react';
import { MarkdownParser, ParsedElement } from './MarkdownParser';

interface MediumArticleProps {
  markdown: string;
  title?: string;
  author?: string;
  publishDate?: string;
  readTime?: string;
}

const MediumArticle: React.FC<MediumArticleProps> = ({
  markdown,
  title,
  author,
  publishDate,
  readTime
}) => {
  const parser = new MarkdownParser(markdown);
  const elements = parser.parse();

  const renderElement = (element: ParsedElement, index: number): React.ReactNode => {
    const key = `${element.type}-${index}`;

    switch (element.type) {
      case 'h1':
        return (
          <h1 key={key} className="text-2xl md:text-4xl font-bold text-gray-900 leading-snug mb-4 md:mb-6" 
              dangerouslySetInnerHTML={{ __html: element.content }} />
        );
      case 'h2':
        return (
          <h2 key={key} className="text-xl md:text-3xl font-bold text-gray-900 leading-snug mt-6 md:mt-10 mb-3 md:mb-5" 
              dangerouslySetInnerHTML={{ __html: element.content }} />
        );
      case 'h3':
        return (
          <h3 key={key} className="text-lg md:text-2xl font-bold text-gray-900 leading-snug mt-5 md:mt-8 mb-2 md:mb-4" 
              dangerouslySetInnerHTML={{ __html: element.content }} />
        );
      case 'h4':
        return (
          <h4 key={key} className="text-base md:text-xl font-bold text-gray-900 leading-snug mt-4 md:mt-6 mb-2 md:mb-3" 
              dangerouslySetInnerHTML={{ __html: element.content }} />
        );
      case 'h5':
        return (
          <h5 key={key} className="text-base md:text-lg font-bold text-gray-900 leading-snug mt-3 md:mt-5 mb-2" 
              dangerouslySetInnerHTML={{ __html: element.content }} />
        );
      case 'h6':
        return (
          <h6 key={key} className="text-sm md:text-base font-bold text-gray-900 leading-snug mt-3 md:mt-4 mb-1 md:mb-2" 
              dangerouslySetInnerHTML={{ __html: element.content }} />
        );
      case 'p':
        return (
          <p key={key} className="text-base md:text-lg text-gray-800 leading-relaxed mb-4 md:mb-5 article-paragraph" 
             dangerouslySetInnerHTML={{ __html: element.content }} />
        );
      case 'blockquote':
        return (
          <blockquote key={key} className="border-l-4 border-green-500 pl-4 md:pl-6 py-3 md:py-4 my-4 md:my-6 bg-gray-50 rounded-r-lg">
            <p className="text-base md:text-lg text-gray-700 italic leading-relaxed" 
               dangerouslySetInnerHTML={{ __html: element.content }} />
          </blockquote>
        );
      case 'code':
        return (
          <pre key={key} className="bg-gray-900 text-green-400 p-3 md:p-4 rounded-lg my-4 md:my-6 overflow-x-auto">
            <code className="text-xs md:text-sm font-mono leading-relaxed">{element.content}</code>
          </pre>
        );
      case 'ul':
        return (
          <ul key={key} className="space-y-1 md:space-y-2 my-3 md:my-4 ml-4 md:ml-6">
            {element.children?.map((child, childIndex) => renderElement(child, childIndex))}
          </ul>
        );
      case 'ol':
        return (
          <ol key={key} className="space-y-1 md:space-y-2 my-3 md:my-4 ml-4 md:ml-6 list-decimal">
            {element.children?.map((child, childIndex) => renderElement(child, childIndex))}
          </ol>
        );
      case 'li':
        return (
          <li key={key} className="text-base md:text-lg text-gray-800 leading-relaxed list-disc" 
              dangerouslySetInnerHTML={{ __html: element.content }} />
        );
      case 'img':
        return (
          <div key={key} className="my-6 md:my-8">
            <img 
              src={element.attributes?.src} 
              alt={element.attributes?.alt}
              className="w-full h-auto rounded-lg shadow-lg"
            />
            {element.attributes?.alt && (
              <p className="text-center text-xs md:text-sm text-gray-600 mt-2 md:mt-3 italic">
                {element.attributes.alt}
              </p>
            )}
          </div>
        );
      case 'hr':
        return (
          <hr key={key} className="border-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-6 md:my-8" />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto content-center">
        {/* Article Header */}
        {(title || author || publishDate || readTime) && (
            <header className="mb-6 md:mb-10 border-b border-gray-200 pb-4 md:pb-6">
            {title && (
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-3 md:mb-4">
                {title}
                </h1>
            )}
            
            {(author || publishDate || readTime) && (
                <div className="flex flex-wrap items-center gap-2 md:gap-3 text-gray-600 text-sm md:text-base">
                {author && (
                    <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-xs md:text-sm">
                        {author.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <span className="font-medium text-sm md:text-base">{author}</span>
                    </div>
                )}
                
                {publishDate && (
                    <>
                    <span className="text-gray-400">·</span>
                    <time className="text-xs md:text-sm">{publishDate}</time>
                    </>
                )}
                
                {readTime && (
                    <>
                    <span className="text-gray-400">·</span>
                    <span className="text-xs md:text-sm">{readTime}</span>
                    </>
                )}
                </div>
            )}
            </header>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
            {elements.map((element, index) => renderElement(element, index))}
        </div>

        <style jsx>{`
            .article-paragraph strong {
            font-weight: 600;
            color: #1f2937;
            }
            
            .article-paragraph em {
            font-style: italic;
            color: #374151;
            }
            
            .inline-code {
            background-color: #f3f4f6;
            color: #dc2626;
            padding: 0.1rem 0.25rem;
            border-radius: 0.25rem;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 0.8em;
            }
            
            .article-link {
            color: #059669;
            text-decoration: underline;
            text-decoration-color: #34d399;
            text-underline-offset: 2px;
            transition: all 0.2s ease;
            }
            
            .article-link:hover {
            color: #047857;
            text-decoration-color: #059669;
            }
        `}</style>
    </div>
  );
};

export default MediumArticle;