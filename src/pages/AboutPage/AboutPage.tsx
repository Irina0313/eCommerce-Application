import React from 'react';
import { Grid } from '@mui/material';
import TeamMemberCard from '../../components/TeamMemberCard/TeamMemberCard';

export function AboutPage() {
  return (
    <Grid container justifyContent={'center'} alignItems={'center'} textAlign={'center'}>
      <Grid item lg={4}>
        <TeamMemberCard name='Irina' imgSrc='' role='Team Lead' bio=' well meaning and kindly.' gitHubLink='https://github.com/Irina0313' />
      </Grid>
      <Grid item lg={4}>
        <TeamMemberCard name='Nikolai' imgSrc='' role='API master' bio=' well meaning and kindly.' gitHubLink='https://github.com/TNikolay' />
      </Grid>
      <Grid item lg={4}>
        <TeamMemberCard name='Nikolai' imgSrc='' role='GUI master' bio=' well meaning and kindly.' gitHubLink='https://github.com/KolyaVol' />
      </Grid>
    </Grid>
  );
}
