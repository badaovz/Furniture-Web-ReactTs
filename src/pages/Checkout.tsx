import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { RoutePage, StripeCheckout } from '../components';
import { PathPropsType } from '../model/path';

function Checkout({path}:PathPropsType) {
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY as string);

  return (
    <>
        <RoutePage path={path} />
        <div className='checkout'>
            <Elements stripe={stripePromise}>
                <StripeCheckout />
            </Elements>
        </div>
    </>
  )
}

export default Checkout;