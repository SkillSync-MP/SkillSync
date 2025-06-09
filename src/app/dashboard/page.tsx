//src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function Dashboard() {
    const router = useRouter();
    const { user, isLoggedIn, loading } = useAuthContext();
    const [activeTab, setActiveTab] = useState('connections');

    useEffect(() => {
        if (!loading && !isLoggedIn) {
            router.push("/login");
        }
    }, [isLoggedIn, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
            </div>
        );
    }

    if (!user) return null;

    const featuredTopics = [
        { name: "Web Development", icon: "🌐", color: "from-blue-500 to-cyan-500" },
        { name: "Machine Learning", icon: "🤖", color: "from-purple-500 to-pink-500" },
        { name: "Competitive Programming", icon: "⚡", color: "from-yellow-500 to-orange-500" },
        { name: "Cyber Security", icon: "🔒", color: "from-red-500 to-pink-500" },
    ];

    const connections = [
        { name: "Vaibhav Soni", field: "AI & ML learner", avatar: "V" },
        { name: "Vaishnavi Kanera", field: "Data Science learner", avatar: "V" },
        { name: "Pranshu Bhatt", field: "GATE CS aspirant", avatar: "P" },
    ];

    const events = [
        { title: "AI & ML Trends", date: "March 15, 2025", type: "Online Webinar" },
        { title: "Web Development Bootcamp", date: "April 5, 2025", type: "College Seminar" },
        { title: "Cyber Security Conference", date: "April 20, 2025", type: "Online Webinar" },
    ];

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Welcome back, {user.name}! 👋
                    </h1>
                    <p className="text-purple-200 text-lg">
                        Ready to continue your learning journey?
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="p-6 text-center" hover>
                        <Link href="/search">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-white font-semibold">Find Partners</h3>
                        </Link>
                    </Card>
                    <Card className="p-6 text-center" hover>
                        <Link href="/profile">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-white font-semibold">Edit Profile</h3>
                        </Link>
                    </Card>
                    <Card className="p-6 text-center" hover>
                        <Link href="/study">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-white font-semibold">Study Groups</h3>
                        </Link>
                    </Card>
                    <Card className="p-6 text-center" hover>
                        <Link href="/contacts">
                            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-white font-semibold">My Network</h3>
                        </Link>
                    </Card>
                </div>

                {/* Featured Topics */}
                <Card className="p-8 mb-8" gradient>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                        🔥 Featured Topics
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {featuredTopics.map((topic, index) => (
                            <div
                                key={index}
                                className={`bg-gradient-to-r ${topic.color} p-4 rounded-lg text-white text-center font-semibold cursor-pointer hover:scale-105 transition-transform duration-200 shadow-lg`}
                            >
                                <div className="text-2xl mb-2">{topic.icon}</div>
                                {topic.name}
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Tabs Section */}
                <Card className="p-8" gradient>
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <Button
                            variant={activeTab === 'connections' ? 'primary' : 'ghost'}
                            onClick={() => setActiveTab('connections')}
                            className="flex items-center gap-2"
                        >
                            👥 Recommended Connections
                        </Button>
                        <Button
                            variant={activeTab === 'events' ? 'primary' : 'ghost'}
                            onClick={() => setActiveTab('events')}
                            className="flex items-center gap-2"
                        >
                            🎤 Upcoming Events & Webinars
                        </Button>
                    </div>

                    {activeTab === 'connections' && (
                        <div>
                            <p className="text-purple-200 mb-4">
                                📌 Connect with students who share similar interests & exam goals.
                            </p>
                            <div className="space-y-3">
                                {connections.map((connection, index) => (
                                    <div key={index} className="flex items-center gap-4 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                                            {connection.avatar}
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold">{connection.name}</h4>
                                            <p className="text-purple-200 text-sm">{connection.field}</p>
                                        </div>
                                        <Button variant="outline" size="sm" className="ml-auto border-white/30 text-white hover:bg-white/10">
                                            Connect
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'events' && (
                        <div>
                            <p className="text-purple-200 mb-4">
                                📌 Stay updated with upcoming tech events & webinars.
                            </p>
                            <div className="space-y-3">
                                {events.map((event, index) => (
                                    <div key={index} className="p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors duration-200">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="text-white font-semibold mb-1">🔹 {event.title}</h4>
                                                <p className="text-purple-200 text-sm">{event.date} ({event.type})</p>
                                            </div>
                                            <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                                                Register
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}