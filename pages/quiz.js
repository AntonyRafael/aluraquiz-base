/* eslint-disable react/prop-types */
import React from 'react';
import { useRouter } from 'next/router';
import db from '../db.json';

import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import AlternativesForm from '../src/components/AlternativesForm';
import Widget from '../src/components/Widget';
import Loading from '../src/components/Loading';
import ResultQuestion from '../src/components/ResultQuestion';

function QuestionWidget({
  question,
  totalQuestions,
  questionIndex,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question_${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        {/* <BackLinkArrow href="/" /> */}
        <h3>
          {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
        </h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        <AlternativesForm onSubmit={(infoEvent) => {
          infoEvent.preventDefault();
          setIsQuestionSubmited(true);
          setTimeout(() => {
            addResult(isCorrect);
            setIsQuestionSubmited(false);
            setSelectedAlternative(undefined);
            onSubmit();
          }, 1000);
        }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative_${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>Confirmar</Button>
          {/* <p>selectedAlternative: {`${selectedAlternative}`}</p> */}
          {isQuestionSubmited && isCorrect
          && (
            <ResultQuestion>
              <img src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMnB0IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im01MTIgNTguNjY3OTY5YzAtMzIuMzYzMjgxLTI2LjMwNDY4OC01OC42Njc5NjktNTguNjY3OTY5LTU4LjY2Nzk2OWgtMzk0LjY2NDA2MmMtMzIuMzYzMjgxIDAtNTguNjY3OTY5IDI2LjMwNDY4OC01OC42Njc5NjkgNTguNjY3OTY5djM5NC42NjQwNjJjMCAzMi4zNjMyODEgMjYuMzA0Njg4IDU4LjY2Nzk2OSA1OC42Njc5NjkgNTguNjY3OTY5aDM5NC42NjQwNjJjMzIuMzYzMjgxIDAgNTguNjY3OTY5LTI2LjMwNDY4OCA1OC42Njc5NjktNTguNjY3OTY5em0wIDAiIGZpbGw9IiM0Y2FmNTAiLz48cGF0aCBkPSJtMzg1Ljc1IDE3MS41ODU5MzhjOC4zMzk4NDQgOC4zMzk4NDMgOC4zMzk4NDQgMjEuODIwMzEyIDAgMzAuMTY0MDYybC0xMzguNjY3OTY5IDEzOC42NjQwNjJjLTQuMTYwMTU2IDQuMTYwMTU3LTkuNjIxMDkzIDYuMjUzOTA3LTE1LjA4MjAzMSA2LjI1MzkwN3MtMTAuOTIxODc1LTIuMDkzNzUtMTUuMDgyMDMxLTYuMjUzOTA3bC02OS4zMzIwMzEtNjkuMzMyMDMxYy04LjM0Mzc1LTguMzM5ODQzLTguMzQzNzUtMjEuODI0MjE5IDAtMzAuMTY0MDYyIDguMzM5ODQzLTguMzQzNzUgMjEuODIwMzEyLTguMzQzNzUgMzAuMTY0MDYyIDBsNTQuMjUgNTQuMjUgMTIzLjU4NTkzOC0xMjMuNTgyMDMxYzguMzM5ODQzLTguMzQzNzUgMjEuODIwMzEyLTguMzQzNzUgMzAuMTY0MDYyIDB6bTAgMCIgZmlsbD0iI2ZhZmFmYSIvPjwvc3ZnPg==" alt="Resposta Certa" />
            </ResultQuestion>
          )}
          {isQuestionSubmited && !isCorrect && (
          <ResultQuestion>
            <img src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjQ5NnB0IiB2aWV3Qm94PSIwIDAgNDk2IDQ5NiIgd2lkdGg9IjQ5NnB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0yNDggOGMtMTMyLjU0Njg3NSAwLTI0MCAxMDcuNDUzMTI1LTI0MCAyNDBzMTA3LjQ1MzEyNSAyNDAgMjQwIDI0MCAyNDAtMTA3LjQ1MzEyNSAyNDAtMjQwLTEwNy40NTMxMjUtMjQwLTI0MC0yNDB6bTEwNy40ODA0NjkgMzQ3LjQ4MDQ2OS0xMDcuNDgwNDY5LTEwNy40ODA0NjktMTA3LjQ4MDQ2OSAxMDcuNDgwNDY5IDEwNy40ODA0NjktMTA3LjQ4MDQ2OS0xMDcuNDgwNDY5LTEwNy40ODA0NjkgMTA3LjQ4MDQ2OSAxMDcuNDgwNDY5IDEwNy40ODA0NjktMTA3LjQ4MDQ2OS0xMDcuNDgwNDY5IDEwNy40ODA0Njl6bTAgMCIgZmlsbD0iI2ZmNjI0MyIvPjxnIGZpbGw9IiMyMzFmMjAiPjxwYXRoIGQ9Im0yNDggMGMtMTM2Ljk2NDg0NCAwLTI0OCAxMTEuMDM1MTU2LTI0OCAyNDhzMTExLjAzNTE1NiAyNDggMjQ4IDI0OCAyNDgtMTExLjAzNTE1NiAyNDgtMjQ4Yy0uMTYwMTU2LTEzNi45MDIzNDQtMTExLjA5NzY1Ni0yNDcuODM5ODQ0LTI0OC0yNDh6bTAgNDgwYy0xMjguMTI4OTA2IDAtMjMyLTEwMy44NzEwOTQtMjMyLTIzMnMxMDMuODcxMDk0LTIzMiAyMzItMjMyIDIzMiAxMDMuODcxMDk0IDIzMiAyMzJjLS4xNDA2MjUgMTI4LjA3MDMxMi0xMDMuOTI5Njg4IDIzMS44NTkzNzUtMjMyIDIzMnptMCAwIi8+PHBhdGggZD0ibTM2MS4xMzY3MTkgMTM0Ljg2MzI4MWMtMy4xMjUtMy4xMjEwOTMtOC4xODc1LTMuMTIxMDkzLTExLjMxMjUgMGwtMTAxLjgyNDIxOSAxMDEuODI0MjE5LTEwMS44MjQyMTktMTAxLjgyNDIxOWMtMi4wMDc4MTItMi4wNzgxMjUtNC45ODQzNzUtMi45MTQwNjItNy43ODEyNS0yLjE3OTY4Ny0yLjc5Njg3NS43MzA0NjgtNC45ODA0NjkgMi45MTQwNjItNS43MTA5MzcgNS43MTA5MzctLjczNDM3NSAyLjc5Njg3NS4xMDE1NjIgNS43NzM0MzggMi4xNzk2ODcgNy43ODEyNWwxMDEuODI0MjE5IDEwMS44MjQyMTktMTAxLjgyNDIxOSAxMDEuODI0MjE5Yy0yLjA3ODEyNSAyLjAwNzgxMi0yLjkxNDA2MiA0Ljk4NDM3NS0yLjE3OTY4NyA3Ljc4MTI1LjczMDQ2OCAyLjc5Njg3NSAyLjkxNDA2MiA0Ljk4MDQ2OSA1LjcxMDkzNyA1LjcxMDkzNyAyLjc5Njg3NS43MzQzNzUgNS43NzM0MzgtLjEwMTU2MiA3Ljc4MTI1LTIuMTc5Njg3bDEwMS44MjQyMTktMTAxLjgyNDIxOSAxMDEuODI0MjE5IDEwMS44MjQyMTljMy4xNDA2MjUgMy4wMzEyNSA4LjEyODkwNiAyLjk4ODI4MSAxMS4yMTQ4NDMtLjA5NzY1NyAzLjA4NTkzOC0zLjA4NTkzNyAzLjEyODkwNy04LjA3NDIxOC4wOTc2NTctMTEuMjE0ODQzbC0xMDEuODI0MjE5LTEwMS44MjQyMTkgMTAxLjgyNDIxOS0xMDEuODI0MjE5YzMuMTIxMDkzLTMuMTI1IDMuMTIxMDkzLTguMTg3NSAwLTExLjMxMjV6bTAgMCIvPjwvZz48L3N2Zz4=" alt="Resposta Errada" />
          </ResultQuestion>
          ) }

        </AlternativesForm>

      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando
      </Widget.Header>
      <Widget.Content>
        <Loading />
      </Widget.Content>
    </Widget>
  );
}

function ResultWidget({ results }) {
  const router = useRouter();
  return (
    <Widget>
      <Widget.Header>
        Resultado do(a):
        {' '}
        {router.query.name}
      </Widget.Header>
      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {results.reduce((somatoriaAtual, resultAtual) => {
            const isAcerto = resultAtual === true;
            if (isAcerto) {
              return somatoriaAtual + 1;
            }
            return somatoriaAtual;
          }, 0)}
          {/* results.filter((x) => x).length - Mesma funcionalidade do reduce */}
          {' '}
          de
          {' '}
          {db.questions.length}
          !
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result_${result}`}>
              #
              {index + 1}
              {' '}
              Resultado:
              {result === true ? 'Acertou' : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([]);
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    // results.push(result);
    setResults([
      ...results,
      result,
    ]);
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />

        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results} />}
      </QuizContainer>
    </QuizBackground>
  );
}
