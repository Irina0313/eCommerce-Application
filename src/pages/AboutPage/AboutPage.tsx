import React from 'react';
import { Grid } from '@mui/material';
import TeamMemberCard from '../../components/TeamMemberCard/TeamMemberCard';
import { IraContr, KolyaBio, KolyaContr, TNickContr } from './memberData';

export function AboutPage() {
  return (
    <Grid container justifyContent={'center'} alignItems={'center'} textAlign={'center'} spacing={3}>
      <Grid item lg={4} sm={12} xs={12}>
        <TeamMemberCard name='Irina' imgSrc={['/images/1.png']} role='Team Lead' bio=' ' contr={IraContr} gitHubLink='https://github.com/Irina0313' />
      </Grid>
      <Grid item lg={4} sm={12} xs={12}>
        <TeamMemberCard name='Nikolai' imgSrc={['/images/Nikolai.jpg', '/images/2.png']} role='API master' bio=' well meaning and kindly.' contr={TNickContr} gitHubLink='https://github.com/TNikolay' />
      </Grid>
      <Grid item lg={4} sm={12} xs={12}>
        <TeamMemberCard name='Kolya' imgSrc={['/images/Kolya.png', '/images/3.png']} role='GUI master' bio={KolyaBio} contr={KolyaContr} gitHubLink='https://github.com/KolyaVol' />
      </Grid>
    </Grid>
  );
}
