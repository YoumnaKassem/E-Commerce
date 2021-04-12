import React, {useState, useEffect} from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import { Link } from 'react-router-dom'
import CustomTextField from './CustomTextField'
import { commerce } from '../../lib/commerce'
const AddressForm = ({checkoutToken, next}) =>{
	const methods = useForm()
	const [shippingCountries, setShippingCountries] = useState([])
	const [shippingCountry, setShippingCountry] = useState('')
	const [shippingSubdivisions, setShippingSubdivisions] = useState([])
	const [shippingSubdivision, setShippingSubdivision] = useState('')
	const [shippingOptions, setShippingOptions] = useState([])
	const [shippingOption, setShippingOption] = useState('')

	const fetchShippingCountries = async (checkoutTokenId)=>
	{
		const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId)
		setShippingCountries(countries)
		setShippingCountry(Object.keys(countries)[2])
	}
	const fetchSubdivisions = async (shippingCountry) =>
	{
		const { subdivisions } = await commerce.services.localeListSubdivisions(shippingCountry)
		setShippingSubdivisions(subdivisions)
		setShippingSubdivision(Object.keys(subdivisions)[0])
	}
	const fetchShippingOptions = async (checkoutTokenId, country, region ) => {
		const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region})
		setShippingOptions(options)
		setShippingOption(options[0].id)
		
	}
	
	useEffect(()=>{
		fetchShippingCountries(checkoutToken.id)
	}, [])
	useEffect(()=>{
		if (shippingCountry) fetchSubdivisions(shippingCountry)
	}, [shippingCountry])
	useEffect(()=>{
		if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
	}, [shippingSubdivision])
	const changeShippingCountryHandler = (e)=>{
		setShippingCountry(e.target.value)
	}
	const changeShippingSubdivisionHandler = (e)=>{
		setShippingSubdivision(e.target.value)
	}
	const changeShippingOptionsHandler = (e) =>{
		setShippingOption(e.target.value)
	}
	return(
			<div>
				<Typography variant='h5'> Shipping Address</Typography>
				<FormProvider {...methods}>
					<form onSubmit={methods.handleSubmit(data=>next({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
						<Grid container spacing={3}>
							<CustomTextField name='firstName'label='First Name' />
							<CustomTextField name='lastName'label='Last Name' />
							<CustomTextField name='address1'label='Address' />
							<CustomTextField name='email'label='E-mail' />
							<CustomTextField name='city'label='City' />
							<CustomTextField name='zip'label='ZIP' />
							<Grid item xs={12} sm={6} >
								<InputLabel> Country </InputLabel>
								<Select value={shippingCountry} fullWidth onChange={changeShippingCountryHandler} >
								{
									Object.entries(shippingCountries).map(([id, name]) => ({id:id, label:name})).map((country)=>(
										<MenuItem key={country.id} value={country.id} >
											{country.label} 
										</MenuItem>
									))		
								}
								</Select>
							</Grid>
							<Grid item xs={12} sm={6} >
								<InputLabel> Region </InputLabel>
								<Select value={shippingSubdivision} fullWidth onChange={changeShippingSubdivisionHandler}>
								{
									Object.entries(shippingSubdivisions).map(([id, name]) => ({id:id, label:name})).map((subdivision)=>(
										<MenuItem key={subdivision.id} value={subdivision.id} >
											{subdivision.label} 
										</MenuItem>
									))		
								}
								</Select>
							</Grid>
							<Grid item xs={12} sm={6} >
								<InputLabel> Shipping Fees </InputLabel>
								<Select value={shippingOption} fullWidth onChange={changeShippingOptionsHandler}>
								{
								  shippingOptions.map((sO) => (
				                  <MenuItem key={sO.id} value={sO.id}>
				                    {`${sO.description} - ${sO.price.formatted_with_symbol}`}
				                  </MenuItem>
				                ))	
								}
								</Select>
							</Grid>	
						</Grid>
						<br />
						<div style={{ display:'flex', justifyContent:'space-between'}}>
							<Button component={Link} to='/cart' variant='outlined'>Back to Cart</Button>
							<Button type='submit' color='primary' variant='contained'> Next </Button>
						</div>
					</form>
				</FormProvider>
			</div>
		)
}
export default AddressForm
