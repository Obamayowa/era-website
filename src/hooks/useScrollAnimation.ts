import { useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'

export function useParallax(distance: number = 100) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance])

  return { ref, y, scrollYProgress }
}

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.35'],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [60, 0])

  return { ref, opacity, y, scrollYProgress }
}

export function useProgressBar(): { scrollYProgress: MotionValue<number> } {
  const { scrollYProgress } = useScroll()
  return { scrollYProgress }
}
