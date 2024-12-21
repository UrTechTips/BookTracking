"use client";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Html5QrcodeScannerConfig } from "html5-qrcode/esm/html5-qrcode-scanner";
import { useEffect } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

interface PropsType {
	fps: number;
	qrbox?: { width: number; height: number };
	aspectRatio?: any;
	disableFlip?: boolean;
	verbose?: boolean;
	qrCodeSuccessCallback: any;
	qrCodeErrorCallback?: any;
	rememberLastUsedCamera?: boolean;
}

let qrboxFunction = function (viewfinderWidth: number, viewfinderHeight: number) {
	let minEdgePercentage = 0.7;
	let height = Math.floor(viewfinderHeight * minEdgePercentage);
	let width = Math.floor(viewfinderWidth * minEdgePercentage);
	return {
		width: width,
		height: height,
	};
};
// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (props: PropsType) => {
	let config: Html5QrcodeScannerConfig = { fps: 60 };
	config.qrbox = qrboxFunction;
	config.useBarCodeDetectorIfSupported = true;
	config.defaultZoomValueIfSupported = 2;
	config.showZoomSliderIfSupported = true;
	if (props.fps) {
		config.fps = props.fps;
	}
	if (props.rememberLastUsedCamera) {
		config.rememberLastUsedCamera = props.rememberLastUsedCamera;
	}
	if (props.qrbox) {
		config.qrbox = props.qrbox;
	}
	if (props.aspectRatio) {
		config.aspectRatio = props.aspectRatio;
	}
	if (props.disableFlip !== undefined) {
		config.disableFlip = props.disableFlip;
	}
	console.log(config);
	return config;
};

const Html5QrcodePlugin = (props: PropsType) => {
	useEffect(() => {
		// when component mounts
		const config = createConfig(props);
		const verbose = props.verbose === true;
		// Suceess callback is required.
		if (!props.qrCodeSuccessCallback) {
			throw "qrCodeSuccessCallback is required callback.";
		}
		const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
		html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);

		// cleanup function when component will unmount
		return () => {
			html5QrcodeScanner.clear().catch((error) => {
				console.error("Failed to clear html5QrcodeScanner. ", error);
			});
		};
	}, []);

	return <div id={qrcodeRegionId} />;
};

export default Html5QrcodePlugin;
