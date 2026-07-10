import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import {
  Bot,
  User,
  LayoutDashboard,
  LogOut,
  LogIn,
  UserPlus
} from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0E1028]/90 shadow-[0_15px_40px_rgba(0,0,0,.35)] backdrop-blur-2xl">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-violet-600/10 via-transparent to-pink-500/10" />

      <div className="relative mx-auto flex h-20 max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-10">
        <div className="flex items-center">
          <Link to="/" className="group flex shrink-0 items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-400 to-violet-600 shadow-xl transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
              <Bot size={28} className="text-white" strokeWidth={2.5} />
            </div>

            <div className="leading-tight">
              <h1 className="text-2xl font-black tracking-tight text-white">
                Interview<span className="text-violet-400">X</span>
                <span className="bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent">AI</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
                AI Interview Platform
              </p>
            </div>
          </Link>
        </div>

        <nav className="hidden flex-1 items-center justify-center md:flex">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className={`group flex items-center gap-3 rounded-2xl px-6 py-3 font-semibold transition-all duration-300 ${
                  isActive("/")
                    ? "border border-violet-500 bg-gradient-to-r from-violet-600/40 to-indigo-600/30 text-white shadow-lg"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="h-2 w-2 rounded-full bg-violet-400 transition group-hover:scale-125" />
                 <LayoutDashboard size={18} />
    <span>Dashboard</span>
              </Link>

              <Link
                to="/profile"
                className={`group flex items-center gap-3 rounded-2xl px-6 py-3 font-semibold transition-all duration-300 ${
                  isActive("/profile")
                    ? "border border-violet-500 bg-gradient-to-r from-violet-600/40 to-indigo-600/30 text-white shadow-lg"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="h-2 w-2 rounded-full bg-violet-400 transition group-hover:scale-125" />
                 <User size={18} />
    <span>Profile</span>
              </Link>
            </div>
          ) : (
  <div className="flex items-center gap-4">

    <Link
      to="/login"
      className={`flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold transition-all duration-300 ${
        isActive("/login")
          ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30"
          : "text-slate-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      <LogIn size={18} />
      <span>Login</span>
    </Link>

    <Link
      to="/register"
      className={`flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold transition-all duration-300 ${
        isActive("/register")
          ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30"
          : "text-slate-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      <UserPlus size={18} />
      <span>Register</span>
    </Link>

  </div>
)
          }
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {user ? (
            <>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-800/70 px-3 py-2 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-violet-400 hover:shadow-[0_15px_40px_rgba(124,58,237,.25)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-violet-600 text-white">
                  <User size={20} strokeWidth={2.5} />
                </div>

                <div className="leading-tight">
                  <p className="text-sm font-bold text-white">{user.name.split(" ")[0]}</p>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-green-400"></span>
                    <span className="text-[13px] text-slate-400">Online</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 px-7 py-3 font-black uppercase tracking-widest text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:brightness-110 hover:shadow-rose-500/40"
              >
               <LogOut size={18} />
    Logout
              </button>
            </>
          ) : null}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-slate-400 transition-colors hover:text-teal-400 md:hidden"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="border-t border-slate-800 bg-slate-900/95 backdrop-blur-xl md:hidden">
          <div className="space-y-4 px-6 py-8">
            {user ? (
              <>
                <div className="mb-6 flex items-center space-x-3 rounded-2xl border border-slate-700 bg-slate-800 p-4">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
                  <span className="text-lg font-black uppercase tracking-tighter text-slate-200">{user.name}</span>
                </div>
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block border-b border-slate-800 py-4 text-xl font-black uppercase tracking-widest ${isActive("/") ? "text-teal-400" : "text-slate-400"}`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block border-b border-slate-800 py-4 text-xl font-black uppercase tracking-widest ${isActive("/profile") ? "text-teal-400" : "text-slate-400"}`}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-2.5 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-violet-700 hover:to-fuchsia-700 hover:shadow-violet-500/30"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block border-b border-slate-800 py-4 text-xl font-black uppercase tracking-widest ${isActive("/login") ? "text-teal-400" : "text-slate-400"}`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-4 text-xl font-black uppercase tracking-widest ${isActive("/register") ? "text-teal-400" : "text-slate-400"}`}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
