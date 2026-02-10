import React from 'react';

interface ExperienceCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function ExperienceCard({ icon, title, description }: ExperienceCardProps) {
  return (
    <div className="card p-6 text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-serif font-semibold text-ink mb-3">{title}</h3>
      <p className="text-stone">{description}</p>
    </div>
  );
}
