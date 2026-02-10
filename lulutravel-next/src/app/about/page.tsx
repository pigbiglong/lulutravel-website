import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us | lulutravel',
  description: 'Learn about lulutravel - your trusted partner for premium China travel experiences. Discover our story, mission, and commitment to authentic journeys.',
};

const team = [
  {
    name: 'Sarah Chen',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    bio: 'Former travel journalist with 15 years exploring China\'s hidden gems.',
  },
  {
    name: 'Michael Zhang',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    bio: 'Expert in creating seamless travel experiences across China.',
  },
  {
    name: 'Emily Liu',
    role: 'Lead Tour Designer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    bio: 'Specializes in crafting unique itineraries for discerning travelers.',
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920"
            alt="China landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 to-ink/70" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">About Us</h1>
          <p className="text-xl text-white/90">Your trusted partner for China travel</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-cream">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold text-ink mb-8">Our Story</h2>
            <p className="text-lg text-stone leading-relaxed mb-6">
              Founded by travelers who fell in love with China, lulutravel was born from a simple belief: 
              that every journey should be as unique as the traveler taking it.
            </p>
            <p className="text-lg text-stone leading-relaxed mb-6">
              We\'ve spent years exploring every corner of this vast country — from the misty peaks of 
              Zhangjiajie to the ancient alleyways of Lijiang. Along the way, we\'ve built relationships 
              with local guides, boutique hotels, and hidden restaurants that most travelers never discover.
            </p>
            <p className="text-lg text-stone leading-relaxed">
              Today, we bring these connections to you. Every lulutravel experience is crafted with care, 
              designed to show you the China we know and love — authentic, beautiful, and endlessly fascinating.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-serif font-bold text-ink mb-12 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-bamboo/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-bamboo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-ink mb-3">Authenticity</h3>
              <p className="text-stone">
                We believe in real experiences, not tourist traps. Our tours connect you with genuine local culture.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-bamboo/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-bamboo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-ink mb-3">Personalization</h3>
              <p className="text-stone">
                Every traveler is unique. We tailor each journey to your interests, pace, and preferences.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-bamboo/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-bamboo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-serif font-bold text-ink mb-3">Care</h3>
              <p className="text-stone">
                From your first inquiry to your safe return home, we\'re with you every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-cream">
        <div className="container-custom">
          <h2 className="text-4xl font-serif font-bold text-ink mb-12 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-serif font-bold text-ink">{member.name}</h3>
                  <p className="text-bamboo font-medium mb-3">{member.role}</p>
                  <p className="text-stone text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-ink text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-serif font-bold mb-4">Ready to Explore China?</h2>
          <p className="text-white/80 mb-8 text-lg">Let us create your perfect journey</p>
          <Link
            href="/tours"
            className="inline-flex items-center justify-center px-8 py-4 bg-wood text-white font-medium rounded-lg hover:bg-wood-light transition-colors"
          >
            View Our Tours
          </Link>
        </div>
      </section>
    </main>
  );
}
