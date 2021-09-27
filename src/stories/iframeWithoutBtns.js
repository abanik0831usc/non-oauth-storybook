import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import { Button } from './Button';
import './header.css';
import { addIframeEventListener, removeIframeEventListener } from "../utils/iframeListeners";
import {useHistory} from "react-router-dom";

export const IframeWithIntuitButtons = ({ theme, isAggregatorScreenFirstInWidgets, iframeUrl, showIframeBorder = false }) => {
	const iframeRef = useRef(null)
	const divRef = useRef(null)
	const [iframeData, setIFrameData] = useState({ enablePrimaryButton: false })
	const [iframeScreenStackSize, setIframeScreenStackSize] = useState(0)
	const [height, setHeight] = useState('0px')
	const [width, setWidth] = useState('0px')
	const [currentScreen, setCurrentScreen] = useState('')
	const [hideSpinner, shouldHideSpinner] = useState(false)
	const spinnerRef = useRef(null)

	useEffect(() => {
		addIframeEventListener(
			setIFrameData,
			setIframeScreenStackSize,
			setHeight,
			setWidth,
			setCurrentScreen,
			true,
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
			isAggregatorScreenFirstInWidgets,
		}

		console.log('data from Intuit to aggregator on theme change: ', idxMessage)

		postIframeMessageToAggregator(idxMessage)
	}, [theme])

	useEffect(() => {
		const idxMessage = {
			theme,
			isAggregatorScreenFirstInWidgets,
		}

		console.log('data from Intuit to aggregator on isAggregatorScreenFirstInWidgets prop change: ', idxMessage)

		postIframeMessageToAggregator(idxMessage)
	}, [isAggregatorScreenFirstInWidgets])

	const Spinner = () => {
		return (<>loading...</>)
	}

	const handleIframeOnLoad = () => {
		iframeRef.current.style.height = height
		shouldHideSpinner(true)

	}

	useEffect(() => {
		iframeRef.current.style.height = height
	}, [height])

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

		if (iframeData.currentScreen !== 'error' || (iframeData.currentScreen === 'error' && iframeData.errorRemediable)) {
			setIframeScreenStackSize(iframeScreenStackSize + 1)
		} else {
			// set some action or disable primary button
		}

		console.log('data from Intuit to aggregator on primary(continue) button click: ', idxMessage)
		postIframeMessageToAggregator(idxMessage)
	}

	const history = useHistory()
	const handleBackClick = () => {
		const idxMessage = {
			screenName: '',
			navigate: 'back',
		}
		if (iframeScreenStackSize === 0) {
			history.goBack()
		} else {
			setIframeScreenStackSize(iframeScreenStackSize - 1)
		}

		console.log('data from Intuit to aggregator on secondary (back) button click: ', idxMessage)
		postIframeMessageToAggregator(idxMessage)
	}

	return (
		<div className="iframeWrapper" ref={divRef} style={{ width: '860px', minHeight: '546px', border: 'solid 1px #dcdcdc', borderRadius: '2px', padding: '0' }}>
			<div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', padding: '30px 30px 0' }}>
				<div className="image" />
				<h1>Login to Intuit Bank</h1>
			</div>

			<div style={{ position: 'relative', minHeight: '332px' }}>
				{!hideSpinner && <div style={{ height: '150px', position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%,-50%)',
					zIndex: '-1000',
				}}>
					<Spinner />
				</div>}
				<div style={{ padding: '30px 30px 30px'}}>
					<iframe
						style={{ zIndex: 100, background: 'white', width: '100%' }}
						title={"my awesome iframe"}
						onLoad={handleIframeOnLoad}
						ref={iframeRef}
						src={`${iframeUrl}?theme=${theme}&isAggregatorScreenFirstInWidgets=${isAggregatorScreenFirstInWidgets}&shouldDisplayIntuitFooter=true`}
						frameBorder={showIframeBorder ? '1' : '0'}
						scrolling="no"
					/>
				</div>
			</div>

			{!(iframeData.isConnectingScreen || iframeData.code) && <Footer iframeScreenStackSize={iframeScreenStackSize} isAggregatorScreenFirstInWidgets={isAggregatorScreenFirstInWidgets} background={background} fontColor={fontColor} handleBackClick={handleBackClick} handleContinueClick={handleContinueClick} iframeData={iframeData} />}
		</div>
	)
}

function Footer({background, fontColor, handleBackClick, handleContinueClick, iframeData, iframeScreenStackSize, isAggregatorScreenFirstInWidgets}) {
	return (
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
				{(iframeScreenStackSize !== 0 || !isAggregatorScreenFirstInWidgets) && <Button label={'Back'} backgroundColor={background} color={fontColor} onClick={handleBackClick} />}
				<Button label={iframeData.primaryButtonLabel || 'Continue'} backgroundColor={background} color={fontColor} primary={true} onClick={handleContinueClick} disabled={!iframeData.enablePrimaryButton}/>
			</div>
		</div>
	)
}

IframeWithIntuitButtons.propTypes = {
	/**
	 * what is theme
	 */
	theme: PropTypes.oneOf(['sbg2', 'mint', 'ck', 'intuit', 'ctg']),
	/**
	 * what is isAggregatorScreenFirstInWidgets
	 */
	isAggregatorScreenFirstInWidgets: PropTypes.bool,
	/**
	 * primary!!
	 */
	primary: PropTypes.bool,
};

IframeWithIntuitButtons.defaultProps = {
	theme: 'sbg2',
	primary: true,
	isAggregatorScreenFirstInWidgets: false,
};
