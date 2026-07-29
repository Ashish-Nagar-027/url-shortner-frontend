import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
  SidebarProvider,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import Link from "next/link";
import useRoutes from "@/hooks/useRoutes";



const Appsidebar = () => {

    const {ROUTES_INFO, isCurrentPath}= useRoutes()

  return (
    <SidebarProvider className="w-fit" open={true}>
      <Sidebar className=" ">
        <SidebarHeader className="py-4 m-2 mx-4  ">
          <div className="flex items-center justify-between">
            <Link href={'/'} className="text-2xl font-bold ">Iynk</Link>
            <SidebarTrigger />
          </div>
        </SidebarHeader>

        <SidebarContent className="mt-6 mx-6 border-t-2">
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent className="flex flex-col gap-3">
              {ROUTES_INFO.map((r, i) => (
                <Link
                  href={r.pathName}
                  key={i}
                  className={`flex gap-2 items-center 
                p-2 rounded-lg hover:bg-white hover
                 hover:text-black 

                 ${isCurrentPath(r.pathName) && "text-black bg-white"}
                 `}
                >
                  <r.icon size={16} /> {r.label}
                </Link>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarGroupContent></SidebarGroupContent>
        <SidebarFooter />
      </Sidebar>
    </SidebarProvider>
  );
};

export default Appsidebar;
