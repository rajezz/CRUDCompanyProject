import * as React from "react";

import { StyledFooter } from "./styles";

export function Footer() {
    return (
        <StyledFooter>
            <div className="copyrights">
                Designed & developed by <a href="mailto:rajezzandrj@gmail.com">Rajeswaran</a>
            </div>
        </StyledFooter>
    );
}