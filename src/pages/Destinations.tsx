import { useMemo, useState } from "react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { destinationIconMap, destinations } from "@/data/destinations";
import { ArrowRight, MapPinned, Star } from "lucide-react";
import { Link } from "react-router-dom";

const DestinationsPage = () => {
  const hasDestinations = destinations.length > 0;
  const [activeSlug, setActiveSlug] = useState(destinations[0]?.slug ?? "");

  const activeDestination = useMemo(
    () => destinations.find((destination) => destination.slug === activeSlug),
    [activeSlug]
  );

  const selectedDestination = activeDestination ?? destinations[0];

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

        {hasDestinations ? (
          <>
            <section className="container mx-auto px-4 mt-14">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="text-left">
                  <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                    Explore
                  </span>
                  <h2 className="mt-1 text-3xl font-semibold">
                    Pick a region to uncover handpicked tours
                  </h2>
                  <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                    Switch between regions to preview signature expeditions, price drops, and ratings in one glance.
                  </p>
                </div>
                <Link
                  to="/destinations"
                  className="flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  View all destinations
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
                {destinations.map((destination) => {
                  const Icon = destinationIconMap[destination.icon];
                  const isActive = destination.slug === selectedDestination?.slug;

                  return (
                    <button
                      key={destination.slug}
                      type="button"
                      onClick={() => setActiveSlug(destination.slug)}
                      className={cn(
                        "group flex min-w-[160px] items-center gap-3 rounded-full border px-5 py-3 text-sm font-medium transition-all duration-300",
                        isActive
                          ? "border-primary/40 bg-primary text-primary-foreground shadow-adventure"
                          : "border-border/60 bg-muted/60 text-muted-foreground hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
                      )}
                    >
                      <span className="rounded-full bg-white/20 p-2 text-current transition-colors group-hover:bg-white/30">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="text-left">
                        <span className="block text-sm font-semibold">
                          {destination.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {destination.tagline}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {selectedDestination && (
              <section className="container mx-auto px-4 mt-16">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="text-3xl font-semibold">
                      Tours in {selectedDestination.name}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                      {selectedDestination.summary}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
                    <span className="rounded-full bg-muted px-3 py-1">
                      Best time: {selectedDestination.quickFacts.bestTime}
                    </span>
                    <span className="rounded-full bg-muted px-3 py-1">
                      Start point: {selectedDestination.quickFacts.startPoint}
                    </span>
                    <span className="rounded-full bg-muted px-3 py-1">
                      Style: {selectedDestination.quickFacts.travelStyle}
                    </span>
                  </div>
                </div>

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {selectedDestination.packages.map((travelPackage) => (
                    <Card
                      key={travelPackage.name}
                      className="group flex h-full flex-col overflow-hidden border border-border/60 bg-card/90 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/60"
                    >
                      <div className="relative h-48 overflow-hidden">
                        {travelPackage.image ? (
                          <img
                            src={travelPackage.image}
                            alt={travelPackage.name}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                            Image coming soon
                          </div>
                        )}
                        {travelPackage.badge && (
                          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-600 shadow">
                            {travelPackage.badge}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                              {travelPackage.duration}
                            </p>
                            <h4 className="mt-1 text-lg font-semibold text-foreground">
                              {travelPackage.name}
                            </h4>
                          </div>
                          <div className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <span>{travelPackage.rating.toFixed(1)}</span>
                            <span className="text-muted-foreground">({travelPackage.reviews})</span>
                          </div>
                        </div>

                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                          {travelPackage.description}
                        </p>

                        <div className="mt-5 flex flex-wrap items-baseline gap-2">
                          <span className="text-xl font-semibold text-foreground">
                            {travelPackage.price}
                          </span>
                          {travelPackage.oldPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              {travelPackage.oldPrice}
                            </span>
                          )}
                          {travelPackage.badge && (
                            <span className="rounded-full bg-emerald-100 px-2 py-1 text-[11px] font-semibold text-emerald-700">
                              {travelPackage.badge}
                            </span>
                          )}
                        </div>

                        <div className="mt-6 flex flex-col gap-2">
                          <Button asChild variant="secondary" className="w-full">
                            <Link to={`/destinations/${selectedDestination.slug}`} state={{ focusPackage: travelPackage.name }}>
                              View itinerary
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="outline" className="w-full">
                            Request callback
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <section className="container mx-auto px-4 mt-16 text-center text-lg text-muted-foreground">
            We are curating upcoming journeys. Please check back soon for new destinations.
          </section>
        )}

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
