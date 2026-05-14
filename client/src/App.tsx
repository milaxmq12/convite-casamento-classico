/**
 * App.tsx — Convite de Casamento Isabella & Rafael
 * Rotas: / (convite) + /admin (painel de convidados)
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function Router() {
  return (
    <Switch>
      <Route path="/"      component={Home} />
      <Route path="/admin" component={Admin} />
      <Route path="/404"   component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                fontFamily: "'EB Garamond', serif",
                background: "oklch(0.99 0.01 85)",
                border: "1px solid oklch(0.72 0.1 80 / 0.4)",
                color: "oklch(0.25 0.04 55)",
                borderRadius: "2px",
              },
            }}
          />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
