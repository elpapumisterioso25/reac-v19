import { useState, version } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import PantallaApi from './PantallaApi'
import { Suspense } from 'react';

function App() {
  return (
    <>
    <Suspense fallback={<p>Cargando personajes...</p>}>
      <PantallaApi />
    </Suspense>
    </>
  )
}

export default App;
