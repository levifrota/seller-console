import * as LucideIcons from 'lucide-react';
import { HelpCircle } from 'lucide-react';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
  [key: string]: unknown;
}

function Icon({
  name,
  size = 24,
  color = 'currentColor',
  className = '',
  strokeWidth = 2,
  ...props
}: IconProps) {
  const IconComponent = (LucideIcons as any)[name];

  if (!IconComponent) {
    return (
      <HelpCircle
        size={size}
        color='gray'
        strokeWidth={strokeWidth}
        className={className}
        {...props}
      />
    );
  }

  return (
    <IconComponent
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      {...props}
    />
  );
}
export default Icon;
