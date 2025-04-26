
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  imageUrl?: string;
}

const About = () => {
  const [activeItem, setActiveItem] = useState<number>(0);
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const timelineItems: TimelineItem[] = [
    {
      year: "2023",
      title: "Project Launch",
      description: "EchoWeb was conceived with a vision to create beautiful, interactive web experiences.",
    },
    {
      year: "2024",
      title: "Major Expansion",
      description: "Added support for advanced animations, parallax effects, and responsive design.",
    },
    {
      year: "2025",
      title: "Future Vision",
      description: "Planned integration with AI for personalized user experiences and advanced interactive elements.",
    }
  ];
  
  const teamMembers: TeamMember[] = [
    {
      name: "Alex Johnson",
      role: "Lead Developer",
      bio: "Full-stack developer with expertise in animations and interactive UIs.",
    },
    {
      name: "Sam Rodriguez",
      role: "UI/UX Designer",
      bio: "Creative designer focused on creating beautiful, intuitive user interfaces.",
    },
    {
      name: "Jordan Lee",
      role: "Project Manager",
      bio: "Overseeing development and ensuring project goals are met.",
    },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-index"));
          setActiveItem(index);
        }
      });
    }, observerOptions);

    timelineRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      timelineRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);
  
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              About EchoWeb
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our journey to create the most interactive and beautiful web experience.
          </p>
        </div>

        {/* Timeline Section */}
        <section className="mb-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Journey</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%] h-full w-1 bg-purple-200 dark:bg-purple-900"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              {timelineItems.map((item, index) => (
                <div 
                  key={index}
                  ref={(el) => (timelineRefs.current[index] = el)}
                  data-index={index}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center`}
                >
                  <div className="flex-1 md:pr-8 md:pl-0 pl-8">
                    <div 
                      className={`p-6 rounded-lg shadow-md transition-all duration-500 
                        ${activeItem === index ? "glass-card transform scale-105" : "bg-white/50 dark:bg-gray-800/50"}`}
                    >
                      <h3 className="text-xl font-bold mb-2 text-purple-600 dark:text-purple-400">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-0 md:left-1/2 transform md:translate-x-[-50%] -translate-y-0 flex items-center justify-center">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 
                        ${activeItem === index ? "bg-purple-600 scale-125" : "bg-purple-400"}`}
                    >
                      {item.year.substring(2)}
                    </div>
                  </div>
                  
                  <div className="flex-1 md:pr-0 md:pl-8 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Flow Diagram */}
        <section className="mb-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">How EchoWeb Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                step: 1,
                title: "Dynamic Frontend",
                description: "Responsive UI with smooth animations and transitions",
                tooltip: "Built with React and modern CSS techniques"
              },
              {
                step: 2,
                title: "User Experience",
                description: "Interactive elements that respond to user actions",
                tooltip: "Utilizing advanced CSS and JavaScript for micro-interactions"
              },
              {
                step: 3,
                title: "Data Management",
                description: "Efficient storage and retrieval of user content",
                tooltip: "Implementing secure authentication and database interactions"
              }
            ].map((step, index) => (
              <div key={index} className="relative group">
                <Card className="glass-card p-6 h-full flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{step.description}</p>
                  
                  {/* Connection arrows between steps */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform translate-x-[50%] z-10">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className="text-purple-500 dark:text-purple-400" 
                        />
                      </svg>
                    </div>
                  )}
                  
                  {/* Tooltip */}
                  <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded pointer-events-none whitespace-nowrap">
                    {step.tooltip}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section with 3D Flip Cards */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="h-64 perspective-1000">
                <div className="flip-card h-full">
                  <div className="flip-card-inner h-full">
                    <div className="flip-card-front glass-card p-6 flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                        <span className="text-purple-600 dark:text-purple-300 text-xl font-medium">
                          {member.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold">{member.name}</h3>
                      <p className="text-sm text-purple-600 dark:text-purple-400">{member.role}</p>
                    </div>
                    <div className="flip-card-back glass-card p-6 flex flex-col items-center justify-center text-center">
                      <h3 className="text-lg font-bold mb-2">{member.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{member.bio}</p>
                      <Button size="sm" variant="outline" className="mt-4 hover-scale">
                        Connect
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
