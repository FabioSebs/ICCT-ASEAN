"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { FaLaptopCode , FaLeaf, FaEnvelopeOpen } from 'react-icons/fa';
import { MdBrush } from 'react-icons/md';
import { IoMusicalNotesSharp } from 'react-icons/io5';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FaClock, FaMapMarkerAlt,FaArrowRight } from 'react-icons/fa';
import { EVENT_TYPE_ART, EVENT_TYPE_SUSTAIN, EVENT_TYPE_TECH } from '@/lib/constants/eventTypes';

interface Event {
  id: string;
  name: string;
  description: string;
  location: string;
  start_date : string;
  end_date : string;
  is_online : boolean;
  url : string;
  type : string;
}

interface EventEntriesProps {
  events : Event[];
}

export default function UpcomingEventsPage({events} : EventEntriesProps){
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
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

function getIcon(type : string) {
  const eventThemes = {
    EVENT_TYPE_SUSTAIN : {
      Icon : FaLeaf,
      color : 'rgb(7, 250, 117)'
    },
    EVENT_TYPE_ART : {
      Icon : MdBrush,
      color : 'rgb(244, 114, 182)'
    },
    EVENT_TYPE_TECH : {
      Icon : FaLaptopCode,
      color : 'rgb(52, 211, 153)'
    }
  }
  switch (type.toLowerCase()) {
    case EVENT_TYPE_ART:
      return eventThemes.EVENT_TYPE_ART
    case EVENT_TYPE_TECH:
      return eventThemes.EVENT_TYPE_TECH
    case EVENT_TYPE_SUSTAIN:
      return eventThemes.EVENT_TYPE_SUSTAIN
    default:
      return {Icon : FaEnvelopeOpen , color : 'bg-gray-400'}
  }
}

function formatDate(isoString: string): string {
  const date = new Date(isoString)
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  
  return new Intl.DateTimeFormat('en-US', options).format(date)
}

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const {Icon, color} = getIcon(event.type)

  const handleLearnMore = () => {
    router.push(`/events/${event.id}`);
  };

  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2"
      style={{
        background: `linear-gradient(135deg, ${color} 22 0%, hsl(var(--card)) 100%)`,
        borderTop: `4px solid ${color}`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <Icon 
          className={`h-12 w-12 transition-all duration-300 ${isHovered ? 'animate-bounce-three-times' : ''}`} 
          style={{ color }} 
        />
        <div className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: `${color} 22`, color: color }}>
          {formatDate(event.start_date)}
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-2xl font-bold mb-2">{event.name}</CardTitle>
        <CardDescription className="mb-4 line-clamp-2">{event.description}</CardDescription>
        <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-4">
          <div className="flex items-center mr-4 mb-2">
            <FaClock className="mr-2 h-4 w-4" style={{ color: color }} />
          </div>
          <div className="flex items-center mb-2">
            <FaMapMarkerAlt className="mr-2 h-4 w-4" style={{ color: color }} />
            <span>{event.location}</span>
          </div>
        </div>
        <button 
          onClick={handleLearnMore}
          className="w-full text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-card"
          style={{ background: color, boxShadow: `0 4px 14px 0 ${color}55` }}
        >
          Learn More
          <FaArrowRight className={`inline-block ml-2 h-4 w-4 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} />
        </button>
      </CardContent>
    </Card>
  );
};
