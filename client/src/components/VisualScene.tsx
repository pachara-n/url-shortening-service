import { FiLink } from "react-icons/fi";

export function VisualScene() {
  return (
    <div className="hidden md:flex flex-1 relative w-full aspect-square md:aspect-auto items-center justify-center -mt-10 md:mt-0">
      
      {/* 1. Optimized Static Supporting Rings */}
      <div className="absolute w-[280px] h-[280px] rounded-full border border-primary/10 opacity-40"></div>
      <div className="absolute w-[360px] h-[360px] rounded-full border border-primary/5 opacity-30"></div>
      <div className="absolute w-[460px] h-[460px] rounded-full border border-primary/5 opacity-20"></div>

      {/* 2. Gentle Ripple Waves (Smaller & Slower) */}
      <div className="absolute w-64 h-64 rounded-full border-2 border-primary/15 animate-ripple"></div>
      <div className="absolute w-64 h-64 rounded-full border-2 border-primary/10 animate-ripple [animation-delay:1.5s]"></div>
      <div className="absolute w-64 h-64 rounded-full border-2 border-primary/5 animate-ripple [animation-delay:3s]"></div>
      
      {/* 3. Deep Background Glow Atmos */}
      <div className="absolute w-full h-full max-w-[600px] max-h-[600px] rounded-full bg-primary/5 blur-[120px] animate-pulse"></div>
      <div className="absolute w-[600px] h-[600px] rounded-full border border-primary/5 animate-[pulse_8s_ease-in-out_infinite_-2s] opacity-5"></div>

      {/* Main 3D Sphere Container */}
      <div className="relative w-72 h-72 lg:w-80 lg:h-80 animate-float flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full drop-shadow-[0_32px_64px_rgba(79,70,229,0.4)]">
          <defs>
            <radialGradient id="sphereGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="40%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#1E1B4B" />
            </radialGradient>
            <radialGradient id="surfaceGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="white" stopOpacity="0.4" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="90" fill="url(#sphereGrad)" />
          <ellipse cx="100" cy="100" rx="40" ry="90" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />
          <ellipse cx="100" cy="100" rx="15" ry="90" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.15" />
          <ellipse cx="100" cy="100" rx="90" ry="30" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />
          <ellipse cx="100" cy="100" rx="90" ry="10" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.15" />
          <circle cx="100" cy="100" r="90" fill="url(#surfaceGlow)" />
        </svg>

        <div className="text-white/40 drop-shadow-2xl z-10 select-none pointer-events-none scale-[4] lg:scale-[5]">
          <FiLink strokeWidth={1} />
        </div>

        {/* Permanent Floating Mockup Card (Top Right) */}
        <div className="absolute -top-12 -right-16 bg-white/90 backdrop-blur-xl px-4 py-3 rounded-2xl shadow-[0_32px_64px_rgba(79,70,229,0.15)] border border-white flex flex-col gap-2 z-20 transform rotate-6 hover:rotate-0 transition-all duration-700 animate-[float_7s_ease-in-out_infinite_-1s]">
          <div className="flex items-center gap-2">
            <div className="flex bg-primary/10 text-primary p-1 rounded-md">
              <FiLink className="w-3 h-3" strokeWidth={3} />
            </div>
            <span className="font-mono text-primary font-bold text-[10px] tracking-wide">s.pachara.app/qwerty</span>
          </div>
        </div>
      </div>
      
      {/* Floating QR Code (Bottom Left) */}
      <div className="absolute -bottom-8 -left-12 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-[0_32px_64px_rgba(79,70,229,0.15)] z-20 transform -rotate-12 hover:rotate-0 transition-all duration-700 border border-white animate-[float_8s_ease-in-out_infinite_-3s]">
        <div className="w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center p-1.5 opacity-90">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-primary">
            {/* QR Finder Patterns */}
            <path d="M0,0 h30 v30 h-30 v-30 z M5,5 v20 h20 v-20 h-20 z M10,10 h10 v10 h-10 v-10 z" />
            <path d="M70,0 h30 v30 h-30 v-30 z M75,5 v20 h20 v-20 h-20 z M80,10 h10 v10 h-10 v-10 z" />
            <path d="M0,70 h30 v30 h-30 v-30 z M5,75 v20 h20 v-20 h-20 z M10,80 h10 v10 h-10 v-10 z" />
            <rect x="40" y="0" width="10" height="10" />
            <rect x="55" y="0" width="10" height="10" />
            <rect x="40" y="20" width="10" height="10" />
            <rect x="0" y="40" width="10" height="10" />
            <rect x="20" y="40" width="10" height="10" />
            <rect x="50" y="50" width="15" height="15" />
            <rect x="75" y="45" width="10" height="10" />
            <rect x="75" y="65" width="10" height="10" />
            <rect x="50" y="80" width="10" height="10" />
            <rect x="85" y="85" width="15" height="15" />
          </svg>
        </div>
        <div className="mt-2 text-center">
          <span className="font-mono text-[8px] uppercase tracking-widest text-outline font-bold">QR Code</span>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 opacity-40 blur-[100px] bg-primary/20 rounded-full w-full h-full scale-[1.3]"></div>
    </div>
  );
}
