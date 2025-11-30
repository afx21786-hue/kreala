import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../lib/queryClient';
import { supabase } from '../lib/supabaseClient';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useToast } from '../hooks/use-toast';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { User, Mail, Calendar, Shield, LogOut, ArrowRight, Settings } from 'lucide-react';

interface LocalUser {
  id: string;
  username: string;
  email: string;
  name: string | null;
  signupOrder: number;
  isAdmin: boolean;
  createdAt: string;
}

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery<{ user: LocalUser }>({
    queryKey: ['/api/auth/me'],
    retry: false,
  });

  useEffect(() => {
    if (error) {
      localStorage.removeItem('kef_user');
      setLocation('/login');
    }
  }, [error, setLocation]);

  useEffect(() => {
    if (data?.user) {
      localStorage.setItem('kef_user', JSON.stringify(data.user));
    }
  }, [data]);

  const user = data?.user || null;
  const loading = isLoading;

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    }
    localStorage.removeItem('kef_user');
    queryClient.clear();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    setLocation('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold" data-testid="text-welcome">
                Welcome{user.name ? `, ${user.name}` : ''}!
              </h1>
              <p className="text-muted-foreground mt-2">Manage your Kerala Economic Forum membership and access exclusive resources.</p>
            </div>
            {user.isAdmin && (
              <Button onClick={() => setLocation('/admin')} className="gap-2" data-testid="button-admin-panel">
                <Settings className="h-4 w-4" />
                Admin Panel
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card data-testid="card-profile">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <div className="p-3 bg-primary/10 rounded-full">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Profile</CardTitle>
                  <CardDescription>Your account details</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {user.name && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="h-4 w-4 mr-2" />
                      {user.name}
                    </div>
                  )}
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 mr-2" />
                    {user.email}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    Member since {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-membership">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <div className="p-3 bg-kef-teal/10 rounded-full">
                  <Shield className="h-6 w-6 text-kef-teal" />
                </div>
                <div>
                  <CardTitle className="text-lg">Membership</CardTitle>
                  <CardDescription>Your current plan</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {user.isAdmin ? (
                      <Badge variant="default">Admin Member</Badge>
                    ) : (
                      <Badge variant="secondary">Free Member</Badge>
                    )}
                    <span className="text-xs text-muted-foreground">#{user.signupOrder}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => setLocation('/membership')}>
                    Upgrade Plan <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-events">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <div className="p-3 bg-kef-gold/10 rounded-full">
                  <Calendar className="h-6 w-6 text-kef-gold" />
                </div>
                <div>
                  <CardTitle className="text-lg">Upcoming Events</CardTitle>
                  <CardDescription>Your registered events</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">No upcoming events registered.</p>
                <Button variant="outline" size="sm" className="w-full" onClick={() => setLocation('/events')}>
                  Browse Events <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card data-testid="card-quick-actions">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Access your most-used features</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => setLocation('/programs')} data-testid="button-programs">
                  <ArrowRight className="h-6 w-6 mb-2" />
                  <span>Programs</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => setLocation('/resources')} data-testid="button-resources">
                  <ArrowRight className="h-6 w-6 mb-2" />
                  <span>Resources</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => setLocation('/startup-support')} data-testid="button-startup">
                  <ArrowRight className="h-6 w-6 mb-2" />
                  <span>Startup Support</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col" onClick={() => setLocation('/contact')} data-testid="button-contact">
                  <ArrowRight className="h-6 w-6 mb-2" />
                  <span>Contact Us</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex justify-center">
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="text-destructive"
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
