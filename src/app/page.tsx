"use client";
import Image from "next/image";
import styles from "./page.module.css";
import Html5QrcodePlugin from "@/plugins/Html5QrcodePlugin";
import { useState } from "react";

export default function Home() {
	const [data, setData] = useState<string>("");
	const onNewScanResult = (decodedText: string, decodedResult: object) => {
		setData(decodedText);
	};
	return (
		<main className={styles.main}>
			<div className={styles.description}>
				<div className="App">
					<Html5QrcodePlugin rememberLastUsedCamera={true} fps={30} disableFlip={true} aspectRatio={1.7} qrCodeSuccessCallback={onNewScanResult} />
				</div>
				<h1>{data}</h1>
			</div>
		</main>
	);
}
