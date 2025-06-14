'use client';

import ReactMarkdown from 'react-markdown';

interface MarkdownWrapperProps {
  content: string;
}

export default function MarkdownWrapper({ content }: MarkdownWrapperProps) {
  return <ReactMarkdown>{content}</ReactMarkdown>;
} 