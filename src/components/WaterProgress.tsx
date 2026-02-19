import { Droplets } from 'lucide-react';

interface WaterProgressProps {
  progress: number;
  waterIntake: number;
  dailyGoal: number;
}

function WaterProgress({ progress, waterIntake, dailyGoal }: WaterProgressProps) {
  const clampedProgress = Math.min(progress, 100);
  const fillHeight = clampedProgress;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-64">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.6" />
            </linearGradient>
            <clipPath id="circleClip">
              <circle cx="100" cy="100" r="90" />
            </clipPath>
          </defs>

          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="4"
          />

          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="url(#waterGradient)"
            strokeWidth="4"
            strokeDasharray={`${2 * Math.PI * 90}`}
            strokeDashoffset={`${2 * Math.PI * 90 * (1 - clampedProgress / 100)}`}
            className="transition-all duration-700 ease-out"
          />

          <g clipPath="url(#circleClip)">
            <rect
              x="10"
              y={200 - (180 * fillHeight / 100)}
              width="180"
              height={180 * fillHeight / 100}
              fill="url(#waterGradient)"
              className="transition-all duration-700 ease-out"
            />
            <path
              d={`M 10 ${200 - (180 * fillHeight / 100)} Q 55 ${200 - (180 * fillHeight / 100) - 10} 100 ${200 - (180 * fillHeight / 100)} T 190 ${200 - (180 * fillHeight / 100)}`}
              fill="rgba(96, 165, 250, 0.4)"
              className="animate-wave"
            />
            <path
              d={`M 10 ${200 - (180 * fillHeight / 100) + 5} Q 55 ${200 - (180 * fillHeight / 100) - 5} 100 ${200 - (180 * fillHeight / 100) + 5} T 190 ${200 - (180 * fillHeight / 100) + 5}`}
              fill="rgba(59, 130, 246, 0.3)"
              className="animate-wave-slow"
            />
          </g>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Droplets className="w-12 h-12 text-white mb-2" />
          <p className="text-4xl font-light text-white">{Math.round(clampedProgress)}%</p>
          <p className="text-sm text-blue-200 mt-1">{waterIntake}ml / {dailyGoal}ml</p>
        </div>
      </div>

      <div className="mt-6 text-center">
        {clampedProgress >= 100 ? (
          <div className="space-y-2">
            <p className="text-2xl font-light text-white">Goal Achieved!</p>
            <p className="text-blue-200 text-sm">Your body thanks you</p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-2xl font-light text-white">{dailyGoal - waterIntake}ml to go</p>
            <p className="text-blue-200 text-sm">Stay hydrated, stay focused</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WaterProgress;
