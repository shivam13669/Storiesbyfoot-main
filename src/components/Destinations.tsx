import { MapPin, Calendar, Users, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import ladakhImage from "@/assets/ladakh-mountains.jpg";
import beachImage from "@/assets/beach-sunset.jpg";
import forestImage from "@/assets/forest-mist.jpg";

const destinations = [
  {
    id: 1,
    title: "Ladakh Bike Expedition",
    location: "Ladakh, India",
    duration: "6 Days",
    groupSize: "8-12 People",
    rating: 4.9,
    price: "₹45,000",
    image: ladakhImage,
    description: "Experience the thrill of riding through the highest motorable roads in the world. Visit Pangong Lake, Nubra Valley, and witness breathtaking Himalayan landscapes.",
    highlights: ["Pangong Lake", "Nubra Valley", "Magnetic Hill", "Diskit Monastery"]
  },
  {
    id: 2,
    title: "Tropical Paradise Escape",
    location: "Maldives",
    duration: "5 Days",
    groupSize: "2-6 People",
    rating: 4.8,
    price: "₹85,000",
    image: beachImage,
    description: "Unwind in pristine beaches with crystal clear waters. Enjoy water sports, sunset cruises, and luxury resort experiences in this tropical paradise.",
    highlights: ["Water Sports", "Sunset Cruise", "Luxury Resort", "Snorkeling"]
  },
  {
    id: 3,
    title: "Mystic Forest Trek",
    location: "Western Ghats, India",
    duration: "4 Days",
    groupSize: "6-10 People",
    rating: 4.7,
    price: "₹25,000",
    image: forestImage,
    description: "Immerse yourself in the misty forests of Western Ghats. Discover hidden waterfalls, diverse wildlife, and ancient trails through lush greenery.",
    highlights: ["Hidden Waterfalls", "Wildlife Spotting", "Forest Camping", "Ancient Trails"]
  }
];

const Destinations = () => {
  return (
    <section id="destinations" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Popular Destinations
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our most loved adventure destinations, each offering unique experiences and unforgettable memories.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <Card 
              key={destination.id} 
              className="group overflow-hidden border-0 shadow-card hover:shadow-adventure transition-all duration-500 hover:-translate-y-2 bg-card/80 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{destination.rating}</span>
                </div>
                <div className="absolute bottom-4 left-4 bg-secondary/90 backdrop-blur-sm text-secondary-foreground px-3 py-1 rounded-full font-semibold">
                  {destination.price}
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {destination.title}
                </h3>
                
                <div className="flex items-center gap-4 mb-4 text-muted-foreground text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {destination.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {destination.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {destination.groupSize}
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {destination.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {destination.highlights.slice(0, 2).map((highlight, idx) => (
                    <span 
                      key={idx}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                  {destination.highlights.length > 2 && (
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                      +{destination.highlights.length - 2} more
                    </span>
                  )}
                </div>

                <Button className="w-full group" variant="adventure">
                  Book Adventure
                  <MapPin className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Destinations;