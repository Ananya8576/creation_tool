import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore/lite";
import { Button, Col, Row } from "react-bootstrap";
import EditArticleComponent from "../components/articles/EditArticleComponent";
import ImportArticleComponent from "../components/articles/ImportArticleComponent";

export default function HomeMonitoringScreen({ database, userName }) {
	const [monitoring, setMonitoring] = useState();
	const [selectedMonitoring, setSelectedMonitoring] = useState();
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		getMonitoring(database, userName, setMonitoring);
	}, []);

	const homeMonitoringList = [];

	if (monitoring === undefined) return <></>;
	for (let i = 0; i < monitoring.length; i++) {
		const article = monitoring[i];
		homeMonitoringList.push(
			<div
				className="toggle"
				style={{
					width: "100%",
					paddingLeft: 30,
					paddingRight: 30,
				}}
				onClick={() => {
					setSelectedMonitoring(article);
				}}
				key={i}
			>
				<p>{article.name}</p>
			</div>
		);
	}

	return (
		<div>
			<Row style={{ width: "100%" }}>
				<Col xs={3} style={{ padding: 30 }}>
					{homeMonitoringList}
					<Button
						variant="secondary"
						style={{ width: "100%" }}
						onClick={() => {
							setOpenModal(true);
						}}
					>
						Add
					</Button>
				</Col>
				<Col xs={9} style={{ padding: 30 }}>
					<EditArticleComponent
						articles={monitoring}
						setArticles={setMonitoring}
						article={selectedMonitoring}
						database={database}
						userName={userName}
						type="monitoring"
					/>
				</Col>
			</Row>
			<ImportArticleComponent
				type="monitoring"
				open={openModal}
				setOpen={setOpenModal}
				database={database}
				articles={monitoring}
				setArticles={setMonitoring}
			/>
		</div>
	);
}

async function getMonitoring(database, userName, setMonitoring) {
	const ref = doc(database, "users", userName);
	const result = await getDoc(ref);
	const data = result.data();
	setMonitoring(data.monitoring);
}
