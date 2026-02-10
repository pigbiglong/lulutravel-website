'use client';

import React, { useState } from 'react';
import { ItineraryDay } from '@/types';
import { cn } from '@/lib/utils';

interface ItineraryProps {
  days: readonly ItineraryDay[];
}

export default function Itinerary({ days }: ItineraryProps) {
  const [expandedDays, setExpandedDays] = useState<number[]>([1]);

  const toggleDay = (day: number) => {
    setExpandedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <h2 className="section-title text-center mb-16">Your Itinerary</h2>
        <div className="max-w-4xl mx-auto">
          {days.map((day) => (
            <div key={day.day} className="mb-4">
              <button
                onClick={() => toggleDay(day.day)}
                className={cn(
                  'w-full flex items-center p-6 rounded-xl text-left transition-all duration-300',
                  expandedDays.includes(day.day)
                    ? 'bg-ink text-white'
                    : 'bg-cream text-dai hover:bg-stone/10'
                )}
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center font-serif text-xl font-bold mr-6">
                  {expandedDays.includes(day.day) ? (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  ) : (
                    <span>Day {day.day}</span>
                  )}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-serif font-semibold">{day.title}</h3>
                  {!expandedDays.includes(day.day) && (
                    <p className="text-sm opacity-80 mt-1">{day.description.substring(0, 60)}...</p>
                  )}
                </div>
              </button>

              {expandedDays.includes(day.day) && (
                <div className="ml-4 pl-20 pr-6 py-6 bg-cream rounded-b-xl">
                  <p className="text-dai mb-4">{day.description}</p>
                  {day.image && (
                    <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                      <img src={day.image} alt={day.title} className="object-cover w-full h-full" />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-stone">Meals:</span>
                    <div className="flex gap-2">
                      {day.meals.map((meal, i) => (
                        <span key={i} className="px-3 py-1 bg-bamboo/10 text-bamboo rounded-full text-sm">
                          {meal}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
