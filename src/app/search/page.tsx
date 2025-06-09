"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import formData from "../onboarding/formData";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function Search() {
    const [searchCriteria, setSearchCriteria] = useState({
        name: "",
        email: "",
        branch: "",
        passing_year: "",
        known_skills: [] as string[],
        career_path: [] as string[],
        experience: "",
        learning_goal: "",
        availability: "",
        isOnboarded: "",
        isVerified: "",
    });
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            Object.entries(searchCriteria).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach((v) => params.append(key, v));
                } else if (value) {
                    params.append(key, value);
                }
            });

            const res = await axios.get(`/api/users/search?${params.toString()}`);
            setResults(res.data.users);
            toast.success(`Found ${res.data.users.length} users!`);
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Search failed");
        } finally {
            setLoading(false);
        }
    };

    const handleCheckboxChange = (key: 'known_skills' | 'career_path', value: string) => {
        setSearchCriteria((prev) => ({
            ...prev,
            [key]: prev[key].includes(value)
                ? prev[key].filter((v: string) => v !== value)
                : [...prev[key], value],
        }));
    };

    const clearFilters = () => {
        setSearchCriteria({
            name: "",
            email: "",
            branch: "",
            passing_year: "",
            known_skills: [],
            career_path: [],
            experience: "",
            learning_goal: "",
            availability: "",
            isOnboarded: "",
            isVerified: "",
        });
        setResults([]);
    };

    // Reuse options from onboarding form
    const departments = formData.find((f) => f.question.includes("department"))?.options || [];
    const years = formData.find((f) => f.question.includes("graduation year"))?.options || [];
    const skills = formData.find((f) => f.question.includes("skills"))?.options || [];
    const careerPaths = formData.find((f) => f.question.includes("career path"))?.options || [];
    const availabilityOptions = formData.find((f) => f.question.includes("available"))?.options || [];

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Find Your Study Partners</h1>
                    <p className="text-purple-200 text-lg">
                        Search for students with similar interests and goals
                    </p>
                </div>

                {/* Search Form */}
                <Card className="p-8 mb-8" gradient>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Search Filters</h2>
                        <Button variant="ghost" onClick={clearFilters} className="text-white hover:bg-white/10">
                            Clear All
                        </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Input
                            label="Name"
                            placeholder="Enter name"
                            value={searchCriteria.name}
                            onChange={(e) => setSearchCriteria({ ...searchCriteria, name: e.target.value })}
                        />
                        
                        <Input
                            label="Email"
                            placeholder="Enter email"
                            value={searchCriteria.email}
                            onChange={(e) => setSearchCriteria({ ...searchCriteria, email: e.target.value })}
                        />

                        <div>
                            <label className="block text-sm font-medium text-white mb-2">Department</label>
                            <select
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                                value={searchCriteria.branch}
                                onChange={(e) => setSearchCriteria({ ...searchCriteria, branch: e.target.value })}
                            >
                                <option value="">Select department</option>
                                {departments.map((dept) => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-white mb-2">Graduation Year</label>
                            <select
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
                                value={searchCriteria.passing_year}
                                onChange={(e) => setSearchCriteria({ ...searchCriteria, passing_year: e.target.value })}
                            >
                                <option value="">Select year</option>
                                {years.map((year) => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-span-1 md:col-span-2 lg:col-span-1">
                            <label className="block text-sm font-medium text-white mb-2">Skills</label>
                            <div className="max-h-40 overflow-y-auto border border-gray-300 p-3 rounded-lg bg-white/80 backdrop-blur-sm">
                                {skills.map((skill) => (
                                    <label key={skill} className="flex items-center space-x-2 mb-2">
                                        <input
                                            type="checkbox"
                                            value={skill}
                                            checked={searchCriteria.known_skills.includes(skill)}
                                            onChange={() => handleCheckboxChange("known_skills", skill)}
                                            className="text-indigo-600 focus:ring-indigo-500 rounded"
                                        />
                                        <span className="text-sm text-gray-700">{skill}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-2 lg:col-span-1">
                            <label className="block text-sm font-medium text-white mb-2">Career Path</label>
                            <div className="max-h-40 overflow-y-auto border border-gray-300 p-3 rounded-lg bg-white/80 backdrop-blur-sm">
                                {careerPaths.map((path) => (
                                    <label key={path} className="flex items-center space-x-2 mb-2">
                                        <input
                                            type="checkbox"
                                            value={path}
                                            checked={searchCriteria.career_path.includes(path)}
                                            onChange={() => handleCheckboxChange("career_path", path)}
                                            className="text-indigo-600 focus:ring-indigo-500 rounded"
                                        />
                                        <span className="text-sm text-gray-700">{path}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <Input
                            label="Learning Goal"
                            placeholder="Enter learning goal"
                            value={searchCriteria.learning_goal}
                            onChange={(e) => setSearchCriteria({ ...searchCriteria, learning_goal: e.target.value })}
                        />
                    </div>

                    <Button
                        onClick={handleSearch}
                        disabled={loading}
                        loading={loading}
                        className="w-full mt-8"
                        size="lg"
                    >
                        {loading ? "Searching..." : "Search Students"}
                    </Button>
                </Card>

                {/* Results */}
                {results.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">
                            Search Results ({results.length} found)
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {results.map((user) => (
                                <Link key={user._id} href={`/profile/${user._id}`}>
                                    <Card className="p-6" hover gradient>
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                                                {user.name?.charAt(0).toUpperCase() || 'U'}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-white">{user.name}</h3>
                                                <p className="text-purple-200 text-sm">{user.email}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2 text-sm">
                                            <p className="text-purple-200">
                                                <strong className="text-white">Department:</strong> {user.branch || "N/A"}
                                            </p>
                                            <p className="text-purple-200">
                                                <strong className="text-white">Year:</strong> {user.passing_year || "N/A"}
                                            </p>
                                            <p className="text-purple-200">
                                                <strong className="text-white">Skills:</strong> {user.known_skills?.slice(0, 3).join(", ") || "None"}
                                                {user.known_skills?.length > 3 && "..."}
                                            </p>
                                            <p className="text-purple-200">
                                                <strong className="text-white">Career Path:</strong> {user.career_path?.slice(0, 2).join(", ") || "None"}
                                                {user.career_path?.length > 2 && "..."}
                                            </p>
                                        </div>
                                        
                                        <div className="mt-4 pt-4 border-t border-white/20">
                                            <Button variant="outline" size="sm" className="w-full border-white/30 text-white hover:bg-white/10">
                                                View Profile
                                            </Button>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {results.length === 0 && !loading && (
                    <Card className="p-12 text-center" gradient>
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-white mb-2">No Results Found</h3>
                        <p className="text-purple-200">
                            Try adjusting your search criteria to find more students.
                        </p>
                    </Card>
                )}
            </div>
        </div>
    );
}