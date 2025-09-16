import { useState } from 'react';

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [imageErrors, setImageErrors] = useState({});

  const skills = [
    { name: 'Python', category: 'Backend', color: '#3776ab', description: 'Programming Language' },
    { name: 'Django', category: 'Backend', color: '#092e20', description: 'Web Framework' },
    { name: 'FastAPI', category: 'Backend', color: '#009688', description: 'API Framework' },
    { name: 'Flask', category: 'Backend', color: '#000000', description: 'Micro Framework' },
    { name: 'PostgreSQL', category: 'Database', color: '#336791', description: 'Database' },
    { name: 'SQLite', category: 'Database', color: '#003b57', description: 'Database' },
    { name: 'React', category: 'Frontend', color: '#61dafb', description: 'JavaScript Library' },
    { name: 'React Native', category: 'Mobile', color: '#61dafb', description: 'Mobile Framework' },
    { name: 'Next.js', category: 'Frontend', color: '#000000', description: 'React Framework' },
    { name: 'Tailwind CSS', category: 'Frontend', color: '#06b6d4', description: 'CSS Framework' },
    { name: 'TensorFlow', category: 'AI/ML', color: '#ff6f00', description: 'Machine Learning' },
    { name: 'PyTorch', category: 'AI/ML', color: '#ee4c2c', description: 'Deep Learning' },
    { name: 'Scikit-learn', category: 'AI/ML', color: '#f7931e', description: 'Machine Learning' },
    { name: 'JavaScript', category: 'Frontend', color: '#f7df1e', description: 'Programming Language' },
    { name: 'TypeScript', category: 'Frontend', color: '#3178c6', description: 'Programming Language' },
    { name: 'Node.js', category: 'Backend', color: '#339933', description: 'JavaScript Runtime' },
  ];

  const categories = ['All', 'Backend', 'Frontend', 'AI/ML', 'Database', 'Mobile'];
  
  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const SkillIcon = ({ name, color }) => {
    const getLogoUrl = (skillName) => {
      const logoMap = {
        'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        'Django': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg',
        'FastAPI': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
        'Flask': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
        'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
        'SQLite': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg',
        'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        'React Native': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
        'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
        'TensorFlow': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
        'PyTorch': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
        'Scikit-learn': 'https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg',
        'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
        'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      };
      
      return logoMap[skillName] || `https://via.placeholder.com/48x48/${color.slice(1)}/ffffff?text=${skillName.charAt(0)}`;
    };

    const handleImageError = () => {
      setImageErrors(prev => ({
        ...prev,
        [name]: true
      }));
    };

    // If image failed to load, show fallback
    if (imageErrors[name]) {
      return (
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg" 
          style={{ backgroundColor: color }}
        >
          {name.charAt(0)}
        </div>
      );
    }

    return (
      <img 
        src={getLogoUrl(name)}
        alt={`${name} logo`}
        className="w-12 h-12 object-contain"
        onError={handleImageError}
      />
    );
  };

  return (
    <section id="skills" className="py-24 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-gradient-to-r from-primary/20 to-blue-500/20 animate-float"></div>
        <div className="absolute bottom-5 right-16 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/20 to-primary/20 animate-pulse-subtle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-glow">
            Tools & <span className="text-primary">Technologies</span>
          </h2>
          <p className="text-lg text-foreground/70">
            My Professional Skills
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium cursor-pointer transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-card/50 text-foreground/70 hover:bg-card hover:text-foreground border border-border'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto min-h-[150px]">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="group p-6 rounded-xl bg-card hover:bg-card/90 border border-border hover:border-border/70 transition-all duration-300 hover:scale-105 hover:shadow-xl backdrop-blur-sm animate-fade-in shadow-sm"
              style={{ 
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl border border-border/50 flex items-center justify-center p-2 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <SkillIcon name={skill.name} color={skill.color} />
                </div>
                
                {/* Skill Name */}
                <h3 className="font-semibold text-foreground text-base group-hover:text-primary transition-colors duration-300">
                  {skill.name}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-foreground/70 group-hover:text-foreground/90 transition-colors duration-300">
                  {skill.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 opacity-0 animate-fade-in-delay-3">
          <p className="text-lg text-foreground/70 mb-6">
            Interested in working together? Let's build something amazing!
          </p>
          <a 
            href="#contact" 
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl backdrop-blur-sm border border-white/10"
          >
            Start a Project
          </a>
        </div>
      </div>
    </section>
  );
};