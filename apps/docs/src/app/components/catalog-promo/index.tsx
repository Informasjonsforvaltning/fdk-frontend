import { Alert, Button, Link } from '@digdir/designsystemet-react';

const CatalogPromo = ({ text, button, link }) => {
	return (
		<Alert
	    severity='info'
	    size='md'
	>
		<div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
	    {text}
	    <Button
		      asChild
		      size='small'
		      variant='primary'
		  >
		      <Link href={link}>
		          {button}
		      </Link>
		  </Button>
		</div>
	</Alert>
	);
}

export default CatalogPromo;