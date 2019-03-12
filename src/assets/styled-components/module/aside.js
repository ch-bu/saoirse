import styled from 'styled-components'

const Aside = styled.div`
  position: fixed;
  z-index: 1;
  bottom: ${props => props.showAside ? "-100vh" : "0vh"};
  height: 100vh;
  width: ${props => props.showAside ? "100vw" : "100vw"};
  overflow-y: scroll;
  box-sizing: border-box;
  /* background-color: ${props => props.theme.greyColor}; */
  background-color: ${props => props.theme.darkColorLight};
  padding-top: 20px;
  transition: bottom 0.2s;
  padding: 0px 0 80px 0;
  overflow-x: hidden;
  border-right: ${props => props.theme.darkColor};
  /* border-right: 1px solid #ececec; */
  box-shadow: 5px 10px 25px 0 rgba(46,61,73,.2);

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    padding: 30px 0 20px 0;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 50px;
    height: calc(100vh - 50px);
    transition: width 0.2s;
    width: ${props => props.showAsideLeft ? "20vw" : "0vw"};
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const UlAside = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 1rem 1rem;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    padding: 1rem 1.8rem;
  }

  li {
    a {
      color: rgb(183, 183, 183);
      /* color: #6d6d6d; */
      /* color: #fff; */
      font-size: 1.1rem;
    }

    ul {
      margin: 0;
      margin-bottom: 20px;
      padding-left: 0.4rem;

      li {
        padding-bottom: 0.1rem;
        margin-bottom: 0;
        display: flex;
        flex-direction: row;
        
        &:first-child {
          padding-top: 0.2rem;
        }

        a {
          color: rgb(183, 183, 183);
          /* color: #fff; */
          font-size: 1.1rem;
          text-decoration: none;
          background-image: none;
          text-shadow: none;
          outline: none;

          &:hover {
            color: #7f7f7f;
          }

          li > &:hover {
            border-right: 4px solid red;
          }

          &.active {
            font-weight: bold;
            color: #fff;
          }
        }

        svg {
          color: ${props => props.theme.primaryColor};
          /* color: #000; */
          /* filter: brightness(65%); */
          padding-right: 6px;
          filter: sepia(0.2);
          height: 18px;
          z-index: 1;
        }
      }
    }
  }
`;


export {
  Aside,
  UlAside,
}