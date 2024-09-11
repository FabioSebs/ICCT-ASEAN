"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaArrowRight } from 'react-icons/fa';
import { FaLaptopCode } from 'react-icons/fa';
import { MdBrush } from 'react-icons/md';
import { IoMusicalNotesSharp } from 'react-icons/io5';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  icon: React.ElementType;
  color: string;
}

const upcomingEvents: Event[] = [
  {
    id: 1,
    title: 'ICCT Conference 2024',
    date: '2024-10-15',
    time: '09:00 AM',
    location: 'San Francisco, CA',
    description: 'Join us for the biggest tech conference of the year, featuring industry leaders and innovative workshops.',
    icon: FaLaptopCode,
    color: 'rgb(52, 211, 153)'
  },
  {
    id: 2,
    title: 'Team Painting',
    date: '2024-11-05',
    time: '10:00 AM',
    location: 'New York, NY',
    description: 'Experience a captivating showcase of contemporary art from emerging and established artists.',
    icon: MdBrush,
    color: 'rgb(96, 165, 250)'
  },
  {
    id: 3,
    title: 'Jazz x Work Meetup',
    date: '2024-12-01',
    time: '12:00 PM',
    location: 'Austin, TX',
    description: 'A three-day extravaganza featuring a diverse lineup of musical acts across multiple genres.',
    icon: IoMusicalNotesSharp,
    color: 'rgb(244, 114, 182)'
  },
];

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const IconComponent = event.icon;

  const handleLearnMore = () => {
    router.push(`/event/${event.id}`);
  };

  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2"
      style={{
        background: `linear-gradient(135deg, ${event.color}22 0%, hsl(var(--card)) 100%)`,
        borderTop: `4px solid ${event.color}`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <IconComponent 
          className={`h-12 w-12 transition-all duration-300 ${isHovered ? 'animate-bounce-three-times' : ''}`} 
          style={{ color: event.color }} 
        />
        <div className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: `${event.color}22`, color: event.color }}>
          {event.date}
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-2xl font-bold mb-2">{event.title}</CardTitle>
        <CardDescription className="mb-4 line-clamp-2">{event.description}</CardDescription>
        <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-4">
          <div className="flex items-center mr-4 mb-2">
            <FaClock className="mr-2 h-4 w-4" style={{ color: event.color }} />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center mb-2">
            <FaMapMarkerAlt className="mr-2 h-4 w-4" style={{ color: event.color }} />
            <span>{event.location}</span>
          </div>
        </div>
        <button 
          onClick={handleLearnMore}
          className="w-full text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card"
          style={{ background: event.color, boxShadow: `0 4px 14px 0 ${event.color}55` }}
        >
          Learn More
          <FaArrowRight className={`inline-block ml-2 h-4 w-4 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} />
        </button>
      </CardContent>
    </Card>
  );
};

const UpcomingEventsPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Head>
        <title>Upcoming Events</title>
        <meta name="description" content="Discover our exciting lineup of upcoming events" />
      </Head>

      <main className="flex-grow overflow-y-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Upcoming <span className="text-primary">Events</span>
          </h1>
          <p className="text-md sm:text-lg text-center text-muted-foreground mb-8">
            Discover experiences that will inspire and excite you
          </p>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UpcomingEventsPage;
