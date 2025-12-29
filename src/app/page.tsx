'use client';

import { useState } from 'react';
import { getZodiac, ZodiacSign, ElementType } from '@/lib/zodiac';

export default function Home() {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState<{
    animal: ZodiacSign;
    element: { name: ElementType; description: string };
    year: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) return;
    const date = new Date(birthDate);
    const res = getZodiac(date);
    setResult(res);
    
    // Smooth scroll to result
    setTimeout(() => {
      document.getElementById('result')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-ink bg-paper selection:bg-cinnabar selection:text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-paper/80 border-b border-ink/5 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-serif font-bold tracking-tighter flex items-center gap-2">
            <span className="w-8 h-8 bg-cinnabar text-white rounded-full flex items-center justify-center text-sm font-serif">道</span>
            <span>MysticEast</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-ink-light">
            <a href="#" className="hover:text-cinnabar transition-colors">Zodiac</a>
            <a href="#elements" className="hover:text-cinnabar transition-colors">Five Elements</a>
            <a href="#culture" className="hover:text-cinnabar transition-colors">Culture</a>
            <a href="#about" className="hover:text-cinnabar transition-colors">About</a>
          </div>
          <button className="md:hidden text-ink">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full ink-wash opacity-50 pointer-events-none"></div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-block mb-4 px-3 py-1 border border-ink/10 rounded-full text-xs uppercase tracking-widest text-ink-light bg-white/50">
            Discover Your Eastern Destiny
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-medium mb-6 leading-tight">
            Unlock the Wisdom of <br/>
            <span className="text-cinnabar italic">Ancient China</span>
          </h1>
          <p className="text-lg md:text-xl text-ink-light mb-10 max-w-2xl mx-auto leading-relaxed">
            Explore the profound insights of the Chinese Zodiac and the Five Elements. 
            Enter your birth date to reveal your inner animal and elemental force.
          </p>

          <form onSubmit={handleCalculate} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input 
              type="date" 
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-6 py-4 bg-white border border-ink/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinnabar/20 focus:border-cinnabar transition-all text-ink-light font-mono"
            />
            <button 
              type="submit"
              className="w-full sm:w-auto px-8 py-4 bg-ink text-white rounded-lg font-medium hover:bg-cinnabar transition-colors duration-300 shadow-lg shadow-ink/10 whitespace-nowrap"
            >
              Reveal Destiny
            </button>
          </form>
        </div>
      </header>

      {/* Result Section */}
      {result && (
        <section id="result" className="py-20 px-6 bg-white border-y border-ink/5">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif mb-2">Your Energy Profile</h2>
              <div className="w-16 h-1 bg-cinnabar mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Animal Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-ink/5 transform rotate-3 rounded-2xl transition-transform group-hover:rotate-6"></div>
                <div className="relative bg-paper border border-ink/10 p-8 rounded-2xl shadow-xl">
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-cinnabar rounded-full flex items-center justify-center text-white text-4xl font-serif shadow-lg border-4 border-white">
                    {result.animal.chinese}
                  </div>
                  <div className="text-sm uppercase tracking-widest text-ink-light mb-2">Year of the</div>
                  <h3 className="text-4xl font-serif mb-4">{result.animal.name}</h3>
                  <p className="text-ink-light leading-relaxed mb-6">
                    {result.animal.description}
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-cinnabar">Traits</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {result.animal.traits.map(t => (
                          <span key={t} className="px-3 py-1 bg-ink/5 rounded-full text-sm">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-cinnabar">Lucky Colors</span>
                      <div className="flex gap-2 mt-2">
                        {result.animal.luckyColors.map(c => (
                          <span key={c} className="w-6 h-6 rounded-full border border-ink/10" style={{backgroundColor: c.toLowerCase()}} title={c}></span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Element Info */}
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-5xl font-serif text-ink/20">01</span>
                    <h3 className="text-2xl font-serif">The {result.element.name} Element</h3>
                  </div>
                  <p className="text-ink-light leading-relaxed border-l-2 border-cinnabar pl-6">
                    {result.element.description}
                    <br/><br/>
                    In Chinese philosophy, the Five Elements (Wu Xing) govern the flow of energy in the universe. 
                    Being born in a <strong>{result.element.name}</strong> year influences your personality to be more {result.element.name === 'Fire' ? 'dynamic' : result.element.name === 'Water' ? 'fluid' : 'grounded'}.
                  </p>
                </div>

                <div className="bg-ink text-white p-6 rounded-xl">
                  <h4 className="font-serif text-lg mb-2 text-gold">Did you know?</h4>
                  <p className="text-sm opacity-80">
                    Your full chart is determined not just by the year, but by the month, day, and hour of your birth. This is known as &quot;BaZi&quot; (Eight Characters).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SEO Content Section */}
      <section id="culture" className="py-24 px-6 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-serif mb-6">The 12 Zodiac Animals</h2>
            <p className="text-ink-light mb-6 leading-relaxed">
              The Chinese Zodiac, or Sheng Xiao, is a repeating cycle of 12 years, with each year being represented by an animal and its reputed attributes. 
              Traditionally these zodiac animals were used to date the years.
            </p>
            <p className="text-ink-light mb-6 leading-relaxed">
              In order, the 12 Chinese horoscope animals are: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig. 
              Each year is associated with a zodiac animal.
            </p>
            <a href="#" className="text-cinnabar font-medium hover:underline decoration-cinnabar underline-offset-4">Read the Legend of the Race &rarr;</a>
          </div>
          <div>
            <h2 className="text-2xl font-serif mb-6">The Philosophy of Wu Xing</h2>
            <p className="text-ink-light mb-6 leading-relaxed">
              Wu Xing, also known as the Five Elements, is a fivefold conceptual scheme that many traditional Chinese fields used to explain a wide array of phenomena.
            </p>
            <ul className="space-y-3 text-ink-light">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span><strong>Metal (Jin)</strong>: Structure and Order</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span><strong>Water (Shui)</strong>: Flow and Intelligence</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                <span><strong>Wood (Mu)</strong>: Growth and Vitality</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                <span><strong>Fire (Huo)</strong>: Passion and Energy</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-yellow-600 rounded-full"></span>
                <span><strong>Earth (Tu)</strong>: Stability and Nurturing</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink text-white/60 py-12 px-6 mt-auto">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-sm">
          <div className="col-span-2">
            <div className="text-white font-serif text-xl mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-cinnabar rounded-full flex items-center justify-center text-xs">道</span>
              MysticEast
            </div>
            <p className="max-w-xs">
              Bridging the gap between ancient Eastern wisdom and the modern world. 
              Discover your destiny through the lens of Chinese culture.
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Explore</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Zodiac Calculator</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Daily Horoscope</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Feng Shui Basics</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-xs">
          &copy; {new Date().getFullYear()} MysticEast. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
