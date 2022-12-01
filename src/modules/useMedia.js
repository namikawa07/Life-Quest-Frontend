import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

const useSize = () => {
  const theme = useTheme()
  const isMobileSize = useMediaQuery(theme.breakpoints.down('md'))
  const isTabletSize = useMediaQuery(theme.breakpoints.down('sm'))
  const isPcSize = useMediaQuery(theme.breakpoints.down('xs'))
  return { isMobileSize, isTabletSize, isPcSize }
}

export default useSize
