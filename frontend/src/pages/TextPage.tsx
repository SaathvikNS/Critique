import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useThemeStore } from "@/store/themeStore";
import CustomAccordionTrigger from "@/components/CustomAccordionTrigger";

const TextPage = () => {
  const {theme} = useThemeStore()

  const [analyzing, setAnalyzing] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [move, setMove] = useState<boolean>(false)
  const [moved, setMoved] = useState<boolean>(false)

  const [text, setText] = useState<string>("")

  const handleCritiquePress = () => {
    setAnalyzing(true)
    setLoading(true)
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
        className={`select-none font-extrabold tracking-wide text-2xl dark:text-foreground text-neutral-700 mb-5 mt-40 ${moved ? "sticky" : ""} ${moved ? "top-0" : ""} ${moved ? "z-100" : ""} dark:bg-[#262626] bg-background w-full flex justify-center h-max py-2`}
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
            className="w-3/4 mt-5 flex justify-center"
          >
            <div className="h-full w-full sm:w-3/4">
              <Separator className="bg-border" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

        {/* Accordians */}
        <AnimatePresence>
          {
            moved && (
              <motion.div 
                initial={{opacity:0, y:-10}}
                animate={{opacity:100, y:0}}
                exit={{opacity:100, y:0}}
                transition={{delay:0.5 ,duration:0.5}}
                onAnimationComplete={()=>{setTimeout(() => {
                  setLoading(false)
                }, 5000);}}
                className=" w-full sm:w-2/3 mt-5"
              >
                <Accordion type="multiple">
                  <AccordionItem value="1" className="my-4">
                    <CustomAccordionTrigger title="Grammar and Spelling Correction" loading={loading} theme={theme} />
                    <AccordionContent className="p-4 dark:bg-[#2b2b2b] bg-[#f8f1fc] dark:text-foreground text-neutral-700">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error deserunt non quasi officia magni suscipit consectetur repellat repellendus nihil nemo illum exercitationem voluptatibus ducimus rerum minima molestias nostrum, veniam iure dignissimos, libero, nam id ipsa explicabo alias? Numquam error magnam officia alias odit pariatur voluptatum provident nulla unde quod, natus doloribus! Labore, minus dicta id eos debitis neque magni possimus voluptatem ea rem quo officia soluta commodi necessitatibus odit nam! Ducimus nihil fugiat esse error temporibus ex necessitatibus minima exercitationem nesciunt, nam atque officia eos dolorum culpa veniam natus soluta dolor vel mollitia, similique assumenda odio eligendi accusantium? Quia, incidunt?
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="2" className="my-4">
                    <CustomAccordionTrigger title="Readability Analysis" loading={loading} theme={theme} />
                    <AccordionContent className="p-4 dark:bg-[#2b2b2b] bg-[#f8f1fc] dark:text-foreground text-neutral-700">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error deserunt non quasi officia magni suscipit consectetur repellat repellendus nihil nemo illum exercitationem voluptatibus ducimus rerum minima molestias nostrum, veniam iure dignissimos, libero, nam id ipsa explicabo alias? Numquam error magnam officia alias odit pariatur voluptatum provident nulla unde quod, natus doloribus! Labore, minus dicta id eos debitis neque magni possimus voluptatem ea rem quo officia soluta commodi necessitatibus odit nam! Ducimus nihil fugiat esse error temporibus ex necessitatibus minima exercitationem nesciunt, nam atque officia eos dolorum culpa veniam natus soluta dolor vel mollitia, similique assumenda odio eligendi accusantium? Quia, incidunt?
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="3" className="my-4">
                    <CustomAccordionTrigger title="Tone Analysis" loading={loading} theme={theme} />
                    <AccordionContent className="p-4 dark:bg-[#2b2b2b] bg-[#f8f1fc] dark:text-foreground text-neutral-700">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error deserunt non quasi officia magni suscipit consectetur repellat repellendus nihil nemo illum exercitationem voluptatibus ducimus rerum minima molestias nostrum, veniam iure dignissimos, libero, nam id ipsa explicabo alias? Numquam error magnam officia alias odit pariatur voluptatum provident nulla unde quod, natus doloribus! Labore, minus dicta id eos debitis neque magni possimus voluptatem ea rem quo officia soluta commodi necessitatibus odit nam! Ducimus nihil fugiat esse error temporibus ex necessitatibus minima exercitationem nesciunt, nam atque officia eos dolorum culpa veniam natus soluta dolor vel mollitia, similique assumenda odio eligendi accusantium? Quia, incidunt?
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="4" className="my-4">
                    <CustomAccordionTrigger title="Keyword Extraction and Density Analysis" loading={loading} theme={theme} />
                    <AccordionContent className="p-4 dark:bg-[#2b2b2b] bg-[#f8f1fc] dark:text-foreground text-neutral-700">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error deserunt non quasi officia magni suscipit consectetur repellat repellendus nihil nemo illum exercitationem voluptatibus ducimus rerum minima molestias nostrum, veniam iure dignissimos, libero, nam id ipsa explicabo alias? Numquam error magnam officia alias odit pariatur voluptatum provident nulla unde quod, natus doloribus! Labore, minus dicta id eos debitis neque magni possimus voluptatem ea rem quo officia soluta commodi necessitatibus odit nam! Ducimus nihil fugiat esse error temporibus ex necessitatibus minima exercitationem nesciunt, nam atque officia eos dolorum culpa veniam natus soluta dolor vel mollitia, similique assumenda odio eligendi accusantium? Quia, incidunt?
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="5" className="my-4">
                    <CustomAccordionTrigger title="Topic Detection" loading={loading} theme={theme} />
                    <AccordionContent className="p-4 dark:bg-[#2b2b2b] bg-[#f8f1fc] dark:text-foreground text-neutral-700">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error deserunt non quasi officia magni suscipit consectetur repellat repellendus nihil nemo illum exercitationem voluptatibus ducimus rerum minima molestias nostrum, veniam iure dignissimos, libero, nam id ipsa explicabo alias? Numquam error magnam officia alias odit pariatur voluptatum provident nulla unde quod, natus doloribus! Labore, minus dicta id eos debitis neque magni possimus voluptatem ea rem quo officia soluta commodi necessitatibus odit nam! Ducimus nihil fugiat esse error temporibus ex necessitatibus minima exercitationem nesciunt, nam atque officia eos dolorum culpa veniam natus soluta dolor vel mollitia, similique assumenda odio eligendi accusantium? Quia, incidunt?
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="6" className="my-4">
                    <CustomAccordionTrigger title="Entity Recognition" loading={loading} theme={theme} />
                    <AccordionContent className="p-4 dark:bg-[#2b2b2b] bg-[#f8f1fc] dark:text-foreground text-neutral-700">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error deserunt non quasi officia magni suscipit consectetur repellat repellendus nihil nemo illum exercitationem voluptatibus ducimus rerum minima molestias nostrum, veniam iure dignissimos, libero, nam id ipsa explicabo alias? Numquam error magnam officia alias odit pariatur voluptatum provident nulla unde quod, natus doloribus! Labore, minus dicta id eos debitis neque magni possimus voluptatem ea rem quo officia soluta commodi necessitatibus odit nam! Ducimus nihil fugiat esse error temporibus ex necessitatibus minima exercitationem nesciunt, nam atque officia eos dolorum culpa veniam natus soluta dolor vel mollitia, similique assumenda odio eligendi accusantium? Quia, incidunt?
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="7" className="my-4">
                    <CustomAccordionTrigger title="Summarization" loading={loading} theme={theme} />
                    <AccordionContent className="p-4 dark:bg-[#2b2b2b] bg-[#f8f1fc] dark:text-foreground text-neutral-700">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error deserunt non quasi officia magni suscipit consectetur repellat repellendus nihil nemo illum exercitationem voluptatibus ducimus rerum minima molestias nostrum, veniam iure dignissimos, libero, nam id ipsa explicabo alias? Numquam error magnam officia alias odit pariatur voluptatum provident nulla unde quod, natus doloribus! Labore, minus dicta id eos debitis neque magni possimus voluptatem ea rem quo officia soluta commodi necessitatibus odit nam! Ducimus nihil fugiat esse error temporibus ex necessitatibus minima exercitationem nesciunt, nam atque officia eos dolorum culpa veniam natus soluta dolor vel mollitia, similique assumenda odio eligendi accusantium? Quia, incidunt?
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>
            )
          }
        </AnimatePresence>

    </div>
  );
};

export default TextPage;
