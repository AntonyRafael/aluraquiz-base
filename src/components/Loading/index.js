import styled from 'styled-components';

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  border: 16px solid rgb(177, 165, 255,.5);
  border-radius: 50%;
  border-top: 16px solid ${({ theme }) => theme.colors.primary};
  width: 120px;
  height: 120px;
  animation: spin 1s linear infinite;

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

export default Loading;
