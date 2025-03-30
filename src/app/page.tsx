import { Suspense } from "react"
import Dither from '../Dither/Dither.tsx';
// import { StaticComponent, DynamicComponent, Fallback } from "@/app/ui"

export const experimental_ppr = true

export default function Home() {
  return (
	<div style={{ width: '100%', height: '600px', position: 'relative' }}>

  <Dither

    waveColor={[0.5, 0.5, 0.5]}

    disableAnimation={false}

    enableMouseInteraction={true}

    mouseRadius={0.3}

    colorNum={4}

    waveAmplitude={0.3}

    waveFrequency={3}

    waveSpeed={0.05}

  />

</div>
  );
}
