import { Suspense } from "react"
import BlurText from "../BlurText/BlurText.tsx"
// import { StaticComponent, DynamicComponent, Fallback } from "@/app/ui"

export const experimental_ppr = true

export default function Home() {
  return (
	  <>
	  <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
	<BlurText

  text="Welcome! This page is work in progress! Make sure to check it out later."

  delay={50}

  animateBy="words"

  direction="top"


  className="text-2xl mb-8"

/>
</div>
</>
  );
}
