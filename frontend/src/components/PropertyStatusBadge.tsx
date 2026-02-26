import { PropertyStatus } from '../backend';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ClipboardCheck, Clock, Award } from 'lucide-react';

interface PropertyStatusBadgeProps {
  status?: PropertyStatus;
  className?: string;
}

export default function PropertyStatusBadge({ status, className = '' }: PropertyStatusBadgeProps) {
  // Safe fallback to available if status is undefined
  const currentStatus = status ?? PropertyStatus.available;

  const getStatusConfig = () => {
    switch (currentStatus) {
      case PropertyStatus.available:
        return {
          label: 'Available',
          variant: 'default' as const,
          icon: <CheckCircle2 className="w-3 h-3" />,
          className: 'bg-green-600 hover:bg-green-700 text-white border-green-500',
        };
      case PropertyStatus.visitCompleted:
        return {
          label: 'Visit Completed',
          variant: 'secondary' as const,
          icon: <ClipboardCheck className="w-3 h-3" />,
          className: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500',
        };
      case PropertyStatus.underConfirmation:
        return {
          label: 'Under Confirmation',
          variant: 'outline' as const,
          icon: <Clock className="w-3 h-3" />,
          className: 'bg-yellow-600 hover:bg-yellow-700 text-white border-yellow-500',
        };
      case PropertyStatus.bookedViaSTYO:
        return {
          label: 'Booked via STYO',
          variant: 'destructive' as const,
          icon: <Award className="w-3 h-3" />,
          className: 'bg-purple-600 hover:bg-purple-700 text-white border-purple-500',
        };
      default:
        return {
          label: 'Available',
          variant: 'default' as const,
          icon: <CheckCircle2 className="w-3 h-3" />,
          className: 'bg-green-600 hover:bg-green-700 text-white border-green-500',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Badge 
      variant={config.variant}
      className={`flex items-center gap-1.5 font-semibold ${config.className} ${className}`}
    >
      {config.icon}
      <span>{config.label}</span>
    </Badge>
  );
}
