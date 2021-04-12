import React from 'react'
import {Grid, Typography, Container, Button} from '@material-ui/core'
import CartItem from './CartItem/CartItem'
import useStyles from './styles'
import { Link } from 'react-router-dom'


const Cart = ({itemsInCart, updatingItemInCartHandler, removeItemInCartHandler, emptyCartHandler}) =>{
	const classes = useStyles()
	const EmptyCart = () =>(
		<Typography variant='subtitle1' >
			Your cart is is empty! 
			<Link to='/' className={classes.link} > Go and Add some items!</Link>
		</Typography>
		);
	
	const FilledCart=()=>{
		return (
		<>
			<Grid container spacing={3}>
					{itemsInCart.line_items.map((item)=>(
						<Grid item xs={12} sm={4} key={item.id}>
								<CartItem updatingItemInCartHandler={updatingItemInCartHandler} removeItemInCartHandler={removeItemInCartHandler} item={item} />
					    </Grid>)
					)}
			</Grid>
			<div className={classes.cardDetails}>
				<Typography variant='h4'>subtotal:{itemsInCart.subtotal.formatted_with_symbol}</Typography>
				<div>
					<Button onClick={emptyCartHandler} className={classes.emptyButton} color='secondary' variant='contained' size='large' type='button' >Empty Cart </Button>
					<Button component={Link} to='/checkout' className={classes.checkoutButton} type='button' size='large' color= 'primary' variant='contained'>Check out </Button>
				</div>
			</div>
		</>
		);
		
	}
	if (!itemsInCart.line_items) return 'LOADING...';
	return(
			<Container>
				<div className={classes.toolbar} />
				<Typography className={classes.title} variant='h4' gutterBottom >Your shopping Cart</Typography>
				{ itemsInCart.line_items.length <1 ? <EmptyCart /> : <FilledCart /> }
				
			</Container>
		)
}

export default Cart