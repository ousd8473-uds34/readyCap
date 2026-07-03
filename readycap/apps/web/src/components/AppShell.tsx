import { BarChart3, Building2, ClipboardCheck, Files, LayoutDashboard, Plus } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const navigation = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/clients", label: "Clientes", icon: Building2 },
  { to: "/projects", label: "Proyectos", icon: Files },
  { to: "/projects/new", label: "Alta proyecto", icon: Plus },
  { to: "/audit", label: "Auditoría", icon: ClipboardCheck }
];

export function AppShell() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <BarChart3 size={24} />
          <span>ReadyCap</span>
        </div>
        <nav>
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? "active" : "")}>
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
