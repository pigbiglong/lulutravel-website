import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Tours | lulutravel',
  description: 'Discover our premium China travel experiences - Classic Tours, Culinary Adventures, and Nature & Wellness retreats.',
};

const tours = [
  {
    slug: 'classic',
    title: 'Classic China',
    subtitle: '8 Days',
    description: 'Experience the iconic landmarks of Beijing, Xi\'an, and Shanghai. Walk the Great Wall, marvel at the Terracotta Warriors, and cruise the Huangpu River.',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1200',
    price: 'From $2,999',
  },
  {
    slug: 'culinary',
    title: 'Culinary Adventures',
    subtitle: '10 Days',
    description: 'A gastronomic journey through Sichuan, Cantonese, and regional cuisines. Cooking classes, street food tours, and fine dining experiences.',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1200',
    price: 'From $3,499',
  },
  {
    slug: 'nature',
    title: 'Nature & Wellness',
    subtitle: '12 Days',
    description: 'Escape to Zhangjiajie\'s floating mountains, Guilin\'s karst landscapes, and ancient tea plantations. Meditation, hiking, and spa retreats.',
    image: 'https://images.unsplash.com/photo-1513415756790-2ac1db1297d0?w=1200',
    price: 'From $3,999',
  },
];

export default function ToursPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920"
            alt="China landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/70" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Our Tours</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Curated journeys through China\'s most captivating destinations
          </p>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="py-20 bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <Link
                key={tour.slug}
                href={`/tours/${tour.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-wood text-white px-3 py-1 rounded text-sm font-medium">
                    {tour.price}
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-bamboo text-sm font-medium uppercase tracking-wide">
                    {tour.subtitle}
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-ink mt-2 mb-3">
                    {tour.title}
                  </h2>
                  <p className="text-stone line-clamp-3">
                    {tour.description}
                  </p>
                  <div className="mt-4 flex items-center text-wood font-medium">
                    View Details
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
