import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

const footerLinks = {
  quickLinks: [
    { label: "About Us", href: "/about" },
    { label: "Programs", href: "/programs" },
    { label: "Events", href: "/events" },
    { label: "Membership", href: "/membership" },
  ],
  resources: [
    { label: "Blog", href: "/resources" },
    { label: "Annual Report", href: "/resources" },
    { label: "Partner With Us", href: "/partners" },
    { label: "Contact", href: "/contact" },
  ],
  programs: [
    { label: "Startup Boot Camp", href: "/programs" },
    { label: "Investor Connect", href: "/startup-support" },
    { label: "Campus Initiatives", href: "/campus" },
    { label: "Workshops", href: "/events" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10">
                <div className="absolute w-5 h-5 rounded-full bg-kef-red opacity-80 top-0 left-1" />
                <div className="absolute w-5 h-5 rounded-full bg-kef-gold opacity-80 top-0 right-1" />
                <div className="absolute w-5 h-5 rounded-full bg-kef-teal opacity-80 bottom-0 left-1/2 -translate-x-1/2" />
              </div>
              <span className="font-bold text-xl">Kerala Economic Forum</span>
            </div>
            <p className="text-background/70 mb-6 max-w-sm">
              Empowering entrepreneurs, students, startups, and institutions across Kerala to drive economic transformation.
            </p>
            <div className="space-y-3 text-sm text-background/70">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-kef-teal" />
                <span>Technopark, Thiruvananthapuram, Kerala</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-kef-gold" />
                <span>+91 471 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-kef-red" />
                <span>hello@keralaeconomicforum.org</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors text-sm"
                    data-testid={`footer-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Programs</h4>
            <ul className="space-y-2">
              {footerLinks.programs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/70 hover:text-background transition-colors text-sm"
                    data-testid={`footer-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-background/70 text-sm mb-4">
              Stay updated with the latest news and events.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
                data-testid="input-newsletter-email"
              />
              <Button size="icon" className="shrink-0" data-testid="button-newsletter-submit">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/60">
          <p>&copy; {new Date().getFullYear()} Kerala Economic Forum. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-background transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-background transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
