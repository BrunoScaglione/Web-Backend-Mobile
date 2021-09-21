import React from "react";

// next jah devolve um html direto, em vez de criar um html, depois usar o jascript no borwser pra manipular ele
// entao quando os indexadores forem egar o nosso site as info jah vao ta tudo lah, pq se eh feito no browser ele nao vai
// conseguir pegar nada, soh vai pegar o hmtl em branco, pq o indexador n entende javascript.

// pra ter acesso a parte de rotasdo next
import Link from 'next/link'

// soh na primeiro carregamento vai executar lado do servidor ( a nao ser que o javascript fique desabilitado no browser)
// ai ele roda tudo no servidor msm

const Home = ({ repositories }) => (
  <div>
    <Link href="/blog">
      <a>Blog</a>
    </Link>
    { repositories.map(repo => (
      <h1 key={repo.id}>{repo.name}</h1>
    ))}
  </div>
);

// eh "tipo" um useEffect, soh que passe as coisas pras props do Home 
Home.getInitialProps = async () => {
  const response = await fetch("https://api.github.com/orgs/rocketseat/repos");
  const repositories = await response.json();

  return { repositories };
};

export default Home;