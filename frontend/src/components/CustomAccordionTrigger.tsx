import { AccordionTrigger } from './ui/accordion'
import { AnimatePresence, motion } from 'framer-motion'
import lightLoader from "@/assets/animations/LightLoader.json"
import darkLoader from "@/assets/animations/DarkLoader.json"
import Lottie from 'lottie-react'

type propType = {
    title: string,
    loading: boolean,
    theme: 'light' | 'dark'
}

const CustomAccordionTrigger = ({title, loading, theme}: propType) => {
  return (
    <AccordionTrigger disabled={loading} className=" relative hover:no-underline dark:bg-[#2b2b2b] bg-[#f8f1fc] flex justify-between items-center py-2 px-4 rounded-md border">
        <span>{title}</span>
        <span className="ml-auto absolute -right-1.5 flex items-center">
            <AnimatePresence mode="wait">
            {loading && ( theme==="dark" ? (
                <motion.div 
                initial={{opacity:0, scale:0.7}}
                animate={{opacity:1, scale:1}}
                exit={{opacity:0, scale:0.3}}
                transition={{duration:0.5}}
                className="z-10"
                >
                <Lottie animationData={lightLoader} className="w-15 z-50" />
                {loading && (<motion.div className="dark:bg-[#262626] h-5 w-5 absolute -z-1 right-5 top-3"></motion.div>)}
                </motion.div>
            ) : (
                <motion.div 
                initial={{opacity:0, scale:0.7}}
                animate={{opacity:1, scale:1}}
                exit={{opacity:0, scale:0.3}}
                transition={{duration:0.5}}
                className="z-10"
                >
                <Lottie animationData={darkLoader} className="w-15 z-50" />
                {loading && (<motion.div className="dark:bg-[#262626] bg-sidebar h-5 w-5 absolute -z-1 right-5 top-3"></motion.div>)}
                </motion.div>
            )
            )}
            </AnimatePresence>
        </span>
        </AccordionTrigger>
  )
}

export default CustomAccordionTrigger