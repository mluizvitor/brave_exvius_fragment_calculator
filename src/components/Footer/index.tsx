import { Button, CardActions, CardContent, Grid, Link, Typography } from '@mui/material';
import { StyledCard, StyledCardBox, StyledCardMedia, StyledContainer } from './styles';
import { OpenInNewRounded } from '@mui/icons-material';

import fragmentsImg from '../../assets/fragments.svg';
import awakenImg from '../../assets/awaken.svg';
import trainingImg from '../../assets/training.svg';
import infoImg from '../../assets/info.svg';

export function Footer() {
  return (
    <StyledContainer maxWidth='xl'>
      <Grid container
        spacing={1}
        columns={{
          xs: 1,
          sm: 2,
        }}>

        <Grid item
          xs={1}>
          <StyledCard elevation={1}>
            <StyledCardMedia component='img'
              image={fragmentsImg}
              aria-hidden/>
            <CardContent>
              <Typography variant='h5'
                gutterBottom
                component='h2'>
                {'Fragmentos'}
              </Typography>
              <Typography variant='body2'
                gutterBottom>
                {'Como o nome sugere, te ajudamos a calcular quantos fragmentos restam '}
                {'para despertar uma unidade entre seus 3 níveis NV Ex, incluindo unidades NVA. '}
              </Typography>
              <Typography variant='body2'>
                {'Para sua comodidade, organizamos a lista de unidades mostrando no topo as que '}
                {'estão mais próximas do despertar, seguido do nível NV Ex mais baixo.'}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item
          xs={1}>
          <StyledCard elevation={1}>
            <StyledCardMedia component='img'
              height={192}
              image={awakenImg}
              aria-hidden/>
            <CardContent>
              <Typography variant='h5'
                gutterBottom
                component='h2'>
                {'Despertar'}
              </Typography>
              <Typography variant='body2'
                gutterBottom>
                {'Quando há fragmentos suficientes, o status "Pode ser despertado" muda para você '}
                {'saber que pode despertar sua Unidade manualmente dentro do jogo.'}
              </Typography>
              <Typography variant='body2'>
                {'Quando você despertar a unidade dentro do jogo, não esqueça também de despertar '}
                {'aqui, para que você não perca seu progresso.'}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item
          xs={1}>
          <StyledCard elevation={1}>
            <StyledCardMedia component='img'
              image={trainingImg}
              aria-hidden/>
            <CardContent>
              <Typography variant='h5'
                gutterBottom
                component='h2'>
                {'Treinamento'}
              </Typography>
              <Typography variant='body2'
                gutterBottom>
                {'Quando há muitas unidades cadastradas, é normal se perder entre todas elas. '}
                {'Por isso, além da pesquisa por nome, você pode marcar uma unidade para treinamento.'}
              </Typography>
              <Typography variant='body2'>
                {'Unidades marcadas ficam sempre no topo da lista, independente do número de fragmentos '}
                {'restantes para despertar.'}
              </Typography>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item
          xs={1}
          md={3}>
          <StyledCard elevation={1}>
            <StyledCardMedia component='img'
              image={infoImg}
              aria-hidden/>

            <StyledCardBox>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography variant='h5'
                  gutterBottom
                  component='h2'>
                  {'Sobre'}
                </Typography>

                <Typography variant='body2'>
                  {'Desenvolvido por '}
                  <Link href='https://linkedin.com/in/mluizvitor'
                    target='_blank'
                    rel='noopener noreferrer'>{'Vitor Monteiro'}</Link>
                  {' com '}
                  <Link href='https://reactjs.org/'
                    target='_blank'
                    rel='noopener noreferrer'>{'ReactJS'}</Link>
                  {' e '}
                  <Link href='https://mui.com'
                    target='_blank'
                    rel='noopener noreferrer'>{'MUI'}</Link>
                  {'.'}
                </Typography>
              </CardContent>
            
              <CardActions>
                <Button href='https://linkedin.com/in/mluizvitor'
                  target='_blank'
                  rel='noopener noreferrer'
                  endIcon={
                    <OpenInNewRounded sx={{width: 16}}/>
                  }>
                  {'Linkedin'}
                </Button>
                <Button href='https://github.com/mluizvitor'
                  target='_blank'
                  rel='noopener noreferrer'
                  endIcon={
                    <OpenInNewRounded sx={{width: 16}}/>
                  }>
                  {'Github'}
                </Button>
              </CardActions>

            </StyledCardBox>
          </StyledCard>
        </Grid>

      </Grid>
      
    </StyledContainer>
  );
}