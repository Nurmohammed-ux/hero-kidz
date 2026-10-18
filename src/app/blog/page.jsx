"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  FaArrowRight,
  FaBookmark,
  FaCheck,
  FaClock,
  FaCode,
  FaCopy,
  FaHeart,
  FaLaptopCode,
  FaRegBookmark,
  FaRegHeart,
  FaSearch,
  FaTerminal,
  FaTimes,
} from "react-icons/fa";
import { FaSprayCanSparkles } from "react-icons/fa6";
import Swal from "sweetalert2";

/**
 * Reusable Code Snippet Block Component with One-Click Copy functionality
 */
const CodeBlock = ({
  code,
  language = "javascript",
  title = "DIY Code Snippet",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        // Fallback for older browsers or permission restriction contexts
        const textArea = document.createElement("textarea");
        textArea.value = code;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);

      // SweetAlert2 Toast Feedback
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "success",
        title: "Code copied to clipboard!",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        background: "#3C352D",
        color: "#ffffff",
        iconColor: "#F28C38",
      });

      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      Swal.fire({
        toast: true,
        position: "bottom-end",
        icon: "error",
        title: "Could not copy code automatically",
        showConfirmButton: false,
        timer: 2000,
        background: "#3C352D",
        color: "#ffffff",
      });
    }
  };

  return (
    <div className="my-4 rounded-2xl overflow-hidden border border-[#2D2721] bg-[#1E1B18] shadow-lg font-mono text-sm sm:text-sm">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#2A241F] border-b border-[#3C352D] text-gray-300">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block"></span>
          </div>
          <span className="ml-2 font-semibold text-[11px] text-primary tracking-wide flex items-center gap-1.5">
            <FaTerminal className="h-3 w-3" /> {title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="uppercase text-[10px] font-bold px-2 py-0.5 rounded bg-[#3C352D] text-gray-300 border border-[#4A4238]">
            {language}
          </span>

          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-bold transition-all ${
              copied
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-primary hover:bg-[#d97525] text-white shadow-sm"
            }`}
          >
            {copied ? (
              <>
                <FaCheck className="h-3 w-3" /> Copied!
              </>
            ) : (
              <>
                <FaCopy className="h-3 w-3" /> Copy Code
              </>
            )}
          </button>
        </div>
      </div>

      {/* Syntax Code Body */}
      <div className="p-4 overflow-x-auto text-amber-100/90 leading-relaxed font-mono">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

/**
 * Mock Articles with Code Snippets for Hero Kidz Blog
 */
const MOCK_ARTICLES = [
  {
    id: "hero-1",
    title: "Teach Kids Coding: Building a Simple Scratch Hero Jump Game in JS",
    slug: "teach-kids-coding-js-hero-game",
    category: "Kid Tech & Coding",
    excerpt:
      "Introduce your little hero to programming with this easy 15-line JavaScript game logic. Perfect for weekend parent-child coding projects!",
    content: `Coding fosters problem-solving and structured thinking in young minds. You don't need a computer science degree to guide your kids!
    
Below is a simple JavaScript jumper script you can copy and paste directly into your browser developer console to run an interactive hero character jump action!`,
    codeSnippet: {
      language: "javascript",
      title: "hero-jumper.js",
      code: `// Hero Kidz Jumper Logic
function makeHeroJump(heroName = "Super Kid") {
  let score = 0;
  console.log(\`🚀 \${heroName} is ready to fly!\`);

  const jumpInterval = setInterval(() => {
    score += 10;
    console.log(\`⭐ \${heroName} jumped! Total Score: \${score}\`);
    
    if (score >= 50) {
      clearInterval(jumpInterval);
      console.log("🎉 Mission Complete! You won!");
    }
  }, 1000);
}

// Start the game!
makeHeroJump("Captain Alex");`,
    },
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000",
    author: "Alex Rivera (Tech Parent)",
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    date: "Oct 16, 2026",
    readTime: "6 min read",
    likes: 184,
    isFeatured: true,
    tags: ["Coding", "JavaScript", "DIY Game", "STEM"],
  },
  {
    id: "article-2",
    title: "DIY Smart Nightlight: Python Raspberry Pi Code for Kids Bedtime",
    slug: "diy-smart-nightlight-python-code",
    category: "DIY Projects",
    excerpt:
      "Build an automatic rainbow soothing nightlight that dims when it’s bedtime using Python and an affordable LED ribbon.",
    content: `Bedtime routines become magical when kids help build their own bedroom accessories! Here is the Python snippet used to animate smooth pastel color fades.`,
    codeSnippet: {
      language: "python",
      title: "bedtime_nightlight.py",
      code: `import time

def start_soothing_light(duration_minutes=30):
    brightness = 100
    print("🌙 Hero Nightlight Activated: Mode Calm")
    
    while brightness > 0:
        print(f"Dimming light... Brightness: {brightness}%")
        brightness -= 10
        time.sleep(2) # Dim every 2 seconds
        
    print("😴 Sleep tight little superhero!")

start_soothing_light()`,
    },
    image:
      "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=600",
    author: "Sarah Jenkins",
    authorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    date: "Oct 12, 2026",
    readTime: "5 min read",
    likes: 120,
    isFeatured: false,
    tags: ["Python", "RaspberryPi", "Bedtime"],
  },
  {
    id: "article-3",
    title: "10 Creative Play-Based Learning Games for Kids Aged 3-7",
    slug: "creative-play-based-learning-games",
    category: "Parenting Tips",
    excerpt:
      "Unlock your child’s imagination and critical thinking skills with these simple yet engaging active play games that make learning fun.",
    content: `Play is essential for early childhood development. When children engage in play-based learning, they activate problem-solving skills and emotional intelligence without feeling pressure.`,
    codeSnippet: null,
    image:
      "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=600",
    author: "Dr. Aris Thorne",
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    date: "Oct 08, 2026",
    readTime: "4 min read",
    likes: 240,
    isFeatured: false,
    tags: ["Learning", "Preschool", "Parenting"],
  },
  {
    id: "article-4",
    title: "HTML & CSS Card Styling: Build Your Kid’s First Hero Profile Page",
    slug: "html-css-kid-hero-profile-page",
    category: "Kid Tech & Coding",
    excerpt:
      "Teach your kids basic web development with this customizable superhero profile card template.",
    content: `HTML and CSS provide instant visual gratification for young learners. Copy this simple HTML structure and open it in any web browser!`,
    codeSnippet: {
      language: "html",
      title: "hero-profile.html",
      code: `<div class="hero-card">
  <h2>🦸‍♂️ Hero Name: Super Maya</h2>
  <p>Superpower: Instant Math Speed</p>
  <button onclick="alert('Power Activated!')">Activate Power</button>
</div>

<style>
  .hero-card {
    background: #F28C38;
    color: white;
    padding: 20px;
    border-radius: 16px;
    font-family: sans-serif;
  }
</style>`,
    },
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=600",
    author: "Alex Rivera",
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
    date: "Oct 02, 2026",
    readTime: "4 min read",
    likes: 95,
    isFeatured: false,
    tags: ["HTML", "CSS", "CodingForKids"],
  },
];

const CATEGORIES = [
  "All",
  "Kid Tech & Coding",
  "DIY Projects",
  "Parenting Tips",
  "Toy Reviews",
];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarks, setBookmarks] = useState({});
  const [likes, setLikes] = useState({});
  const [likeCounts, setLikeCounts] = useState(
    MOCK_ARTICLES.reduce(
      (acc, item) => ({ ...acc, [item.id]: item.likes }),
      {},
    ),
  );
  const [selectedArticle, setSelectedArticle] = useState(null);

  const filteredArticles = useMemo(() => {
    return MOCK_ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === "All" || article.category === selectedCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredArticle =
    MOCK_ARTICLES.find((a) => a.isFeatured) || MOCK_ARTICLES[0];

  const toggleBookmark = (id, e) => {
    e?.stopPropagation();
    setBookmarks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleLike = (id, e) => {
    e?.stopPropagation();
    const isLiked = likes[id];
    setLikes((prev) => ({ ...prev, [id]: !isLiked }));
    setLikeCounts((prev) => ({
      ...prev,
      [id]: isLiked ? prev[id] - 1 : prev[id] + 1,
    }));
  };

  return (
    <div className="min-h-screen text-[#3C352D] font-sans pb-16">
      {/* HEADER HERO */}
      <header className="relative border-b border-[#EAE3D2] pt-12 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm uppercase tracking-wider mb-4 border border-[#F28C38]/20">
            <FaLaptopCode className="h-3.5 w-3.5" /> Hero Kidz Tech & DIY
            Journal
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#3C352D]">
            Coding, DIY &{" "}
            <span className="text-primary">Parenting Guides</span>
          </h1>
          <p className="mt-4 text-base text-[#776B5D]">
            Copy-pasteable code tutorials, STEM projects, and fun parenting tips
            designed for young heroes.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400">
                <FaSearch className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Search JavaScript, Python, STEM, DIY games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-[#E0D8CC] shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-[#F28C38]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 text-gray-400"
                >
                  <FaTimes className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="px-8 pt-10">
        {/* FEATURED HERO ARTICLE WITH CODE SNIPPET */}
        {!searchQuery && selectedCategory === "All" && featuredArticle && (
          <section className="mb-12">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-[#EFE8DC] grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-6 relative min-h-70 lg:min-h-105">
                <Image
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold shadow-md flex items-center gap-1.5 uppercase z-10">
                  <FaSprayCanSparkles className="h-3 w-3" /> Featured Tutorial
                </span>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-sm text-[#776B5D] mb-3">
                    <span className="bg-[#FAF8F5] px-3 py-1 rounded-full border border-[#E0D8CC] font-bold text-[#3C352D]">
                      {featuredArticle.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock className="h-3 w-3 text-primary" />{" "}
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <h2
                    onClick={() => setSelectedArticle(featuredArticle)}
                    className="text-2xl font-extrabold text-[#3C352D] hover:text-primary transition cursor-pointer"
                  >
                    {featuredArticle.title}
                  </h2>

                  <p className="mt-3 text-sm sm:text-sm text-[#776B5D] leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>

                  {/* Embedded Interactive Code Snippet */}
                  {featuredArticle.codeSnippet && (
                    <div className="mt-4">
                      <CodeBlock
                        code={featuredArticle.codeSnippet.code}
                        language={featuredArticle.codeSnippet.language}
                        title={featuredArticle.codeSnippet.title}
                      />
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Image
                      src={featuredArticle.authorAvatar}
                      alt={featuredArticle.author}
                      width={28}
                      height={28}
                      className="rounded-full object-cover"
                    />
                    <span className="text-sm font-bold text-[#3C352D]">
                      {featuredArticle.author}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedArticle(featuredArticle)}
                    className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-sm flex items-center gap-1.5 hover:bg-[#d97525] transition shadow-md"
                  >
                    Full Guide <FaArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CATEGORY FILTER TABS */}
        <section className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-[#EAE3D2]">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-[#3C352D] text-white shadow-md"
                      : "bg-white text-[#776B5D] hover:bg-[#EFE8DC] border border-[#E0D8CC]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <p className="text-sm font-bold text-[#776B5D]">
              Showing{" "}
              <span className="text-primary">{filteredArticles.length}</span>{" "}
              posts
            </p>
          </div>
        </section>

        {/* POSTS GRID */}
        {filteredArticles.length > 0 ? (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredArticles.map((article) => {
              const isBookmarked = bookmarks[article.id];
              const isLiked = likes[article.id];
              const currentLikes = likeCounts[article.id] || article.likes;

              return (
                <article
                  key={article.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#EFE8DC] flex flex-col justify-between"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-[#FAF8F5] text-[#3C352D] text-[11px] font-extrabold px-3 py-1 rounded-full border border-gray-200">
                        {article.category}
                      </span>

                      <button
                        onClick={(e) => toggleBookmark(article.id, e)}
                        className="text-[#3C352D] hover:text-primary transition"
                      >
                        {isBookmarked ? (
                          <FaBookmark className="h-4 w-4 text-primary" />
                        ) : (
                          <FaRegBookmark className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    <h3
                      onClick={() => setSelectedArticle(article)}
                      className="text-lg font-bold text-[#3C352D] leading-snug hover:text-primary transition cursor-pointer"
                    >
                      {article.title}
                    </h3>

                    <p className="mt-2 text-sm text-[#776B5D] line-clamp-2">
                      {article.excerpt}
                    </p>

                    {/* Integrated Code Snippet in List Card */}
                    {article.codeSnippet && (
                      <div className="mt-3">
                        <CodeBlock
                          code={article.codeSnippet.code}
                          language={article.codeSnippet.language}
                          title={article.codeSnippet.title}
                        />
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 py-3.5 bg-[#FAF8F5]/50 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        src={article.authorAvatar}
                        alt={article.author}
                        width={24}
                        height={24}
                        className="rounded-full object-cover"
                      />
                      <span className="text-sm font-semibold text-[#3C352D]">
                        {article.author}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={(e) => toggleLike(article.id, e)}
                        className="flex items-center gap-1 text-sm text-[#776B5D] hover:text-primary"
                      >
                        {isLiked ? (
                          <FaHeart className="h-3.5 w-3.5 text-red-500" />
                        ) : (
                          <FaRegHeart className="h-3.5 w-3.5" />
                        )}
                        <span className="font-bold">{currentLikes}</span>
                      </button>

                      <button
                        onClick={() => setSelectedArticle(article)}
                        className="text-sm font-bold text-primary hover:text-[#d97525] flex items-center gap-1"
                      >
                        Read <FaArrowRight className="h-2.5 w-2.5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#EFE8DC] p-8">
            <FaCode className="h-10 w-10 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#3C352D]">
              No Coding Articles Found
            </h3>
            <p className="mt-1 text-sm text-[#776B5D]">
              Try adjusting your search query or reset the filter.
            </p>
          </div>
        )}
      </main>

      {/* ARTICLE READER MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-[#E0D8CC] p-6 sm:p-8">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 text-[#3C352D] hover:bg-gray-200 flex items-center justify-center transition"
            >
              <FaTimes className="h-4 w-4" />
            </button>

            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold uppercase">
              {selectedArticle.category}
            </span>

            <h2 className="text-2xl font-extrabold text-[#3C352D] mt-3">
              {selectedArticle.title}
            </h2>

            <p className="text-sm text-[#776B5D] mt-1 mb-4">
              By {selectedArticle.author} on {selectedArticle.date} •{" "}
              {selectedArticle.readTime}
            </p>

            <div className="text-sm text-[#3C352D] leading-relaxed whitespace-pre-line mb-6">
              {selectedArticle.content}
            </div>

            {/* Code Block in Modal */}
            {selectedArticle.codeSnippet && (
              <div className="my-4">
                <h4 className="text-sm font-bold uppercase text-[#776B5D] mb-2 flex items-center gap-1.5">
                  <FaCode className="text-primary" /> Tutorial Code Snippet
                </h4>
                <CodeBlock
                  code={selectedArticle.codeSnippet.code}
                  language={selectedArticle.codeSnippet.language}
                  title={selectedArticle.codeSnippet.title}
                />
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 rounded-xl bg-[#3C352D] text-white font-bold text-sm cursor-pointer"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;