import * as React from "react";
import Helmet from "react-helmet";

import { Footer } from "../Footer";
import { Header } from "../Header";
import { MainContent, Page, PageTitle } from "./styles";

interface Props {
	children: React.ReactNode;
	title: string;
}

export const Layout = ({ children, title }: Props) => {
	return (
		<Page>
			<Helmet>
				<title>{title} | Simple CRM</title>
			</Helmet>
			<Header />
			<MainContent>
				<PageTitle>{title}</PageTitle>
				{children}
			</MainContent>
			<Footer />
		</Page>
	);
};
