import React from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Chip,
  Stack,
  Box,
  Avatar,
  Grid,
  Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import PeopleIcon from '@mui/icons-material/People';
import { Mission } from '../types/mission';
import {AgencyLogo} from './AgencyLogo';
import {StatusBadge} from './StatusBadge';
import {TypeBadge} from './TypeBadge';
import  cover from '../assets/space2.png';

interface MissionDetailProps {
  mission: Mission | null;
  open: boolean;
  onClose: () => void;
  onBack?: () => void;
}

const MissionDetail: React.FC<MissionDetailProps> = ({
  mission,
  open,
  onClose,
  onBack,
}) => {
  if (!mission) return null;


  const getStatusColor = (status: Mission['status']) => {
    switch (status) {
      case 'Success':
        return 'success';
      case 'Failure':
        return 'error';
      case 'Ongoing':
        return 'info';
      case 'Planned':
        return 'warning';
      default:
        return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatCost = (cost?: number) => {
    if (!cost) return 'N/A';
    if (cost >= 1000) {
      return `$${(cost / 1000).toFixed(1)}B`;
    }
    return `$${cost}M`;
  };

  const getDestinationIcon = (type: Mission['missionType']) => {
    switch (type) {
      case 'Lunar':
        return '🌙';
      case 'Mars':
        return '🔴';
      case 'Orbital':
        return '🌍';
      case 'Deep Space':
        return '🚀';
      case 'ISS':
        return '🛰️';
      default:
        return '🚀';
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: '90vh',
          maxWidth: '32rem',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          height: '150px',
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          backgroundImage:`url(${cover})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <Stack direction="row" spacing={1} sx={{ position: 'absolute', top: 16, right: 16 }}>
          <IconButton onClick={onClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Stack>
         <AgencyLogo agency={mission.agency} sx={{ position: 'absolute',bottom: '-1.5rem',width: 56, height: 56}} />
      </Box>
        
      <DialogContent sx={{ padding:'40px 20px' }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 1, fontSize:'1.5rem' }}>
          {mission.name}
        </Typography>
        {/* <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          {mission.agency}
        </Typography> */}

   
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
             <StatusBadge status={mission.status}/>
             <TypeBadge type={mission.missionType}/>
        </Stack>
<Box sx={{border:'1px solid', borderColor:'divider', mb:'15px'}}></Box>
        {/* Key Metrics */}
        <Grid container spacing={2} sx={{ mb: 3, mt:0 }}>
          <Grid item xs={6} sm={3} textAlign="center">
              <IconButton  sx={{ backgroundColor:'#0073e61a',borderRadius: '50%',width: 40,height:40, padding:0 ,mb:1}}>
              <CalendarTodayIcon sx={{ fontSize: '1.2rem',  color: 'primary.main',}} />
             </IconButton>
              <Typography variant="body2" color="text.secondary" sx={{fontSize:'0.625rem'}}>
                LAUNCH DATE
              </Typography>
              <Typography variant="body2" fontWeight={600} color="text.primary" sx={{fontSize:'0.75=0rem'}}>
                {formatDate(mission.launchDate)}
              </Typography>
           
          </Grid>
          <Grid item xs={6} sm={3} textAlign="center">
              <IconButton  sx={{ backgroundColor:'#0073e61a',borderRadius: '50%',width: 40,height:40, padding:0 ,mb:1}}>
              <RocketLaunchIcon sx={{ fontSize: '1.2rem', color: 'primary.main'}} />
              </IconButton>
              <Typography variant="body2" color="text.secondary" sx={{fontSize:'0.625rem'}}>
                AGENCY
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {mission.agency}
              </Typography>
            
          </Grid>
          <Grid item xs={6} sm={3} textAlign="center">
           
              <IconButton  sx={{ backgroundColor:'#0073e61a',borderRadius: '50%',width: 40,height:40, padding:0 ,mb:1}}>
              <AttachMoneyIcon sx={{ fontSize: '1.2rem', color: 'primary.main'}} />
              </IconButton>
              <Typography variant="body2" color="text.secondary" sx={{fontSize:'0.625rem'}}>
                COST
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {formatCost(mission.cost)}
              </Typography>
          
          </Grid>
          <Grid item xs={6} sm={3} textAlign="center">
              <IconButton  sx={{ backgroundColor:'#0073e61a',borderRadius: '50%',width: 40,height:40, padding:0 ,mb:1}}>
              <PeopleIcon sx={{ fontSize: '1.2rem', color: 'primary.main'}} />
              </IconButton>
              <Typography variant="body2" color="text.secondary" sx={{fontSize:'0.625rem'}}>
                CREW
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {mission.crew.length > 0 ? `${mission.crew.length} crew` : 'Uncrewed'}
              </Typography>
    
          </Grid>
        </Grid>
        <Box sx={{border:'1px solid', borderColor:'divider', mb:'15px'}}></Box>
     
        <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
          {mission.description}
        </Typography>

        {mission.crew.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Box sx={{marginBottom:'8px'}}>
          <PeopleAltRoundedIcon sx={{ fontSize: '1.5rem', color: 'primary.main', marginRight:'5px'}} />
         
            <Typography variant="h6" sx={{ mb: 1, display:'inline'}}>
              CREW MEMBERS
            </Typography>
             </Box>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {mission.crew.map((member) => (
                <Chip key={member} label={member} size="small" sx={{backgroundColor:'#0073e61a', color: 'primary.main', }} />
              ))}
            </Stack>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MissionDetail;
