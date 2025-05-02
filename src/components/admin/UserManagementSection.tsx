
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Check, Search } from 'lucide-react';
import { usersData } from '../../data/mockData';
import { User } from '../../types/admin';

const UserManagementSection: React.FC = () => {
  const [users, setUsers] = useState<User[]>(usersData);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>(usersData);
  
  // Filter users based on search query
  useEffect(() => {
    if (userSearchQuery.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => 
        user.email.toLowerCase().includes(userSearchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [userSearchQuery, users]);
  
  // Handle role change
  const handleRoleChange = (userId: number, newRole: 'reader' | 'manager') => {
    setUsers(
      users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    
    toast.success(`Роль пользователя изменена на ${newRole === 'reader' ? 'Читатель' : 'Менеджер'}`);
  };

  return (
    <div className="glass-card p-6 animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Управление ролями пользователя в системе</h2>
      
      <div className="flex justify-end mb-4">
        <div className="relative w-64">
          <input
            type="text"
            value={userSearchQuery}
            onChange={(e) => setUserSearchQuery(e.target.value)}
            placeholder="Поиск по email..."
            className="w-full bg-muted border border-border rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-university-textSecondary" />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="py-3 px-4 text-left">Имя</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-center">Роль</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr 
                key={user.id} 
                className="border-b border-border/50 hover:bg-muted/50 transition-colors"
              >
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleRoleChange(user.id, 'reader')}
                      className={`flex items-center justify-center px-3 py-1 rounded-md ${
                        user.role === 'reader' 
                          ? 'bg-university-blue text-white' 
                          : 'bg-muted text-university-textSecondary'
                      }`}
                    >
                      {user.role === 'reader' && <Check size={14} className="mr-1" />}
                      Reader
                    </button>
                    
                    <button
                      onClick={() => handleRoleChange(user.id, 'manager')}
                      className={`flex items-center justify-center px-3 py-1 rounded-md ${
                        user.role === 'manager' 
                          ? 'bg-university-mint text-white' 
                          : 'bg-muted text-university-textSecondary'
                      }`}
                    >
                      {user.role === 'manager' && <Check size={14} className="mr-1" />}
                      Manager
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementSection;
