const handlePostMessage = (
	e,
	setState,
	setIframeScreenStackSize,
	setHeight,
	setWidth
) => {
	//console.log(e.data.idxMessage)
	if (e.data.idxMessage) {
		const data = JSON.parse(e.data.idxMessage)

		console.log(`payload from iframe for screen ${data.screen.toUpperCase()}`, data)
		setState(data)
		data.screen === 'connecting' && setIframeScreenStackSize(1)
		data.screen === 'error' && setIframeScreenStackSize(0)

		data.height && setHeight(data.height)
		data.width && setWidth(data.width)
	}
}

export function addIframeEventListener(
	setState,
	setIframeScreenStackSize,
	setHeight,
	setWidth
) {
	const eventMethod = window.addEventListener
		? 'addEventListener'
		: 'attachEvent'
	const event = window[eventMethod]

	// if addEventListener doesn't exist fallback to `attachEvent`
	// attachEvent prefix starts with `on`
	const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message'


	// Listen to message from intuit-fdp-auth-redirect-client
	event(
		messageEvent,
		e =>
			handlePostMessage(
				e,
				setState,
				setIframeScreenStackSize,
				setHeight,
				setWidth
			),
		false
	)
}

export function removeIframeEventListener() {
	const eventMethod = window.removeEventListener
		? 'removeEventListener'
		: 'detachEvent'
	const event = window[eventMethod]

	const messageEvent = eventMethod === 'detachEvent' ? 'onmessage' : 'message'

	event(messageEvent, handlePostMessage, false)
}
