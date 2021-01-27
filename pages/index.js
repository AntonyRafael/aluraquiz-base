import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';

// const BackgroundImage = styled.div`
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin:auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');
  // console.log(name, setName);

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>League of Legends</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={(event) => {
              event.preventDefault();
              router.push(`/quiz?name=${name}`);
              console.log('Fiz minha submissão');
            }}
            >
              <input
                onChange={(event) => {
                  // name = event.target.value;
                  setName(event.target.value);
                  // State, propiedade que e modificada do meu
                  // componente para saber se sera renderizado novamente
                }}
                placeholder="Digite seu nome:"
              />
              <button type="submit" disabled={name.length === 0}>
                <span>Jogar </span>
                {name}
              </button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h1>Quizes da Galera</h1>
            <p>Lorem ipsum dor</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/AntonyRafael" />
    </QuizBackground>
  );
}
