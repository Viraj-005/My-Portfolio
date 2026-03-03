import { useState } from 'react';
import { Calendar, MapPin, Briefcase, Rocket } from 'lucide-react';

export const AboutSection = () => {
  const [isDragging, setIsDragging] = useState(false);
  
  const timeline = [
    {
      year: '2025 - Present',
      title: 'Freelance Software Engineer',
      company: 'Sri Lanka Telecom (SLT)',
      description:
        'Continuing development of the Sales Incentive Automation System, including Manager Incentive module. Contributed to enterprise-level backend systems integrated with Azure AD authentication and Oracle databases. Modules successfully deployed within SLT intranet Linux server environment.',
      type: 'work'
    },
    {
      year: '2026',
      title: 'Co-Founder',
      company: 'LOOPLAB (PRIVATE) LIMITED',
      description:
        'Co-founded LOOPLAB with two partners and officially registered as a private company. Focused on building innovative AI-powered and full-stack digital solutions.',
      type: 'startup'
    },
    {
      year: '2025',
      title: 'Intern Software Engineer',
      company: 'Sri Lanka Telecom (SLT)',
      description:
        'Developed automated Sales Incentive and Dealer Commission calculation modules, replacing manual Excel workflows and improving operational efficiency by 80%.',
      type: 'work'
    }
  ];

  const handleDragStart = () => setIsDragging(true);
  const handleDragEnd = () => setIsDragging(false);

  return (
    <div id="about" className="py-20 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="star w-2 h-2 top-20 right-20 animate-pulse-subtle" />
        <div className="star w-1 h-1 top-40 left-32 animate-pulse-subtle" style={{ animationDelay: '1s' }} />
        <div className="star w-3 h-3 bottom-40 right-32 animate-pulse-subtle" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Title */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-glow">
              About <span className="text-primary">Me</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto animate-fade-in-delay-1 opacity-0">
              Software Engineer | AI Enthusiast | Startup Co-Founder
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Bio Card */}
            <div className="bg-card border border-border p-8 rounded-2xl card-hover animate-fade-in-delay-2 opacity-0">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-4 text-primary">Hello! I'm Viraj</h3>
                <p className="text-lg text-foreground/70 leading-relaxed mb-6">
                  I'm a Software Engineer specializing in backend systems, AI-driven solutions, 
                  and enterprise automation. I currently work with Sri Lanka Telecom while 
                  also co-founding a technology startup.
                </p>
                <p className="text-lg text-foreground/70 leading-relaxed mb-6">
                  My work focuses on automating complex business processes, building scalable 
                  APIs, and developing AI-powered applications that improve efficiency and 
                  decision-making. I enjoy turning manual workflows into intelligent systems.
                </p>
              </div>

              {/* Quick Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-primary/5 border border-primary/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Sri Lanka</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-primary/5 border border-primary/10 rounded-lg">
                  <Briefcase className="w-5 h-5 text-purple-500" />
                  <span className="text-sm font-medium">Software Engineer</span>
                </div>
              </div>

              {/* Specializations */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-foreground">Specializations</h4>
                <div className="flex flex-wrap gap-3">
                  {['Backend Engineering', 'Enterprise Automation', 'AI/ML Systems', 'Startup Development'].map((skill, index) => (
                    <div
                      key={skill}
                      draggable
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                      className={`px-4 py-2 bg-card border border-border rounded-full text-sm font-medium cursor-move card-hover transition-all duration-300 ${
                        isDragging ? 'scale-110 rotate-2' : ''
                      } hover:scale-105 animate-fade-in opacity-0`}
                      style={{ 
                        animationDelay: `${(index + 3) * 0.1}s`,
                        animationFillMode: 'forwards'
                      }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="animate-fade-in-delay-3 opacity-0">
              <h3 className="text-2xl font-bold mb-8 text-center lg:text-left text-primary">
                Career Journey
              </h3>

              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-blue-500"></div>
                
                {timeline.map((item, index) => (
                  <div 
                    key={index} 
                    className="relative flex items-start mb-8 animate-fade-in opacity-0"
                    style={{ 
                      animationDelay: `${0.8 + index * 0.1}s`,
                      animationFillMode: 'forwards'
                    }}
                  >
                    {/* Timeline Dot */}
                    <div className={`relative z-10 w-16 h-16 rounded-full card-hover flex items-center justify-center ${
                      item.type === 'work'
                        ? 'bg-gradient-to-r from-primary to-purple-500'
                        : item.type === 'startup'
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                    }`}>
                      {item.type === 'startup' ? (
                        <Rocket className="w-6 h-6 text-white" />
                      ) : (
                        <Calendar className="w-6 h-6 text-white" />
                      )}
                    </div>
                    
                    {/* Timeline Content */}
                    <div className="ml-6 bg-card border border-border p-6 rounded-xl flex-1 card-hover">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-primary">{item.year}</span>
                      </div>
                      <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
                      <p className="text-purple-500 font-medium mb-2">{item.company}</p>
                      <p className="text-foreground/70 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};