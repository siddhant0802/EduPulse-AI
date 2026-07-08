import { Sparkles } from "lucide-react";

const insights = [
  "Attendance improved by 12%",
  "Grade 10 has highest performance",
  "Class 9B needs attention",
  "Science department is trending upward",
];

export default function AIInsightsCard() {
  return (
    <div className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 p-6 shadow-lg backdrop-blur-xl transition duration-300 hover:border-cyan-300/50 hover:bg-cyan-400/15">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-cyan-100/80">AI-generated insights</p>
          <h2 className="mt-2 text-2xl font-bold text-white">AI Insights</h2>
        </div>
        <div className="rounded-xl bg-cyan-400/20 p-3 text-cyan-100">
          <Sparkles size={26} />
        </div>
      </div>

      <div className="space-y-3">
        {insights.map((insight) => (
          <div key={insight} className="rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm font-medium text-slate-100">
            {insight}
          </div>
        ))}
      </div>
    </div>
  );
}
