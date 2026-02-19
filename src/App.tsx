import { useState, useEffect } from 'react';
import { Droplets, Plus, Minus } from 'lucide-react';
import WaterProgress from './components/WaterProgress';
import QuickAddButton from './components/QuickAddButton';
import ReminderControl from './components/ReminderControl';
import DailyTip from './components/DailyTip';
import Stats from './components/Stats';

const DAILY_GOAL = 2000;

interface WaterLog {
  amount: number;
  timestamp: number;
}

function App() {
  const [waterIntake, setWaterIntake] = useState(0);
  const [logs, setLogs] = useState<WaterLog[]>([]);
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderInterval, setReminderInterval] = useState(60);
  const [customAmount, setCustomAmount] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('waterTrackerData');
    if (savedData) {
      const data = JSON.parse(savedData);
      const today = new Date().toDateString();
      if (data.date === today) {
        setWaterIntake(data.waterIntake || 0);
        setLogs(data.logs || []);
      }
    }

    const savedReminder = localStorage.getItem('reminderSettings');
    if (savedReminder) {
      const settings = JSON.parse(savedReminder);
      setReminderEnabled(settings.enabled);
      setReminderInterval(settings.interval);
    }
  }, []);

  useEffect(() => {
    const today = new Date().toDateString();
    const data = {
      date: today,
      waterIntake,
      logs
    };
    localStorage.setItem('waterTrackerData', JSON.stringify(data));
  }, [waterIntake, logs]);

  useEffect(() => {
    const settings = {
      enabled: reminderEnabled,
      interval: reminderInterval
    };
    localStorage.setItem('reminderSettings', JSON.stringify(settings));
  }, [reminderEnabled, reminderInterval]);

  useEffect(() => {
    if (!reminderEnabled) return;

    const intervalMs = reminderInterval * 60 * 1000;
    const timer = setInterval(() => {
      if (Notification.permission === 'granted') {
        new Notification('Pure Himalayan Water Reminder', {
          body: 'Time to hydrate! Your body needs water.',
          icon: '/vite.svg'
        });
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [reminderEnabled, reminderInterval]);

  const addWater = (amount: number) => {
    setWaterIntake(prev => Math.min(prev + amount, DAILY_GOAL + 1000));
    setLogs(prev => [...prev, { amount, timestamp: Date.now() }]);
  };

  const removeWater = (amount: number) => {
    setWaterIntake(prev => Math.max(prev - amount, 0));
    if (logs.length > 0) {
      setLogs(prev => prev.slice(0, -1));
    }
  };

  const handleCustomAdd = () => {
    const amount = parseInt(customAmount);
    if (amount && amount > 0) {
      addWater(amount);
      setCustomAmount('');
    }
  };

  const toggleReminder = async () => {
    if (!reminderEnabled && Notification.permission !== 'granted') {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        return;
      }
    }
    setReminderEnabled(!reminderEnabled);
  };

  const progress = (waterIntake / DAILY_GOAL) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMax slice">
          <path d="M0,400 L100,380 L200,360 L300,340 L400,320 L500,300 L600,280 L700,300 L800,320 L900,340 L1000,360 L1100,380 L1200,400 L1200,600 L0,600 Z"
                fill="white" opacity="0.3"/>
          <path d="M0,450 L100,440 L200,430 L300,420 L400,410 L500,400 L600,390 L700,400 L800,410 L900,420 L1000,430 L1100,440 L1200,450 L1200,600 L0,600 Z"
                fill="white" opacity="0.2"/>
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Droplets className="w-12 h-12 text-blue-200" strokeWidth={1.5} />
          </div>
          <h1 className="text-5xl font-light text-white mb-2 tracking-wide">Rivn - Pure Himalayan</h1>
          <p className="text-blue-200 text-lg font-light italic">Refined with precision.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
            <WaterProgress progress={progress} waterIntake={waterIntake} dailyGoal={DAILY_GOAL} />

            <div className="mt-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <QuickAddButton amount={250} onClick={() => addWater(250)} />
                <QuickAddButton amount={500} onClick={() => addWater(500)} />
              </div>

              <div className="flex gap-2">
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Custom ml"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button
                  onClick={handleCustomAdd}
                  className="px-6 py-3 rounded-xl bg-blue-500/30 border border-blue-300/30 text-white hover:bg-blue-500/40 transition-all duration-300"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={() => removeWater(250)}
                className="w-full py-3 rounded-xl bg-red-500/20 border border-red-300/30 text-red-200 hover:bg-red-500/30 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Minus className="w-4 h-4" />
                <span>Undo Last</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
              <ReminderControl
                enabled={reminderEnabled}
                interval={reminderInterval}
                onToggle={toggleReminder}
                onIntervalChange={setReminderInterval}
              />
            </div>

            <DailyTip />

            <Stats logs={logs} waterIntake={waterIntake} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
