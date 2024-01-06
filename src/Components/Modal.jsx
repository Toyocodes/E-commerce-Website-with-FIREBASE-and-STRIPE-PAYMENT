import {useContext} from 'react'
// import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { CartContext } from '../context/CartContext';
import StripeCheckout from 'react-stripe-checkout'
import PropTypes from 'prop-types';


// Modal Component
export const Modal = ({ handlePaymentSuccess }) => {
  Modal.propTypes = {
    handlePaymentSuccess: PropTypes.func.isRequired,
  };
  
  const { total} = useContext(CartContext);
    
  //payment
  const handleToken =(token)=>{
    console.log(token)
    toast.success("Order has been placed successfully")
    handlePaymentSuccess()
  }
 
    
   
    return (
      <div>
           <StripeCheckout
              stripeKey="pk_test_51OGNDoHh19zPfIrELNV7Rl6Y9eZ6pMTkaNjwWabw8M9rKiNPBWRuEwMw8FUQY1Fsjr2pM84uNtDVmgKVFsYsEvha00PlRJ07xM"
              token={handleToken}
              billingAddress
              shippingAddress
              name="All products"
              amount= {total * 100}>
            </StripeCheckout>

            {/* <div className='flex flex-col gap-y-4'>
              <p className='font-bold'>TEST MODE CARD DETAILS</p>
              <p className='font-[600]'>
                CARD PIN: 4242 4242 4242 4242 <br />
                CARD DATE: current month and year e.g 03/24 indicates march 2024 <br />
                CVV: 345
              </p>
            </div> */}
      </div>

    );
  };
  