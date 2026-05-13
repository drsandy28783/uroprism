import { Alert, AlertDescription } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";

/**
 * Prototype warning banner - displayed on all pages
 *
 * Reminds users this is a demo/prototype and should NOT contain real patient data
 */
export function PrototypeBanner() {
  return (
    <Alert className="rounded-none border-x-0 border-t-0 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900">
      <TriangleAlert className="h-4 w-4 text-amber-600 dark:text-amber-500" />
      <AlertDescription className="text-amber-900 dark:text-amber-200 font-medium text-sm">
        <strong>Prototype Only</strong> — This is a demonstration interface. Do not enter real patient data.
      </AlertDescription>
    </Alert>
  );
}
