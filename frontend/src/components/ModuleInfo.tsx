import { useThemeStore } from "@/store/themeStore"
import { ScrollArea } from "./ui/scroll-area"

const ModuleInfo = () => {

    const {tab} = useThemeStore()

    const modules = {
        "text": [
            "Grammar and spelling correction",
            "Readability analysis",
            "Tone analysis",
            "Keyword extraction",
            "Word frequency",
            "Key-phrase extraction",
            "Topic Detection",
            "Entity Recognition",
            "Basic Summarization",
        ],
        "image": [
            "Info of Image Analysis module comes here please stay tuned for the next update",
        ],
        "audio": [
            "Info of Audio Analysis module comes here please stay tuned for the next update",
        ],

    }

  return (
    <ScrollArea className="mt-4 h-full text-neutral-400">
        {
            tab === "text" ? (
                <ul>
                    {modules["text"].map((item, key) => (
                        <li key={key}>{item}</li>
                    ))}
                </ul>
            ) : tab === 'image' ? (
                <ul>
                    {modules["image"].map((item, key) => (
                        <li key={key}>{item}</li>
                    ))}
                </ul>
            ) : tab === 'audio' ? (
                <ul>
                    {modules["audio"].map((item, key) => (
                        <li key={key}>{item}</li>
                    ))}
                </ul>
            ) : null
        }    
    </ScrollArea>
  )
}

export default ModuleInfo