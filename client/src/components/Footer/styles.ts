import styled from "styled-components";

export const StyledFooter = styled.footer`
    position: relative;
    width: 100%;
    height: 40px;
    background-color: #f7f7f7;
    color: rgb(82, 81, 81);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 0px;
    .copyrights {
        font-size: 0.75rem;
        font-weight: 500;
        color: #b0b0b3;
        letter-spacing: 0.325rem;
        text-transform: uppercase;
    }
    p {
        margin: 7px;
    }
    a {
        color: inherit;
        text-decoration: none;
        transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
    }
    a:hover {
        color: #8d8d8d;
    }
`;
