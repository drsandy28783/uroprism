import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CalendarCheck, FlaskConical, HeartPulse, ShieldCheck, Stethoscope } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-secondary via-background to-background" />
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              <ShieldCheck className="h-3.5 w-3.5" /> Urologist-supervised program
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight text-foreground">
              Stop kidney stones from coming back.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
              StoneCare is a long-term renal stone prevention and follow-up program.
              Personalised reminders, scheduled imaging and labs, and a urologist who actually
              knows your stone history.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/login">Get started</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/subscriptions">View plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why recurrence prevention matters */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Why recurrence prevention matters</h2>
            <p className="mt-4 text-muted-foreground">
              Up to <span className="font-medium text-foreground">50% of stone formers</span> will
              develop another stone within 5–10 years without structured follow-up. Most recurrences
              are preventable with hydration, diet correction, the right medication, and timely imaging.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: HeartPulse, t: "Lower recurrence", d: "Structured follow-up reduces repeat episodes." },
              { icon: CalendarCheck, t: "Never miss a scan", d: "Automated USG and lab reminders." },
              { icon: FlaskConical, t: "Targeted prevention", d: "Plan based on your stone composition." },
              { icon: Stethoscope, t: "Doctor-led care", d: "Reviewed by your urologist, not an algorithm." },
            ].map(({ icon: Icon, t, d }) => (
              <Card key={t} className="border-border/60">
                <CardHeader className="pb-2">
                  <div className="grid h-9 w-9 place-items-center rounded-md bg-secondary text-secondary-foreground">
                    <Icon className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-base mt-2">{t}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{d}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-secondary/40 border-y">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-semibold tracking-tight">What the program includes</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {[
              { t: "Stone history & investigations", d: "All your scans, labs and stone analyses in one timeline." },
              { t: "Personalised prevention plan", d: "Diet, hydration and medication tuned to your stone type." },
              { t: "Follow-up reminders", d: "USG, blood, and 24-h urine reminders before they're due." },
              { t: "Discounted labs & radiology", d: "Subscription perks for ongoing tests." },
              { t: "Doctor review", d: "Periodic clinical review by your urologist." },
              { t: "Red-flag guidance", d: "Know exactly when to seek urgent care." },
            ].map((f) => (
              <Card key={f.t}>
                <CardHeader>
                  <CardTitle className="text-base">{f.t}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{f.d}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor-supervised */}
      <section className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Doctor-supervised, not just an app</h2>
          <p className="mt-4 text-muted-foreground">
            Every plan is reviewed by a urologist. We coordinate your imaging, labs and medication
            adjustments — and flag when you need to be seen in person.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              "Stone-type-specific prevention",
              "Imaging cadence adjusted to your risk",
              "Clinical notes you can share with any doctor",
            ].map((x) => (
              <li key={x} className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" /> {x}
              </li>
            ))}
          </ul>
        </div>
        <Card className="bg-gradient-to-br from-primary/10 to-accent/20 border-primary/20">
          <CardContent className="p-8">
            <p className="text-sm text-muted-foreground">Subscription starting at</p>
            <p className="mt-1 text-4xl font-semibold tracking-tight">₹499<span className="text-base font-normal text-muted-foreground">/month</span></p>
            <p className="mt-4 text-sm text-muted-foreground">
              Includes follow-up reminders, free USG quota, lab discounts and doctor review.
            </p>
            <Button asChild className="mt-6 w-full">
              <Link to="/subscriptions">Compare plans</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <footer className="border-t">
        <div className="container mx-auto px-4 py-8 text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
          <p>© {new Date().getFullYear()} StoneCare — MVP prototype. Mock data only.</p>
          <p>Not a substitute for emergency care.</p>
        </div>
      </footer>
    </div>
  );
}
