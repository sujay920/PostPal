import React, { useState, useEffect } from 'react';
import './tailwind.css';

// Helper component for icons (kept for simplicity, but you can swap for Lucide/Heroicons)
const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={path} />
  </svg>
);

// Icon components (same as before)
const WandIcon = () => <Icon path="M9.5 2c-1.82 0-3.53.5-5 1.35 2.97 1.73 5 4.85 5 8.65s-2.03 6.92-5 8.65c1.47.85 3.18 1.35 5 1.35 5.52 0 10-4.48 10-10S15.02 2 9.5 2zm0 16c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm10.5-8c0 1.3-.29 2.52-.79 3.65l1.48 1.48c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0l-1.48-1.48C16.52 17.71 15.3 18 14 18c-1.82 0-3.53-.5-5-1.35 2.97-1.73 5-4.85 5-8.65s-2.03-6.92-5-8.65C10.47 2.5 12.18 2 14 2c5.52 0 10 4.48 10 10z" />;
const CopyIcon = () => <Icon path="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />;
const CheckIcon = () => <Icon path="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />;
const HashIcon = () => <Icon path="M10 9h4V7h-4v2zm-2 2h4V9h-4v2zm2 2h4v-2h-4v2zm-5 2h2v-2H5v2zm2-12h2V3H7v2zm8 0h2V3h-2v2zM7 17h2v-2H7v2zm8 0h2v-2h-2v2zm-2-2h4v-2h-4v2z" />;
const EmojiIcon = () => <Icon path="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />;
const RefineIcon = () => <Icon path="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />;
const LightbulbIcon = () => <Icon path="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />;
const ImageIcon = () => <Icon path="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />;
const ThreadIcon = () => <Icon path="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />;

