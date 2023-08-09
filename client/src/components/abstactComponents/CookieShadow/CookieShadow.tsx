import { Box } from '@mui/material'
import { IColors } from '../../../utils/enums/styleEnums/colorsEnum';

const CookieShadow: React.FC = (): JSX.Element => {
  return (
     <Box className="oval" bgcolor={IColors.SecondaryDark}></Box>
  )
}

export default CookieShadow;