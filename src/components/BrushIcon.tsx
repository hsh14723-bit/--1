import { 
  RotateCw, 
  Sparkles, 
  Trash2, 
  Shuffle, 
  Wrench, 
  Cpu, 
  Layers, 
  Smile,
  LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  RotateCw,
  Sparkles,
  Trash2,
  Shuffle,
  Wrench,
  Cpu,
  Layers,
  Smile,
};

interface BrushIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function BrushIcon({ name, className = "", size = 24 }: BrushIconProps) {
  const IconComponent = iconMap[name] || Wrench;
  return <IconComponent className={className} size={size} />;
}
