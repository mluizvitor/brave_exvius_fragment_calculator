import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { StyledContainer } from './styles';

import fragmentsImg from '../../assets/fragments.svg';
import awakenImg from '../../assets/awaken.svg';
import trainingImg from '../../assets/training.svg';

export function Footer() {
  return (
    <StyledContainer maxWidth='xl'>
      <Grid container
        spacing={1}
        columns={{
          xs: 1,
          sm: 2,
          md: 3,
        }}>

        <Grid item
          xs={1}>
          <Card elevation={1}
            sx={{boxShadow: 'none', borderRadius: '16px 16px 8px 8px'}}>
            <CardMedia component='img'
              height={192}
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
          </Card>
        </Grid>

        <Grid item
          xs={1}>
          <Card elevation={1}
            sx={{boxShadow: 'none', borderRadius: '16px 16px 8px 8px'}}>
            <CardMedia component='img'
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
              <Typography variant='body2'
                gutterBottom>
                {'Quando você despertar a unidade dentro do jogo, não esqueça também de despertar '}
                {'aqui, para que você não perca seu progresso'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item
          xs={1}>
          <Card elevation={1}
            sx={{boxShadow: 'none', borderRadius: '16px 16px 8px 8px'}}>
            <CardMedia component='img'
              height={192}
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
          </Card>
        </Grid>

      </Grid>
      
    </StyledContainer>
  );
}