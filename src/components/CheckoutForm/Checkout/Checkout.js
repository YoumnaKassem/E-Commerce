import React, {useState, useEffect} from 'react'
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import {commerce} from '../../../lib/commerce'
import { Link, useHistory } from 'react-router-dom';

const Checkout = ({cart, order, onCaptureCheckout, error}) =>{
	const classes = useStyles()
	const steps=['Shipping address', 'Payment details']
	const [activeStep, setActiveStep]= useState(0)
	const [checkoutToken, setCheckoutToken] = useState(null)
	const [shippingData, setShippingData] = useState({})
    const history = useHistory();
	
	useEffect(()=>{
		if (cart.id){
			const generateToken = async () =>{
				try{
				const token = await commerce.checkout.generateToken(cart.id, {type:'cart'})
				setCheckoutToken(token)
				}
				catch (error){
					if (activeStep !== steps.length) history.push('/');
				}
			}
		 generateToken()
	    }
	},[cart])
	const nextStep = () => setActiveStep(prevStep=>prevStep + 1)
	const backStep = () => setActiveStep(prevStep=>prevStep - 1)
	const next = (data) => {
		setShippingData(data)
		nextStep()
	}
	let Confirmation = () => (order.customer ? (
	    <>
	      <div>
	        <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
	        <Divider className={classes.divider} />
	        <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
	      </div>
	      <br />
	      <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
	    </>
  	) : (
	    <div className={classes.spinner}>
	      <CircularProgress />
	    </div>
    ));

  if (error) {
    Confirmation = () => (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <br />
        <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
      </>
    );
  }
	const Form = () => activeStep===0 ? <AddressForm next={next} checkoutToken={checkoutToken}/> : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} nextStep={nextStep}/>
	return(
			<>
			<CssBaseline />
				<div className={classes.toolbar} />

				<main className={classes.layout}>
					<Paper className={classes.paper}>
						<Typography variant='h4' align='center'>Check out</Typography>
						<Stepper activeStep={activeStep} className={classes.stepper} >
							{steps.map(step=>(
								<Step key={step} >
									<StepLabel>{step}</StepLabel>
								</Step>
								))}
						</Stepper>
						{activeStep===steps.length?<Confirmation />:checkoutToken && <Form />}
					</Paper>

				</main>
			</>
		)
}
export default Checkout
