import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

function Logo({ className }) {
  return (
    <a href="/"><img className={className} viewBox="0 0 135 67" fill="none" src="https://upload.wikimedia.org/wikipedia/pt/thumb/7/77/League_of_Legends_logo.png/337px-League_of_Legends_logo.png" alt="Logo League of Legends" /></a>
  );
}

Logo.propTypes = {
  className: PropTypes.string.isRequired,
};

const QuizLogo = styled(Logo)`
  margin: auto;
  max-width: 250px;
  display: block;
  @media screen and (max-width: 500px) {
    margin: 0 auto;
  }
`;

export default QuizLogo;
