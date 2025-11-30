import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Rocket, Bell, Calendar, CheckCircle2, ArrowRight, Star } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface MembershipPlan {
  id: string;
  name: string;
  price: string;
  duration: string;
  description: string | null;
  features: string[];
  isPopular: boolean;
  isActive: boolean;
  createdAt: string;
}

export default function Membership() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applyForm, setApplyForm] = useState({ name: "", email: "", phone: "", organization: "" });
  const { toast } = useToast();

  const { data: plansData, isLoading } = useQuery<{ plans: MembershipPlan[] }>({
    queryKey: ["/api/membership-plans"],
  });

  const plans = plansData?.plans?.filter(p => p.isActive) || [];

  const submitRequestMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/requests", {
        name: applyForm.name,
        email: applyForm.email,
        phone: applyForm.phone || null,
        organization: applyForm.organization || null,
        requestType: "membership_application",
        programId: selectedPlan?.id || null,
        message: `Membership Plan: ${selectedPlan?.name}\nPrice: ${selectedPlan?.price}\nDuration: ${selectedPlan?.duration}`,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "Our team will review your membership application and contact you soon.",
      });
      setApplyModalOpen(false);
      setApplyForm({ name: "", email: "", phone: "", organization: "" });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleApply = (plan: MembershipPlan) => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in or create an account to apply for membership.",
        variant: "destructive",
      });
      setLocation(`/login?redirect=/membership`);
      return;
    }
    setSelectedPlan(plan);
    setApplyModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.name.trim() || !applyForm.email.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    submitRequestMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Membership Plans</Badge>
            <h1 className="text-4xl font-bold mb-4" data-testid="text-membership-title">
              Join Kerala's Premier{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-kef-teal to-kef-gold">
                Entrepreneurial Community
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the membership plan that fits your entrepreneurial journey and unlock exclusive benefits.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading membership plans...</p>
            </div>
          ) : plans.length === 0 ? (
            <Card className="mb-8" data-testid="card-membership-announcement">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Rocket className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Membership Plans Coming Soon</CardTitle>
                <CardDescription className="text-base mt-2">
                  Our membership program is currently being set up. We're working hard to bring you exclusive benefits, resources, and networking opportunities.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h3 className="font-semibold mb-2">What to Expect</h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" />Access to exclusive events and workshops</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" />Networking with fellow entrepreneurs</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" />Mentorship opportunities</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" />Resource library access</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" />Community forum participation</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h3 className="font-semibold mb-2">Get Notified</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Be the first to know when our membership plans are available. Contact us to express your interest!
                    </p>
                    <Button variant="outline" className="gap-2" asChild>
                      <Link href="/contact">
                        <Bell className="w-4 h-4" />
                        Contact Us
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {plans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`relative ${plan.isPopular ? 'border-primary shadow-lg' : ''}`}
                  data-testid={`card-plan-${plan.id}`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="gap-1">
                        <Star className="w-3 h-3" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    {plan.description && (
                      <CardDescription>{plan.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="mb-6">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.duration}</span>
                    </div>
                    <ul className="space-y-3 mb-6 text-left">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full gap-2"
                      variant={plan.isPopular ? "default" : "outline"}
                      onClick={() => handleApply(plan)}
                      data-testid={`button-apply-${plan.id}`}
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center text-muted-foreground">
            <p>Have questions about membership? <Link href="/contact" className="text-primary hover:underline">Contact us</Link></p>
          </div>
        </div>
      </main>

      <Footer />

      <Dialog open={applyModalOpen} onOpenChange={setApplyModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Apply for {selectedPlan?.name}</DialogTitle>
            <DialogDescription>
              {selectedPlan?.price}/{selectedPlan?.duration} - Fill out the form below to apply.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="member-name">Full Name *</Label>
              <Input 
                id="member-name" 
                value={applyForm.name} 
                onChange={(e) => setApplyForm({...applyForm, name: e.target.value})}
                required
                data-testid="input-member-name"
              />
            </div>
            <div>
              <Label htmlFor="member-email">Email *</Label>
              <Input 
                id="member-email" 
                type="email"
                value={applyForm.email} 
                onChange={(e) => setApplyForm({...applyForm, email: e.target.value})}
                required
                data-testid="input-member-email"
              />
            </div>
            <div>
              <Label htmlFor="member-phone">Phone</Label>
              <Input 
                id="member-phone" 
                value={applyForm.phone} 
                onChange={(e) => setApplyForm({...applyForm, phone: e.target.value})}
                data-testid="input-member-phone"
              />
            </div>
            <div>
              <Label htmlFor="member-org">Organization</Label>
              <Input 
                id="member-org" 
                value={applyForm.organization} 
                onChange={(e) => setApplyForm({...applyForm, organization: e.target.value})}
                data-testid="input-member-organization"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full gap-2"
              disabled={submitRequestMutation.isPending}
              data-testid="button-submit-membership"
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
