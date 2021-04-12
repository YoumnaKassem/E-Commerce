import React from 'react'
import { IconButton, Typography, AppBar, Toolbar, Badge, Menu } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import useStyles from './styles'
import {Link, useLocation} from 'react-router-dom'
import youmnaLogo from '../../assets/youmLogo.png'
const Navbar = ({countOfCartItems}) =>{
	const location=useLocation()
	const classes=useStyles()
	return(
			<div>
				<AppBar position='fixed' className={classes.appBar} color='inherit' >
					<Toolbar>
						<Typography component={Link} to='/' variant='h6' className={classes.title } color='inherit'>
							<img src={youmnaLogo} alt='e-commerce' height='60px' className={classes.image}/>
							Y&Y CozyHome
						</Typography>
						<div className={classes.grow} />
						<div className={classes.button}>
							{location.pathname==='/' &&(<IconButton component={Link} to='/cart' arial-label='show cart items'>
								<Badge badgeContent={countOfCartItems} color='secondary' >
									<ShoppingCart />
								</Badge>
							</IconButton>)}
						</div>
					</Toolbar>
				</AppBar>		
			</div>
		)
}
export default Navbar