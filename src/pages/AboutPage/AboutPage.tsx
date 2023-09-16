import React from 'react';
import { Grid, Typography } from '@mui/material';
import TeamMemberCard from '../../components/TeamMemberCard/TeamMemberCard';
import { IraContr, KolyaBio, KolyaContr, TNickContr } from './memberData';

export function AboutPage() {
  return (
    <Grid>
      <Grid item>
        <>
          <Grid container justifyContent={'center'} alignItems={'top'} textAlign={'center'} spacing={3}>
            <Grid item lg={4} sm={12} xs={12}>
              <TeamMemberCard name='Irina' imgSrc={['/assets/1.png']} role='Team Lead' bio=' ' contr={IraContr} gitHubLink='https://github.com/Irina0313' />
            </Grid>
            <Grid item lg={4} sm={12} xs={12}>
              <TeamMemberCard name='Nikolai' imgSrc={['/assets/Nikolai.jpg', '/assets/2.png']} role='API master' bio=' well meaning and kindly.' contr={TNickContr} gitHubLink='https://github.com/TNikolay' />
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
                На протяжении всего проекта наша команда из 3 разработчиков и ментора активно взаимодействовала между собой, что позволило создать рабочую версию магазина с использованием готового API, но как проходил рабочий процесс? Сейчас мы расскажем вам об этом подробнее... Ещё до начала
                первого спринта была организована видеоконференция, на которой команда познакомилась, каждый член команды выссказал свои идеи по видению процесса разработки и свои сильные и слабые стороны, а так же коротко рассказал о своём опыте. После знакомства и совещания ментор высказал свои
                пожелания и дал пару напутствующих слов.
                <br />
                В процессе первого спринта были созданны репозиторий для совместной работы, группа в дискорде и Agile доска в Jira. Каждый день велась переписка, где каждый член команды рассказывал о своем прогрессе и, если была необходимость, просил совета у команды. Ближе к концу спринта всегда
                проводились проверки и тесты работы коллег, после чего Team Lead команды приступала к деплою. Затем команда очередной раз проверяла уже задеплоеный проект на наличие ошибок и сабмитила задание ментору/на кросс-чек.
                <br />
                Начиная со второго спринта ментор проверял наш код, после чего высказывал команде своё мнение и, если все были согласны, ставил оценку. В начале спринта команда распределяла задачи, заполняла Agile доску и, при наличии кросс чека, приступала к проверке чужих работ. Каждый член
                команды проверял все работы, выставлял свои баллы и записывал комментарии, после чего команда совещалась и выносила коллективное решение, которое донносил до чужой команды Team Lead.
              </Typography>
            </Grid>
            <Grid item xs={1} display={'flex'} justifyContent={'center'}>
              <video src='/assets/gitGraph.mkv' autoPlay loop height={'300px'}></video>
            </Grid>
          </Grid>
        </>
      </Grid>
    </Grid>
  );
}
