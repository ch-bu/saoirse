import styled from 'styled-components'

const ButtonComponent = styled.button`
  background-color: ${props => props.theme.primaryColor};
  /* background-color: #195ca3; */
  min-height: 2rem;
  padding: 10px 15px;
  border: none;
  text-transform: uppercase;
  border-radius: .25rem;
  font-size: 0.9rem;
  outline: none;
  letter-spacing: 1.3px;
  /* color: ${props => props.theme.darkColorLight}; */
  color: #fff;
  box-shadow: 5px 5px 25px 0 rgba(46,61,73,.4);
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 4px 0 rgba(17,22,26,.16), 0 2px 4px 0 rgba(17,22,26,.08), 0 4px 8px 0 rgba(17,22,26,.08);
  }
`;

export default ButtonComponent;
