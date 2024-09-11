import { LayoutDashboard, BarChart3Icon, Settings } from "lucide-react";

export function getMenuList(pathname) {
    return [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/dashboard",
                    label: "Dashboard",
                    active: pathname.includes("/dashboard"),
                    icon: LayoutDashboard,
                    submenus: []
                },
                {
                    href: "",
                    label: "Laporan Lalin",
                    active: pathname.includes("/laporan_lalin_perhari"),
                    icon: BarChart3Icon,
                    submenus: [
                        {
                            href: "/laporan-lalin-perhari",
                            label: "Laporan Per Hari",
                            active: pathname === "/laporan-lalin-perhari"
                        },
                    ]
                },
                {
                    href: "/master-gerbang",
                    label: "Master Gerbang",
                    active: pathname.includes("/master-gerbang"),
                    icon: Settings,
                    submenus: []
                },
            ]
        },
    ];
}