import React, { useState } from 'react';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

export default function App() {
  const [markdown, setMarkdown] = useState('# Hello\n\nThis is **bold** text.');
  const [html, setHtml] = useState(md.render('# Hello\n\nThis is **bold** text.'));
  const [copied, setCopied] = useState(false);

  const handleChange = (text) => {
    setMarkdown(text);
    setHtml(md.render(text));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 p-4">
      <div className="max-w-5xl mx-auto py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Markdown to HTML</h1>
        <p className="text-gray-400 mb-8">Convert Markdown to HTML instantly. Perfect for blogging and documentation.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Markdown Input</label>
            <textarea value={markdown} onChange={(e) => handleChange(e.target.value)} placeholder="Write Markdown here..." className="w-full h-96 px-4 py-3 bg-slate-800 border border-slate-700 text-white placeholder-gray-500 rounded focus:outline-none focus:border-blue-500 font-mono text-sm" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">HTML Output</label>
            <pre className="w-full h-96 px-4 py-3 bg-slate-800 border border-slate-700 text-gray-300 rounded overflow-auto font-mono text-sm"><code>{html}</code></pre>
          </div>
        </div>

        <button onClick={copyToClipboard} className="mt-6 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded">
          {copied ? '✓ Copied' : 'Copy HTML'}
        </button>
      </div>
    </div>
  );
}
