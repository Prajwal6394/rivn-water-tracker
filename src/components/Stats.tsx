import { TrendingUp, Clock, Droplets } from 'lucide-react';

interface WaterLog {
  amount: number;
  timestamp: number;
}

interface StatsProps {
  logs: WaterLog[];
  waterIntake: number;
}

function Stats({ logs, waterIntake }: StatsProps) {
  const averageIntake = logs.length > 0
    ? Math.round(logs.reduce((sum, log) => sum + log.amount, 0) / logs.length)
    : 0;

  const lastDrink = logs.length > 0
    ? new Date(logs[logs.length - 1].timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '--:--';

  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
      <h3 className="text-xl font-light text-white mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-blue-200" />
        Today's Activity
      </h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Droplets className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <p className="text-sm text-blue-200/70">Total Intake</p>
              <p className="text-lg font-light text-white">{waterIntake}ml</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-teal-500/20">
              <TrendingUp className="w-5 h-5 text-teal-200" />
            </div>
            <div>
              <p className="text-sm text-blue-200/70">Times Logged</p>
              <p className="text-lg font-light text-white">{logs.length} times</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-400/20">
              <Clock className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <p className="text-sm text-blue-200/70">Last Drink</p>
              <p className="text-lg font-light text-white">{lastDrink}</p>
            </div>
          </div>
        </div>

        {averageIntake > 0 && (
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-teal-400/20">
                <Droplets className="w-5 h-5 text-teal-200" />
              </div>
              <div>
                <p className="text-sm text-blue-200/70">Average Amount</p>
                <p className="text-lg font-light text-white">{averageIntake}ml</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Stats;
