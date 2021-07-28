import useFetch from 'services/useFetch';

const sendNotification = (message: string) => {
	const noticationOpts = {
		body: 'Este es el cuerpo de la notificacion',
		// icon: 'images/icon-72x72.png'
	}

	const newNotify = new Notification(message, noticationOpts);

	newNotify.onclick = () => console.log('click en notificacion');
}

export const GetPublicKey = async () => {
	const { fetch } = useFetch({
		config: {
		  url: '/v1/key',
		  method: 'GET',
		},
		loading: false,
	});

	const response = await fetch({ });

	if(!response.success) {
		const key = response.data.arrayBuffer();
		const value = new Uint8Array(key);
		return value;
	} else {
		console.log(response)
	}
};

const handleNotify = () => {
	if( !window.Notification ) {
		console.log('este navegador no soporta notificaciones');
		return;
	}

	if( Notification.permission === 'granted') {
		sendNotification('Hola Mundo! - granted');
	} else if( Notification.permission !== 'denied') {
		Notification.requestPermission( (permission) => {
			console.log(permission);
			if(permission === 'granted') {
				sendNotification('Hola Mundo! - pregunta');
			} 
		});
	}
}

export default handleNotify;