import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import { Button } from './Button';
import './header.css';
import { addIframeEventListener, removeIframeEventListener } from "../utils/iframeListeners";

export const Iframe = ({ theme }) => {
	const iframeRef = useRef(null)
	const divRef = useRef(null)
	const [iframeData, setIFrameData] = useState({ enablePrimaryButton: false })
	const [iframeScreenStackSize, setIframeScreenStackSize] = useState(0)
	const [height, setHeight] = useState(0)
	const [width, setWidth] = useState(0)

	useEffect(() => {
		addIframeEventListener(
			setIFrameData,
			setIframeScreenStackSize,
			setHeight,
			setWidth
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
		}

		console.log('data from Intuit to aggregator on theme change: ', idxMessage)

		postIframeMessageToAggregator(idxMessage)
	}, [theme])

	const handleIframeOnLoad = () => {
		const idxMessage = {
			theme,
		}

		//hideSpinner()
		iframeRef.current.style.height = height
		iframeRef.current.style.width = width
		divRef.current.style.height = parseInt(String(height), 10) + parseInt('175px', 10) + 'px'

		console.log('initial props passed from widgets to aggregator: ', idxMessage)
		postIframeMessageToAggregator(idxMessage)
	}

	useEffect(() => {
		iframeRef.current.style.height = height
		iframeRef.current.style.width = width
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


	const handleContinueClick = () => {
		const idxMessage = {
			screenName: '',
			navigate: 'forward',
		}

		setIframeScreenStackSize(iframeScreenStackSize + 1)

		console.log('data from Intuit to aggregator on primary(continue) button click: ', idxMessage)
		postIframeMessageToAggregator(idxMessage)
	}

	const handleBackClick = () => {
		const idxMessage = {
			screenName: '',
			navigate: 'back',
		}
		setIframeScreenStackSize(iframeScreenStackSize - 1)

		console.log('data from Intuit to aggregator on secondary (back) button click: ', idxMessage)
		postIframeMessageToAggregator(idxMessage)
	}

	//console.log(iframeData)
	return (
		<div className="iframeWrapper" ref={divRef} style={{ width: '860px', minHeight: '352px', border: 'solid 1px #dcdcdc', borderRadius: '2px', padding: '30px 30px 0' }}>
			<div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
				<div className="image" />
				<h1>Login to Citi Bank</h1>
			</div>

			<div>
					<iframe
						title={"my awesome iframe"}
						onLoad={handleIframeOnLoad}
						ref={iframeRef}
						src="https://non-oauth-nonoauth.vercel.app/"
						frameBorder="0"
						scrolling="no"
					/>


				<div style={{
					flex: '1 1 auto',
					marginTop: 0,
					borderTop: '1px #dcdcdc solid',
					paddingTop: '20px',
					marginBottom: '30px',
					width: '94%',
					/* border: 3px solid #8AC007; */
					position: 'absolute',
					top: '84%',
					left: '50%',
					transform: 'translate(-50%, -50%)'
				}}>
					<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<Button label={'Back'} backgroundColor={background} color={fontColor} onClick={handleBackClick} />
						<Button label={'Connect'} backgroundColor={background} color={fontColor} primary={true} onClick={handleContinueClick} disabled={!iframeData.enablePrimaryButton}/>
					</div>
				</div>
			</div>
		</div>
	)
}

Iframe.propTypes = {
	theme: PropTypes.oneOf(['sbg2', 'mint', 'ck', 'intuit', 'ctg']),
	// user: PropTypes.shape({}),
	// onLogin: PropTypes.func.isRequired,
	// onLogout: PropTypes.func.isRequired,
	// onCreateAccount: PropTypes.func.isRequired,

};

Iframe.defaultProps = {
	//theme: 'sbg2',
};
