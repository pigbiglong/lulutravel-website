import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | lulutravel',
  description: 'Get in touch with lulutravel to plan your perfect China travel experience. We\'re here to help you create unforgettable memories.',
};

export default function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920"
            alt="Contact hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 to-ink/70" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-serif font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-white/90">We\'d love to hear from you</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-cream">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
              <h2 className="text-2xl font-serif font-bold text-ink mb-2">Send us a message</h2>
              <p className="text-stone mb-8">Fill out the form below and we\'ll get back to you within 24 hours.</p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-dai mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border border-stone/30 rounded-lg focus:ring-2 focus:ring-bamboo focus:border-transparent outline-none transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-dai mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-stone/30 rounded-lg focus:ring-2 focus:ring-bamboo focus:border-transparent outline-none transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dai mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-stone/30 rounded-lg focus:ring-2 focus:ring-bamboo focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-dai mb-2">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-stone/30 rounded-lg focus:ring-2 focus:ring-bamboo focus:border-transparent outline-none transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div>
                  <label htmlFor="tour" className="block text-sm font-medium text-dai mb-2">
                    Interested In
                  </label>
                  <select
                    id="tour"
                    name="tour"
                    className="w-full px-4 py-3 border border-stone/30 rounded-lg focus:ring-2 focus:ring-bamboo focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Select a tour</option>
                    <option value="classic">Classic China - 8 Days</option>
                    <option value="culinary">Culinary Adventures - 10 Days</option>
                    <option value="nature">Nature & Wellness - 12 Days</option>
                    <option value="custom">Custom Itinerary</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-dai mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-stone/30 rounded-lg focus:ring-2 focus:ring-bamboo focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us about your travel plans, preferred dates, group size, or any special requests..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-wood text-white font-medium rounded-lg hover:bg-wood-light transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="mt-12 text-center">
              <p className="text-stone mb-2">Or reach us directly at</p>
              <a 
                href="mailto:contact@lulutravel.com" 
                className="text-2xl font-serif text-wood hover:text-wood-light transition-colors"
              >
                contact@lulutravel.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
