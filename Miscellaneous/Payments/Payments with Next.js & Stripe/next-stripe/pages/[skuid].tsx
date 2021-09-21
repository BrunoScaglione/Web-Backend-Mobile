import Link from 'next/link';
import React from 'react';
import Stripe from 'stripe';
import { GetStaticPaths, GetServerSideProps } from 'next';

import stripeConfig from '../config/stripe';
import Checkout from '../components/Checkout';

interface Props {
  sku: Stripe.Sku;
  session: Stripe.Checkout.Session; // tem q mudar a definicao aqui pra para de mostar erro
}

// tudo que tem os exports sao "servidor-things"

// For dynamic routes, your page can export a getStaticPaths function to let 
// the exporter know which HTML pages to generate for that route.
export const getStaticPaths: GetStaticPaths = async () => {
  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2020-03-02',
  });

  // esses skus sao a api que a gente vai usar pra simular um banco de dados de produtos
  // eu soh to usando pra mostar as info aqui, nao to usando na compra, ou seja, nao
  // to implementando um sitema de compra dos skus, soh cria a sessao mesmo, mas
  // tb da pra usar de lah mesmo, ai deletaria o produto apos a compra, eh um estoque


  const skus = await stripe.skus.list();

  console.log(skus.data);

  const paths = skus.data.map((sku) => ({
    params: {
      skuId: sku.id
    },
  }));

  // paths sao os caminhos em que essa pagina vai ser renderizada
  return {
    paths,
    fallback: false,
  }
};

///importante: pra conseguir pegar query aqui precisa ser SSR(server side rendering)
// ai usa o getServerSideProps
export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
  const stripe = new Stripe(stripeConfig.secretKey, {
    apiVersion: '2020-03-02',
  });

  const  { skuId } = params;

  const sku = await stripe.skus.retrieve(skuId as string) as Stripe.Sku;

  // ai aqui da pra deixar tudo dinamico (oq ta ai eh soh um exemplo do proprio next) conforme o produto e a quantidade escolhidas
  // pelo usuario, retira essas info no getStaticPaths pela propriedade query
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "pencil",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    // importante: https eh mt mais seguro e deve ser usado em producao
    mode: "payment",                                    
    success_url: `http:localhost:3000/success?itemName=${sku.attributes.name}`,
    cancel_url: "http:localhost:3000/cancel",
  });

  return {
    props: {
      sku,
      session,
    },
  }
};


const Product: React.FC<Props> = ({ sku, session }) => {
  return (
    <div>
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
      <Checkout session={session} />
      <Link href='/'>
        Go back
      </Link>
    </div>
  )
};

export default Product;


