import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import './header.css';
import { addIframeEventListener, removeIframeEventListener } from "../utils/iframeListeners";
import {useHistory} from "react-router-dom";

export const IframeWithBtns = ({ theme, isAggregatorScreenFirstInWidgets, iframeUrl, showIframeBorder = false }) => {
	const iframeRef = useRef(null)
	const divRef = useRef(null)
	const [, setIFrameData] = useState({ enablePrimaryButton: false })
	const [, setIframeScreenStackSize] = useState(0)
	const [height, setHeight] = useState('0px')
	const [width, setWidth] = useState('0px')

	const history = useHistory()
	useEffect(() => {
		addIframeEventListener(
			setIFrameData,
			setIframeScreenStackSize,
			setHeight,
			setWidth,
			history,
			// setCurrentScreen,
		)

		return () => removeIframeEventListener()
	}, [])

	const postIframeMessageToAggregator = idxMessage => {
		if (typeof message !== 'string') {
			idxMessage = JSON.stringify(idxMessage)
		}

		iframeRef.current.contentWindow.postMessage({ idxMessage }, '*')
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

	const [hideSpinner, shouldHideSpinner] = useState(false)

	const handleIframeOnLoad = () => {
		iframeRef.current.style.height = height
		shouldHideSpinner(true)
	}

	useEffect(() => {
		iframeRef.current.style.height = height
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

	const Spinner = () => {
		return (<>loading...</>)
	}

	return (
		<div className="iframeWrapper" ref={divRef} style={{ width: '860px', border: 'solid 1px #dcdcdc', borderRadius: '2px', padding: '0' }}>
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
						style={{ width: '100%' }}
						title={"my awesome iframe"}
						onLoad={handleIframeOnLoad}
						ref={iframeRef}
						src={`${iframeUrl}?theme=${theme}&isAggregatorScreenFirstInWidgets=${isAggregatorScreenFirstInWidgets}&url=${window.location.href}`}
						frameBorder={showIframeBorder ? '1' : '0'}
						scrolling="no"
					/>
				</div>
			</div>
		</div>
	)
}

IframeWithBtns.propTypes = {
	/**
	 * theme what is
	 */
	theme: PropTypes.oneOf(['sbg2', 'mint', 'ck', 'intuit', 'ctg']),
	isAggregatorScreenFirstInWidgets: PropTypes.bool,
	/**
	 * What background color to use
	 */
	primary: PropTypes.bool,
};

IframeWithBtns.defaultProps = {
	//theme: 'sbg2',
};

IframeWithBtns.defaultProps = {
	theme: 'sbg2',
	isAggregatorScreenFirstInWidgets: false,
	primary: false,
}
