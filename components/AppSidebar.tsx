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
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";
import useRoutes from "@/hooks/useRoutes";
import { LogOut } from "lucide-react";
import useLogout from "@/features/auth/hooks/useLogout";

const Appsidebar = () => {
  const { ROUTES_INFO, isCurrentPath } = useRoutes();
  const { logout } = useLogout()

  return (
    <SidebarProvider className="w-fit" open={true}>
      <Sidebar className=" ">
        <SidebarHeader className="py-4 m-2 mx-4  ">
          <div className="flex items-center justify-between">
            <Link href={"/"} className="text-2xl font-bold ">
              iLynk
            </Link>
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
        <SidebarFooter className="w-full flex items-center">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={logout} className="w-5/6 mx-auto text-lg p-5 text-center bg-blue-950 cursor-pointer">
                <LogOut size={22} className="font-extrabold text-xl" /> Logout
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};

export default Appsidebar;
