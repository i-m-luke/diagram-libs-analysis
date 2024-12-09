# Ukládání stavu schématu na pozadí

```typescript
// Extension context:
function performCyclically(callback: () => void, interval: number) {
    const intervalId = setInterval(callback, interval);
    return () => clearInterval(intervalId); // disposer
}

const backgroundStateDisposer= performCyclically(() => {
    panel.postMessage({} & StateRequestCommand);
    const requestMsg = {command: StateRequestCommand};
    const responseMsg = await panel.recieveMessage(requestMsg), 3000);
    // ... store responseMsg.xml
}, 1000);

// Webview context:
vsCodeApi.onRecivedMessage = (msg: any) => {
    if (msg.command instanceof StateRequestCommand) {
        // webviewApi is vsCodeApi
        webviewApi.postMessage({} & StateResponseCommand);
    }
}
```
