import styled from 'styled-components';

const ResultLi = styled.li`
  @import url('https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap');
  padding: 5px;
  font-family: 'Yusei Magic', sans-serif;
  font-weight: bold;
  list-style: none;
  background-color: ${({ theme }) => `${theme.colors.primary}90`};
`;

export default ResultLi;
