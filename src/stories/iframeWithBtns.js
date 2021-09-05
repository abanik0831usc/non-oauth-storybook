import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import { Button } from './Button';
import './header.css';
import { addIframeEventListener, removeIframeEventListener } from "../utils/iframeListeners";

export const Iframe = ({ theme, isAuthScreenFirstInStack }) => {
	const iframeRef = useRef(null)
	const divRef = useRef(null)
	const [iframeData, setIFrameData] = useState({ enablePrimaryButton: false })
	const [iframeScreenStackSize, setIframeScreenStackSize] = useState(0)
	const [height, setHeight] = useState('0px')
	const [width, setWidth] = useState('0px')

	useEffect(() => {
		addIframeEventListener(
			setIFrameData,
			setIframeScreenStackSize,
			setHeight,
			setWidth,
			setCurrentScreen,
		)

		return () => removeIframeEventListener()
	}, [])

	const postIframeMessageToAggregator = idxMessage => {
		if (typeof message !== 'string') {
			idxMessage = JSON.stringify(idxMessage)
		}

		iframeRef.current.contentWindow.postMessage({ idxMessage }, '*')

		// setIFrameData({ enablePrimaryButton: false })
	}

	useEffect(() => {
		const idxMessage = {
			theme,
			isAuthScreenFirstInStack,
		}

		console.log('data from Intuit to aggregator on theme change: ', idxMessage)

		postIframeMessageToAggregator(idxMessage)
	}, [theme])

	useEffect(() => {
		const idxMessage = {
			theme,
			isAuthScreenFirstInStack,
		}

		console.log('data from Intuit to aggregator on isAuthScreenFirstInStack prop change: ', idxMessage)

		postIframeMessageToAggregator(idxMessage)
	}, [isAuthScreenFirstInStack])

	const handleIframeOnLoad = () => {
		//hideSpinner()
		iframeRef.current.style.height = height
		iframeRef.current.style.width = width
		// divRef.current.style.height = parseInt(String(height), 10) + parseInt('175px', 10) + 'px'
		// divRef.current.style.height = parseInt(String(height), 10) - parseInt('1240px', 10) + 'px'
	}

	useEffect(() => {
		iframeRef.current.style.height = height
		iframeRef.current.style.width = width

		// divRef.current.style.height = '356px'
	}, [height, width])

	const color = (type) => {
		switch (type) {
			case 'sbg2':
				return {
					background: 'rgb(44, 160, 28)',
					color: 'white',
				}
			case 'mint':
				return {
					background: '#32d9f2',
					color: 'white',
				}
			case 'ctg':
				return {
					background: '#037c8f',
					color: 'white',
				}
			case 'intuit':
				return {
					background: 'linear-gradient(to bottom, #3e6cc9 0%, #2e50b6 100%)',
					color: 'white',
				}
			case 'ck':
				return {
					background: '#008600',
					color: 'white',
				}
			default:
				return {
					background: 'teal',
					color: 'white',
				}
		}
	}

	const { background, color: fontColor } = color(theme)

	return (
		<div className="iframeWrapper" ref={divRef} style={{ width: '860px', border: 'solid 1px #dcdcdc', borderRadius: '2px', padding: '0' }}>
			<div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', padding: '30px 30px 0' }}>
				<div className="image" />
				<h1>Login to Intuit Bank</h1>
			</div>

			<div>
				<iframe
					title={"my awesome iframe"}
					onLoad={handleIframeOnLoad}
					ref={iframeRef}
					src={`http://https://non-oauth-sage.vercel.app/?theme=${theme}&isAuthScreenFirstInStack=${isAuthScreenFirstInStack}`}
					frameBorder="0"
					scrolling="no"
				/>
			</div>
		</div>
	)
}


Iframe.propTypes = {
	theme: PropTypes.oneOf(['sbg2', 'mint', 'ck', 'intuit', 'ctg']),
	isAuthScreenFirstInStack: PropTypes.bool,
	// user: PropTypes.shape({}),
	// onLogin: PropTypes.func.isRequired,
	// onLogout: PropTypes.func.isRequired,
	// onCreateAccount: PropTypes.func.isRequired,
};

Iframe.defaultProps = {
	//theme: 'sbg2',
};
