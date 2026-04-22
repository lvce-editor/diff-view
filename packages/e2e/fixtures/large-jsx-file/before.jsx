import * as React from 'react';
import './App.css'

export default function App() {
  const [connected, setConnected] = React.useState(false);
  const [error, setError] = React.useState(null);

  const runRef = React.useRef(0);
  
  React.useEffect(() => {
    // this prevents the effect from running multiple times
    runRef.current += 1;
    if (runRef.current === 1) {
      return;
    }
    
    const foo = window.foo
    (async () => {
      try {

        await foo.init({permissions: []});
        
        setConnected(true);

        
        // Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        // Ut consequat semper viverra nam libero justo laoreet sit amet. Volutpat commodo sed egestas egestas fringilla phasellus faucibus. 
        // Quam quisque id diam vel quam elementum pulvinar etiam. Fusce id velit ut tortor pretium viverra suspendisse potenti. 
        // Pulvinar mattis nunc sed blandit. Neque volutpat ac tincidunt vitae semper quis. 
        // Fermentum iaculis eu non diam phasellus vestibulum lorem sed. Lacus vestibulum sed arcu non odio euismod lacinia. 
        // Id neque aliquam vestibulum morbi blandit cursus risus at. Auctor augue mauris augue neque gravida in fermentum et. 
        // Lectus arcu bibendum at varius vel pharetra.

        // Fames ac turpis egestas maecenas pharetra convallis. Tellus in hac habitasse platea dictumst vestibulum. Magna eget est lorem ipsum dolor. 
        // Id interdum velit laoreet id donec ultrices tincidunt arcu. Eu lobortis elementum nibh tellus molestie. Tellus cras adipiscing enim eu turpis. 
        // Ipsum suspendisse ultrices gravida dictum. Volutpat diam ut venenatis tellus in. Volutpat maecenas volutpat blandit aliquam. 
        // Platea dictumst vestibulum rhoncus est pellentesque. Lacus vel facilisis volutpat est. 
        // Tortor at risus viverra adipiscing at in tellus integer feugiat.
        
      } catch (e) {
        console.log(e);
        setError(e);
      }
    })()
  }, []);
  
  return (
    <main>
      <div>Example</div>
      {error ? (
        <div>error: {error.message ?? error}</div>
      ) : (
        <div>{connected ? 'connected' : 'connecting...'}</div>
      )}
    </main>
  );
}