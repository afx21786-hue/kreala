import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // todo: remove mock functionality - implement actual form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-b from-muted/50 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in">
              <span className="inline-block px-4 py-1 rounded-full bg-kef-teal/10 text-kef-teal text-sm font-medium mb-4">
                Contact Us
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Get in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-kef-teal to-kef-gold">
                  Touch
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="space-y-6">
                <Card className="border-0 shadow-sm hover-elevate" data-testid="card-contact-address">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-kef-teal/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6 text-kef-teal" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Visit Us</h3>
                      <p className="text-sm text-muted-foreground">
                        Kerala Economic Forum<br />
                        Level 3, Venture Arcade, Mavoor Rd,<br />
                        above Croma, Thondayad,<br />
                        Kozhikode, Kerala 673016
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm hover-elevate" data-testid="card-contact-phone">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-kef-gold/10 flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6 text-kef-gold" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Call Us</h3>
                      <p className="text-sm text-muted-foreground">
                        +91 471 123 4567<br />
                        +91 471 123 4568
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm hover-elevate" data-testid="card-contact-email">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-kef-red/10 flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6 text-kef-red" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email Us</h3>
                      <p className="text-sm text-muted-foreground">
                        inquiry@keralaeconomicforum.com<br />
                        membership@keralaeconomicforum.com
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm hover-elevate" data-testid="card-contact-hours">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Working Hours</h3>
                      <p className="text-sm text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM<br />
                        Saturday: 10:00 AM - 2:00 PM
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <Card className="border-0 shadow-md" data-testid="card-contact-form">
                  <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            data-testid="input-name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            data-testid="input-email"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            data-testid="input-phone"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Select
                            value={formData.subject}
                            onValueChange={(value) => setFormData({ ...formData, subject: value })}
                          >
                            <SelectTrigger id="subject" data-testid="select-subject">
                              <SelectValue placeholder="Select a topic" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="membership">Membership</SelectItem>
                              <SelectItem value="programs">Programs</SelectItem>
                              <SelectItem value="partnership">Partnership</SelectItem>
                              <SelectItem value="events">Events</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Tell us how we can help..."
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          data-testid="textarea-message"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full gap-2"
                        disabled={isSubmitting}
                        data-testid="button-submit"
                      >
                        {isSubmitting ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 animate-pulse" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="mt-12 border-0 shadow-md overflow-hidden" data-testid="card-map">
              <div className="h-80 bg-muted flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Interactive map would be displayed here
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Venture Arcade, Mavoor Rd, Kozhikode, Kerala
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
