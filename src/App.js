import React, {useState, useEffect} from 'react'
import Products from './components/Products/Products'
import Navbar from './components/Navbar/Navbar'
import { commerce } from './lib/commerce';
import Cart from './components/Cart/Cart';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './components/CheckoutForm/Checkout/Checkout';


const App = () =>{

	const [products, setProducts]=useState([])
	const [itemsInCart, setItemsInCart]=useState({})
	const [order, setOrder] = useState({})
	const [errorMessage, setErrorMessage] = useState('')
	const fetchProducts = async ()=> 
	{
		const response= await commerce.products.list();
		// console.log(response.data)
	    setProducts(response.data);
	    
	 	 
	}
	const fetchCart = async ()=>{
		setItemsInCart(await commerce.cart.retrieve())
	}
	useEffect(()=>{
		fetchProducts()
		fetchCart()
	},[])
	const addingItemToCartHandler =async (itemId, quantity)=>{
		const response=await commerce.cart.add(itemId, quantity)
		// console.log('here is item we add')	
		// console.log(response)
		setItemsInCart(response.cart)
	}
	const updatingItemInCartHandler = async (itemId,quantity)=>{
		const response = await commerce.cart.update(itemId, {quantity})
		setItemsInCart(response.cart)
	}
	const removeItemInCartHandler = async (itemId) =>{
		const response = await commerce.cart.remove(itemId)
		setItemsInCart(response.cart)
	}
	const emptyCartHandler = async () => {
		const response = await commerce.cart.empty()
		setItemsInCart(response.cart)
	}
	const refreshCart = async () => {
    	const newCart = await commerce.cart.refresh();
    	setItemsInCart(newCart);
  	};
	
	const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
	    try {
	      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);

	      setOrder(incomingOrder);

	      refreshCart();
	    } 
	    catch (error) {
	      setErrorMessage(error.data.error.message);
	    }
    }
	
	return(
			<Router>
				<div>

					<Navbar countOfCartItems={itemsInCart.total_items} />
					<Switch>
						<Route exact path='/' >
							<Products products={products} addingItemToCartHandler={addingItemToCartHandler}/>
						</Route>
						<Route exact path='/cart' >
							<Cart itemsInCart={itemsInCart} updatingItemInCartHandler={updatingItemInCartHandler} removeItemInCartHandler={removeItemInCartHandler} emptyCartHandler={emptyCartHandler}/>
						</Route>
						<Route exact path='/checkout' >
							<Checkout cart={itemsInCart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
						</Route>
					</Switch>			
					
				</div>
			</Router>
		)
}

export default App