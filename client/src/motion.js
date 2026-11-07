export const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
export const item = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }
export const page = {
    initial: { opacity: 0, y: 14, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.18 } },
}