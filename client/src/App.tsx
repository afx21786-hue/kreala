import { useEffect, lazy, Suspense } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./hooks/useAuth";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/not-found";

// Lazy load non-critical pages for faster initial load
const About = lazy(() => import("@/pages/About"));
const Programs = lazy(() => import("@/pages/Programs"));
const Events = lazy(() => import("@/pages/Events"));
const Membership = lazy(() => import("@/pages/Membership"));
const Resources = lazy(() => import("@/pages/Resources"));
const Partners = lazy(() => import("@/pages/Partners"));
const Contact = lazy(() => import("@/pages/Contact"));
const StartupSupport = lazy(() => import("@/pages/StartupSupport"));
const Campus = lazy(() => import("@/pages/Campus"));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E46E6E]"></div>
  </div>
);

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about">
          <Suspense fallback={<PageLoader />}>
            <About />
          </Suspense>
        </Route>
        <Route path="/programs">
          <Suspense fallback={<PageLoader />}>
            <Programs />
          </Suspense>
        </Route>
        <Route path="/events">
          <Suspense fallback={<PageLoader />}>
            <Events />
          </Suspense>
        </Route>
        <Route path="/membership">
          <Suspense fallback={<PageLoader />}>
            <Membership />
          </Suspense>
        </Route>
        <Route path="/resources">
          <Suspense fallback={<PageLoader />}>
            <Resources />
          </Suspense>
        </Route>
        <Route path="/partners">
          <Suspense fallback={<PageLoader />}>
            <Partners />
          </Suspense>
        </Route>
        <Route path="/contact">
          <Suspense fallback={<PageLoader />}>
            <Contact />
          </Suspense>
        </Route>
        <Route path="/startup-support">
          <Suspense fallback={<PageLoader />}>
            <StartupSupport />
          </Suspense>
        </Route>
        <Route path="/campus">
          <Suspense fallback={<PageLoader />}>
            <Campus />
          </Suspense>
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/dashboard" component={Dashboard} />
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
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
