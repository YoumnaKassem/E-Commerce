import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import useStyles from './styles'
const Product = ({product, addingItemToCartHandler}) =>{
	const classes = useStyles();
	return(
			<Card className={classes.root}>
				<CardMedia className={classes.media} image={product.media.source} title={product.name} />
				<CardContent >
					<div className={classes.cardContent}>
						<Typography variant='h5'>
							{product.name}
						</Typography>
						<Typography variant='h5'>
							{product.price.formatted_with_symbol}
						</Typography>	
					</div>
					<Typography dangerouslySetInnerHTML={{__html: product.description}} variant='body2' color='textSecondary'/>
				</CardContent>
				<CardActions disableSpacing className={classes.cardActions}>
					<IconButton onClick={()=>addingItemToCartHandler(product.id, 1)} aria-label='Add to Cart'>
						<AddShoppingCart />
					</IconButton>
				</CardActions>
			</Card>
		)
}
export default Product