import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Grid, Container, CssBaseline } from "@mui/material";
import { Stepper } from "./Stepper";
import { Sample } from "./Sample";

function App() {
  const theme = createTheme();

  const steps = [
    {
      id: 1,
      header: "Step 1",
      body: 'lorem ipsum dolor sit amet',
      image: 'https://picsum.photos/500/400',
    },
    {
      id: 2,
      header: "Step 2",
      body: 'lorem ipsum dolor sit amet',
      image: 'https://picsum.photos/500/400',
    },
    {
      id: 3,
      header: "Step 3",
      body: 'lorem ipsum dolor sit amet',
      image: 'https://picsum.photos/500/400',
    },
    {
      id: 4,
      header: "Step 4",
      body: 'lorem ipsum dolor sit amet',
      image: 'https://picsum.photos/500/400',
    }
  ]

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container disableGutters>
        <Container sx={{ display: "flex", flexDirection: "column" }}>
          <Grid container spacing={2}>
            <Grid item lg={12}>
              <Box sx={{ height: "500px", backgroundColor: "blue" }} />
            </Grid>
            <Grid item lg={12}>
              <Box sx={{ height: "300px", backgroundColor: "orange" }} />
            </Grid>
            <Grid item lg={12}>
              <Box sx={{ height: "700px", backgroundColor: "green" }} />
            </Grid>
            <Grid item lg={12}>
              <Box sx={{ height: "250px", backgroundColor: "red" }} />
            </Grid>
            <Grid item lg={12}>
              {/* <Sample /> */}
            </Grid>
            <Grid item sm={12} md={12} lg={12}>
              <Stepper steps={steps} />
            </Grid>
            <Grid item lg={12}>
              <Box sx={{ height: "400px", backgroundColor: "purple" }} />
            </Grid>
            <Grid item lg={12}>
              <Box sx={{ height: "400px", backgroundColor: "brown" }} />
            </Grid>
            <Grid item lg={12}>
              <Box sx={{ height: "500px", backgroundColor: "yellow" }} />
            </Grid>
            <Grid item lg={12}>
              <Box sx={{ height: "400px", backgroundColor: "gold" }} />
            </Grid>
          </Grid>
        </Container>
      </Container>
    </ThemeProvider>
  );
}

export default App;
