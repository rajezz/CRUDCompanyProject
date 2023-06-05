import styled from "styled-components";

export const Page = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: 100vh;
	width: 100vw;
`;

export const MainContent = styled.div`
	min-height: calc(100vh - 120px);
	width: 100%;
`;

export const PageTitle = styled.div`
	font-size: 24px;
	font-weight: 500;
	width: 100%;
	margin: 20px 0px;
	text-align: center;
`;
