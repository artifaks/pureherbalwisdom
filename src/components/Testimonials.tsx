
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const testimonials = [
  {
    name: 'Sarah L.',
    role: 'Wellness Coach',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    quote: 'The search capabilities and depth of the herb database have transformed how I create wellness plans for my clients. This is my go-to resource for herbal information.',
    stars: 5
  },
  {
    name: 'Dr. Michael Chen',
    role: 'Integrative Medicine',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    quote: "I appreciate the scientific backing behind each herb profile. The information is presented in a way that's accessible to both practitioners and patients.",
    stars: 5
  },
  {
    name: 'Jamie K.',
    role: 'Herbal Enthusiast',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    quote: "I've discovered amazing herbal combinations I never knew about. My sleep quality has improved dramatically since finding and using the herb pairings recommended here.",
    stars: 5
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block p-2 bg-amber-50 rounded-full mb-4">
            <Quote className="h-6 w-6 text-amber-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">What People Are Saying</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our users love the depth and usability of our herb guide. See what they have to say about their experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="overflow-hidden shadow-md border-amber-100">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-amber-300"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                    <p className="text-amber-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
