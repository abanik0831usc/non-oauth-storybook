import React from "react";
import { useHistory } from "react-router-dom";

export default function Search({theme, isAggregatorScreenFirstInWidgets}) {
	const history = useHistory()
	const handleClick = () => {
		history.push('/iframe')
	}

	return (
		<div className="iframeWrapper" style={{ width: '860px', border: 'solid 1px #dcdcdc', height: '352px', borderRadius: '2px', padding: '0' }}>
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', flexDirection: 'column', gap: '20px' }}>
				<h1>Search for your bank</h1>
				<div className="image" onClick={handleClick}/>
			</div>
		</div>
	)
}