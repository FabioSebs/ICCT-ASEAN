"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaArrowRight } from 'react-icons/fa';
import { FaLaptopCode } from 'react-icons/fa';
import { MdBrush } from 'react-icons/md';
import { IoMusicalNotesSharp } from 'react-icons/io5';

const upcomingEvents = [
  { id: 1, title: 'ICCT Conference 2024', date: '2024-10-15', time: '09:00 AM', location: 'San Francisco, CA', description: 'Join us for the biggest tech conference of the year, featuring industry leaders and innovative workshops.', icon: FaLaptopCode, color: '#34D399' },
  { id: 2, title: 'Team Painting', date: '2024-11-05', time: '10:00 AM', location: 'New York, NY', description: 'Experience a captivating showcase of contemporary art from emerging and established artists.', icon: MdBrush, color: '#60A5FA' },
  { id: 3, title: 'Jazz x Work Meetup', date: '2024-12-01', time: '12:00 PM', location: 'Austin, TX', description: 'A three-day extravaganza featuring a diverse lineup of musical acts across multiple genres.', icon: IoMusicalNotesSharp, color: '#F472B6' },
];

const EventCard = ({ event } : any) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const IconComponent = event.icon;

  const handleLearnMore = () => {
    router.push(`/event/${event.id}`);
  };

  return (
    <div 
      className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-2"
      style={{
        background: `linear-gradient(135deg, ${event.color}22 0%, #ffffff 100%)`,
        borderTop: `4px solid ${event.color}`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <IconComponent 
            className={`h-12 w-12 transition-all duration-300 ${isHovered ? 'animate-three-bounces' : ''}`} 
            style={{ color: event.color }} 
          />
          <div className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: `${event.color}22`, color: event.color }}>{event.date}</div>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">{event.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4">
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
          className="w-full bg-white text-gray-800 py-2 px-4 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white"
          style={{ boxShadow: `0 4px 14px 0 ${event.color}55` }}
        >
          Learn More
          <FaArrowRight className={`inline-block ml-2 h-4 w-4 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} />
        </button>
      </div>
    </div>
  );
};

const UpcomingEventsPage = () => {
  return (
    <>
      <style jsx global>{`
        @keyframes threeBounces {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-20px);
          }
          60% {
            transform: translateY(-10px);
          }
        }
        .animate-three-bounces {
          animation: threeBounces 1s ease-in-out;
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-16 px-4 sm:px-6 lg:px-8">
        <Head>
          <title>Upcoming Events</title>
          <meta name="description" content="Discover our exciting lineup of upcoming events" />
        </Head>

        <main className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-2">
            Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Events</span>
          </h1>
          <p className="text-xl text-center text-gray-600 mb-12">Discover experiences that will inspire and excite you</p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default UpcomingEventsPage;