// Main App Component
export default function App() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional');
  const [post, setPost] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [emojis, setEmojis] = useState('');
  const [critique, setCritique] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [postThread, setPostThread] = useState([]);
  const [loading, setLoading] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [copied, setCopied] = useState(null);

  // TODO: Insert your Gemini API key here
  const apiKey = ""; // <--- Set your Gemini API key here

  const tones = ['Professional', 'Casual', 'Inspirational', 'Story-telling', 'Witty', 'Thought-provoking', 'Technical'];

  const callGeminiAPI = async (prompt, loadingState) => {
    setLoading(loadingState);
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    };
    try {
      if (!apiKey) throw new Error('Missing Gemini API key.');
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const errorBody = await response.text();
        console.error("API Error Response:", errorBody);
        throw new Error(`API request failed with status ${response.status}`);
      }
      const result = await response.json();
      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        return result.candidates[0].content.parts[0].text.trim();
      } else {
        console.error("Unexpected API response structure:", result);
        throw new Error('Could not extract content from API response.');
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return `Error: ${error.message}. Please check the console for details.`;
    } finally {
      setLoading(null);
    }
  };

  const clearOutputs = () => {
    setHashtags('');
    setEmojis('');
    setCritique('');
    setImagePrompt('');
    setPostThread([]);
    setCopied(null);
  };

  const generatePost = async () => {
    if (!topic) return;
    setPost('');
    clearOutputs();
    const prompt = `You are an expert LinkedIn content creator with a ${tone} tone. Write an engaging and insightful LinkedIn post about the following topic: "${topic}". The post should be well-structured, easy to read, and encourage interaction. Do not include hashtags. Important: Start the response directly with the post content. Do not include any introductory phrases like "Here is the post" or similar conversational text.`;
    const generatedPost = await callGeminiAPI(prompt, 'post');
    setPost(generatedPost);
  };

  const generateHashtags = async () => {
    if (!post) return;
    const prompt = `Based on the following LinkedIn post, generate 5-7 relevant and popular hashtags. Return only the hashtags, separated by spaces. For example: #tagone #tagtwo #tagthree.\n\nPost:\n${post}`;
    const generatedHashtags = await callGeminiAPI(prompt, 'hashtags');
    setHashtags(generatedHashtags);
  };

  const generateEmojis = async () => {
    if (!post) return;
    const prompt = `Based on the following LinkedIn post, suggest a short string of 3-5 relevant emojis that could be added to the post to increase engagement. Return only the emoji string.\n\nPost:\n${post}`;
    const generatedEmojis = await callGeminiAPI(prompt, 'emojis');
    setEmojis(generatedEmojis);
  };

  const refinePost = async () => {
    if (!post) return;
    clearOutputs();
    const prompt = `You are an expert editor. Refine and improve the following LinkedIn post to make it more impactful and engaging, while maintaining a ${tone} tone. Keep the core message intact. Return only the refined post content, with no introductory text.\n\nOriginal Post:\n${post}`;
    const refinedPost = await callGeminiAPI(prompt, 'refine');
    setPost(refinedPost);
  };

  const critiquePost = async () => {
    if (!post) return;
    const prompt = `You are a LinkedIn growth expert providing constructive feedback. Analyze the following post and suggest 2-3 specific, actionable ways to improve its engagement and impact. Frame your feedback as helpful advice in bullet points. Don't rewrite the post, just critique it. Return only the critique content itself.\n\nPost:\n${post}`;
    const generatedCritique = await callGeminiAPI(prompt, 'critique');
    setCritique(generatedCritique);
  };

  const suggestImagePrompt = async () => {
    if (!post) return;
    const prompt = `You are an expert prompt engineer for AI image generation models like DALL-E or Midjourney. Based on the following LinkedIn post, create a descriptive, detailed text prompt to generate a visually appealing and relevant image. The prompt should focus on concepts, style, and composition. Return only the prompt.\n\nPost:\n${post}`;
    const generatedPrompt = await callGeminiAPI(prompt, 'image');
    setImagePrompt(generatedPrompt);
  };

  const createThread = async () => {
    if (!post) return;
    const prompt = `You are an expert LinkedIn content strategist. Take the following post content and break it down into a compelling, numbered 3-part LinkedIn thread. Each part of the thread should be a complete post. Start each part with a number like "1/3", "2/3", etc. Use a separator like "---" between each part of the thread. Maintain the original tone. Return only the thread parts, separated by '---', with no additional text.\n\nOriginal Content:\n${post}`;
    const generatedThread = await callGeminiAPI(prompt, 'thread');
    setPostThread(generatedThread.split('---').map(p => p.trim()));
  };

  // Modern clipboard API with fallback
  const copyToClipboard = async (text, type) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        // fallback for old browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(type);
      setTimeout(() => setCopied(null), 2500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  useEffect(() => {
    if (post) {
      setWordCount(post.split(/\s+/).filter(Boolean).length);
    } else {
      setWordCount(0);
    }
  }, [post]);

  // Animated gradient border for main card
  const GradientBorder = ({ children }) => (
    <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 animate-gradient-move">
      <div className="rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/20">{children}</div>
    </div>
  );

  const ActionButton = ({ onClick, disabled, loadingState, children, icon, className = '' }) => (
    <button
      onClick={onClick}
      disabled={loading}
      className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 ${className}`}
    >
      {loading === loadingState ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </button>
  );

  const OutputCard = ({ title, children, loadingState, content }) => {
    if (loading !== loadingState && !content) return null;
    return (
      <div className="p-4 bg-white/5 rounded-lg animate-fade-in border border-white/10 shadow-md">
        <h3 className="font-semibold text-white/80 mb-2">{title}</h3>
        {loading === loadingState ? <p className="text-white/50 text-sm">✨ Generating...</p> : children}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-gray-950 font-sans text-white p-4 sm:p-6 lg:p-8 flex items-center justify-center relative" style={{ fontFamily: 'Inter, JetBrains Mono, ui-sans-serif, system-ui' }}>
      {/* Subtle grid/dots background */}
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-0 pointer-events-none"></div>
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900/60 via-purple-900/60 to-pink-900/60 opacity-60 z-0 pointer-events-none"></div>
      {/* Glassmorphism overlay */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-2xl z-0 pointer-events-none"></div>

      <main className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 z-10">
        {/* Left Panel: Controls */}
        <GradientBorder>
          <div className="space-y-6 p-6 sm:p-8 rounded-2xl">
            <header>
              <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 tracking-tight">
                PostPal AI
              </h1>
              <p className="text-white/60 mt-2">Craft your next viral LinkedIn post with AI.</p>
            </header>

            {/* API Key warning */}
            {!apiKey && (
              <div className="bg-yellow-500/10 border border-yellow-400/30 text-yellow-200 rounded-lg px-4 py-3 text-sm flex items-center gap-2 animate-fade-in">
                <span className="font-bold">Warning:</span> No Gemini API key set. Please add your API key in <span className="font-mono">App.jsx</span> for the app to work.
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="topic" className="block mb-2 text-sm font-medium text-white/80">
                  What's your post about?
                </label>
                <input
                  id="topic"
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., The future of remote work"
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="tone" className="block mb-2 text-sm font-medium text-white/80">
                  Choose a tone
                </label>
                <select
                  id="tone"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 appearance-none bg-no-repeat bg-right-4"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
                >
                  {tones.map((t) => (
                    <option key={t} value={t} className="bg-gray-800 text-white">{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <ActionButton
              onClick={generatePost}
              disabled={!topic || loading}
              loadingState="post"
              icon={<WandIcon />}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg shadow-lg"
            >
              Generate Post
            </ActionButton>
          </div>
        </GradientBorder>

        {/* Right Panel: Output */}
        <GradientBorder>
          <div className="space-y-6 p-6 sm:p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white/90">Your AI-Generated Content</h2>

            {loading === 'post' && (
              <div className="flex flex-col items-center justify-center h-64 bg-white/5 rounded-lg border border-dashed border-white/20">
                <div className="w-8 h-8 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-white/60">Crafting your post...</p>
              </div>
            )}

            {!post && loading !== 'post' && (
              <div className="flex flex-col items-center justify-center h-64 bg-white/5 rounded-lg border border-dashed border-white/20">
                <WandIcon className="w-12 h-12 text-white/20" />
                <p className="mt-4 text-white/60">Your generated post will appear here.</p>
              </div>
            )}

            {post && (
              <div className="space-y-4 animate-fade-in">
                <div className="relative">
                  <textarea
                    value={post}
                    onChange={(e) => setPost(e.target.value)}
                    rows={10}
                    className="w-full p-4 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300 resize-y text-base leading-relaxed font-mono"
                  />
                  <div className="absolute bottom-3 right-3 flex items-center gap-4 text-sm text-white/50">
                    <span>{wordCount} words</span>
                    <button onClick={() => copyToClipboard(post, 'post')} className="flex items-center gap-1 hover:text-white transition-colors">
                      {copied === 'post' ? <CheckIcon className="w-4 h-4 text-green-400" /> : <CopyIcon className="w-4 h-4" />}
                      {copied === 'post' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <ActionButton onClick={refinePost} loadingState="refine" icon={<RefineIcon />} className="bg-white/10 hover:bg-white/20 text-xs sm:text-sm">Refine</ActionButton>
                  <ActionButton onClick={generateHashtags} loadingState="hashtags" icon={<HashIcon />} className="bg-white/10 hover:bg-white/20 text-xs sm:text-sm">Hashtags</ActionButton>
                  <ActionButton onClick={generateEmojis} loadingState="emojis" icon={<EmojiIcon />} className="bg-white/10 hover:bg-white/20 text-xs sm:text-sm">Emojis</ActionButton>
                  <ActionButton onClick={critiquePost} loadingState="critique" icon={<LightbulbIcon />} className="bg-white/10 hover:bg-white/20 text-xs sm:text-sm">Critique ✨</ActionButton>
                  <ActionButton onClick={suggestImagePrompt} loadingState="image" icon={<ImageIcon />} className="bg-white/10 hover:bg-white/20 text-xs sm:text-sm">Suggest Image ✨</ActionButton>
                  <ActionButton onClick={createThread} loadingState="thread" icon={<ThreadIcon />} className="bg-white/10 hover:bg-white/20 text-xs sm:text-sm">Create Thread ✨</ActionButton>
                </div>

                <div className="space-y-4">
                  <OutputCard title="Suggested Hashtags" loadingState="hashtags" content={hashtags}>
                    <div className="relative">
                      <p className="text-purple-300 font-mono text-sm pr-16">{hashtags}</p>
                      <button onClick={() => copyToClipboard(hashtags, 'hashtags')} className="absolute top-0 right-0 flex items-center gap-1 text-sm text-white/50 hover:text-white transition-colors">
                        {copied === 'hashtags' ? <CheckIcon className="w-4 h-4 text-green-400" /> : <CopyIcon className="w-4 h-4" />}
                      </button>
                    </div>
                  </OutputCard>

                  <OutputCard title="Suggested Emojis" loadingState="emojis" content={emojis}>
                    <p className="text-2xl">{emojis}</p>
                  </OutputCard>

                  <OutputCard title="AI Critique" loadingState="critique" content={critique}>
                    <p className="text-white/90 whitespace-pre-wrap text-base font-serif leading-relaxed">{critique}</p>
                  </OutputCard>

                  <OutputCard title="AI Image Prompt" loadingState="image" content={imagePrompt}>
                    <div className="relative">
                      <p className="text-teal-300 font-mono text-sm pr-16">{imagePrompt}</p>
                      <button onClick={() => copyToClipboard(imagePrompt, 'imagePrompt')} className="absolute top-0 right-0 flex items-center gap-1 text-sm text-white/50 hover:text-white transition-colors">
                        {copied === 'imagePrompt' ? <CheckIcon className="w-4 h-4 text-green-400" /> : <CopyIcon className="w-4 h-4" />}
                      </button>
                    </div>
                  </OutputCard>

                  <OutputCard title="LinkedIn Thread" loadingState="thread" content={postThread.length > 0}>
                    <div className="space-y-3">
                      {postThread.map((threadPart, index) => (
                        <div key={index} className="relative bg-black/20 p-3 rounded-md">
                          <p className="text-white/90 whitespace-pre-wrap text-sm pr-10">{threadPart}</p>
                          <button onClick={() => copyToClipboard(threadPart, `thread-${index}`)} className="absolute top-2 right-2 flex items-center gap-1 text-sm text-white/50 hover:text-white transition-colors">
                            {copied === `thread-${index}` ? <CheckIcon className="w-4 h-4 text-green-400" /> : <CopyIcon className="w-4 h-4" />}
                          </button>
                        </div>
                      ))}
                    </div>
                  </OutputCard>
                </div>
              </div>
            )}
          </div>
        </GradientBorder>
      </main>

      {/* Keyframes for animated gradient border */}
      <style>{`
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 6s ease-in-out infinite;
        }
        .font-mono { font-family: JetBrains Mono, Fira Mono, Menlo, monospace; }
        .animate-fade-in { animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1) both; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
} 