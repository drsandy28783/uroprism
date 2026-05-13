import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const Route = createFileRoute("/subscriptions")({
  component: Subscriptions,
});

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "₹499",
    tagline: "For low-risk single-stone formers.",
    features: [
      "Annual follow-up reminder",
      "1 USG / year reminder",
      "Educational content",
      "Basic prevention plan",
    ],
    highlight: false,
  },
  {
    id: "prevention_plus",
    name: "Prevention Plus",
    price: "₹999",
    tagline: "Most-recommended for recurrent stone formers.",
    features: [
      "Quarterly follow-up reminders",
      "2 free USG / year",
      "20% off lab tests",
      "Personalised diet & hydration plan",
      "Doctor review (twice a year)",
    ],
    highlight: true,
  },
  {
    id: "premium",
    name: "Premium StoneCare",
    price: "₹1,899",
    tagline: "Comprehensive care for high-risk patients.",
    features: [
      "Monthly check-ins & reminders",
      "4 free USG / year",
      "40% off all labs & radiology",
      "Priority doctor appointments",
      "24h urine analysis included",
      "Coordinated procedure follow-up",
    ],
    highlight: false,
  },
];

function Subscriptions() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="container mx-auto px-4 py-12 space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Choose your StoneCare plan</h1>
          <p className="mt-3 text-muted-foreground">All plans include doctor-supervised follow-up. Upgrade or change anytime.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <Card key={p.id} className={p.highlight ? "border-primary shadow-lg shadow-primary/10 relative" : ""}>
              {p.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most popular
                </span>
              )}
              <CardHeader>
                <CardTitle className="text-lg">{p.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{p.tagline}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight">{p.price}<span className="text-sm font-normal text-muted-foreground">/month</span></p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /> {f}</li>
                  ))}
                </ul>
                <Button asChild variant={p.highlight ? "default" : "outline"} className="w-full">
                  <Link to="/login">Get {p.name}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-center text-xs text-muted-foreground">
          {/* FUTURE: integrate Stripe / Razorpay billing, prorated upgrades, GST invoices. */}
          Mock pricing. Real billing will be added later.
        </p>
      </main>
    </div>
  );
}
