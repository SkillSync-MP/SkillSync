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

    // ✅ Always initialize safely
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

            // ✅ FIX: backend returns array directly
            const data = res.data || [];

            setResults(data);

            toast.success(`Found ${data.length} users!`);
        } catch (error: any) {
            console.error("Search error:", error);
            toast.error(error.response?.data?.error || "Search failed");

            // ✅ Prevent crash
            setResults([]);
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

    const departments = formData.find((f) => f.question.includes("department"))?.options || [];
    const years = formData.find((f) => f.question.includes("graduation year"))?.options || [];
    const skills = formData.find((f) => f.question.includes("skills"))?.options || [];
    const careerPaths = formData.find((f) => f.question.includes("career path"))?.options || [];

    return (
        
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Find Your Study Partners</h1>
                    <p className="text-purple-200 text-lg">
                        Search for students with similar interests and goals
                    </p>
                </div>

                {/* SEARCH FORM */}
                <Card className="p-8 mb-8" gradient>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Search Filters</h2>
                        <Button variant="ghost" onClick={clearFilters}>
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

                        {/* Skills */}
                        <div>
        <label className="block text-sm font-medium text-white mb-2">
            Skills
        </label>
        <div className="max-h-40 overflow-y-auto border p-3 rounded-lg bg-white/80">
            {skills.map((skill) => (
                <label key={skill} className="flex items-center space-x-2 mb-2">
                    <input
                        type="checkbox"
                        checked={searchCriteria.known_skills.includes(skill)}
                        onChange={() =>
                            handleCheckboxChange("known_skills", skill)
                        }
                    />
                    <span>{skill}</span>
                </label>
            ))}
        </div>
    </div>

                        {/* Career Path */}
                        <div>
        <label className="block text-sm font-medium text-white mb-2">
            Career Path
        </label>
        <div className="max-h-40 overflow-y-auto border p-3 rounded-lg bg-white/80">
            {careerPaths.map((path) => (
                <label key={path} className="flex items-center space-x-2 mb-2">
                    <input
                        type="checkbox"
                        checked={searchCriteria.career_path.includes(path)}
                        onChange={() =>
                            handleCheckboxChange("career_path", path)
                        }
                    />
                    <span>{path}</span>
                </label>
            ))}
        </div>

           {/* Learning Goal */}
    <Input
        label="Learning Goal"
        placeholder="Enter learning goal"
        value={searchCriteria.learning_goal}
        onChange={(e) =>
            setSearchCriteria({
                ...searchCriteria,
                learning_goal: e.target.value,
            })
        }
    />
    </div>
                    </div>

                    <Button onClick={handleSearch} className="w-full mt-6">
                        {loading ? "Searching..." : "Search"}
                    </Button>
                </Card>

                {/* RESULTS */}
                {(results || []).length > 0 && (
                    <div>
                        <h2 className="text-2xl text-white mb-4">
                            {/* Results ({results.length}) */}
                            Search Results ({results.length} found)
                        </h2>

                        {/* <div className="grid grid-cols-3 gap-4"> */}
                            <div className="space-y-6">
                            {/* {(results || []).map((user: any) => (
                                <Link key={user._id} href={`/profile/${user._id}`}>
                                    <Card className="p-4 cursor-pointer">
                                        <h3 className="text-white text-lg">{user.name}</h3>
                                        <p className="text-purple-200">{user.email}</p>
                                    </Card>
                                </Link>
                            ))} */}
                            {(results || []).map((user: any) => (
    <Link key={user._id} href={`/profile/${user._id}`}>
        {/* <Card className="p-6 hover:scale-[1.01] transition-all duration-300" gradient> */}
        <Card className="p-6 hover:scale-[1.01] hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300" gradient>

            {/* Header */}
            <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white text-xl font-bold">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-white">
                        {user.name}
                    </h3>
                    <p className="text-purple-200 text-sm">
                        {user.email || "No email"}
                    </p>
                </div>
            </div>

            {/* Info Section */}
            <div className="space-y-2 text-sm">
                <p className="text-purple-200">
                    <strong className="text-white">Department:</strong>{" "}
                    {user.branch || "N/A"}
                </p>

                <p className="text-purple-200">
                    <strong className="text-white">Year:</strong>{" "}
                    {user.passing_year || "N/A"}
                </p>

                <p className="text-purple-200">
                    <strong className="text-white">Skills:</strong>{" "}
                    {user.known_skills?.slice(0, 5).join(", ") || "None"}
                    {user.known_skills?.length > 5 && "..."}
                </p>

                <p className="text-purple-200">
                    <strong className="text-white">Career Path:</strong>{" "}
                    {user.career_path?.slice(0, 3).join(", ") || "None"}
                    {user.career_path?.length > 3 && "..."}
                </p>
            </div>

            {/* Score (AI feature 🔥) */}
            {user.final_score && (
                <div className="mt-4 text-green-400 font-medium">
                    Match Score: {user.final_score.toFixed(1)}%
                </div>
            )}

            {/* Button */}
            <div className="mt-4 pt-4 border-t border-white/20">
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-white/30 text-white hover:bg-white/10"
                >
                    View Profile
                </Button>
            </div>

        </Card>
    </Link>
))}
                        </div>
                    </div>
                )}

                {/* EMPTY STATE */}
                {/* {(!results || results.length === 0) && !loading && (
                    <Card className="p-8 text-center">
                        <h3 className="text-white text-xl">No Results Found</h3>
                    </Card>
                )} */}
                {(!results || results.length === 0) && !loading && (
    <Card className="p-12 text-center" gradient>
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-2xl font-bold text-white mb-2">
            No Results Found
        </h3>
        <p className="text-purple-200">
            Try adjusting your filters.
        </p>
    </Card>
)}

            </div>
        </div>
    );
}