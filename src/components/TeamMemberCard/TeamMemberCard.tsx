import React from 'react';
import { Avatar, Button, Card, CardActions, CardContent, Grid, SvgIcon, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom';
interface CardProps {
  name: string;
  imgSrc: string;
  role: string;
  bio: string;
  gitHubLink: string;
}

export default function TeamMemberCard({ name, imgSrc, role, bio, gitHubLink }: CardProps) {
  return (
    <Card>
      <CardContent>
        <Grid container alignItems={'center'} direction={'column'}>
          <Avatar alt='Irina' src={imgSrc} />
          <Typography variant='h4' width={'max-content'}>
            {name}
          </Typography>
        </Grid>

        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {role}
        </Typography>
        <Typography variant='body2'>
          {bio}
          <br />
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Link to={gitHubLink} target='blank' key={gitHubLink}>
          <GitHubIcon sx={{ fill: 'black' }} />
        </Link>
      </CardActions>
    </Card>
  );
}
