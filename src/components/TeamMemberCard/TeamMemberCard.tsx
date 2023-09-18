import React from 'react';
import { Avatar, Card, CardActions, CardContent, Grid, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom';
import Lightbox from 'yet-another-react-lightbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
interface CardProps {
  name: string;
  imgSrc: Array<string>;
  role: string;
  bio: string;
  contr: Array<Array<string>>;
  gitHubLink: string;
}

export default function TeamMemberCard({ name, imgSrc, role, bio, contr, gitHubLink }: CardProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <Card>
      <CardContent>
        <Grid container alignItems={'center'} direction={'column'}>
          <div onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
            <Avatar alt='Irina' src={imgSrc[0]} sx={{ width: 64, height: 64 }} />
          </div>

          <Lightbox open={open} close={() => setOpen(false)} carousel={{ preload: 3 }} slides={[{ src: imgSrc[0] }, { src: imgSrc[1] }]} data-testid='lightBox' />
          <Typography variant='h4' width={'max-content'}>
            {name}
          </Typography>
        </Grid>

        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {role}
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
            <Typography variant='h5'>Biography</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant='h6' textAlign={'left'}>
              {bio}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
            <Typography variant='h5'>Contribution</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {contr.map((sprint) => (
              <Accordion key={sprint[0]}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
                  <Typography variant='h5'>Sprint {contr.indexOf(sprint) + 1}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ul>
                    {contr[contr.indexOf(sprint)].map((item) => (
                      <li key={item}>
                        <Typography variant='h6' textAlign={'left'}>
                          {item}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
        <Typography variant='body2'>
          <br />
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Link to={gitHubLink} target='blank' key={gitHubLink}>
          <GitHubIcon sx={{ fill: 'black', width: '32px', height: '32px' }} />
        </Link>
      </CardActions>
    </Card>
  );
}
