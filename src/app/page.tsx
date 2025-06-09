//src/app/page.tsx
import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* Left side - Hero content */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Connect,
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Collaborate</span>,
                and Learn
              </h1>
              <p className="text-xl text-purple-200 mb-8 leading-relaxed max-w-2xl">
                SkillSync is a networking platform that helps students find study partners,
                form groups, and participate in collaborative learning experiences.
              </p>
              <ul className="space-y-4 mb-8 text-lg text-purple-100">
                <li className="flex items-center justify-center lg:justify-start">
                  <svg className="w-6 h-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Find students with similar interests
                </li>
                <li className="flex items-center justify-center lg:justify-start">
                  <svg className="w-6 h-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Join or create study groups
                </li>
                <li className="flex items-center justify-center lg:justify-start">
                  <svg className="w-6 h-6 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Stay updated with upcoming events & webinars
                </li>
              </ul>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="text-lg px-8 py-4">
                  <Link href="/signup">Get Started</Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10">
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>

            {/* Right side - Images and Features */}
            <div className="flex-1 max-w-lg">
              {/* Images Section */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <Card className="p-6 text-center" hover>
                  <Image 
                    src="/avatars.png" 
                    alt="Find Study Partners" 
                    width={80} 
                    height={80} 
                    className="mx-auto mb-4 rounded-lg"
                  />
                  <h3 className="text-white font-semibold">Find Study Partners</h3>
                </Card>
                <Card className="p-6 text-center" hover>
                  <Image 
                    src="/dev-productivity.png" 
                    alt="Boost Productivity" 
                    width={80} 
                    height={80} 
                    className="mx-auto mb-4 rounded-lg"
                  />
                  <h3 className="text-white font-semibold">Boost Productivity</h3>
                </Card>
                <Card className="p-6 text-center col-span-2" hover>
                  <Image 
                    src="/pair-programming.png" 
                    alt="Collaborate & Learn" 
                    width={80} 
                    height={80} 
                    className="mx-auto mb-4 rounded-lg"
                  />
                  <h3 className="text-white font-semibold">Collaborate & Learn</h3>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose SkillSync?</h2>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto">
              Discover the features that make learning collaborative and engaging
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center" hover gradient>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Smart Networking</h3>
              <p className="text-purple-200">
                Connect with students preparing for the same exams or subjects using our intelligent matching system.
              </p>
            </Card>

            <Card className="p-8 text-center" hover gradient>
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Study Groups</h3>
              <p className="text-purple-200">
                Join discussions, share resources, and prepare together in collaborative study environments.
              </p>
            </Card>

            <Card className="p-8 text-center" hover gradient>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Events & Webinars</h3>
              <p className="text-purple-200">
                Stay informed about upcoming educational events and participate in knowledge-sharing sessions.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Card className="p-12 max-w-4xl mx-auto" gradient>
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Learning Experience?
            </h2>
            <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already collaborating and achieving their academic goals together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4">
                <Link href="/signup">Start Your Journey</Link>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10">
                <Link href="/features">Explore Features</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}