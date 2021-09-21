import { GetStaticProps } from 'next';
import Stripe from 'stripe';

import stripeConfig from '../config/stripe';
import Link from 'next/link';
import Checkout from '../components/Checkout';

interface Props {
  skus: Stripe.Sku[];
}

export const getStaticProps: GetStaticProps = async () => {
  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2020-03-02',
  });

  // tem que criar um produto no stripe
  const skus = await stripe.skus.list();

  return {
    props: {
      skus: skus.data
    }
  }
};


export const HomePage: React.FC<Props> = ({ skus }) => {
  return (
    <>
      <hr/>
      <h1>Simple Stripe Store</h1>
      {skus.map(sku => (
        <div key={sku.id}>
          <h1>{sku.attributes.name}</h1>
          {/* mostra soh se o produto tem imagem */}
          {sku.image && 
            <img 
              src={sku.image}
              style={{
                width: '100px'
              }}
            />
          }
          {/* preço */}
          <h2>
            {Number(sku.price/100).toFixed(2)} 
            {sku.currency.toUpperCase}
          </h2>
          <Link href={`\${sku.id}`}>
            Visit Page
          </Link>
          <hr/>
        </div>
      ))}
    </>
  );
}

