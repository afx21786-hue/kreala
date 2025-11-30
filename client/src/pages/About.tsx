import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CardContent } from "@/components/ui/card";
import { AnimatedCard, useScrollAnimation } from "@/components/ui/animated-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Target, Eye, Heart, Users, Award, Lightbulb, ArrowRight, Quote } from "lucide-react";
import aboutImage from "@assets/generated_images/startup_workspace_team_collaboration.png";

const leadership = [
  { 
    name: "Dr. Arun Kumar", 
    role: "Chairman", 
    initials: "AK",
    quote: "Kerala has immense potential to become a global innovation hub. At KEF, we're committed to nurturing every entrepreneur who dares to dream big and transform our state's economic landscape."
  },
  { 
    name: "Meera Nair", 
    role: "Executive Director", 
    initials: "MN",
    quote: "Our mission is to create pathways for success. We believe that with the right support, mentorship, and resources, every startup in Kerala can achieve extraordinary growth."
  },
  { 
    name: "Rajesh Pillai", 
    role: "Head of Programs", 
    initials: "RP",
    quote: "Through our comprehensive programs, we're building a thriving ecosystem where innovation meets opportunity. The future of Kerala's economy is being shaped by the entrepreneurs we support today."
  },
  { 
    name: "Priya Menon", 
    role: "Head of Partnerships", 
    initials: "PM",
    quote: "Strategic partnerships are the backbone of sustainable growth. We connect Kerala's brightest minds with industry leaders to create lasting impact and meaningful change."
  },
];

const values = [
  { icon: Lightbulb, title: "Innovation", description: "Fostering creative solutions and breakthrough ideas" },
  { icon: Users, title: "Community", description: "Building strong networks and collaborative ecosystems" },
  { icon: Heart, title: "Empowerment", description: "Enabling individuals to achieve their full potential" },
  { icon: Award, title: "Excellence", description: "Maintaining highest standards in all our initiatives" },
];

function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { ref, isVisible } = useScrollAnimation();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isVisible) return;
    
    intervalRef.current = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % leadership.length);
        setIsAnimating(false);
      }, 500);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isVisible]);

  const currentMember = leadership[currentIndex];

  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="relative order-2 md:order-1">
          <Quote className="absolute -top-2 -left-2 w-10 h-10 text-kef-gold/30" />
          <blockquote 
            className={`text-lg md:text-xl text-muted-foreground italic leading-relaxed pl-8 transition-all duration-500 ${isAnimating ? "opacity-0 -translate-x-4" : "opacity-100 translate-x-0"}`}
          >
            "{currentMember.quote}"
          </blockquote>
          <div 
            className={`mt-6 pl-8 transition-all duration-500 ${isAnimating ? "opacity-0" : "opacity-100"}`}
          >
            <h3 className="text-xl font-bold">{currentMember.name}</h3>
            <p className="text-kef-teal font-medium">{currentMember.role}</p>
          </div>
        </div>

        <div className="flex flex-col items-center order-1 md:order-2">
          <div 
            className={`relative transition-all duration-500 ${isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-kef-teal/20 via-kef-gold/20 to-kef-red/20 rounded-full blur-xl" />
            <Avatar className="w-40 h-40 md:w-48 md:h-48 relative border-4 border-white shadow-xl">
              <AvatarFallback className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-kef-teal via-kef-gold to-kef-red text-white">
                {currentMember.initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const { ref: missionRef, isVisible: missionVisible } = useScrollAnimation();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="py-24 bg-gradient-to-b from-muted/50 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up">
                <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  About KEF
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Shaping Kerala's{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-kef-teal via-kef-gold to-kef-red">
                    Economic Future
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Kerala Economic Forum is a statewide non-profit organization dedicated to empowering entrepreneurs, students, startups, and institutions across Kerala.
                </p>
                <p className="text-muted-foreground mb-8">
                  Founded with a vision to transform Kerala into a global hub for innovation and entrepreneurship, we provide comprehensive support through programs, resources, and a vibrant community network.
                </p>
                <Button size="lg" className="gap-2" data-testid="button-about-join">
                  Join Our Mission
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="relative animate-fade-in-right" style={{ animationDelay: "200ms" }}>
                <img
                  src={aboutImage}
                  alt="KEF Community"
                  className="rounded-md shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-kef-teal to-kef-gold rounded-md opacity-20 blur-xl animate-pulse-glow" />
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-kef-gold to-kef-red rounded-md opacity-20 blur-xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
              </div>
            </div>
          </div>
        </section>

        <section ref={missionRef} className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <AnimatedCard
                direction="left"
                delay={0}
                className="border-0 shadow-md"
                data-testid="card-mission"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-md bg-kef-teal/10 flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-kef-teal" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To create a thriving entrepreneurial ecosystem in Kerala by providing world-class support, resources, and connections to innovators at every stage of their journey.
                  </p>
                </CardContent>
              </AnimatedCard>
              <AnimatedCard
                direction="right"
                delay={100}
                className="border-0 shadow-md"
                data-testid="card-vision"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-md bg-kef-gold/10 flex items-center justify-center mb-6">
                    <Eye className="w-7 h-7 text-kef-gold" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To position Kerala as a global leader in innovation and sustainable entrepreneurship, driving economic growth while preserving our cultural values.
                  </p>
                </CardContent>
              </AnimatedCard>
            </div>

            <div 
              ref={valuesRef}
              className={`text-center mb-12 transition-all duration-700 ${valuesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do at KEF.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <AnimatedCard
                  key={value.title}
                  direction={index % 2 === 0 ? "left" : "right"}
                  delay={index * 100}
                  className="border-0 shadow-sm text-center"
                  data-testid={`card-value-${value.title.toLowerCase()}`}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-muted/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 rounded-full bg-kef-red/10 text-kef-red text-sm font-medium mb-4">
                Leadership
              </span>
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experienced leaders driving KEF's mission forward.
              </p>
            </div>

            <TeamSection />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
