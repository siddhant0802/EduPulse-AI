import { TrendingUp } from "lucide-react";

const predictions = [
  { title: "Expected attendance next month", value: "95%" },
  { title: "Expected pass rate", value: "91%" },
  { title: "Risk students", value: "18" },
];

export default function PredictionCard() {
  return (
    <div className="rounded-2xl border border-violet-300/20 bg-violet-500/10 p-6 shadow-lg backdrop-blur-xl transition duration-300 hover:border-violet-300/50 hover:bg-violet-500/15">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-violet-100/80">Predictive analytics</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Prediction Card</h2>
        </div>
        <div className="rounded-xl bg-violet-400/20 p-3 text-violet-100">
          <TrendingUp size={26} />
        </div>
      </div>

      <div className="grid gap-4">
        {predictions.map((prediction) => (
          <div key={prediction.title} className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
            <p className="text-sm text-slate-400">{prediction.title}</p>
            <h3 className="mt-2 text-2xl font-bold text-white">{prediction.value}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
