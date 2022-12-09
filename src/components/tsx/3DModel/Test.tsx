import { FC, useState, useEffect, useRef } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import GltfCanvas from './GltfCanvas'

const Test: FC = () => {
  return <GltfCanvas> </GltfCanvas>
}

export default Test

/*
<Container maxWidth="lg">
      <Grid container alignItems="flex-start" spacing={1}>
        <Grid item xs={12} sm={7}>
          <Paper sx={{ p: 2, mt: 4, mb: 4 }}>
            <GltfCanvas />
          </Paper>
        </Grid>
      </Grid>
  </Container>
*/
