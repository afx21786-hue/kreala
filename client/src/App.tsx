import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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
import NotFound from "@/pages/not-found";

function Router() {
  return (
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
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
