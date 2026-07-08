import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between bg-slate-900 border-b border-slate-800 px-8 py-5">

      <div>
        <h2 className="text-2xl font-bold text-white">
          Dashboard
        </h2>

        <p className="text-slate-400 text-sm">
          Welcome back 👋
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="relative">

          <Search
            className="absolute left-3 top-3 text-slate-400"
            size={18}
          />

          <input
            placeholder="Search..."
            className="bg-slate-800 rounded-xl pl-10 pr-4 py-2 text-white outline-none border border-slate-700 focus:border-cyan-400"
          />

        </div>

        <button className="relative p-2 rounded-xl bg-slate-800 hover:bg-slate-700">

          <Bell size={20} />

          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500"></span>

        </button>

        <UserCircle2
          size={38}
          className="text-cyan-400"
        />

      </div>

    </header>
  );
}