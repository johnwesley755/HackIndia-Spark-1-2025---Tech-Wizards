import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { integrations } from "@/lib/mock-data";
import { 
  SiGmail, 
  SiSlack, 
  SiHubspot, 
  SiStripe,
  SiZoom 
} from "react-icons/si";

const integrationIcons = {
  gmail: SiGmail,
  slack: SiSlack,
  hubspot: SiHubspot,
  stripe: SiStripe,
  zoom: SiZoom
};

export default function Integrations() {
  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div>
        <h1 className="text-3xl font-bold">Integrations</h1>
        <p className="text-muted-foreground">
          Connect with your favorite tools and services
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration) => {
          const Icon = integrationIcons[integration.id as keyof typeof integrationIcons];

          return (
            <Card key={integration.id} className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">
                        {integration.name}
                      </h3>
                      {integration.connected && (
                        <Badge variant="secondary">
                          Connected
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {integration.description}
                    </p>
                  </div>
                </div>

                <Button variant={integration.connected ? "destructive" : "default"}>
                  {integration.connected ? "Disconnect" : "Connect"}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </motion.div>
  );
}