"use client";
import { useState } from "react";

const API_BASE = "https://api.aqx.qzz.io";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState<any>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!url) return;
    setLoading(true);
    setError("");
    setVideo(null);
    try {
      const res = await fetch(`${API_BASE}/api/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setVideo(data);
    } catch (e: any) {
      setError("Hata: " + e.message);
    }
    setLoading(false);
  };

  const handleDownload = async (type: "mp4" | "mp3") => {
    try {
      const res = await fetch(`${API_BASE}/api/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, type }),
      });
      const data = await res.json();
      if (data.download_url) window.open(data.download_url, "_blank");
    } catch {
      setError("İndirme başlatılamadı");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1628] text-white flex flex-col">
      <header className="flex items-center justify-between px-4 py-3 border-b border-white/10 sticky top-0 bg-[#0A1628]/90 backdrop-blur z-10">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00D9FF] to-[#FF6B35] flex items-center justify-center font-bold">Q</div>
          <span className="font-bold text-lg">İndirici</span>
        </div>
        <span className="text-xs text-white/40">v1.0</span>
      </header>

      <main className="flex-1 px-4 py-6 max-w-md mx-auto w-full space-y-5">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="YouTube, TikTok veya Instagram linki..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#00D9FF] placeholder:text-white/30"
        />

        <button
          onClick={() => navigator.clipboard.readText().then(setUrl)}
          className="text-xs text-[#00D9FF] underline underline-offset-2"
        >
          📋 Panodan yapıştır
        </button>

        <button
          onClick={handleAnalyze}
          disabled={loading || !url}
          className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8C5A] font-semibold py-3.5 rounded-xl shadow-lg shadow-orange-500/20 disabled:opacity-40 active:scale-95 transition"
        >
          {loading ? "⏳ Analiz ediliyor..." : "🔍 Analiz Et"}
        </button>

        {error && (
          <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">{error}</p>
        )}

        {video && (
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <img src={video.thumbnail} alt="" className="w-full aspect-video object-cover" />
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-sm line-clamp-2">{video.title}</h3>
                <div className="flex gap-4 text-xs text-white/50">
                  <span>⏱ {video.duration}</span>
                  <span>👁 {video.views}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDownload("mp4")}
              className="w-full bg-[#00D9FF]/10 border border-[#00D9FF]/40 text-[#00D9FF] font-semibold py-3.5 rounded-xl active:scale-95"
            >
              ⬇️ MP4 İndir
            </button>
            <button
              onClick={() => handleDownload("mp3")}
              className="w-full bg-white/5 border border-white/10 text-white/80 font-semibold py-3.5 rounded-xl active:scale-95"
            >
              🎵 MP3 İndir
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
