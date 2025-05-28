import { useThemeStore } from "@/store/themeStore"
import { TabsList, TabsTrigger } from "../ui/tabs"

const NavigationPane = () => {

    const {theme} = useThemeStore()

  return (
    <div className='hidden md:block w-1/2 h-full'>
        <TabsList className="w-full bg-transparent">
            <TabsTrigger value="text" className={theme==="dark" ? "!text-neutral-500 aria-selected:!text-foreground cursor-pointer" : "aria-selected:!bg-blue-50 aria-selected:text-foreground text-neutral-400 cursor-pointer"} >Text</TabsTrigger>
            <TabsTrigger value="image" className={theme==="dark" ? "!text-neutral-500 aria-selected:!text-foreground cursor-pointer" : "aria-selected:!bg-blue-50 aria-selected:text-foreground text-neutral-400 cursor-pointer"} >Image</TabsTrigger>
            <TabsTrigger value="audio" className={theme==="dark" ? "!text-neutral-500 aria-selected:!text-foreground cursor-pointer" : "aria-selected:!bg-blue-50 aria-selected:text-foreground text-neutral-400 cursor-pointer"} >Audio</TabsTrigger>
        </TabsList>
    </div>
  )
}

export default NavigationPane