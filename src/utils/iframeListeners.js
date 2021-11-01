const handlePostMessage = (
	e,
	setState,
	setIframeScreenStackSize,
	setHeight,
	setWidth,
	history,
	shouldDisplayIntuitFooter,
) => {

	//console.log(e.data.idxMessage)
	if (e.data.idxMessage) {
		let data
		if (typeof e.data.idxMessage === 'string') {
			data = JSON.parse(e.data.idxMessage)
		} else {
			data = e.data.idxMessage
		}

		setState(data)

		data.height && setHeight(data.height)
		data.width && setWidth(data.width)

		console.log(`getting data from iframe aggregator screen name ${data.currentScreen}: `, data)

		if (shouldDisplayIntuitFooter) {
			data.currentScreen === 'connecting' && setIframeScreenStackSize(1)
			data.currentScreen === 'error' && setIframeScreenStackSize(0)
		} else {
			const navigateToWidgetsInitialScreen = (data.currentScreen === 'authentication' && data.navigate === 'back') || (data.currentScreen === 'error' && data.navigate === 'back')
			if (navigateToWidgetsInitialScreen) {
				setIframeScreenStackSize(data.iframeScreenStackSize)
				debugger
				history.goBack()
			}
		}
	}
}

export function addIframeEventListener(
	setState,
	setIframeScreenStackSize,
	setHeight,
	setWidth,
	history,
	shouldDisplayIntuitFooter = false,
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
				setWidth,
				history,
				shouldDisplayIntuitFooter,
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
