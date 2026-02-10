export const PRODUCTS = {
  classic: {
    id: 'classic',
    slug: 'classic',
    title: 'Classic China Journey',
    subtitle: 'Timeless Wonders of the Middle Kingdom',
    description: 'Experience the iconic landmarks and ancient treasures of China on this carefully curated journey through history.',
    price: 2999,
    duration: '12 Days',
    location: "Beijing, Xi'an, Shanghai, Suzhou",
    heroImage: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1920',
    gallery: [],
    highlights: [
      "Walk the Great Wall at Mutianyu",
      'Explore the Terracotta Warriors',
      'Cruise the Huangpu River in Shanghai',
      'Wander the classical gardens of Suzhou',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Beijing',
        description: 'Welcome to China! Transfer to your luxury hotel in the heart of Beijing.',
        meals: ['Dinner'],
      },
      {
        day: 2,
        title: 'Forbidden City & Tiananmen',
        description: 'Explore the imperial palace and the vast square that witnessed history.',
        meals: ['Breakfast', 'Lunch'],
      },
      {
        day: 3,
        title: 'Great Wall at Mutianyu',
        description: 'Walk along the ancient ramparts of the Great Wall with stunning mountain views.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
      },
    ],
    included: ['Luxury hotel accommodations', 'Daily meals as specified', 'Professional guides', 'All entrance fees', 'Private transfers'],
    notIncluded: ['International flights', 'Personal expenses', 'Travel insurance'],
  },
  culinary: {
    id: 'culinary',
    slug: 'culinary',
    title: 'Culinary China Adventure',
    subtitle: 'A Gastronomic Journey Through Tradition',
    description: 'Discover the rich flavors and culinary heritage of China through hands-on cooking experiences and authentic dining.',
    price: 3499,
    duration: '10 Days',
    location: 'Chengdu, Xi\'an, Hong Kong, Guangzhou',
    heroImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920',
    gallery: [],
    highlights: [
      'Learn to make dumplings in Chengdu',
      'Sichuan cooking class with master chef',
      'Dim sum brunch in Hong Kong',
      'Street food tour in Guangzhou',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Chengdu',
        description: 'Welcome to the spicy heart of Sichuan cuisine!',
        meals: ['Dinner'],
      },
    ],
    included: ['Luxury hotel accommodations', 'Daily meals', 'Cooking classes', 'Professional guides', 'Private transfers'],
    notIncluded: ['International flights', 'Personal expenses', 'Travel insurance'],
  },
  nature: {
    id: 'nature',
    slug: 'nature',
    title: 'Natural Wonders of China',
    subtitle: 'From Mountains to Rice Terraces',
    description: 'Explore the breathtaking natural landscapes of China, from ancient mountains to terraced rice fields.',
    price: 2799,
    duration: '11 Days',
    location: 'Guilin, Yangshuo, Zhangjiajie, Kunming',
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920',
    gallery: [],
    highlights: [
      'Cruise the Li River',
      'Explore Zhangjiajie National Forest Park',
      'Bike through Yangshuo countryside',
      'Visit the Stone Forest',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Guilin',
        description: 'Arrive in Guilin, gateway to China\'s most scenic landscapes.',
        meals: ['Dinner'],
      },
    ],
    included: ['Luxury hotel accommodations', 'Daily meals', 'Professional guides', 'All tours and transfers'],
    notIncluded: ['International flights', 'Personal expenses', 'Travel insurance'],
  },
};

export const SITE_NAME = 'lulutravel';
export const SITE_URL = 'https://lulutravel.com';
export const SUPPORT_EMAIL = 'support@lulutravel.com';
