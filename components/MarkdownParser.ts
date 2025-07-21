// Simple markdown parser for Medium-style articles
export interface ParsedElement {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'blockquote' | 'code' | 'ul' | 'ol' | 'li' | 'img' | 'hr';
  content: string;
  children?: ParsedElement[];
  attributes?: Record<string, string>;
}

export class MarkdownParser {
  private lines: string[];
  private currentIndex: number;

  constructor(markdown: string) {
    this.lines = markdown.split('\n');
    this.currentIndex = 0;
  }

  parse(): ParsedElement[] {
    const elements: ParsedElement[] = [];
    
    while (this.currentIndex < this.lines.length) {
      const line = this.lines[this.currentIndex].trim();
      
      if (line === '') {
        this.currentIndex++;
        continue;
      }

      const element = this.parseLine(line);
      if (element) {
        elements.push(element);
      }
      this.currentIndex++;
    }
    
    return elements;
  }

  private parseLine(line: string): ParsedElement | null {
    // Headers
    if (line.startsWith('#')) {
      const level = line.match(/^#+/)?.[0].length || 1;
      const content = line.substring(level).trim();
      return {
        type: `h${Math.min(level, 6)}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
        content: this.parseInlineElements(content)
      };
    }

    // Blockquotes
    if (line.startsWith('>')) {
      const content = line.substring(1).trim();
      return {
        type: 'blockquote',
        content: this.parseInlineElements(content)
      };
    }

    // Code blocks
    if (line.startsWith('```')) {
      const codeLines: string[] = [];
      this.currentIndex++;
      
      while (this.currentIndex < this.lines.length) {
        const codeLine = this.lines[this.currentIndex];
        if (codeLine.trim().startsWith('```')) {
          break;
        }
        codeLines.push(codeLine);
        this.currentIndex++;
      }
      
      return {
        type: 'code',
        content: codeLines.join('\n')
      };
    }

    // Horizontal rule
    if (line.match(/^(-{3,}|\*{3,}|_{3,})$/)) {
      return {
        type: 'hr',
        content: ''
      };
    }

    // Unordered lists
    if (line.match(/^[-*+]\s/)) {
      const items: ParsedElement[] = [];
      const content = line.substring(2).trim();
      items.push({
        type: 'li',
        content: this.parseInlineElements(content)
      });

      // Look ahead for more list items
      while (this.currentIndex + 1 < this.lines.length) {
        const nextLine = this.lines[this.currentIndex + 1].trim();
        if (nextLine.match(/^[-*+]\s/)) {
          this.currentIndex++;
          const nextContent = nextLine.substring(2).trim();
          items.push({
            type: 'li',
            content: this.parseInlineElements(nextContent)
          });
        } else {
          break;
        }
      }

      return {
        type: 'ul',
        content: '',
        children: items
      };
    }

    // Ordered lists
    if (line.match(/^\d+\.\s/)) {
      const items: ParsedElement[] = [];
      const content = line.replace(/^\d+\.\s/, '').trim();
      items.push({
        type: 'li',
        content: this.parseInlineElements(content)
      });

      // Look ahead for more list items
      while (this.currentIndex + 1 < this.lines.length) {
        const nextLine = this.lines[this.currentIndex + 1].trim();
        if (nextLine.match(/^\d+\.\s/)) {
          this.currentIndex++;
          const nextContent = nextLine.replace(/^\d+\.\s/, '').trim();
          items.push({
            type: 'li',
            content: this.parseInlineElements(nextContent)
          });
        } else {
          break;
        }
      }

      return {
        type: 'ol',
        content: '',
        children: items
      };
    }

    // Images
    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      return {
        type: 'img',
        content: '',
        attributes: {
          alt: imgMatch[1],
          src: imgMatch[2]
        }
      };
    }

    // Paragraphs (default)
    return {
      type: 'p',
      content: this.parseInlineElements(line)
    };
  }

  private parseInlineElements(text: string): string {
    // Bold **text**
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Italic *text*
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Inline code `code`
    text = text.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
    
    // Links [text](url)
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="article-link">$1</a>');
    
    return text;
  }
}