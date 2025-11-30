import { useRef, useEffect, useState } from "react";

const impactMetrics = [
  { value: 2000, suffix: "+", label: "Startups to be supported" },
  { value: 10000, suffix: "+", label: "Entrepreneurs in our network" },
  { value: 200, suffix: "+", label: "Campus partnerships" },
  { value: 100, suffix: "+", label: "Events in pipeline" },
  { value: 100, prefix: "₹", suffix: "+ Cr", label: "Funding enablement target" },
];

function AnimatedCounter({ value, prefix = "", suffix = "", label }: { value: number; prefix?: string; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-center" data-testid={`impact-${label.toLowerCase().replace(/\s/g, "-")}`}>
      <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-kef-teal via-kef-gold to-kef-red mb-2">
        {prefix}{count}{suffix}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export default function ImpactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-kef-gold/10 text-kef-gold text-sm font-medium mb-4">
            Our Impact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Vision. Our Impact.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kef-gold to-kef-red">
              Our Future.
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're building Kerala's largest entrepreneurial ecosystem with ambitious goals and measurable impact.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {impactMetrics.map((metric) => (
            <AnimatedCounter
              key={metric.label}
              value={metric.value}
              prefix={metric.prefix}
              suffix={metric.suffix}
              label={metric.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
