import React, { useState } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Menu,
  MenuItem,
  Chip,
  Stack,
  Typography,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import BusinessIcon from '@mui/icons-material/Business';
import ScheduleIcon from '@mui/icons-material/Schedule';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import StarIcon from '@mui/icons-material/Star';
import CheckIcon from '@mui/icons-material/Check';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Mission } from '../types/mission';

interface FilterPanelProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedAgencies: string[];
  onAgencyFilterChange: (agencies: string[]) => void;
  selectedStatuses: string[];
  onStatusFilterChange: (statuses: string[]) => void;
  selectedTypes: string[];
  onTypeFilterChange: (types: string[]) => void;
  showFavoritesOnly: boolean;
  onFavoritesToggle: () => void;
  resultCount: number;
  totalCount: number;
  onClearAll: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  searchQuery,
  onSearchChange,
  selectedAgencies,
  onAgencyFilterChange,
  selectedStatuses,
  onStatusFilterChange,
  selectedTypes,
  onTypeFilterChange,
  showFavoritesOnly,
  onFavoritesToggle,
  resultCount,
  totalCount,
  onClearAll,
}) => {
  const [agencyAnchor, setAgencyAnchor] = useState<null | HTMLElement>(null);
  const [statusAnchor, setStatusAnchor] = useState<null | HTMLElement>(null);
  const [typeAnchor, setTypeAnchor] = useState<null | HTMLElement>(null);

  const agencies: Mission['agency'][] = [
    'NASA',
    'ESA',
    'SpaceX',
    'CNSA',
    'ISRO',
    'Roscosmos',
  ];
  const statuses: Mission['status'][] = [
    'Success',
    'Failure',
    'Ongoing',
    'Planned',
  ];
  const types: Mission['missionType'][] = [
    'Orbital',
    'Lunar',
    'Mars',
    'Deep Space',
    'ISS',
  ];

  const activeFilterCount =
    selectedAgencies.length +
    selectedStatuses.length +
    selectedTypes.length +
    (showFavoritesOnly ? 1 : 0);

  const handleAgencyToggle = (agency: string) => {
    if (selectedAgencies.includes(agency)) {
      onAgencyFilterChange(selectedAgencies.filter((a) => a !== agency));
    } else {
      onAgencyFilterChange([...selectedAgencies, agency]);
    }
  };

  const handleStatusToggle = (status: string) => {
    if (selectedStatuses.includes(status)) {
      onStatusFilterChange(selectedStatuses.filter((s) => s !== status));
    } else {
      onStatusFilterChange([...selectedStatuses, status]);
    }
  };

  const handleTypeToggle = (type: string) => {
    if (selectedTypes.includes(type)) {
      onTypeFilterChange(selectedTypes.filter((t) => t !== type));
    } else {
      onTypeFilterChange([...selectedTypes, type]);
    }
  };

  const SelectHeader = ({ title }: { title: string }) => (
    <Box
      sx={{ px: 2, py: 1, borderBottom: '1px solid', borderColor: 'divider' }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
    </Box>
  );

  const CheckSlot = ({ checked }: { checked: boolean }) => (
    <Box
      sx={{
        width: 28,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
      }}
    >
      {checked ? <CheckIcon fontSize="small" /> : null}
    </Box>
  );

  const statusColor: Record<Mission['status'], string> = {
    Success: '#16A34A',
    Failure: '#EF4444',
    Ongoing: '#06B6D4',
    Planned: '#F59E0B',
  };

  return (
    <Box sx={{ position: 'sticky', top: 16, zIndex: 20, pt: 2, pb: 2 }}>
      <Paper
        elevation={4}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 4,
          bgcolor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        {/* Gradient accent line */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6)',
          }}
        />
        <Box sx={{ p: 2, backgroundColor: 'white' }}>
          {/* Search and Result Count */}
          <Stack direction="row" spacing={2} sx={{ mb: 2 }} alignItems="center">
            <TextField
              fullWidth
              placeholder="Search mission names…"
              value={searchQuery}
              size="small"
              onChange={(e) => onSearchChange(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: '#162B47' }}>
                    <SearchIcon
                      sx={{ color: 'text.secondary', fontSize: 20 }}
                    />
                  </InputAdornment>
                ),
              }}
              // sx={{
              //   flex: 1,
              //   backgroundColor: '#E8EDF2',
              //   fontSize: '0.875rem',
              //   borderRadius: '0.75rem',
              //   height: '2.5rem',
              //   color: 'red',
              //   width: '200px',
              // }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  bgcolor: 'action.hover',
                  '& fieldset': { border: 'none' },
                  '&:hover': { bgcolor: 'secondary.main' },
                  '&.Mui-focused': {
                    bgcolor: 'background.paper',
                    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.3)',
                  },
                },
              }}
            />
            <Paper
              sx={{
                px: 2,
                py: 1,
                backgroundColor: 'primary.main',
                minWidth: '100px',
                textAlign: 'center',
              }}
            >
              <Typography
                variant="body2"
                color="primary.contrastText"
                sx={{ fontWidth: '600' }}
              >
                {resultCount} of {totalCount}
              </Typography>
            </Paper>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            flexWrap="wrap"
            useFlexGap
            gap="12px"
          >
            <Button
              variant={activeFilterCount > 0 ? 'contained' : 'outlined'}
              startIcon={<FilterListIcon />}
              onClick={onClearAll}
              disabled={activeFilterCount === 0}
              size="small"
            >
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </Button>

            <Button
              variant={selectedAgencies.length > 0 ? 'contained' : 'outlined'}
              startIcon={<BusinessIcon />}
              endIcon={
                <ArrowDropDownIcon
                  sx={{
                    transform: agencyAnchor ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease-in-out',
                  }}
                />
              }
              onClick={(e) => setAgencyAnchor(e.currentTarget)}
              size="medium"
            >
              Agency{' '}
              {selectedAgencies.length > 0 && `(${selectedAgencies.length})`}
            </Button>

            <Button
              variant={selectedStatuses.length > 0 ? 'contained' : 'outlined'}
              startIcon={<ScheduleIcon />}
              endIcon={
                <ArrowDropDownIcon
                  sx={{
                    transform: statusAnchor ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease-in-out',
                  }}
                />
              }
              onClick={(e) => setStatusAnchor(e.currentTarget)}
              size="medium"
            >
              Status{' '}
              {selectedStatuses.length > 0 && `(${selectedStatuses.length})`}
            </Button>

            <Button
              variant={selectedTypes.length > 0 ? 'contained' : 'outlined'}
              startIcon={<RocketLaunchIcon />}
              endIcon={
                <ArrowDropDownIcon
                  sx={{
                    transform: typeAnchor ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease-in-out',
                  }}
                />
              }
              onClick={(e) => setTypeAnchor(e.currentTarget)}
              size="medium"
            >
              Type {selectedTypes.length > 0 && `(${selectedTypes.length})`}
            </Button>

            <Button
              variant={showFavoritesOnly ? 'contained' : 'outlined'}
              startIcon={<StarIcon />}
              onClick={onFavoritesToggle}
              size="medium"
            >
              Favorites
            </Button>
          </Stack>

          {activeFilterCount > 0 && (
            <Stack
              direction="row"
              spacing={1}
              sx={{ mt: 2 }}
              flexWrap="wrap"
              useFlexGap
            >
              {selectedAgencies.map((agency) => (
                <Chip
                  key={agency}
                  label={agency}
                  onDelete={() => handleAgencyToggle(agency)}
                  size="small"
                />
              ))}
              {selectedStatuses.map((status) => (
                <Chip
                  key={status}
                  label={status}
                  onDelete={() => handleStatusToggle(status)}
                  size="small"
                />
              ))}
              {selectedTypes.map((type) => (
                <Chip
                  key={type}
                  label={type}
                  onDelete={() => handleTypeToggle(type)}
                  size="small"
                />
              ))}
              {showFavoritesOnly && (
                <Chip
                  label="Favorites Only"
                  onDelete={onFavoritesToggle}
                  size="small"
                />
              )}
            </Stack>
          )}

          <Menu
            anchorEl={agencyAnchor}
            open={Boolean(agencyAnchor)}
            onClose={() => setAgencyAnchor(null)}
            slotProps={{
              paper: {
                sx: { width: 160, borderRadius: 2, overflow: 'hidden', mt: 1 },
              },
            }}
          >
            <SelectHeader title="Select agencies" />
            {agencies.map((agency) => (
              <MenuItem
                key={agency}
                onClick={() => handleAgencyToggle(agency)}
                selected={selectedAgencies.includes(agency)}
                sx={{ py: 1.25, gap: 1.1, justifyContent: 'space-between' }}
              >
                <Typography sx={{ fontWeight: 500 }}>{agency}</Typography>
                <CheckSlot checked={selectedAgencies.includes(agency)} />
              </MenuItem>
            ))}
          </Menu>

          <Menu
            anchorEl={statusAnchor}
            open={Boolean(statusAnchor)}
            onClose={() => setStatusAnchor(null)}
            slotProps={{
              paper: {
                sx: { width: 160, borderRadius: 2, overflow: 'hidden', mt: 1 },
              },
            }}
          >
            <SelectHeader title="Select status" />
            {statuses.map((status) => (
              <MenuItem
                key={status}
                onClick={() => handleStatusToggle(status)}
                selected={selectedStatuses.includes(status)}
                sx={{ py: 1.25, gap: 1.1, justifyContent: 'space-between' }}
              >
                <Box
                  aria-hidden
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: statusColor[status],
                  }}
                />
                <Typography sx={{ fontWeight: 500 }}>{status}</Typography>
                <CheckSlot checked={selectedStatuses.includes(status)} />
              </MenuItem>
            ))}
          </Menu>
          <Menu
            anchorEl={typeAnchor}
            open={Boolean(typeAnchor)}
            onClose={() => setTypeAnchor(null)}
            slotProps={{
              paper: {
                sx: { width: 160, borderRadius: 2, overflow: 'hidden', mt: 1 },
              },
            }}
          >
            <SelectHeader title="Select type" />
            {types.map((type) => (
              <MenuItem
                key={type}
                onClick={() => handleTypeToggle(type)}
                selected={selectedTypes.includes(type)}
                sx={{ py: 1.25, gap: 1.25, justifyContent: 'space-between' }}
              >
                <Typography sx={{ fontWeight: 600 }}>{type}</Typography>
                <CheckSlot checked={selectedTypes.includes(type)} />
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Paper>
    </Box>
  );
};

export default FilterPanel;
