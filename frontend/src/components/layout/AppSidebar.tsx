import { AudioLines, BadgeInfo, ChevronLeft, Image, WholeWord } from 'lucide-react'
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '../ui/sidebar'
import { useThemeStore } from '@/store/themeStore'
import { Separator } from '../ui/separator'
import ModuleInfo from '../ModuleInfo'

const AppSidebar = () => {

  const {theme, tab, setTab} = useThemeStore()
  const { open, toggleSidebar} = useSidebar()

  const  menuItems  = [
    {
      title: "Text",
      value: "text",
      icon: WholeWord
    },
    {
      title: "Image",
      value: "image",
      icon: Image
    },
    {
      title: "Audio",
      value: "audio",
      icon: AudioLines
    },
  ]
  return (
    <Sidebar collapsible='icon'>
        <SidebarContent>
          <div className='w-full h-10 px-3.5 pt-4 flex items-end justify-between select-none'>
            { theme === "dark" ? (
                !open ?
                <button onClick={toggleSidebar} className='cursor-pointer'>
                  <img src='/Images/logo-light.png' className='h-5' /> 
                </button> : <img src='/Images/logo-light.png' className='h-5' /> 
              ) : (
                !open ?
                <button onClick={toggleSidebar} className='cursor-pointer'>
                  <img src='/Images/logo-dark.png' className='h-5' /> 
                </button> : <img src='/Images/logo-dark.png' className='h-5' /> 
              )
            }
            <button onClick={toggleSidebar} className='cursor-pointer'>
              {open ? <ChevronLeft className='!w-5 !h-5' color={theme ==="dark" ? '#b1b1b1' : '#6b6b6b'} /> : null}
            </button>
          </div>
          <div className='w-full px-2 pt-2'>
            <Separator className='my-1 '/>
          </div>
          <SidebarMenu className='p-0.5'>
            {menuItems.map((item) => (
                <SidebarMenuItem key={item.title} className='h-10'>
                  <SidebarMenuButton asChild >
                    <button onClick={() => setTab(item.value)}>
                      <item.icon className='!w-5 !h-5' color={theme ==="dark" ? '#fff' : '#232323'} />
                      <span className='text-sm pl-2'>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
          <div className='w-full px-2 pt-2'>
            <Separator className='my-1 '/>
          </div>
          {open ? (
            <div className='mt-4 h-max pl-3.5 overflow-hidden'>
              <div className='flex w-full items-center'>
                <BadgeInfo className='!w-5 !h-5' color={theme ==="dark" ? '#a1a1a1' : '#737373'} />
                <span className='pl-3 dark:text-neutral-400 text-neutral-500'>{tab.charAt(0).toUpperCase() + tab.slice(1)} Analysis</span>
              </div>
              <ModuleInfo />
            </div>
          ) : (
            <div className='flex justify-center mt-4'>
              <BadgeInfo className='!w-5 !h-5' color={theme ==="dark" ? '#a1a1a1' : '#737373'} />
            </div>
          )}
        </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar