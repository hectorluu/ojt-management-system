import * as signalR from '@microsoft/signalr';
import { signalRURL } from 'api/apiUrl';

const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl(signalRURL)
  .build();

hubConnection.start().then(() => console.log("Connection started!"))
  .catch(err => console.log("Error while establishing connection :("));

export default hubConnection;