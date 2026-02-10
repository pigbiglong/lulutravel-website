import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

const tours: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  highlights: string[];
  itinerary: { day: number; title: string; description: string }[];
}> = {
  classic: {
    title: 'Classic China',
    subtitle: '8 Days',
    description: 'Experience the iconic landmarks and rich history of China\'s most famous cities. From the majestic Great Wall to the ancient Terracotta Warriors, this journey offers an unforgettable introduction to the Middle Kingdom.',
    duration: '8 Days / 7 Nights',
    price: '2,999',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1920',
    highlights: [
      'Walk on the Great Wall of China',
      'Explore the Forbidden City',
      'Marvel at the Terracotta Warriors',
      'Cruise the Huangpu River in Shanghai',
      'Authentic Peking Duck dinner',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Beijing', description: 'Private transfer to luxury hotel. Welcome dinner at a traditional courtyard restaurant.' },
      { day: 2, title: 'Imperial Beijing', description: 'Morning visit to Tiananmen Square and the Forbidden City. Afternoon Temple of Heaven.' },
      { day: 3, title: 'The Great Wall', description: 'Full-day excursion to the Mutianyu section with cable car and toboggan ride.' },
      { day: 4, title: 'Beijing to Xi\'an', description: 'Morning flight to Xi\'an. Afternoon visit to the Ancient City Wall.' },
      { day: 5, title: 'Terracotta Army', description: 'Full-day tour of the Terracotta Warriors Museum and Hanyangling Mausoleum.' },
      { day: 6, title: 'Xi\'an to Shanghai', description: 'Morning flight to Shanghai. Evening Huangpu River cruise.' },
      { day: 7, title: 'Modern Shanghai', description: 'Yu Garden, The Bund, and Shanghai Tower observation deck.' },
      { day: 8, title: 'Departure', description: 'Private transfer to airport for your onward journey.' },
    ],
  },
  culinary: {
    title: 'Culinary Adventures',
    subtitle: '10 Days',
    description: 'A gastronomic journey through China\'s diverse regional cuisines. From spicy Sichuan hotpot to delicate Cantonese dim sum, discover the flavors that have shaped Chinese culture for millennia.',
    duration: '10 Days / 9 Nights',
    price: '3,499',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=1920',
    highlights: [
      'Private cooking classes with master chefs',
      'Street food tours in Chengdu',
      'Michelin-starred restaurant experiences',
      'Traditional tea ceremony',
      'Visit local markets and spice bazaars',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Chengdu', description: 'Welcome dinner featuring authentic Sichuan hotpot.' },
      { day: 2, title: 'Spice Market & Cooking', description: 'Morning market tour. Afternoon cooking class learning Mapo Tofu and Kung Pao Chicken.' },
      { day: 3, title: 'Panda Sanctuary', description: 'Morning visit to Giant Panda Base. Afternoon street food tour.' },
      { day: 4, title: 'Chengdu to Guangzhou', description: 'Flight to Guangzhou. Evening food walking tour.' },
      { day: 5, title: 'Dim Sum Masters', description: 'Morning dim sum experience. Afternoon cooking class.' },
      { day: 6, title: 'Guangzhou to Shanghai', description: 'Flight to Shanghai. Dinner at a Michelin-starred restaurant.' },
      { day: 7, title: 'Shanghai Food Scene', description: 'Breakfast at local market. Food tour through historic neighborhoods.' },
      { day: 8, title: 'Tea Culture', description: 'Day trip to tea plantations. Traditional tea ceremony.' },
      { day: 9, title: 'Fine Dining', description: 'Free morning. Farewell dinner at a renowned Shanghainese restaurant.' },
      { day: 10, title: 'Departure', description: 'Private transfer to airport.' },
    ],
  },
  nature: {
    title: 'Nature & Wellness',
    subtitle: '12 Days',
    description: 'Escape the crowds and reconnect with nature in China\'s most stunning landscapes. From the floating mountains of Zhangjiajie to the serene waters of Guilin, this journey nourishes body and soul.',
    duration: '12 Days / 11 Nights',
    price: '3,999',
    image: 'https://images.unsplash.com/photo-1513415756790-2ac1db1297d0?w=1920',
    highlights: [
      'Zhangjiajie\'s Avatar Mountains',
      'Li River cruise through karst peaks',
      'Sunrise Tai Chi sessions',
      'Luxury spa retreats',
      'Hiking through ancient villages',
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Zhangjiajie', description: 'Transfer to mountain resort. Evening wellness consultation.' },
      { day: 2, title: 'Avatar Mountains', description: 'Full day in Zhangjiajie National Forest Park. Glass bridge experience.' },
      { day: 3, title: 'Tianmen Mountain', description: 'Cable car ride and Tianmen Cave exploration.' },
      { day: 4, title: 'Zhangjiajie to Guilin', description: 'Morning flight to Guilin. Afternoon at leisure.' },
      { day: 5, title: 'Li River Cruise', description: 'Scenic cruise to Yangshuo through karst landscapes.' },
      { day: 6, title: 'Yangshuo Exploration', description: 'Bamboo rafting and cycling through countryside.' },
      { day: 7, title: 'Yangshuo Wellness', description: 'Morning Tai Chi. Spa treatments and hot springs.' },
      { day: 8, title: 'Longji Rice Terraces', description: 'Day trip to ancient rice terraces. Hike through minority villages.' },
      { day: 9, title: 'Guilin to Hangzhou', description: 'Flight to Hangzhou. West Lake sunset walk.' },
      { day: 10, title: 'Hangzhou Serenity', description: 'Tea plantation visit. Meditation session at Lingyin Temple.' },
      { day: 11, title: 'Wellness Retreat', description: 'Full day spa and wellness program.' },
      { day: 12, title: 'Departure', description: 'Transfer to Shanghai for departure.' },
    ],
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const tour = tours[params.slug];
  if (!tour) return { title: 'Tour Not Found' };
  
  return {
    title: `${tour.title} | lulutravel`,
    description: tour.description,
    openGraph: {
      title: `${tour.title} - ${tour.subtitle} | lulutravel`,
      description: tour.description,
      images: [tour.image],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(tours).map((slug) => ({ slug }));
}

export default function TourDetailPage({ params }: { params: { slug: string } }) {
  const tour = tours[params.slug];
  
  if (!tour) {
    notFound();
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end justify-center">
        <div className="absolute inset-0">
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
        </div>
        <div className="relative z-10 text-center text-white px-4 pb-20">
          <span className="inline-block text-wood text-sm font-medium uppercase tracking-wide mb-4">
            {tour.subtitle}
          </span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">{tour.title}</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-6">
            {tour.duration}
          </p>
          <p className="text-3xl font-serif">From ${tour.price}</p>
        </div>
      </section>

      {/* Description & Highlights */}
      <section className="py-16 bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-serif font-bold text-ink mb-6">About This Tour</h2>
              <p className="text-stone text-lg leading-relaxed mb-8">
                {tour.description}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-wood text-white font-medium rounded-lg hover:bg-wood-light transition-colors"
              >
                Inquire Now
              </Link>
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-ink mb-6">Highlights</h3>
              <ul className="space-y-4">
                {tour.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-6 h-6 text-bamboo mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-dai">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Itinerary */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-serif font-bold text-ink mb-12 text-center">Day by Day Itinerary</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {tour.itinerary.map((day) => (
              <div key={day.day} className="flex gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-ink text-white rounded-full flex items-center justify-center font-serif font-bold text-xl">
                  {day.day}
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-ink mb-2">{day.title}</h3>
                  <p className="text-stone">{day.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-ink text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-white/80 mb-8 text-lg">Contact us to customize this tour to your preferences</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-wood text-white font-medium rounded-lg hover:bg-wood-light transition-colors"
            >
              Get in Touch
            </Link>
            <Link
              href="/tours"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-ink transition-colors"
            >
              View All Tours
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
