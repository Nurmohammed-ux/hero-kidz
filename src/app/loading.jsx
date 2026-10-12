import Logo from "@/components/layouts/Logo";


const GlobalLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-xs">
      
      {/* Centered Brand / Loading Container */}
      <div className="flex flex-col items-center space-y-6 p-8 rounded-3xl bg-base-100 shadow-xl border border-border/40 animate-in fade-in zoom-in duration-300">
        
        {/* Animated Logo Wrapper */}
        <div className="relative flex items-center justify-center p-4">
          {/* Outer Ring Pulse */}
          <div className="absolute inset-0 rounded-3xl bg-primary/20 animate-ping" />
          
          {/* Render your custom Logo component */}
          <div className="relative z-10 scale-125 transform">
            <Logo />
          </div>
        </div>

        {/* Loading Subtext / Message */}
        <p className="text-xs font-semibold text-muted-foreground tracking-wider uppercase pt-2">
          Loading fun toys for you...
        </p>

        {/* Bouncing Loading Dots */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-bounce" />
        </div>

      </div>

    </div>
  );
};

export default GlobalLoading;