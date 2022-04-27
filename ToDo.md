
# TODO 

## Player name prompt! dialog?
      
### Deploy to Git/Deploy

## SSE
The connection will be kept active indefinitely unless the client or the server stops running.
To stop the event stream from the client, we simply invoked the close() method of the eventSource object.
Closing the event stream on the client doesn't automatically closes the connection on the server side.
Unfortunately, the server will continue to send events to the client. To avoid this, we need to handle the connection close request on the server side. We'll need to add an event handler for the close event on the server.
```js
// The request.on() method catches the close request and executes the callback function. 
// This function invokes the response.end() method to close the HTTP connection. 
// Also, it checks if the connection is already closed, which is a situation that 
// may occur when multiple closing requests are sent by the client.
request.on("close", () => {
      if (!response.finished) {
        response.end();
        console.log("Stopped sending events.");
      }
});
```
The server should generate a closedConnection event as follows:
```js
if (!response.finished) {
    response.write("event: closedConnection\n");
    response.write("data: ");
    response.write("\n\n");
}
```
on the client ...
```js
this.eventSource.addEventListener("closedConnection", e =>
   eventSource.close();
);
```

headers =
{
  Connection: "keep-alive",
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  "Access-Control-Allow-Origin": "*"
}

//add a post method
const send(event: string, data: string, id: number) {
	let eventString =''
	if id != 0) {
		eventString += 'id: '+ id + '\n'
	}
	if (event != '') {
		eventString += 'event: '+ event + '\n'
	}
	if (data != '') {
		eventString += 'data: '+ event + '\n'
	}
	enque(eventString + '\n')
        eventHistory.push(eventString);
}

Restarting connection
When a network issue happens and the connection to an event stream is lost, the browser will automatically attempt to restore the connection. When the connection is established again, the browser will automatically send the identifier of the last received event in the Last-Event-Id HTTP header. If the server wants to send all missed events, it will need to store events already sent to the client.
```js
function checkConnectionToRestore(request, response, eventHistory) {
  if (request.headers["last-event-id"]) {
    const eventId = parseInt(request.headers["last-event-id"]);

    const eventsToReSend = eventHistory.filter(e => e.id > eventId);

    eventsToReSend.forEach(e => {
      if (!response.finished) {
        response.write(e);
      }
    });
  }
}
```