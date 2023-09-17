import React from 'react';
import { Grid, Typography } from '@mui/material';
import TeamMemberCard from '../../components/TeamMemberCard/TeamMemberCard';
import { IraBio, IraContr, KolyaBio, KolyaContr, TNickBio, TNickContr } from './memberData';

export function AboutPage() {
  return (
    <Grid>
      <Grid item>
        <>
          <Grid container justifyContent={'center'} alignItems={'top'} textAlign={'center'} spacing={3}>
            <Grid item lg={4} sm={12} xs={12}>
              <TeamMemberCard name='Irina' imgSrc={['/assets/Irina.jpg', '/assets/1.png']} role='Team Lead' bio={IraBio} contr={IraContr} gitHubLink='https://github.com/Irina0313' />
            </Grid>
            <Grid item lg={4} sm={12} xs={12}>
              <TeamMemberCard name='Nikolai' imgSrc={['/assets/Nikolai.jpg', '/assets/2.png']} role='API master' bio={TNickBio} contr={TNickContr} gitHubLink='https://github.com/TNikolay' />
            </Grid>
            <Grid item lg={4} sm={12} xs={12}>
              <TeamMemberCard name='Kolya' imgSrc={['/assets/Kolya.png', '/assets/3.png']} role='GUI master' bio={KolyaBio} contr={KolyaContr} gitHubLink='https://github.com/KolyaVol' />
            </Grid>
          </Grid>
        </>
      </Grid>
      <Grid item>
        <Typography variant='h4' textAlign={'center'} marginTop={'2rem'}>
          Collaboration methods
        </Typography>
        <>
          <Grid container alignItems={'center'}>
            <Grid item xs={11}>
              <Typography variant='h5' textAlign={'center'} marginTop={'2rem'}>
                Throughout the entire project, our team of 3 developers and a mentor actively interacted with each other, which allowed us to create a working version of the store using an existing API. But how did the working process go? Now we will tell you more about it...
                <br />
                Even before the start of the first sprint, a video conference was organized where the team got acquainted. Each team member shared their ideas about the development process and their strengths and weaknesses, as well as briefly talked about their experience. After the introduction
                and meeting, the mentor expressed their wishes and gave some encouraging words.
                <br />
                During the first sprint, a repository for collaboration, a Discord group, and an Agile board in Jira were created. There was daily correspondence where each team member shared their progress and, if necessary, asked for advice from the team. Towards the end of the sprint, colleagues
                conducted checks and tests of each others work, after which the team lead deployed the project. Then the team rechecked the deployed project for errors and submitted the task to the mentor or for cross-checking.
                <br />
                Starting from the second sprint, the mentor reviewed our code and provided their feedback. If everyone agreed, they would also give an evaluation. At the beginning of the sprint, the team would distribute tasks, fill in the Agile board, and, if there was a cross-check, start
                reviewing each others work. Each team member reviewed all the work, gave their ratings, and wrote comments. Then the team would discuss and make a collective decision, which would be communicated to the other teams.
              </Typography>
            </Grid>
            <Grid item xs={1} display={'flex'} justifyContent={'center'}>
              <video src='/assets/gitGraph.mkv' autoPlay loop style={{ marginLeft: '2rem', width: '100%', height: '100%', maxHeight: '400px', objectFit: 'contain' }}></video>
            </Grid>
          </Grid>
        </>
      </Grid>
    </Grid>
  );
}
