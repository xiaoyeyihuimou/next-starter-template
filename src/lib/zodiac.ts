export type ZodiacSign = {
  name: string;
  chinese: string;
  traits: string[];
  description: string;
  luckyNumbers: number[];
  luckyColors: string[];
};

export type ElementType = 'Metal' | 'Water' | 'Wood' | 'Fire' | 'Earth';

const ZODIAC_ANIMALS = [
  { 
    name: 'Monkey', chinese: '猴', 
    description: "Witty, intelligent, and ambitious. You are a natural problem-solver with a playful spirit.",
    traits: ['Smart', 'Curious', 'Mischievous'],
    luckyNumbers: [4, 9], luckyColors: ['White', 'Blue', 'Gold']
  },
  { 
    name: 'Rooster', chinese: '鸡', 
    description: "Observant, hardworking, and courageous. You have a keen eye for detail and a confident style.",
    traits: ['Observant', 'Hardworking', 'Confident'],
    luckyNumbers: [5, 7, 8], luckyColors: ['Gold', 'Brown', 'Yellow']
  },
  { 
    name: 'Dog', chinese: '狗', 
    description: "Loyal, honest, and kind. You are a true friend who values justice and sincerity above all.",
    traits: ['Loyal', 'Honest', 'Kind'],
    luckyNumbers: [3, 4, 9], luckyColors: ['Red', 'Green', 'Purple']
  },
  { 
    name: 'Pig', chinese: '猪', 
    description: "Compassionate, generous, and diligent. You enjoy the finer things in life and have a heart of gold.",
    traits: ['Compassionate', 'Generous', 'Diligent'],
    luckyNumbers: [2, 5, 8], luckyColors: ['Yellow', 'Gray', 'Brown']
  },
  { 
    name: 'Rat', chinese: '鼠', 
    description: "Quick-witted, resourceful, and versatile. You can adapt to any situation and seize opportunities.",
    traits: ['Quick-witted', 'Resourceful', 'Versatile'],
    luckyNumbers: [2, 3], luckyColors: ['Blue', 'Gold', 'Green']
  },
  { 
    name: 'Ox', chinese: '牛', 
    description: "Diligent, dependable, and strong. You build success through persistence and honest work.",
    traits: ['Diligent', 'Dependable', 'Strong'],
    luckyNumbers: [1, 4], luckyColors: ['White', 'Yellow', 'Green']
  },
  { 
    name: 'Tiger', chinese: '虎', 
    description: "Brave, confident, and charming. You are a natural leader with a magnetic personality.",
    traits: ['Brave', 'Confident', 'Charming'],
    luckyNumbers: [1, 3, 4], luckyColors: ['Blue', 'Gray', 'Orange']
  },
  { 
    name: 'Rabbit', chinese: '兔', 
    description: "Gentle, quiet, and elegant. You approach life with grace and avoid unnecessary conflict.",
    traits: ['Gentle', 'Elegant', 'Alert'],
    luckyNumbers: [3, 4, 6], luckyColors: ['Red', 'Pink', 'Purple', 'Blue']
  },
  { 
    name: 'Dragon', chinese: '龙', 
    description: "Powerful, energetic, and visionary. You are destined for greatness and inspire those around you.",
    traits: ['Confident', 'Intelligent', 'Enthusiastic'],
    luckyNumbers: [1, 6, 7], luckyColors: ['Gold', 'Silver', 'Gray']
  },
  { 
    name: 'Snake', chinese: '蛇', 
    description: "Enigmatic, intelligent, and wise. You possess a deep intuition and a sophisticated charm.",
    traits: ['Wise', 'Enigmatic', 'Intuitive'],
    luckyNumbers: [2, 8, 9], luckyColors: ['Black', 'Red', 'Yellow']
  },
  { 
    name: 'Horse', chinese: '马', 
    description: "Animated, active, and energetic. You love freedom and have an infectious enthusiasm for life.",
    traits: ['Energetic', 'Independent', 'Impatien'],
    luckyNumbers: [2, 3, 7], luckyColors: ['Yellow', 'Green']
  },
  { 
    name: 'Goat', chinese: '羊', 
    description: "Calm, gentle, and sympathetic. You are a creative soul who values peace and harmony.",
    traits: ['Creative', 'Gentle', 'Sympathetic'],
    luckyNumbers: [2, 7], luckyColors: ['Brown', 'Red', 'Purple']
  }
];

const ELEMENTS: Record<number, { name: ElementType; description: string }> = {
  0: { name: 'Metal', description: "Resilient, determined, and unyielding. You have a strong will and clear focus." },
  1: { name: 'Metal', description: "Resilient, determined, and unyielding. You have a strong will and clear focus." },
  2: { name: 'Water', description: "Flexible, intuitive, and diplomatic. You flow around obstacles with ease." },
  3: { name: 'Water', description: "Flexible, intuitive, and diplomatic. You flow around obstacles with ease." },
  4: { name: 'Wood', description: "Growing, idealistic, and cooperative. You are constantly expanding your horizons." },
  5: { name: 'Wood', description: "Growing, idealistic, and cooperative. You are constantly expanding your horizons." },
  6: { name: 'Fire', description: "Passionate, dynamic, and adventurous. You bring warmth and light wherever you go." },
  7: { name: 'Fire', description: "Passionate, dynamic, and adventurous. You bring warmth and light wherever you go." },
  8: { name: 'Earth', description: "Stable, reliable, and nurturing. You are the solid foundation for those around you." },
  9: { name: 'Earth', description: "Stable, reliable, and nurturing. You are the solid foundation for those around you." },
};

export function getZodiac(date: Date) {
  const year = date.getFullYear();
  // 1900 was Year of the Rat (Index 4 in our array if we start 0=Monkey? No.)
  // Let's align with the array.
  // 0: Monkey, 1: Rooster, 2: Dog, 3: Pig, 4: Rat...
  // 1900 % 12 = 4. So 1900 is Rat.
  // Our array index 4 is Rat. Perfect.
  const animalIndex = year % 12;
  const animal = ZODIAC_ANIMALS[animalIndex];

  // Element is based on the last digit of the year
  // 0-1 Metal, 2-3 Water, 4-5 Wood, 6-7 Fire, 8-9 Earth
  const lastDigit = year % 10;
  const element = ELEMENTS[lastDigit];

  return {
    animal,
    element,
    year
  };
}
