import { CSSProperties } from "react";

const styles: CSSProperties = {
	position: "absolute",
	top: "50%",
	textAlign: "center",
	width: "100%",
	fontSize: "20px",
	fontWeight: "500"
};

export function NotFound() {
	return <div style={styles}>🦖 404: Page Not found</div>;
}
