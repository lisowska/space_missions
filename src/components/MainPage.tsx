import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import Header from './Header';
import MissionCard from './MissionCard';
import { Mission } from '../types/mission';
import missionData from '../data/missionData.json';

const MainPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'EARTH' | 'BEYOND'>('EARTH');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem('spaceMissionsFavorites');
    return stored ? JSON.parse(stored) : [];
  });

  const missions: Mission[] = missionData.missions as Mission[];

  useEffect(() => {
    localStorage.setItem('spaceMissionsFavorites', JSON.stringify(favorites));
  }, [favorites]);

 

  const handleFavoriteToggle = (missionId: string) => {
    setFavorites((prev) => {
      if (prev.includes(missionId)) {
        return prev.filter((id) => id !== missionId);
      } else {
        return [...prev, missionId];
      }
    });
  };

  
 

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Header onViewModeChange={setViewMode} />
    

      <Box sx={{ p: { xs: 2, md: 3 } }}>
      
          <Grid container spacing={2}>
            {missions.map((mission) => (
              <Grid item key={mission.id} xs={12} sm={6} md={4} lg={3}>
                <MissionCard
                  mission={mission}
                  isFavorite={favorites.includes(mission.id)}
                  onFavoriteToggle={handleFavoriteToggle}
                  onClick={() => console.log('test')}
                />
              </Grid>
            ))}
          </Grid>
      
      </Box>

     
    </Box>
  );
};

export default MainPage;
