import { Chip } from '@mui/material';
import type { MissionStatus } from '../types/mission';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import RotateRightRoundedIcon from '@mui/icons-material/RotateRightRounded';

interface StatusBadgeProps {
  status: MissionStatus;
}
const getStatusIcon = (status: MissionStatus) => {
  const iconMap = {
    Success: (
      <CheckCircleOutlineIcon
        fontSize="small"
        sx={{ color: '#16A34A !important' }}
      />
    ),
    Failure: <HighlightOffOutlinedIcon fontSize="small" htmlColor="#EF4444" />,
    Ongoing: <RotateRightRoundedIcon fontSize="small" htmlColor="#06B6D4" />,
    Planned: <CalendarTodayIcon fontSize="small" htmlColor="#B453094" />,
  };
  return iconMap[status] ?? null;
};

const getStatusStyles = (status: MissionStatus) => {
  const styles = {
    Success: {
      backgroundColor: 'rgba(22, 163, 74, 0.15)',
      color: '#16A34A',
      border: '1px solid rgba(22, 163, 74, 0.3)',
    },
    Failure: {
      backgroundColor: 'rgba(239, 68, 68, 0.15)',
      color: '#EF4444',
      border: '1px solid rgba(239, 68, 68, 0.3)',
    },
    Ongoing: {
      backgroundColor: 'rgba(6, 182, 212, 0.15)',
      color: '#06B6D4',
      border: '1px solid rgba(6, 182, 212, 0.3)',
    },
    Planned: {
      backgroundColor: 'rgba(245, 158, 11, 0.15)',
      color: '#F59E0B',
      border: '1px solid rgba(245, 158, 11, 0.3)',
    },
  };
  return styles[status];
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <Chip
      icon={getStatusIcon(status)}
      label={status}
      size="small"
      sx={{
        fontSize: '0.75rem',
        ...getStatusStyles(status),
        '& .MuiChip-icon': {
          color: 'inherit',
        },
      }}
    />
  );
};
