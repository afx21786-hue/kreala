import { useRef, useEffect, useState, ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AnimationDirection = "bottom" | "left" | "right" | "scale";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  direction?: AnimationDirection;
  delay?: number;
  hoverLift?: boolean;
  "data-testid"?: string;
}

export function AnimatedCard({
  children,
  className,
  direction = "bottom",
  delay = 0,
  hoverLift = true,
  "data-testid": testId,
}: AnimatedCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getAnimationClass = () => {
    if (!isVisible) {
      switch (direction) {
        case "left":
          return "opacity-0 -translate-x-10";
        case "right":
          return "opacity-0 translate-x-10";
        case "scale":
          return "opacity-0 scale-95";
        default:
          return "opacity-0 translate-y-10";
      }
    }
    return "opacity-100 translate-x-0 translate-y-0 scale-100";
  };

  return (
    <Card
      ref={cardRef}
      className={cn(
        "transition-all duration-700 ease-out",
        hoverLift && "card-hover-lift",
        getAnimationClass(),
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
      data-testid={testId}
    >
      {children}
    </Card>
  );
}

export function useScrollAnimation(threshold = 0.15) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
