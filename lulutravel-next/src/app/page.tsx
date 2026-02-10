import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'lulutravel | Premium China Tours',
  description: 'Discover premium China travel experiences. From the Great Wall to ancient villages, we craft unforgettable journeys for discerning travelers.',
};

const tours = [
  {
    slug: 'classic',
    title: 'Classic China',
    subtitle: '8 Days',
    description: 'Beijing, Xi\'an, Shanghai — the essential China experience',
    image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800',
    price: 'From $2,999',
  },
  {
    slug: 'culinary',
    title: 'Culinary Adventures',
    subtitle: '10 Days',
    description: 'A gastronomic journey through regional cuisines',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800',
    price: 'From $3,499',
  },
  {
    slug: 'nature',
    title: 'Nature & Wellness',
    subtitle: '12 Days',
    description: 'Mountains, rivers, and spiritual retreats',
    image: 'https://images.unsplash.com/photo-1513415756790-2ac1db1297d0?w=800',
    price: 'From $3,999',
  },
];

export default function HomePage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920"
            alt="China landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink/60" />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
            Discover China
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
            Premium travel experiences crafted for discerning travelers seeking authentic cultural journeys
          </p>
          <Link
            href="/tours"
            className="inline-flex items-center justify-center px-8 py-4 bg-wood text-white font-medium rounded-lg hover:bg-wood-light transition-colors text-lg"
          >
            Explore Our Tours
          </Link>
        </div>
      </section>

      {/* Tours Section */}
      <section className="py-20 bg-cream">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-ink mb-4">
              Our Tours
            </h2>
            <p className="text-xl text-stone max-w-2xl mx-auto">
              Curated journeys through China&apos;s most captivating destinations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <Link
                key={tour.slug}
                href={`/tours/${tour.slug}`}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
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
                  <h3 className="text-2xl font-serif font-bold text-ink mt-2 mb-3">
                    {tour.title}
                  </h3>
                  <p className="text-stone mb-4">
                    {tour.description}
                  </p>
                  <div className="flex items-center text-wood font-medium">
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

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-ink mb-4">
              Why Travel With Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-wood/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-wood" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-ink mb-3">Expert Local Guides</h3>
              <p className="text-stone">
                Our guides are passionate locals who bring destinations to life with insider knowledge.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-wood/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-wood" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-ink mb-3">Personalized Service</h3>
              <p className="text-stone">
                Every journey is tailored to your preferences, pace, and interests.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-wood/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-wood" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-ink mb-3">Authentic Experiences</h3>
              <p className="text-stone">
                Beyond tourist spots — genuine cultural immersion and exclusive access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-cream">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-ink mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-xl text-stone max-w-2xl mx-auto">
              Real stories from real travelers who discovered China with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-wood" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-dai mb-6 leading-relaxed">
                &quot;An absolutely magical experience. Our guide knew every hidden corner of Beijing, and the private dinner on the Great Wall was unforgettable. This is how travel should be.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-wood rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  J
                </div>
                <div>
                  <p className="font-medium text-ink">Jennifer M.</p>
                  <p className="text-sm text-stone">Classic China, March 2024</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-wood" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-dai mb-6 leading-relaxed">
                &quot;The culinary tour exceeded all expectations. From street food in Chengdu to a private cooking class with a master chef, every meal was an adventure. Highly recommend!&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-bamboo rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  R
                </div>
                <div>
                  <p className="font-medium text-ink">Robert & Sarah K.</p>
                  <p className="text-sm text-stone">Culinary Adventures, May 2024</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-wood" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-dai mb-6 leading-relaxed">
                &quot;The Nature & Wellness retreat was transformative. Practicing Tai Chi at sunrise in Zhangjiajie, surrounded by floating mountains — I found peace I didn&apos;t know I was looking for.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-ink rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  A
                </div>
                <div>
                  <p className="font-medium text-ink">Amanda L.</p>
                  <p className="text-sm text-stone">Nature & Wellness, June 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ink text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-white/80 mb-8 text-lg max-w-2xl mx-auto">
            Contact us today and let&apos;s create an unforgettable China experience together.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-wood text-white font-medium rounded-lg hover:bg-wood-light transition-colors text-lg"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  );
}
