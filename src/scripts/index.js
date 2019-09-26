import '../styles/index.scss';
import {RSocketClient, JsonSerializer, IdentitySerializer} from 'rsocket-core';
import RSocketWebSocketClient from 'rsocket-websocket-client';

const client = new RSocketClient({
	serializers: {
		data: JsonSerializer,
		metadata: IdentitySerializer
	},
	setup: {
		keepAlive: 60000,
		lifetime: 180000,
		dataMimeType: 'application/json',
		metadataMimeType: 'message/x.rsocket.routing.v0',
	},
	transport: new RSocketWebSocketClient({
		url: 'ws://localhost:8081/rsocket'
	}),
});

client.connect().subscribe({
	onComplete: socket => {
		console.log('Completed connection');
		socket.requestStream({
			data: {
				yo: 'hey'
			},
			metadata: String.fromCharCode(15) + 'interval-stream',
		}).subscribe({
			onComplete: () => console.log('complete'),
			onError: error => console.error(error),
			onNext: payload => {
				console.log(payload.data);
			},
			onSubscribe: subscription => {
				subscription.request(10000);
			},
		});
	},
	onError: error => console.error(error),
	onSubscribe: cancel => {}
});