import { Lightbulb } from 'lucide-react';
import { useState, useEffect } from 'react';

const tips = [
  {
    title: "Boost Mental Clarity",
    content: "Proper hydration enhances cognitive function, improving focus and concentration by up to 14%."
  },
  {
    title: "Radiant Skin",
    content: "Water helps maintain skin elasticity and flushes out toxins, giving you a natural, healthy glow."
  },
  {
    title: "Enhanced Metabolism",
    content: "Drinking water can boost your metabolic rate by 24-30% for up to 1.5 hours, aiding weight management."
  },
  {
    title: "Energy Boost",
    content: "Even mild dehydration can cause fatigue. Stay hydrated to maintain optimal energy levels throughout the day."
  },
  {
    title: "Joint Health",
    content: "Water lubricates joints and helps cushion them, reducing discomfort and improving mobility."
  },
  {
    title: "Detoxification",
    content: "Water helps your kidneys filter waste and toxins from the blood more efficiently."
  },
  {
    title: "Temperature Regulation",
    content: "Proper hydration helps regulate body temperature through sweating and respiration."
  },
  {
    title: "Digestive Health",
    content: "Water aids digestion and helps prevent constipation by keeping things moving smoothly."
  }
];

function DailyTip() {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const savedTip = localStorage.getItem('dailyTipIndex');
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('dailyTipDate');

    if (savedDate === today && savedTip) {
      setCurrentTip(parseInt(savedTip));
    } else {
      const randomIndex = Math.floor(Math.random() * tips.length);
      setCurrentTip(randomIndex);
      localStorage.setItem('dailyTipIndex', randomIndex.toString());
      localStorage.setItem('dailyTipDate', today);
    }
  }, []);

  const tip = tips[currentTip];

  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-yellow-400/20 border border-yellow-300/30">
          <Lightbulb className="w-6 h-6 text-yellow-200" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-blue-200 mb-1">Daily Hydration Insight</h3>
          <h4 className="text-xl font-light text-white mb-2">{tip.title}</h4>
          <p className="text-blue-100/80 text-sm leading-relaxed">{tip.content}</p>
        </div>
      </div>
    </div>
  );
}

export default DailyTip;
