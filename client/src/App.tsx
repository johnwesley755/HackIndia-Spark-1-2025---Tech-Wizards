import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import Chat from "@/pages/chat";
import Settings from "@/pages/settings";
import Team from "@/pages/team";
import Integrations from "@/pages/integrations";
import Reports from "./pages/reports";
function Router() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Switch>
        {/* Public routes */}
        <Route path="/" component={Landing} />

        {/* Dashboard routes - wrapped in DashboardLayout */}
        <Route path="/dashboard">
          {() => (
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          )}
        </Route>
        <Route path="/chat">
          {() => (
            <DashboardLayout>
              <Chat />
            </DashboardLayout>
          )}
        </Route>
        <Route path="/settings">
          {() => (
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          )}
        </Route>
        <Route path="/reports">
          {() => (
            <DashboardLayout>
              <Reports />
            </DashboardLayout>
          )}
        </Route>
        <Route path="/team">
          {() => (
            <DashboardLayout>
              <Team />
            </DashboardLayout>
          )}
        </Route>
        <Route path="/support">
          {() => (
            <DashboardLayout>
              <Team />
            </DashboardLayout>
          )}
        </Route>
        <Route path="/integrations">
          {() => (
            <DashboardLayout>
              <Integrations />
            </DashboardLayout>
          )}
        </Route>

        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
