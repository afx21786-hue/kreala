import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Rocket, Users, Briefcase, TrendingUp, Shield, HeadphonesIcon,
  ArrowRight, CheckCircle2, Download, FileText
} from "lucide-react";

// todo: remove mock functionality
const services = [
  {
    icon: Rocket,
    title: "Incubation Support",
    description: "Physical and virtual incubation with access to co-working spaces, labs, and infrastructure.",
    features: ["Co-working space", "Meeting rooms", "High-speed internet", "24/7 access"],
  },
  {
    icon: Users,
    title: "Mentorship Network",
    description: "Connect with 200+ industry experts, successful founders, and domain specialists.",
    features: ["One-on-one sessions", "Group workshops", "Industry connect", "Expert panels"],
  },
  {
    icon: Briefcase,
    title: "Legal & Compliance",
    description: "Navigate incorporation, contracts, IP protection, and regulatory requirements.",
    features: ["Company registration", "Contract review", "IP filing support", "Compliance guidance"],
  },
  {
    icon: TrendingUp,
    title: "Funding Support",
    description: "Access to angel investors, VCs, government grants, and crowdfunding platforms.",
    features: ["Investor introductions", "Pitch preparation", "Due diligence support", "Term sheet review"],
  },
  {
    icon: Shield,
    title: "Market Access",
    description: "Connect with potential customers, distribution partners, and enterprise clients.",
    features: ["B2B matchmaking", "Trade fairs", "Export facilitation", "Government procurement"],
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Support",
    description: "Personalized support from our startup success team throughout your journey.",
    features: ["Success manager", "Progress tracking", "Resource allocation", "Crisis support"],
  },
];

const acceleratorStages = [
  {
    stage: "Discovery",
    duration: "Week 1-2",
    description: "Deep dive into your business model, market opportunity, and team capabilities.",
    activities: ["Business model canvas", "Market research", "Competitor analysis", "Team assessment"],
  },
  {
    stage: "Validation",
    duration: "Week 3-4",
    description: "Validate your assumptions through customer discovery and prototype testing.",
    activities: ["Customer interviews", "MVP development", "Usability testing", "Pivot decisions"],
  },
  {
    stage: "Build",
    duration: "Week 5-8",
    description: "Build your product, refine your value proposition, and prepare for market.",
    activities: ["Product development", "Brand building", "Marketing strategy", "Sales playbook"],
  },
  {
    stage: "Launch",
    duration: "Week 9-10",
    description: "Launch your product, acquire first customers, and establish initial traction.",
    activities: ["Go-to-market execution", "Customer acquisition", "Metrics tracking", "Feedback loops"],
  },
  {
    stage: "Scale",
    duration: "Week 11-12",
    description: "Prepare for growth, fundraising, and sustainable scaling of operations.",
    activities: ["Growth strategies", "Fundraising prep", "Team expansion", "Demo day"],
  },
];

const resources = [
  { title: "Startup Toolkit", description: "Essential documents and templates", type: "ZIP" },
  { title: "Funding Guide", description: "Complete guide to raising capital", type: "PDF" },
  { title: "Legal Checklist", description: "Compliance and legal requirements", type: "PDF" },
  { title: "Pitch Deck Template", description: "Investor-ready presentation", type: "PPTX" },
];

const faqs = [
  {
    question: "What stage startups do you support?",
    answer: "We support startups at all stages - from ideation to growth stage. Our programs are designed to cater to different maturity levels, whether you're just validating an idea or looking to scale an existing business.",
  },
  {
    question: "How do I apply for incubation?",
    answer: "You can apply through our website by filling out the application form. Our team reviews applications on a rolling basis and typically responds within 2 weeks. We look for innovative ideas, committed teams, and market potential.",
  },
  {
    question: "Is there any fee for the programs?",
    answer: "Most of our basic programs are free for members. Premium programs like the 12-week accelerator have a nominal fee, and we offer scholarships for deserving startups who cannot afford the fees.",
  },
  {
    question: "Do you take equity in startups?",
    answer: "KEF is a non-profit organization and we do not take equity in the startups we support. However, some of our partner funds may invest in startups through our programs.",
  },
];

export default function StartupSupport() {
  const [selectedStage, setSelectedStage] = useState(0);
  const { toast } = useToast();

  const handleApplySupport = () => {
    toast({
      title: "Application Submitted!",
      description: "Your startup support application has been received. Our team will review and contact you within 48 hours.",
    });
  };

  const handleDownloadResource = (resourceName: string) => {
    toast({
      title: `${resourceName} Download Started`,
      description: "Your download will begin shortly. Check your downloads folder.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in">
              <span className="inline-block px-4 py-1 rounded-full bg-kef-teal/10 text-kef-teal text-sm font-medium mb-4">
                Startup Support
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Everything You Need to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-kef-teal via-kef-gold to-kef-red">
                  Succeed
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Comprehensive support services designed to help Kerala's startups grow from idea to scale.
              </p>
              <Button size="lg" className="gap-2" onClick={handleApplySupport} data-testid="button-apply-support">
                Apply for Support
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A complete ecosystem of support services for your startup journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card
                  key={service.title}
                  className="border-0 shadow-sm hover-elevate group animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                  data-testid={`card-service-${service.title.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-kef-teal" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">12-Week Program</Badge>
              <h2 className="text-3xl font-bold mb-4">Accelerator Journey</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A structured program to take your startup from idea to investment-ready.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-4 mb-8">
              {acceleratorStages.map((stage, index) => (
                <button
                  key={stage.stage}
                  onClick={() => setSelectedStage(index)}
                  className={`p-4 rounded-md text-left transition-all ${
                    selectedStage === index
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card hover-elevate"
                  }`}
                  data-testid={`button-stage-${stage.stage.toLowerCase()}`}
                >
                  <div className="text-xs opacity-70 mb-1">{stage.duration}</div>
                  <div className="font-semibold">{stage.stage}</div>
                </button>
              ))}
            </div>

            <Card className="border-0 shadow-md" data-testid="card-stage-details">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <Badge className="mb-4">{acceleratorStages[selectedStage].duration}</Badge>
                    <h3 className="text-2xl font-bold mb-4">{acceleratorStages[selectedStage].stage}</h3>
                    <p className="text-muted-foreground">{acceleratorStages[selectedStage].description}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Key Activities</h4>
                    <ul className="space-y-3">
                      {acceleratorStages[selectedStage].activities.map((activity, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">Downloadable Resources</h2>
                <p className="text-muted-foreground mb-8">
                  Free tools and templates to help you on your startup journey.
                </p>

                <div className="space-y-4">
                  {resources.map((resource, index) => (
                    <Card
                      key={resource.title}
                      className="border-0 shadow-sm hover-elevate animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                      data-testid={`card-resource-${resource.title.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{resource.title}</h4>
                          <p className="text-sm text-muted-foreground">{resource.description}</p>
                        </div>
                        <Badge variant="outline">{resource.type}</Badge>
                        <Button size="icon" variant="ghost" onClick={() => handleDownloadResource(resource.title)} data-testid={`button-download-${resource.title.toLowerCase().replace(/\s/g, "-")}`}>
                          <Download className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-muted-foreground mb-8">
                  Common questions about our startup support programs.
                </p>

                <Accordion type="single" collapsible className="w-full" data-testid="accordion-faq">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left" data-testid={`faq-trigger-${index}`}>
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
