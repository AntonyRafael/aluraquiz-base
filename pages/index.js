import styled from 'styled-components'
import db from '../db.json'
import Widget from '../src/components/Widget'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizBackground from '../src/components/QuizBackground'
import Head from 'next/head'
import QuizLogo from '../src/components/QuizLogo'

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
  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Quiz - League of Legends</title>
        <meta property="og:title" content="Quiz - League of Legends" key="title"></meta>
        <meta property="og:image" content="https://static.wikia.nocookie.net/leagueoflegends/images/a/a2/Vayne_PROJECTSkin.jpg/revision/latest/scale-to-width-down/1000?cb=20181021031451"/>
        <meta property="og:image:type" content="image/jpeg"/>
        <meta property="og:image:width" content="800"/>
        <meta property="og:image:height" content="600"/>
        
      </Head>
      <QuizContainer>
      <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>League of Legends</h1>
          </Widget.Header>
          <Widget.Content>
            <p>Teste seus conhecimentos em League of Legends</p>
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
      <GitHubCorner  projectUrl="https://github.com/AntonyRafael"/>
    </QuizBackground>
  );
}
