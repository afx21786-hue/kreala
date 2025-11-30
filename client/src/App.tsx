import { useEffect, useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient, apiRequest } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { AuthProvider } from "./hooks/useAuth";
import { supabase } from "./lib/supabaseClient";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Programs from "@/pages/Programs";
import Events from "@/pages/Events";
import Membership from "@/pages/Membership";
import Resources from "@/pages/Resources";
import Partners from "@/pages/Partners";
import Contact from "@/pages/Contact";
import StartupSupport from "@/pages/StartupSupport";
import Campus from "@/pages/Campus";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function OAuthCallbackHandler() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    // Check if there's an access token in the URL hash (OAuth callback)
    const hash = window.location.hash;
    if (!hash || processed) return;

    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get('access_token');
    
    if (!accessToken) return;

    // Clear the hash from URL
    window.history.replaceState(null, '', window.location.pathname);
    setProcessed(true);

    // Handle the OAuth callback
    const handleOAuthCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          throw new Error('Failed to get session');
        }

        // Register/login with our backend
        const response = await apiRequest('POST', '/api/auth/oauth-signup', {
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email,
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error);

        localStorage.setItem('kef_user', JSON.stringify(data.user));
        queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
        
        toast({
          title: "Welcome to KEF!",
          description: data.user.isAdmin
            ? "You are one of the first 4 members - you have admin access!"
            : "You have been logged in successfully.",
        });
        
        setLocation('/dashboard');
      } catch (error: any) {
        console.error('OAuth callback error:', error);
        toast({
          title: "Login Failed",
          description: error.message || "Failed to complete login",
          variant: "destructive",
        });
        setLocation('/login');
      }
    };

    handleOAuthCallback();
  }, [setLocation, toast, processed]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/programs" component={Programs} />
        <Route path="/events" component={Events} />
        <Route path="/membership" component={Membership} />
        <Route path="/resources" component={Resources} />
        <Route path="/partners" component={Partners} />
        <Route path="/contact" component={Contact} />
        <Route path="/startup-support" component={StartupSupport} />
        <Route path="/campus" component={Campus} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/admin" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <OAuthCallbackHandler />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
