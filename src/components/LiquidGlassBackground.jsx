import { useEffect, useState } from "react";

export const LiquidGlassBackground = () => {
  const [bubbles, setBubbles] = useState([]);
  const [waves, setWaves] = useState([]);
  const [glassShards, setGlassShards] = useState([]);

  useEffect(() => {
    generateBubbles();
    generateWaves();
    generateGlassShards();

    const handleResize = () => {
      generateBubbles();
      generateWaves();
      generateGlassShards();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const generateBubbles = () => {
    const numberOfBubbles = Math.floor((window.innerWidth * window.innerHeight) / 15000);
    const newBubbles = [];

    for (let i = 0; i < numberOfBubbles; i++) {
      newBubbles.push({
        id: i,
        size: Math.random() * 80 + 20,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.3 + 0.1,
        animationDuration: Math.random() * 15 + 10,
        floatDelay: Math.random() * 5,
        morphDelay: Math.random() * 3,
      });
    }

    setBubbles(newBubbles);
  };

  const generateWaves = () => {
    const numberOfWaves = 6;
    const newWaves = [];

    for (let i = 0; i < numberOfWaves; i++) {
      newWaves.push({
        id: i,
        amplitude: Math.random() * 100 + 50,
        frequency: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 10 + 5,
        opacity: Math.random() * 0.15 + 0.05,
        yOffset: (i / numberOfWaves) * 100,
      });
    }

    setWaves(newWaves);
  };

  const generateGlassShards = () => {
    const numberOfShards = Math.floor((window.innerWidth * window.innerHeight) / 25000);
    const newShards = [];

    for (let i = 0; i < numberOfShards; i++) {
      newShards.push({
        id: i,
        width: Math.random() * 120 + 60,
        height: Math.random() * 80 + 40,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.2 + 0.05,
        animationDuration: Math.random() * 20 + 15,
        rotateSpeed: Math.random() * 30 + 10,
        floatDelay: Math.random() * 8,
      });
    }

    setGlassShards(newShards);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-100" />
      
      {/* Animated waves */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
            <stop offset="50%" stopColor="rgba(147, 197, 253, 0.2)" />
            <stop offset="100%" stopColor="rgba(219, 234, 254, 0.1)" />
          </linearGradient>
        </defs>
        {waves.map((wave) => (
          <path
            key={wave.id}
            d={`M 0,${wave.yOffset} Q 25,${wave.yOffset - wave.amplitude} 50,${wave.yOffset} T 100,${wave.yOffset} V 100 H 0 Z`}
            fill="url(#waveGradient)"
            style={{
              opacity: wave.opacity,
              animation: `waveFlow ${wave.speed}s ease-in-out infinite`,
              animationDelay: wave.phase + "s",
            }}
          />
        ))}
      </svg>

      {/* Glass shards */}
      {glassShards.map((shard) => (
        <div
          key={shard.id}
          className="absolute"
          style={{
            width: shard.width + "px",
            height: shard.height + "px",
            left: shard.x + "%",
            top: shard.y + "%",
            animation: `glassFloat ${shard.animationDuration}s ease-in-out infinite`,
            animationDelay: shard.floatDelay + "s",
          }}
        >
          <div
            className="w-full h-full transition-all duration-300 hover:scale-105"
            style={{
              opacity: shard.opacity,
              background: `linear-gradient(135deg, 
                rgba(255, 255, 255, 0.25) 0%,
                rgba(255, 255, 255, 0.1) 25%,
                rgba(59, 130, 246, 0.1) 50%,
                rgba(147, 197, 253, 0.15) 75%,
                rgba(255, 255, 255, 0.2) 100%)`,
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
              boxShadow: `
                inset 0 1px 0 rgba(255, 255, 255, 0.4),
                inset 0 -1px 0 rgba(0, 0, 0, 0.1),
                0 4px 12px rgba(59, 130, 246, 0.15),
                0 2px 4px rgba(0, 0, 0, 0.1)
              `,
              transform: `rotate(${shard.rotation}deg)`,
            }}
          />
        </div>
      ))}

      {/* Liquid bubbles */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute"
          style={{
            width: bubble.size + "px",
            height: bubble.size + "px",
            left: bubble.x + "%",
            top: bubble.y + "%",
            animation: `liquidFloat ${bubble.animationDuration}s ease-in-out infinite`,
            animationDelay: bubble.floatDelay + "s",
          }}
        >
          <div
            className="w-full h-full relative"
            style={{
              opacity: bubble.opacity,
              background: `radial-gradient(circle at 30% 30%, 
                rgba(255, 255, 255, 0.8) 0%,
                rgba(147, 197, 253, 0.6) 30%,
                rgba(59, 130, 246, 0.4) 60%,
                rgba(29, 78, 216, 0.3) 100%)`,
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              boxShadow: `
                inset 0 2px 4px rgba(255, 255, 255, 0.6),
                inset 0 -2px 4px rgba(0, 0, 0, 0.1),
                0 8px 20px rgba(59, 130, 246, 0.2),
                0 4px 8px rgba(0, 0, 0, 0.1)
              `,
              animation: `morph ${8 + bubble.morphDelay}s ease-in-out infinite`,
              animationDelay: bubble.morphDelay + "s",
            }}
          >
            {/* Bubble highlight */}
            <div
              className="absolute top-2 left-2 w-3 h-3 bg-white rounded-full"
              style={{
                opacity: 0.8,
                filter: "blur(0.5px)",
              }}
            />
          </div>
        </div>
      ))}

      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white opacity-10" />
      
      {/* CSS Animations */}
      <style>{`
        @keyframes liquidFloat {
          0%, 100% { 
            transform: translateY(0) translateX(0) scale(1);
          }
          25% { 
            transform: translateY(-20px) translateX(10px) scale(1.05);
          }
          50% { 
            transform: translateY(-10px) translateX(-5px) scale(0.95);
          }
          75% { 
            transform: translateY(-30px) translateX(15px) scale(1.02);
          }
        }

        @keyframes glassFloat {
          0%, 100% { 
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          25% { 
            transform: translateY(-15px) translateX(8px) rotate(5deg);
          }
          50% { 
            transform: translateY(-8px) translateX(-10px) rotate(-3deg);
          }
          75% { 
            transform: translateY(-25px) translateX(12px) rotate(7deg);
          }
        }

        @keyframes morph {
          0%, 100% { 
            border-radius: 50%;
          }
          25% { 
            border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          }
          50% { 
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          75% { 
            border-radius: 30% 70% 50% 50% / 50% 60% 40% 60%;
          }
        }

        @keyframes waveFlow {
          0% { 
            transform: translateX(-100px) scaleY(1);
          }
          50% { 
            transform: translateX(0px) scaleY(1.1);
          }
          100% { 
            transform: translateX(100px) scaleY(1);
          }
        }
      `}</style>
    </div>
  );
};