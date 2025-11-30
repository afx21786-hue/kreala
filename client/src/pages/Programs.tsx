import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  Rocket, Users, GraduationCap, Lightbulb, Target, Building2, ArrowRight,
  Calendar, Clock, MapPin, CheckCircle2, BookOpen
} from "lucide-react";

interface Program {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string | null;
  isActive: boolean;
  createdAt: string;
}

const categoryIcons: Record<string, any> = {
  startup: Rocket,
  funding: Users,
  education: GraduationCap,
  innovation: Lightbulb,
  growth: Target,
  partnership: Building2,
  default: BookOpen,
};

const categoryColors: Record<string, string> = {
  startup: "kef-teal",
  funding: "kef-gold",
  education: "kef-red",
  innovation: "kef-teal",
  growth: "kef-gold",
  partnership: "kef-red",
  default: "primary",
};

export default function Programs() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applyForm, setApplyForm] = useState({ name: "", email: "", phone: "", organization: "", message: "" });
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const { data: programsData, isLoading } = useQuery<{ programs: Program[] }>({
    queryKey: ["/api/programs"],
  });

  const programs = programsData?.programs?.filter(p => p.isActive) || [];
  const categories = ["All", ...Array.from(new Set(programs.map(p => p.category)))];

  const submitRequestMutation = useMutation({
    mutationFn: async (data: { programId: string; programTitle: string }) => {
      const response = await apiRequest("POST", "/api/requests", {
        name: applyForm.name,
        email: applyForm.email,
        phone: applyForm.phone || null,
        organization: applyForm.organization || null,
        requestType: "program_application",
        programId: data.programId,
        message: `Application for: ${data.programTitle}\n\n${applyForm.message || ""}`,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "Our team will review your application and contact you within 48 hours.",
      });
      setApplyModalOpen(false);
      setApplyForm({ name: "", email: "", phone: "", organization: "", message: "" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleApplyProgram = (program: Program) => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in or create an account to apply for this program.",
        variant: "destructive",
      });
      setLocation(`/login?redirect=/programs`);
      return;
    }
    setSelectedProgram(program);
    setApplyModalOpen(true);
  };

  const handleLearnMore = (program: Program) => {
    setSelectedProgram(program);
    setDetailModalOpen(true);
  };

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProgram) return;
    if (!applyForm.name.trim() || !applyForm.email.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    submitRequestMutation.mutate({ 
      programId: selectedProgram.id, 
      programTitle: selectedProgram.title 
    });
  };

  const filteredPrograms = selectedCategory === "All"
    ? programs
    : programs.filter(p => p.category === selectedCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setVisibleCards((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );

    const cards = gridRef.current?.querySelectorAll("[data-index]");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredPrograms]);

  const getIcon = (category: string) => {
    return categoryIcons[category.toLowerCase()] || categoryIcons.default;
  };

  const getColor = (category: string) => {
    return categoryColors[category.toLowerCase()] || categoryColors.default;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Our Programs
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Comprehensive Support for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-kef-teal via-kef-gold to-kef-red">
                  Every Stage
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From ideation to scale, our programs provide the resources, mentorship, and connections you need to succeed.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading programs...</p>
              </div>
            ) : programs.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Programs Yet</h3>
                <p className="text-muted-foreground">Check back soon for exciting programs!</p>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-2 mb-8">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      data-testid={`filter-${category.toLowerCase()}`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPrograms.map((program, index) => {
                    const Icon = getIcon(program.category);
                    const color = getColor(program.category);
                    return (
                      <Card
                        key={program.id}
                        data-index={index}
                        className={`border-0 shadow-sm card-hover-lift group transition-all duration-600 ease-out ${
                          visibleCards.includes(index)
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                        }`}
                        style={{ transitionDelay: `${index * 80}ms` }}
                        data-testid={`card-program-${program.id}`}
                      >
                        <CardContent className="p-6">
                          <div className={`w-12 h-12 rounded-md bg-${color}/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                            <Icon className={`w-6 h-6 text-${color}`} />
                          </div>
                          <Badge variant="secondary" className="mb-2">{program.category}</Badge>
                          <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">{program.title}</h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{program.description}</p>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              className="flex-1 gap-1"
                              onClick={() => handleLearnMore(program)}
                              data-testid={`button-learn-more-${program.id}`}
                            >
                              Learn More
                            </Button>
                            <Button 
                              className="flex-1 gap-1 group/btn" 
                              onClick={() => handleApplyProgram(program)} 
                              data-testid={`button-apply-${program.id}`}
                            >
                              Apply Now
                              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />

      <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">{selectedProgram?.title}</DialogTitle>
            <DialogDescription className="flex items-center gap-3 pt-2">
              <Badge variant="secondary">{selectedProgram?.category}</Badge>
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-muted-foreground leading-relaxed mb-6">
              {selectedProgram?.description}
            </p>
            <Button 
              className="w-full gap-2"
              onClick={() => {
                setDetailModalOpen(false);
                if (selectedProgram) handleApplyProgram(selectedProgram);
              }}
            >
              Apply for this Program
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={applyModalOpen} onOpenChange={setApplyModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Apply for {selectedProgram?.title}</DialogTitle>
            <DialogDescription>
              Fill out the form below to submit your application. We'll get back to you within 48 hours.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitApplication} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="apply-name">Full Name *</Label>
              <Input 
                id="apply-name" 
                value={applyForm.name} 
                onChange={(e) => setApplyForm({...applyForm, name: e.target.value})}
                required
                data-testid="input-apply-name"
              />
            </div>
            <div>
              <Label htmlFor="apply-email">Email *</Label>
              <Input 
                id="apply-email" 
                type="email"
                value={applyForm.email} 
                onChange={(e) => setApplyForm({...applyForm, email: e.target.value})}
                required
                data-testid="input-apply-email"
              />
            </div>
            <div>
              <Label htmlFor="apply-phone">Phone</Label>
              <Input 
                id="apply-phone" 
                value={applyForm.phone} 
                onChange={(e) => setApplyForm({...applyForm, phone: e.target.value})}
                data-testid="input-apply-phone"
              />
            </div>
            <div>
              <Label htmlFor="apply-org">Organization</Label>
              <Input 
                id="apply-org" 
                value={applyForm.organization} 
                onChange={(e) => setApplyForm({...applyForm, organization: e.target.value})}
                data-testid="input-apply-organization"
              />
            </div>
            <div>
              <Label htmlFor="apply-message">Message (Optional)</Label>
              <Textarea 
                id="apply-message" 
                value={applyForm.message} 
                onChange={(e) => setApplyForm({...applyForm, message: e.target.value})}
                placeholder="Tell us about yourself and why you're interested..."
                rows={3}
                data-testid="textarea-apply-message"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full gap-2"
              disabled={submitRequestMutation.isPending}
              data-testid="button-submit-application"
            >
              {submitRequestMutation.isPending ? "Submitting..." : "Submit Application"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
