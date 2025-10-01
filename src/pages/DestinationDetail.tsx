import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DestinationPackage, getDestinationBySlug } from "@/data/destinations";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Compass,
  MapPin,
  Star,
} from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";

const DestinationDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const destination = slug ? getDestinationBySlug(slug) : undefined;

  if (!destination) {
    return <Navigate to="/destinations" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <main className="pt-24 pb-24">
        <section className="relative h-[380px] w-full overflow-hidden">
          <img
            src={destination.heroImage}
            alt={`${destination.name} landscape`}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />

          <div className="relative z-10 h-full">
            <div className="container mx-auto flex h-full flex-col justify-center px-4 text-white">
              <div className="mb-6">
                <Button asChild variant="glass" size="sm" className="backdrop-blur">
                  <Link to="/destinations" className="inline-flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Destinations
                  </Link>
                </Button>
              </div>

              <h1 className="text-4xl font-bold md:text-5xl">{destination.name}</h1>
              <p className="mt-3 text-lg text-white/80 md:max-w-2xl">
                {destination.summary}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/80">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                  <MapPin className="h-4 w-4" /> {destination.region}
                </div>
                {destination.badge && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                    {destination.badge}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4">
          <div className="-mt-16 grid gap-6 md:grid-cols-3">
            <QuickFactCard icon={Calendar} title="Best time to visit" value={destination.quickFacts.bestTime} />
            <QuickFactCard icon={MapPin} title="Trip starting point" value={destination.quickFacts.startPoint} />
            <QuickFactCard icon={Compass} title="Travel style" value={destination.quickFacts.travelStyle} />
          </div>
        </section>

        <section className="container mx-auto px-4 mt-20">
          <div className="mb-10 flex flex-col gap-3 text-center">
            <h2 className="text-3xl font-semibold md:text-4xl">Featured packages</h2>
            <p className="text-muted-foreground md:max-w-2xl md:self-center">
              Every itinerary is handcrafted with acclimatisation, local experiences, and responsible travel built in from the very first day.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {destination.packages.map((travelPackage) => (
              <PackageCard key={travelPackage.name} travelPackage={travelPackage} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const QuickFactCard = ({
  icon: Icon,
  title,
  value,
}: {
  icon: typeof Calendar;
  title: string;
  value: string;
}) => (
  <Card className="border border-border/60 bg-card/80 backdrop-blur">
    <CardContent className="flex items-center gap-4 p-6">
      <div className="rounded-full bg-primary/10 p-3 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm uppercase tracking-wide text-muted-foreground">{title}</p>
        <p className="mt-1 text-lg font-semibold text-foreground">{value}</p>
      </div>
    </CardContent>
  </Card>
);

const PackageCard = ({ travelPackage }: { travelPackage: DestinationPackage }) => {
  return (
    <Card className="overflow-hidden border border-border/70 bg-card/80 shadow-lg backdrop-blur">
      {travelPackage.image && (
        <div className="relative h-56 w-full overflow-hidden">
          <img
            src={travelPackage.image}
            alt={travelPackage.name}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          />
          {travelPackage.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow">
              {travelPackage.badge}
            </span>
          )}
        </div>
      )}

      <CardContent className="space-y-6 p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-foreground">
              {travelPackage.name}
            </h3>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">
                <Calendar className="h-4 w-4" /> {travelPackage.duration}
              </span>
              <span className="inline-flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {travelPackage.rating} ({travelPackage.reviews} reviews)
              </span>
            </div>
          </div>

          <div className="text-right md:text-left">
            {travelPackage.oldPrice && (
              <p className="text-sm text-muted-foreground line-through">
                {travelPackage.oldPrice}
              </p>
            )}
            <p className="text-xl font-semibold text-primary">{travelPackage.price}</p>
            {travelPackage.itineraryUrl ? (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="mt-3 text-primary hover:text-primary"
              >
                <a
                  href={travelPackage.itineraryUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  View itinerary
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            ) : (
              <Button variant="secondary" size="sm" className="mt-3">
                Request callback
              </Button>
            )}
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed">
          {travelPackage.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {travelPackage.highlights.map((highlight) => (
            <span
              key={highlight}
              className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {highlight}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DestinationDetailPage;
