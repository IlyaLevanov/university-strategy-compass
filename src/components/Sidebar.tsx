
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, School, UserCog, Menu } from 'lucide-react';

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
  userRole: 'reader' | 'manager';
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, userRole }) => {
  return (
    <aside 
      className={`fixed top-0 left-0 h-full z-10 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      } glass-card border-r border-border/50`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4">
          {isOpen ? (
            <div className="text-lg font-bold text-university-text">UniStrategix</div>
          ) : (
            <div className="text-lg font-bold mx-auto">US</div>
          )}
          <button onClick={toggleSidebar} className="text-university-textSecondary hover:text-university-text">
            <Menu size={20} />
          </button>
        </div>
        
        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-2">
            <li>
              <NavLink to="/" className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }>
                <Home size={20} />
                {isOpen && <span>Главная</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/search" className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }>
                <Search size={20} />
                {isOpen && <span>Поиск</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/university" className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }>
                <School size={20} />
                {isOpen && <span>Карточка университета</span>}
              </NavLink>
            </li>
            {userRole === 'manager' && (
              <li>
                <NavLink to="/admin" className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }>
                  <UserCog size={20} />
                  {isOpen && <span>Админ панель</span>}
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-3">
            {isOpen ? (
              <>
                <div className="w-8 h-8 rounded-full bg-university-blue flex items-center justify-center text-white">
                  {userRole === 'manager' ? 'M' : 'R'}
                </div>
                <div>
                  <p className="text-sm text-university-text">User</p>
                  <p className="text-xs text-university-textSecondary capitalize">{userRole}</p>
                </div>
              </>
            ) : (
              <div className="w-8 h-8 rounded-full bg-university-blue mx-auto flex items-center justify-center text-white">
                {userRole === 'manager' ? 'M' : 'R'}
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
