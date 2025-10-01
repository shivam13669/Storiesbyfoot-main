import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { destinationIconMap, destinations } from "@/data/destinations";
import { ArrowRight, MapPinned } from "lucide-react";
import { Link } from "react-router-dom";

const DestinationsPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="pt-24 pb-20">
        <section className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <MapPinned className="h-4 w-4" />
              Explore destinations crafted for storytellers
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Curated journeys across the Himalayas
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose from high-altitude odysseys, monastery circuits, rainforest trails, and cultural immersions designed by our expedition experts.
            </p>
          </div>
        </section>

        <section className="container mx-auto px-4 mt-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => {
              const Icon = destinationIconMap[destination.icon];

              return (
                <Card
                  key={destination.slug}
                  className="group relative overflow-hidden border border-border/70 bg-card/80 backdrop-blur rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/60"
                >
                  <Link to={`/destinations/${destination.slug}`} className="flex h-full flex-col p-6 text-left">
                    <div className="mb-6 flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary/20">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold text-foreground">
                            {destination.name}
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            {destination.region}
                          </p>
                        </div>
                      </div>
                      {destination.badge && (
                        <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow">
                          {destination.badge}
                        </span>
                      )}
                    </div>

                    <p className="flex-1 text-sm text-muted-foreground leading-relaxed">
                      {destination.tagline}
                    </p>

                    <div className="mt-6 flex items-center justify-between text-sm font-medium">
                      <span className="text-primary">View experiences</span>
                      <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="container mx-auto px-4 mt-20">
          <div className="rounded-3xl bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 p-10 text-center">
            <h2 className="text-3xl font-semibold text-foreground">
              Need something more custom?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Tell us the adventure you dream about and our travel designers will craft an exclusive itinerary for your crew.
            </p>
            <Button asChild size="lg" className="mt-6">
              <Link to="/" className="inline-flex items-center gap-2">
                Talk to an expert
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DestinationsPage;
