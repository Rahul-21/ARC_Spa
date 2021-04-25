import React from 'react'
import { makeStyles, useTheme, fade } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import store from '../../store'
import Info from '../../assests/info.jpg'
import Scholar from '../../assests/scholar.jpg'
import Sky from '../../assests/sky.jpg'
import Link from '@material-ui/core/Link';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Select from '@material-ui/core/Select';
import ButtonBase from '@material-ui/core/ButtonBase'
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import FormControl from '@material-ui/core/FormControl';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import SearchIcon from '@material-ui/icons/Search';
import SingleLineGridList from '../gridList'

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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    margin: '2%',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    background: 'cornflowerblue',
    borderRadius: '6px',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item>

        {[1,2,3].map((i)=>(
          <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">Pricing</InputLabel>
        <Select defaultValue="" id="grouped-select">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <ListSubheader>Category 1</ListSubheader>
          <MenuItem value={1}>Option 1</MenuItem>
          <MenuItem value={2}>Option 2</MenuItem>
          <ListSubheader>Category 2</ListSubheader>
          <MenuItem value={3}>Option 3</MenuItem>
          <MenuItem value={4}>Option 4</MenuItem>
        </Select>
      </FormControl>
        ))}


          </Grid>
          <Grid item>
          <Button style={{  background: 'white', border: '2px solid blue',marginLeft: '-35%'}} onClick={onLogoutClick}>Logout</Button>
          </Grid>
          </Grid>
        <Grid container >

        <Grid item lg={12} md={12} style={{height: '10vh', marginTop:'4%'}}>
            <b>Search for the Top Courses in India</b>
            <p>Search for the best Courses in India according to your ease. Type the Name of the College or your Specialization.</p>
          </Grid>

          <Grid item md={12} lg={12} style={{marginBottom: '4%'}}>

        <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              style={{width: '80%', marginLeft: '8%'}}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          </Grid>


          <b>What our Learners has to say</b>
       < SingleLineGridList />
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <Grid item lg={3}>
          <img src={Sky}></img>
        </Grid>
        <Grid item lg={6} style={{display: 'flex'}}>
          <div style={{margin: '2%'}}>
            <Link underline="always">Our Products</Link>
            <ul>Product 1</ul>
            <ul>Product 2</ul>
            <ul>Product 3</ul>
            <ul>Product 4</ul>

          </div>
          <div style={{margin: '2%'}}>
            <Link underline="always">About Company</Link>
            <ul>About Us</ul>
            <ul>Terms and Conditions</ul>
            <ul>Privacy Policy</ul>
            <ul>Refund Policy</ul>

          </div>

          <div style={{margin: '2%'}}>
            <b>Sunscribe to our Newsletter</b> <br />
          
            <Link underline="always">Contact Us</Link>
          </div>


        </Grid>
        <Grid item lg={3} style={{padding: '50px'}}>
         <div style={{    marginBottom: '6%'}}> <b style={{  textDecoration: 'underline'}}>Follow Us</b><br/> </div> 
        <Badge badgeContent={4} color="primary">
        <MailIcon />
      </Badge>
      <Badge badgeContent={4} color="secondary">
        <MailIcon />
      </Badge>
      <Badge badgeContent={4} color="error">
        <MailIcon />
      </Badge>
        </Grid>
        </Grid>
    
    </div>
  )
}

export default Dashboard
