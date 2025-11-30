import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rocket, Bell, Calendar } from "lucide-react";
import { Link } from "wouter";

export default function Membership() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Coming Soon</Badge>
            <h1 className="text-4xl font-bold mb-4" data-testid="text-membership-title">
              Membership Program
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're building something special for the Kerala entrepreneurial community
            </p>
          </div>

          <Card className="mb-8" data-testid="card-membership-announcement">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Rocket className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Membership Not Yet Launched</CardTitle>
              <CardDescription className="text-base mt-2">
                Our membership program is currently under development. We're working hard to bring you exclusive benefits, resources, and networking opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <h3 className="font-semibold mb-2">What to Expect</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>Access to exclusive events and workshops</li>
                    <li>Networking with fellow entrepreneurs</li>
                    <li>Mentorship opportunities</li>
                    <li>Resource library access</li>
                    <li>Community forum participation</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <h3 className="font-semibold mb-2">Membership Tiers</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>Student Member</li>
                    <li>Individual Entrepreneur</li>
                    <li>Startup Member</li>
                    <li>Corporate Partner</li>
                    <li>Institutional Member</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild variant="outline" className="gap-2">
                  <Link href="/contact">
                    <Bell className="w-4 h-4" />
                    Get Notified When We Launch
                  </Link>
                </Button>
                <Button asChild className="gap-2">
                  <Link href="/events">
                    <Calendar className="w-4 h-4" />
                    View Upcoming Events
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-muted-foreground">
            <p>Have questions about membership? <Link href="/contact" className="text-primary hover:underline">Contact us</Link></p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
