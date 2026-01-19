import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import PublicIcon from '@mui/icons-material/Public';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';


const Header = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        color: 'white',
        padding: { xs: '2rem 1rem', md: '3rem 2rem' },
        overflow: 'hidden',
       background: 'linear-gradient(135deg, #16294A 0%, #0059B3 50%, #17A2E8 100%)',
      }}
    >

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />
      
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mb: 2 }}>
          <Box position="relative">
          <Box
           sx={{
        position: 'absolute',
        backgroundColor: '#1976d2',
        color: 'white',
         padding: { xs: '2rem 2rem', md: '2rem 2rem' },
        overflow: 'hidden',
        borderRadius:'15px'
        }}
           style={{color:"#0073E6"}}>
            </Box>
            <Box style= {{position:"relative" , display:"flex",  justifyContent: 'center',
    alignItems: 'center',
    height: '3.5rem',
    width: '3.5rem'
    }}>

          <RocketLaunchIcon  sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, verticalAlign:'center',width: '1.75rem',height: '1.75rem' }} />
          </Box>
          </Box>

          <Box style={{padding: 24 }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 700,
              flex: 1,
            }}
          >
            Space Missions
          </Typography>
          <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: { xs: '1rem', md: '2rem' },
              fontWeight: 700,
              flex: 1,
              color:'rgba(255, 255, 255, 0.8)',
            }}
          >
            Explore humanity's greatest journeys beyond Earth.
          </Typography>
          </Box>
          <AutoAwesomeIcon sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }} />
        </Stack>

       <Box display="flex" alignItems="center" justifyContent="center">
        <Box display="flex" alignItems="center">
         <TravelExploreIcon sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }} />
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '0.9rem', md: '1.1rem' },
            ml: 3,
            mr:3,
            opacity: 0.95,
            color:'rgba(255, 255, 255, 0.8)'
          }}
        >
          EARTH
        </Typography>
        </Box>
         <ArrowRightAltIcon sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}/>
         <Box display="flex" alignItems="center">
          <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '0.9rem', md: '1.1rem' },
            ml: 3,
            mr:3,
            opacity: 0.95,
            color:'rgba(255, 255, 255, 0.8)'
          }}
        >
         BEYOND
        </Typography>
       
            <PublicIcon sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }} />
            </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
