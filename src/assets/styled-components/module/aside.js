import styled from 'styled-components'

const Aside = styled.div`
  position: fixed;
  z-index: 1;
  bottom: ${props => props.showAside ? "-100vh" : "0vh"};
  height: 100vh;
  width: ${props => props.showAside ? "100vw" : "100vw"};
  overflow-y: scroll;
  box-sizing: border-box;
  background-color: ${props => props.theme.asideBackgroundColor};
  /* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.29' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E"); */
  padding-top: 20px;
  transition: bottom 0.2s;
  padding: 0px 0 80px 0;
  overflow-x: hidden;
  border-right: 1px solid ${props => props.theme.asideBorderRightColor};

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 50px;
    height: calc(100vh - 50px);
    transition: width 0.2s;
    width: ${props => props.showAsideLeft ? "17vw" : "0vw"};
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const UlAside = styled.ul`
  list-style-type: none;
  margin: 0;
  position: absolute;
  padding: 0;
  height: 100%;
  width: 100%;

  @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    padding: 0;
  }


  /* #problem > label {
    background-color: ${props => props.theme.primaryColor};
    filter: saturate(.3);

    &.unit-active {
      border-left: 5px solid ${props => props.theme.primaryColorLight};
    }

    &:hover {
      background-color: ${props => props.theme.primaryColor};
      filter: saturate(1);
    }
  }

  #problem {
    @media only screen and (min-width: ${props => props.theme.breakpointOne}) {
    }
  } */

  label {
    background-color: ${props => props.theme.asideBorderRightColor};
    cursor: pointer;
    width: 100%;
    padding: 20px;
    display: block;
    font-size: 0.9rem;
    color: ${props => props.theme.asideDropdownTitleTextColor};
    border-bottom: 1px solid ${props => props.theme.asideBackgroundColor};
    text-transform: uppercase;
    transition: border 0.2s;

    &:hover {
     filter: brightness(.97);
    }

    &.unit-active {
      border-left: 10px solid ${props => props.theme.primaryColor};
    }
  }

  .menu-toggle {
    display: none;
  }

  .menu {
    background-color: ${props => props.theme.asideBackgroundColor};
    /* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.29' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E"); */
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
        color: ${props => props.theme.asideSubunitTextColor};
        font-size: 1rem;
        text-decoration: none;
        background-image: none;
        text-shadow: none;
        outline: none;

        &:hover {
          color: ${props => props.theme.asideSubunitTextColorHover};
        }

        &.active {
          font-weight: bold;
          color: ${props => props.theme.asideSubunitTextActive};
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