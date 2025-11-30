import { useEffect, useState } from "react";

interface DecorativeElementsProps {
  variant?: "default" | "light" | "dark";
  density?: "sparse" | "normal" | "dense";
}

export function DecorativeElements({ 
  variant = "default",
  density = "normal" 
}: DecorativeElementsProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const opacityClass = variant === "light" ? "opacity-[0.04]" : variant === "dark" ? "opacity-[0.08]" : "opacity-[0.05]";

  return (
    <div 
      className={`fixed inset-0 pointer-events-none overflow-hidden -z-10 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      <CoconutTreeElement 
        className={`absolute top-[15%] left-[3%] w-16 h-24 ${opacityClass}`}
        delay={0}
      />
      
      <BackwaterWaves 
        className={`absolute bottom-[20%] left-[5%] w-32 h-8 ${opacityClass}`}
        delay={200}
      />
      
      <KathakaliEye 
        className={`absolute top-[25%] right-[4%] w-10 h-8 ${opacityClass}`}
        delay={400}
      />
      
      <BoatSilhouette 
        className={`absolute bottom-[35%] right-[6%] w-20 h-10 ${opacityClass}`}
        delay={600}
      />
      
      <GrowthArrow 
        className={`absolute top-[40%] left-[4%] w-8 h-12 ${opacityClass}`}
        delay={800}
      />
      
      <NetworkNodes 
        className={`absolute top-[60%] right-[3%] w-24 h-24 ${opacityClass}`}
        delay={1000}
      />
      
      <DotsGrid 
        className={`absolute top-[8%] right-[8%] w-20 h-20 ${opacityClass}`}
        delay={300}
      />
      
      <AbstractCurves 
        className={`absolute bottom-[10%] left-[8%] w-28 h-16 ${opacityClass}`}
        delay={500}
      />
      
      <ThinCircles 
        className={`absolute top-[70%] left-[6%] w-16 h-16 ${opacityClass}`}
        delay={700}
      />
      
      <StartupSpark 
        className={`absolute bottom-[45%] left-[2%] w-8 h-8 ${opacityClass}`}
        delay={900}
      />
      
      {density !== "sparse" && (
        <>
          <CoconutTreeElement 
            className={`absolute bottom-[15%] right-[5%] w-12 h-18 ${opacityClass} scale-75`}
            delay={1100}
          />
          
          <DotsGrid 
            className={`absolute bottom-[60%] left-[2%] w-16 h-16 ${opacityClass}`}
            delay={1200}
          />
          
          <GrowthArrow 
            className={`absolute top-[55%] right-[8%] w-6 h-10 ${opacityClass} rotate-12`}
            delay={1300}
          />
        </>
      )}
      
      {density === "dense" && (
        <>
          <BackwaterWaves 
            className={`absolute top-[45%] right-[2%] w-24 h-6 ${opacityClass}`}
            delay={1400}
          />
          
          <ThinCircles 
            className={`absolute top-[30%] left-[1%] w-12 h-12 ${opacityClass}`}
            delay={1500}
          />
          
          <AbstractCurves 
            className={`absolute top-[80%] right-[4%] w-20 h-12 ${opacityClass}`}
            delay={1600}
          />
        </>
      )}
    </div>
  );
}

interface ElementProps {
  className?: string;
  delay?: number;
}

function CoconutTreeElement({ className = "", delay = 0 }: ElementProps) {
  return (
    <svg 
      viewBox="0 0 60 90" 
      className={`animate-gentle-float ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <defs>
        <linearGradient id="treeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--kef-teal))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(var(--kef-gold))" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path 
        d="M30 90 L30 45 Q30 40 32 35 Q35 25 30 20" 
        stroke="url(#treeGradient)" 
        strokeWidth="1.5" 
        fill="none"
        strokeLinecap="round"
      />
      <path 
        d="M30 20 Q20 15 10 18 Q15 12 25 10 Q30 8 35 10 Q45 12 50 18 Q40 15 30 20" 
        stroke="url(#treeGradient)" 
        strokeWidth="1" 
        fill="none"
        strokeLinecap="round"
      />
      <path 
        d="M30 22 Q22 8 15 5" 
        stroke="url(#treeGradient)" 
        strokeWidth="0.8" 
        fill="none"
        strokeLinecap="round"
      />
      <path 
        d="M30 22 Q38 8 45 5" 
        stroke="url(#treeGradient)" 
        strokeWidth="0.8" 
        fill="none"
        strokeLinecap="round"
      />
      <path 
        d="M30 18 Q30 10 28 2" 
        stroke="url(#treeGradient)" 
        strokeWidth="0.8" 
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BackwaterWaves({ className = "", delay = 0 }: ElementProps) {
  return (
    <svg 
      viewBox="0 0 120 30" 
      className={`animate-wave ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--kef-teal))" stopOpacity="0.5" />
          <stop offset="50%" stopColor="hsl(var(--kef-gold))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(var(--kef-teal))" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <path 
        d="M0 15 Q15 5 30 15 T60 15 T90 15 T120 15" 
        stroke="url(#waveGradient)" 
        strokeWidth="1" 
        fill="none"
        strokeLinecap="round"
      />
      <path 
        d="M0 22 Q15 12 30 22 T60 22 T90 22 T120 22" 
        stroke="url(#waveGradient)" 
        strokeWidth="0.8" 
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

function KathakaliEye({ className = "", delay = 0 }: ElementProps) {
  return (
    <svg 
      viewBox="0 0 40 32" 
      className={`animate-shimmer ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <defs>
        <linearGradient id="eyeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--kef-red))" stopOpacity="0.5" />
          <stop offset="50%" stopColor="hsl(var(--kef-gold))" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(var(--kef-teal))" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <path 
        d="M5 16 Q20 2 35 16 Q20 30 5 16" 
        stroke="url(#eyeGradient)" 
        strokeWidth="1" 
        fill="none"
        strokeLinecap="round"
      />
      <circle 
        cx="20" 
        cy="16" 
        r="4" 
        stroke="url(#eyeGradient)" 
        strokeWidth="0.8" 
        fill="none"
      />
      <path 
        d="M2 16 Q0 14 2 12" 
        stroke="url(#eyeGradient)" 
        strokeWidth="0.8" 
        fill="none"
        strokeLinecap="round"
      />
      <path 
        d="M38 16 Q40 14 38 12" 
        stroke="url(#eyeGradient)" 
        strokeWidth="0.8" 
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BoatSilhouette({ className = "", delay = 0 }: ElementProps) {
  return (
    <svg 
      viewBox="0 0 80 40" 
      className={`animate-gentle-float ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <defs>
        <linearGradient id="boatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--kef-gold))" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(var(--kef-teal))" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <path 
        d="M10 30 Q5 28 8 25 L72 25 Q75 28 70 30 Z" 
        stroke="url(#boatGradient)" 
        strokeWidth="1" 
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path 
        d="M35 25 L35 8 Q35 5 40 5 L40 25" 
        stroke="url(#boatGradient)" 
        strokeWidth="0.8" 
        fill="none"
        strokeLinecap="round"
      />
      <path 
        d="M40 8 Q55 12 65 20" 
        stroke="url(#boatGradient)" 
        strokeWidth="0.8" 
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GrowthArrow({ className = "", delay = 0 }: ElementProps) {
  return (
    <svg 
      viewBox="0 0 30 50" 
      className={`animate-pulse-subtle ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <defs>
        <linearGradient id="arrowGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--kef-teal))" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(var(--kef-gold))" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <path 
        d="M15 45 L15 15" 
        stroke="url(#arrowGradient)" 
        strokeWidth="1.5" 
        fill="none"
        strokeLinecap="round"
      />
      <path 
        d="M8 22 L15 10 L22 22" 
        stroke="url(#arrowGradient)" 
        strokeWidth="1.5" 
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path 
        d="M5 40 Q10 35 15 38 Q20 41 25 36" 
        stroke="url(#arrowGradient)" 
        strokeWidth="0.8" 
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

function NetworkNodes({ className = "", delay = 0 }: ElementProps) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={`animate-shimmer ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <defs>
        <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--kef-teal))" stopOpacity="0.5" />
          <stop offset="50%" stopColor="hsl(var(--kef-gold))" stopOpacity="0.4" />
          <stop offset="100%" stopColor="hsl(var(--kef-red))" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <line x1="20" y1="30" x2="50" y2="50" stroke="url(#nodeGradient)" strokeWidth="0.5" />
      <line x1="50" y1="50" x2="80" y2="35" stroke="url(#nodeGradient)" strokeWidth="0.5" />
      <line x1="50" y1="50" x2="30" y2="75" stroke="url(#nodeGradient)" strokeWidth="0.5" />
      <line x1="50" y1="50" x2="75" y2="70" stroke="url(#nodeGradient)" strokeWidth="0.5" />
      <line x1="20" y1="30" x2="30" y2="75" stroke="url(#nodeGradient)" strokeWidth="0.3" opacity="0.5" />
      <line x1="80" y1="35" x2="75" y2="70" stroke="url(#nodeGradient)" strokeWidth="0.3" opacity="0.5" />
      
      <circle cx="20" cy="30" r="3" fill="url(#nodeGradient)" />
      <circle cx="50" cy="50" r="4" fill="url(#nodeGradient)" />
      <circle cx="80" cy="35" r="3" fill="url(#nodeGradient)" />
      <circle cx="30" cy="75" r="2.5" fill="url(#nodeGradient)" />
      <circle cx="75" cy="70" r="2.5" fill="url(#nodeGradient)" />
    </svg>
  );
}

function DotsGrid({ className = "", delay = 0 }: ElementProps) {
  return (
    <svg 
      viewBox="0 0 80 80" 
      className={`animate-fade-pulse ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <defs>
        <radialGradient id="dotGradient">
          <stop offset="0%" stopColor="hsl(var(--kef-teal))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(var(--kef-teal))" stopOpacity="0.2" />
        </radialGradient>
      </defs>
      {[0, 1, 2, 3, 4].map(row => (
        [0, 1, 2, 3, 4].map(col => (
          <circle 
            key={`${row}-${col}`}
            cx={10 + col * 15} 
            cy={10 + row * 15} 
            r="1.5" 
            fill="url(#dotGradient)"
            opacity={0.3 + (row + col) * 0.08}
          />
        ))
      ))}
    </svg>
  );
}

function AbstractCurves({ className = "", delay = 0 }: ElementProps) {
  return (
    <svg 
      viewBox="0 0 120 60" 
      className={`animate-gentle-float ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <defs>
        <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--kef-gold))" stopOpacity="0.4" />
          <stop offset="50%" stopColor="hsl(var(--kef-teal))" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(var(--kef-red))" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path 
        d="M10 50 Q40 10 70 30 Q100 50 110 20" 
        stroke="url(#curveGradient)" 
        strokeWidth="1" 
        fill="none"
        strokeLinecap="round"
      />
      <path 
        d="M5 40 Q35 5 65 25 Q95 45 115 15" 
        stroke="url(#curveGradient)" 
        strokeWidth="0.6" 
        fill="none"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

function ThinCircles({ className = "", delay = 0 }: ElementProps) {
  return (
    <svg 
      viewBox="0 0 60 60" 
      className={`animate-spin-slow ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <defs>
        <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--kef-teal))" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(var(--kef-gold))" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <circle 
        cx="30" 
        cy="30" 
        r="25" 
        stroke="url(#circleGradient)" 
        strokeWidth="0.5" 
        fill="none"
        strokeDasharray="4 8"
      />
      <circle 
        cx="30" 
        cy="30" 
        r="18" 
        stroke="url(#circleGradient)" 
        strokeWidth="0.8" 
        fill="none"
        strokeDasharray="2 6"
      />
      <circle 
        cx="30" 
        cy="30" 
        r="10" 
        stroke="url(#circleGradient)" 
        strokeWidth="0.6" 
        fill="none"
      />
    </svg>
  );
}

function StartupSpark({ className = "", delay = 0 }: ElementProps) {
  return (
    <svg 
      viewBox="0 0 30 30" 
      className={`animate-shimmer ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <defs>
        <linearGradient id="sparkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--kef-gold))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(var(--kef-red))" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <path 
        d="M15 2 L17 12 L27 12 L19 18 L22 28 L15 21 L8 28 L11 18 L3 12 L13 12 Z" 
        stroke="url(#sparkGradient)" 
        strokeWidth="0.8" 
        fill="none"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SectionDecorations({ position = "both" }: { position?: "left" | "right" | "both" }) {
  return (
    <>
      {(position === "left" || position === "both") && (
        <div className="absolute left-0 top-0 bottom-0 w-16 pointer-events-none opacity-[0.04] overflow-hidden">
          <DotsGrid className="absolute top-[10%] left-2 w-12 h-12 animate-fade-pulse" />
          <AbstractCurves className="absolute top-[40%] -left-4 w-20 h-10 animate-gentle-float" />
          <ThinCircles className="absolute bottom-[20%] left-4 w-10 h-10 animate-spin-slow" />
        </div>
      )}
      {(position === "right" || position === "both") && (
        <div className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none opacity-[0.04] overflow-hidden">
          <NetworkNodes className="absolute top-[15%] right-2 w-14 h-14 animate-shimmer" />
          <GrowthArrow className="absolute top-[50%] right-4 w-6 h-8 animate-pulse-subtle" />
          <BackwaterWaves className="absolute bottom-[25%] right-0 w-16 h-4 animate-wave" />
        </div>
      )}
    </>
  );
}
