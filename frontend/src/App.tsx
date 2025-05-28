import { useEffect } from "react";
import { useThemeStore } from "./store/themeStore"
import { useSidebar } from "./components/ui/sidebar";
import AppSidebar from "./components/layout/AppSidebar";
import ThemeToggle from "./components/layout/ThemeToggle";
// import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@radix-ui/react-navigation-menu";
import { Separator } from "@radix-ui/react-separator";
import NavigationPane from "./components/layout/NavigationPane";
import { AlignJustify } from "lucide-react";
import { Tabs, TabsContent } from "./components/ui/tabs";
import TextPage from "./pages/TextPage";
import ImagePage from "./pages/ImagePage";
import AudioPage from "./pages/AudioPage";

const App = () => {

  const {theme, tab, setTab} = useThemeStore()
  const {toggleSidebar} = useSidebar();

  useEffect(() => {
    useThemeStore.getState().initializeTheme()
  }, [])

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme])

  return (
    <>
      <AppSidebar />
      <div className="w-full h-screen flex flex-col">
        <div className={" flex-1 flex flex-col min-h-0 dark:bg-neutral-800 bg-white"}>
          <Tabs defaultValue="text" value={tab} onValueChange={setTab} className="flex flex-col flex-1">

            {/* Header section */}
            <header className="flex items-center justify-between px-5 py-2 shrink-0">
              <button className="md:hidden cursor-pointer" onClick={toggleSidebar}>
                <AlignJustify className='!w-5 !h-5' color={theme ==="dark" ? '#b1b1b1' : '#6b6b6b'} />
              </button>
              <h1 className="text-lg font-semibold select-none text-foreground">Critique</h1>
              <NavigationPane />
              <ThemeToggle />
            </header>

            <div className="px-5 shrink-0">
              <Separator className="bg-border h-px" />
            </div>

            <main className="flex-1 overflow-scroll p-4 [scrollbar-width:none]">
              <TabsContent value="text" className="h-full">
                <TextPage />
              </TabsContent>
              <TabsContent value="image" className="h-full">
                <ImagePage />
              </TabsContent>
              <TabsContent value="audio" className="h-full">
                <AudioPage />
              </TabsContent>
            </main>
          </Tabs>
        </div>
      </div>
      </>
  )
}

export default App