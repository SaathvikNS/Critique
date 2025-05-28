import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const TextPage = () => {
  const [analyzing, setAnalyzing] = useState<boolean>(false)
  const [move, setMove] = useState<boolean>(false)
  const [moved, setMoved] = useState<boolean>(false)

  const [text, setText] = useState<string>("")

  const handleCritiquePress = () => {
    setAnalyzing(true)
  }

  const handleGetSample = () => {
    setText("Hello World")
  }

  return (
    <div className="flex flex-col items-center h-full">

      {/* Title */}
      <motion.h1
        initial={false}
        animate={{marginTop: !move ? "10rem" : 0}}
        exit={{marginTop: '1rem'}}
        transition={{duration: 0.5}}
        onAnimationComplete={()=>{setMoved(true)}}
        className="select-none font-extrabold tracking-wide text-2xl text-foreground mb-5 mt-40"
      >
        Text Analysis
      </motion.h1>

      {/* Para */}
      <AnimatePresence>
        { !analyzing && (
          <motion.p
            initial={false}
            animate={{opacity:1, height: 'auto', marginTop: "2rem"}}
            exit={{opacity:0, height: 0, marginTop: 0}}
            transition={{duration: 0.5}}
            className="w-2/3 pl-2 select-none mt-8 sm:block hidden text-sm"
          >
            Please enter the text to be analysed
          </motion.p>
        )}
      </AnimatePresence>

      {/* TextArea */}
      <Textarea
        className="sm:w-2/3 sm:max-h-50 max-h-100 sm:mt-1"
        placeholder="Enter your text here...."
        defaultValue={text}
        disabled={analyzing}
      />

      {/* Buttons */}
      <AnimatePresence>
        { !analyzing && (
          <motion.div
            initial={false}
            animate={{opacity:1}}
            onAnimationComplete={() => {setTimeout(() => {setMove(true)}, 500)}}
            exit={{opacity:0}}
            className="mt-4 sm:w-2/3 w-full flex justify-between"
          >
            <Button onClick={handleGetSample} variant={"link"} className="text-xs cursor-pointer">
              Click here to use sample text
            </Button>
            <Button onClick={handleCritiquePress} className="bg-neutral-600 dark:bg-neutral-200 text-neutral-200 dark:text-neutral-600 rounded-3xl h-8 cursor-pointer">
              Critique
            </Button>
          </motion.div>
        )}  
      </AnimatePresence>

      {/* seperator */}
      <AnimatePresence>
        { moved && (
          <motion.div
            initial={{width:0}}
            animate={{width: moved ? "100%" : 0}}
            exit={{width: "100%"}}
            transition={{duration: 0.5}}
            className="w-full mt-5"
          >
            <Separator className="bg-border h-2px" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        
      </AnimatePresence>

    </div>
  );
};

export default TextPage;
