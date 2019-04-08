import styled from 'styled-components'

const Aside = styled.div`
  position: fixed;
  z-index: 1;
  bottom: ${props => props.showAside ? "-100vh" : "0vh"};
  height: 100vh;
  width: ${props => props.showAside ? "100vw" : "100vw"};
  overflow-y: scroll;
  box-sizing: border-box;
  background-color: ${props => props.theme.navigationColor};
  padding-top: 20px;
  transition: bottom 0.2s;
  padding: 0px 0 80px 0;
  overflow-x: hidden;
  border-right: 1px solid ${props => props.theme.colorAsideBorderRight};

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
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
  padding: 2rem 1rem;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    padding: 0;
  }

  label {
    background-color: ${props => props.theme.dropdownTitle};
    cursor: pointer;
    width: 100%;
    padding: 20px;
    display: block;
    font-size: 0.9rem;
    color: ${props => props.theme.dropdownTitleTextColor};
    border-bottom: 1px solid ${props => props.theme.navigationColor};
    text-transform: uppercase;

    &:hover {
     background-color: #57636d; 
    }
  }

  .menu-toggle {
    display: none;
  }

  // https://codepen.io/Sfate/pen/nLBGr
  .menu {
    background-color: ${props => props.theme.navigationColor};
    width: 100%;
    overflow: hidden;
    max-height: 0;
    margin: 0 auto;
    -webkit-transition: all 0.3s ease;
    padding: 20px;
    display: none;

    li {
      margin-bottom: 0;
      display: flex;
      flex-direction: row;

      a {
        color: ${props => props.theme.colorTextAside};
        font-size: 1rem;
        text-decoration: none;
        background-image: none;
        text-shadow: none;
        outline: none;

        &:hover {
          color: ${props => props.theme.colorTextAsideHover};
        }

        &.active {
          font-weight: bold;
          color: #fff;
        }
      }

      img {
        height: 20px;
        padding-right: 10px;
        margin: 0;
      }
    }
  }

  .menu-toggle:checked + .menu {
    max-height: 600px;
    display: block;
  }
}`;


export {
  Aside,
  UlAside,
}