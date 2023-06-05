import styled from "styled-components";

export const StyledHeader = styled.header`
    top: 0px;
    width: 100%;
    height: 80px;
    z-index: 1000;
    backdrop-filter: blur(3px);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff40;
    box-shadow: #05050533 0px 0px 20px 0px;
    .title {
        margin: 0px 15px;
    }
    .logo {
        position: absolute;
        left: calc(50% - 22px);
    }
`;
