import { Bell, BellOff } from 'lucide-react';

interface ReminderControlProps {
  enabled: boolean;
  interval: number;
  onToggle: () => void;
  onIntervalChange: (interval: number) => void;
}

function ReminderControl({ enabled, interval, onToggle, onIntervalChange }: ReminderControlProps) {
  const intervals = [30, 60, 90, 120];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {enabled ? (
            <Bell className="w-6 h-6 text-blue-200" />
          ) : (
            <BellOff className="w-6 h-6 text-blue-200/50" />
          )}
          <div>
            <h3 className="text-xl font-light text-white">Smart Reminders</h3>
            <p className="text-sm text-blue-200/70">Stay on track with gentle nudges</p>
          </div>
        </div>

        <button
          onClick={onToggle}
          className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
            enabled ? 'bg-blue-500/50' : 'bg-white/10'
          }`}
        >
          <div
            className={`absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg transition-all duration-300 ${
              enabled ? 'left-7' : 'left-1'
            }`}
          />
        </button>
      </div>

      {enabled && (
        <div className="space-y-3 animate-fadeIn">
          <label className="text-sm text-blue-200/90">Reminder Interval</label>
          <div className="grid grid-cols-4 gap-2">
            {intervals.map((mins) => (
              <button
                key={mins}
                onClick={() => onIntervalChange(mins)}
                className={`py-2 px-3 rounded-lg text-sm font-light transition-all duration-300 ${
                  interval === mins
                    ? 'bg-blue-500/40 border border-blue-300/50 text-white'
                    : 'bg-white/5 border border-white/10 text-blue-200/70 hover:bg-white/10'
                }`}
              >
                {mins}m
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ReminderControl;
