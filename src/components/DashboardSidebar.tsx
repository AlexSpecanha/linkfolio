import React from 'react';
import { Link as LinkIcon, LayoutGrid, Settings, LogOut, ChevronDown, BarChart3, LifeBuoy, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profile: {
    username: string;
  } | null;
  onSignOut: () => void;
}

export function DashboardSidebar({ activeTab, setActiveTab, profile, onSignOut }: DashboardSidebarProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-64 bg-white border-r flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <LinkIcon className="w-6 h-6 text-purple-600" />
          <span className="font-semibold text-xl">LinkFolio</span>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('links')}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'links'
                ? 'bg-purple-50 text-purple-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
            Links
          </button>
          <button
            onClick={() => setActiveTab('appearance')}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'appearance'
                ? 'bg-purple-50 text-purple-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Settings className="w-5 h-5" />
            Aparência
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'analytics'
                ? 'bg-purple-50 text-purple-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Análise
          </button>
          <button
            onClick={() => navigate('/support')}
            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
          >
            <LifeBuoy className="w-5 h-5" />
            Suporte
          </button>
          <div className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-gray-400 cursor-not-allowed">
            <Crown className="w-5 h-5" />
            Upgrade
            <span className="text-xs ml-auto bg-gray-100 px-2 py-0.5 rounded">Em breve</span>
          </div>
        </nav>
      </div>

      <div className="mt-auto p-4 border-t">
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50"
          >
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-purple-600">
                {profile?.username?.[0]?.toUpperCase()}
              </span>
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium">{profile?.username}</p>
              <p className="text-xs text-gray-500">@{profile?.username}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-lg shadow-lg py-1">
              <button
                onClick={onSignOut}
                className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}