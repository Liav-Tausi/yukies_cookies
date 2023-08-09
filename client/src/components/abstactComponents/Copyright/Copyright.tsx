import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { IColors } from '../../../utils/enums/styleEnums/colorsEnum';


const Copyright: React.FC = (): JSX.Element => {
  return (
    <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
        >
        <CssBaseline />
        <Box
          component="footer"
          color={IColors.Primary}
          sx={{
            py: 3,
            px: 2,
            mt: 'auto'
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1">
              <Link to="/">
               Copyright © YukiesCookies {new Date().getFullYear()}
              </Link>
            </Typography>
          </Container>
        </Box>
      </Box>
  )
}

export default Copyright