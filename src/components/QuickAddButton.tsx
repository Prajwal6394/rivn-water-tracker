import { Droplets } from 'lucide-react';

interface QuickAddButtonProps {
  amount: number;
  onClick: () => void;
}

function QuickAddButton({ amount, onClick }: QuickAddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden backdrop-blur-md bg-gradient-to-br from-blue-400/20 to-teal-400/20 hover:from-blue-400/30 hover:to-teal-400/30 border border-white/30 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-300/0 to-blue-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative flex flex-col items-center gap-3">
        <Droplets className="w-8 h-8 text-blue-200 group-hover:text-white transition-colors" />
        <span className="text-3xl font-light text-white">{amount}ml</span>
      </div>
    </button>
  );
}

export default QuickAddButton;
