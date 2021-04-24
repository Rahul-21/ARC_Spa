import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import store from '../../store'
import Info from '../../assests/info.jpg'
import Scholar from '../../assests/scholar.jpg'
import ButtonBase from '@material-ui/core/ButtonBase'
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import { logoutUser } from '../../actions/authActions'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


const tutorialSteps = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
  },
  {
    label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
    imgPath:
      'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  infoGrid: {
    background: 'cornflowerblue',
    height: '100vh',
    borderRadius: '5px',
  },
  detailGrid:{ 
    height: '100vh',
    borderRadius: '5px',
    background: 'lightgrey',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img1: {
    height: 255,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
}))

const Dashboard = () => {
  const classes = useStyles()
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const onLogoutClick = (e) => {
    e.preventDefault()
    store.dispatch(logoutUser())
    window.location.href = './login'
  }


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item lg={3} md={3} className={classes.infoGrid}>
          <ButtonBase className={classes.image}>
            <img className={classes.img} src={Info} />
          </ButtonBase>
          <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img className={classes.img1} src={step.imgPath} alt={step.label} />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />

      <img className={classes.img} src={Scholar} />

      <Button style={{background: 'white',margin: '16%'}}>{'Download App -->'}</Button>

        </Grid>

        <Grid item lg={9} md={9} className={classes.detailGrid}>
          <Button onClick={onLogoutClick}>Logout</Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard
