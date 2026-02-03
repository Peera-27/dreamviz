/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";

export default function Home() {
  const [dream, setDream] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const analyzeDream = async () => {
    if (!dream) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dreamText: dream }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert("เชื่อมต่อไม่สำเร็จ ลองใหม่อีกครั้งนะ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-2xl w-full z-10 space-y-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Dream Reader
          </h1>
          <p className="text-slate-400 text-lg">
            ถอดรหัสความฝัน...ค้นหาความจริงในใจคุณ
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl transition-all hover:border-purple-500/30">
          <textarea
            className="w-full h-40 bg-transparent text-lg text-slate-200 placeholder:text-slate-600 border-none focus:ring-0 resize-none"
            placeholder="เล่าความฝันของคุณให้ฟังหน่อย..."
            value={dream}
            onChange={(e) => setDream(e.target.value)}
          />
          <div className="flex justify-between items-center mt-4 border-t border-white/10 pt-4">
            <span className="text-xs text-slate-500">
              AI Psychology Analysis
            </span>
            <button
              onClick={analyzeDream}
              disabled={loading || !dream}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-all shadow-lg shadow-purple-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "กำลังทำนาย..." : "ทำนายฝัน"}
            </button>
          </div>
        </div>

        {/* Result Card */}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-gradient-to-br from-indigo-950 to-slate-900 border border-indigo-500/30 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
              {/* Stress Level Badge */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="text-xs text-indigo-300 uppercase tracking-wider">
                  Stress Level
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    Number(result.stressLevel) > 7
                      ? "bg-red-500/20 text-red-400 border border-red-500/50"
                      : Number(result.stressLevel) > 4
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                        : "bg-green-500/20 text-green-400 border border-green-500/50"
                  }`}
                >
                  {result.stressLevel}
                </div>
              </div>

              {/* Insight Content */}
              <h3 className="text-xl font-semibold text-purple-300 mb-4">
                🔮 คำทำนายจากจิตใต้สำนึก
              </h3>
              <p className="text-slate-200 text-lg leading-relaxed font-light">
                &ldquo;{result.insight}&rdquo;
              </p>

              <div className="mt-6 pt-6 border-t border-white/5 text-center">
                <span className="text-sm text-slate-500">
                  แนะนำ: ลองจดบันทึกความฝันทุกวันเพื่อดูแนวโน้มสุขภาพจิต
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
