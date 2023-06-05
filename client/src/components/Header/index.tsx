import react from "react";

import { StyledHeader } from "./styles";

export function Header() {
    return (
        <StyledHeader className="header">
            <div className="title">
                <a href="/" className="title-link">
                    Simple CRM
                </a>
            </div>
            <div className="logo">
                <img src="assets/svg/logo.svg" height="40px" width="auto" alt="Logo" />
            </div>
        </StyledHeader>
    );
}
