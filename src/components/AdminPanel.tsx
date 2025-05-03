import React, { useState } from 'react';
import { 
  Users, 
  Shield, 
  Search,
  Mail,
  MessageSquare,
  Bell,
  User,
  Trash2,
  Edit,
  Crown,
  Star,
  MoreVertical,
  CreditCard,
  DollarSign,
  TrendingUp,
  UserPlus,
  CheckCircle,
  XCircle,
  Clock,
  Ban,
  ChevronDown,
  HelpCircle,
  LogOut,
  CheckCircle2,
  AlertCircle,
  LifeBuoy,
  MessageSquareMore,
  ArrowUpRight
} from 'lucide-react';
import { EditUserModal } from './EditUserModal';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  plan: 'free' | 'pro';
  role: 'user' | 'admin';
  createdAt: string;
  lastLogin: string;
  pagesCount: number;
  linksCount: number;
  totalClicks: number;
  isBanned?: boolean;
}

interface Transaction {
  id: number;
  user: string;
  amount: number;
  status: 'success' | 'failed' | 'pending';
  date: string;
  plan: 'pro';
  paymentMethod: string;
}

interface SupportTicket {
  id: number;
  user: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  lastUpdate: string;
  category: 'technical' | 'billing' | 'account' | 'other';
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "João Silva",
    username: "@joaosilva",
    email: "joao@example.com",
    plan: "free",
    role: "user",
    createdAt: "2024-03-10T10:00:00",
    lastLogin: "2024-03-15T15:30:00",
    pagesCount: 3,
    linksCount: 12,
    totalClicks: 1547,
    isBanned: false
  },
  {
    id: 2,
    name: "Maria Santos",
    username: "@mariasantos",
    email: "maria@example.com",
    plan: "pro",
    role: "admin",
    createdAt: "2024-03-08T14:20:00",
    lastLogin: "2024-03-15T16:45:00",
    pagesCount: 5,
    linksCount: 25,
    totalClicks: 3842,
    isBanned: false
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    username: "@pedrooliveira",
    email: "pedro@example.com",
    plan: "free",
    role: "user",
    createdAt: "2024-03-05T09:15:00",
    lastLogin: "2024-03-12T11:20:00",
    pagesCount: 1,
    linksCount: 5,
    totalClicks: 234,
    isBanned: true
  }
];

const mockTransactions: Transaction[] = [
  {
    id: 1,
    user: "João Silva",
    amount: 29.90,
    status: "success",
    date: "2024-03-15T10:30:00",
    plan: "pro",
    paymentMethod: "Cartão de Crédito"
  },
  {
    id: 2,
    user: "Maria Santos",
    amount: 29.90,
    status: "pending",
    date: "2024-03-15T11:45:00",
    plan: "pro",
    paymentMethod: "PIX"
  },
  {
    id: 3,
    user: "Pedro Oliveira",
    amount: 29.90,
    status: "failed",
    date: "2024-03-14T09:15:00",
    plan: "pro",
    paymentMethod: "Cartão de Crédito"
  }
];

const mockTickets: SupportTicket[] = [
  {
    id: 1,
    user: "João Silva",
    subject: "Problema com pagamento",
    message: "Não consigo atualizar meu cartão de crédito",
    status: "open",
    priority: "high",
    createdAt: "2024-03-15T10:30:00",
    lastUpdate: "2024-03-15T10:30:00",
    category: "billing"
  },
  {
    id: 2,
    user: "Maria Santos",
    subject: "Links não funcionando",
    message: "Meus links pararam de funcionar hoje",
    status: "in_progress",
    priority: "medium",
    createdAt: "2024-03-14T15:45:00",
    lastUpdate: "2024-03-15T09:20:00",
    category: "technical"
  },
  {
    id: 3,
    user: "Pedro Oliveira",
    subject: "Como mudar username?",
    message: "Preciso alterar meu nome de usuário",
    status: "resolved",
    priority: "low",
    createdAt: "2024-03-13T11:20:00",
    lastUpdate: "2024-03-14T14:30:00",
    category: "account"
  }
];

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<'all' | 'user' | 'admin'>('all');
  const [selectedPlan, setSelectedPlan] = useState<'all' | 'free' | 'pro'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'banned'>('all');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedTicketStatus, setSelectedTicketStatus] = useState<'all' | 'open' | 'in_progress' | 'resolved'>('all');
  const [selectedTicketPriority, setSelectedTicketPriority] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesPlan = selectedPlan === 'all' || user.plan === selectedPlan;
    const matchesStatus = selectedStatus === 'all' || 
      (selectedStatus === 'active' && !user.isBanned) ||
      (selectedStatus === 'banned' && user.isBanned);

    return matchesSearch && matchesRole && matchesPlan && matchesStatus;
  });

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesStatus = selectedTicketStatus === 'all' || ticket.status === selectedTicketStatus;
    const matchesPriority = selectedTicketPriority === 'all' || ticket.priority === selectedTicketPriority;
    const matchesSearch = searchTerm === '' || 
      ticket.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.message.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesPriority && matchesSearch;
  });

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdateUser = ({ id, plan }: { id: number; plan: 'free' | 'pro' }) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, plan } : user
    ));
    setEditingUser(null);
  };

  const handleToggleBan = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isBanned: !user.isBanned } : user
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-purple-600" />
              <span className="font-semibold text-xl">Admin</span>
            </div>

            <div className="flex items-center gap-6">
              <button className="text-gray-600 hover:text-purple-600">
                <Bell className="w-5 h-5" />
              </button>
              <button className="text-gray-600 hover:text-purple-600">
                <MessageSquare className="w-5 h-5" />
              </button>
              <button className="text-gray-600 hover:text-purple-600">
                <Mail className="w-5 h-5" />
              </button>
              
              <div className="h-6 w-px bg-gray-200"></div>

              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-3"
                >
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32"
                    alt="Admin"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="text-sm">
                    <p className="font-medium">Admin</p>
                    <p className="text-gray-500">Super Admin</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                    <a 
                      href="#" 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                    >
                      <HelpCircle className="w-4 h-4" />
                      Suporte
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
                    >
                      <LogOut className="w-4 h-4" />
                      Sair
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <nav className="bg-white rounded-lg shadow-sm mb-8">
          <div className="flex">
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 px-6 py-4 ${
                activeTab === 'users'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <Users className="w-5 h-5" />
              Usuários
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`flex items-center gap-2 px-6 py-4 ${
                activeTab === 'billing'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <CreditCard className="w-5 h-5" />
              Faturamento
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={`flex items-center gap-2 px-6 py-4 ${
                activeTab === 'support'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <LifeBuoy className="w-5 h-5" />
              Suporte
            </button>
          </div>
        </nav>

        {activeTab === 'users' && (
          <>
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-gray-600 mb-2">Total de Usuários</h3>
                <p className="text-3xl font-bold">1,234</p>
                <p className="text-sm text-green-600 mt-2">+12.5% esse mês</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-gray-600 mb-2">Usuários Pro</h3>
                <p className="text-3xl font-bold">287</p>
                <p className="text-sm text-green-600 mt-2">+8.3% esse mês</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-gray-600 mb-2">Total de Páginas</h3>
                <p className="text-3xl font-bold">3,456</p>
                <p className="text-sm text-green-600 mt-2">+15.2% esse mês</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <UserPlus className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-600">Novos Usuários no Mês</h3>
                    <p className="text-xl font-bold mt-1">156</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-green-600">+22.5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between gap-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar usuários..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as 'all' | 'user' | 'admin')}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  >
                    <option value="all">Todos os tipos</option>
                    <option value="user">Usuários</option>
                    <option value="admin">Administradores</option>
                  </select>

                  <select
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value as 'all' | 'free' | 'pro')}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  >
                    <option value="all">Todos os planos</option>
                    <option value="free">Plano Grátis</option>
                    <option value="pro">Plano Pro</option>
                  </select>

                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'active' | 'banned')}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  >
                    <option value="all">Todos os status</option>
                    <option value="active">Ativos</option>
                    <option value="banned">Banidos</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Usuário</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Plano</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Tipo</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Cadastro</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Último Acesso</th>
                    <th className="text-center py-4 px-6 font-medium text-gray-600">Páginas</th>
                    <th className="text-center py-4 px-6 font-medium text-gray-600">Links</th>
                    <th className="text-center py-4 px-6 font-medium text-gray-600">Cliques</th>
                    <th className="text-right py-4 px-6 font-medium text-gray-600">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className={`border-b last:border-0 ${user.isBanned ? 'bg-red-50' : ''}`}>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <span>{user.username}</span>
                              <span>•</span>
                              <span>{user.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
                          user.plan === 'pro'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {user.plan === 'pro' ? (
                            <>
                              <Crown className="w-4 h-4" />
                              Pro
                            </>
                          ) : (
                            <>
                              <Star className="w-4 h-4" />
                              Grátis
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
                          user.role === 'admin'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {user.role === 'admin' ? 'Admin' : 'Usuário'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
                          user.isBanned
                            ? 'bg-red-100 text-red-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {user.isBanned ? (
                            <>
                              <Ban className="w-4 h-4" />
                              Banido
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              Ativo
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-500">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="py-4 px-6 text-gray-500">
                        {formatDate(user.lastLogin)}
                      </td>
                      <td className="py-4 px-6 text-center">{user.pagesCount}</td>
                      <td className="py-4 px-6 text-center">{user.linksCount}</td>
                      <td className="py-4 px-6 text-center">{user.totalClicks}</td>
                      <td className="py-4 px-6">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleEditUser(user)}
                            className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleToggleBan(user.id)}
                            className={`p-2 rounded-lg ${
                              user.isBanned
                                ? 'text-green-600 hover:text-green-700 hover:bg-green-50'
                                : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                            }`}
                            title={user.isBanned ? 'Desbanir usuário' : 'Banir usuário'}
                          >
                            <Ban className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 'billing' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-gray-600">Receita Mensal</h3>
                </div>
                <p className="text-3xl font-bold">{formatCurrency(8573.10)}</p>
                <p className="text-sm text-green-600 mt-2">+18.2% esse mês</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <UserPlus className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-gray-600">Novos Assinantes</h3>
                </div>
                <p className="text-3xl font-bold">287</p>
                <p className="text-sm text-green-600 mt-2">+12.3% esse mês</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium">Faturamento Mensal</h3>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Receita</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-200 rounded-full"></div>
                    <span>Meta</span>
                  </div>
                </div>
              </div>
              <div className="h-64 flex items-end gap-4">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="flex-1 flex flex-col gap-1">
                    <div 
                      className="bg-green-500 rounded-t"
                      style={{ height: `${Math.random() * 100}%` }}
                    ></div>
                    <div 
                      className="border-2 border-dashed border-green-200 absolute w-full"
                      style={{ bottom: '70%' }}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-sm text-gray-500">
                <span>Jan</span>
                <span>Fev</span>
                <span>Mar</span>
                <span>Abr</span>
                <span>Mai</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Ago</span>
                <span>Set</span>
                <span>Out</span>
                <span>Nov</span>
                <span>Dez</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-lg font-medium">Últimas Transações</h3>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Usuário</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Plano</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Valor</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Método</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Data</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b last:border-0">
                      <td className="py-4 px-6">{transaction.user}</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm bg-purple-100 text-purple-700">
                          <Crown className="w-4 h-4" />
                          Pro
                        </span>
                      </td>
                      <td className="py-4 px-6">{formatCurrency(transaction.amount)}</td>
                      <td className="py-4 px-6">{transaction.paymentMethod}</td>
                      <td className="py-4 px-6">{formatDate(transaction.date)}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
                          transaction.status === 'success'
                            ? 'bg-green-100 text-green-700'
                            : transaction.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {transaction.status ===
                            'success' ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : transaction.status === 'pending' ? (
                            <Clock className="w-4 h-4" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                          {transaction.status === 'success'
                            ? 'Aprovado'
                            : transaction.status === 'pending'
                            ? 'Pendente'
                            : 'Falhou'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'support' && (
          <>
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-600">Tickets Abertos</h3>
                    <p className="text-xl font-bold mt-1">12</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-red-600">+3 hoje</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-600">Em Andamento</h3>
                    <p className="text-xl font-bold mt-1">5</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Tempo médio: 2h</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-600">Resolvidos Hoje</h3>
                    <p className="text-xl font-bold mt-1">18</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-green-600">95% satisfação</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <MessageSquareMore className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-gray-600">Tempo de Resposta</h3>
                    <p className="text-xl font-bold mt-1">45min</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-green-600">-15min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between gap-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar tickets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <select
                    value={selectedTicketStatus}
                    onChange={(e) => setSelectedTicketStatus(e.target.value as 'all' | 'open' | 'in_progress' | 'resolved')}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  >
                    <option value="all">Todos os status</option>
                    <option value="open">Em aberto</option>
                    <option value="in_progress">Em andamento</option>
                    <option value="resolved">Resolvidos</option>
                  </select>

                  <select
                    value={selectedTicketPriority}
                    onChange={(e) => setSelectedTicketPriority(e.target.value as 'all' | 'low' | 'medium' | 'high')}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  >
                    <option value="all">Todas as prioridades</option>
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Ticket</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Categoria</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Status</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Prioridade</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Criado em</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-600">Última atualização</th>
                    <th className="text-right py-4 px-6 font-medium text-gray-600">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className="border-b last:border-0">
                      <td className="py-4 px-6">
                        <div>
                          <p className="font-medium">{ticket.subject}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{ticket.user}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{ticket.message}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
                          ticket.category === 'technical'
                            ? 'bg-blue-100 text-blue-700'
                            : ticket.category === 'billing'
                            ? 'bg-green-100 text-green-700'
                            : ticket.category === 'account'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {ticket.category === 'technical' && 'Técnico'}
                          {ticket.category === 'billing' && 'Faturamento'}
                          {ticket.category === 'account' && 'Conta'}
                          {ticket.category === 'other' && 'Outros'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
                          ticket.status === 'open'
                            ? 'bg-red-100 text-red-700'
                            : ticket.status === 'in_progress'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {ticket.status === 'open' && (
                            <>
                              <AlertCircle className="w-4 h-4" />
                              Em aberto
                            </>
                          )}
                          {ticket.status === 'in_progress' && (
                            <>
                              <Clock className="w-4 h-4" />
                              Em andamento
                            </>
                          )}
                          {ticket.status === 'resolved' && (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              Resolvido
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
                          ticket.priority === 'high'
                            ? 'bg-red-100 text-red-700'
                            : ticket.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {ticket.priority === 'high' && 'Alta'}
                          {ticket.priority === 'medium' && 'Média'}
                          {ticket.priority === 'low' && 'Baixa'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-500">
                        {formatDate(ticket.createdAt)}
                      </td>
                      <td className="py-4 px-6 text-gray-500">
                        {formatDate(ticket.lastUpdate)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex justify-end gap-2">
                          <button className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50">
                            <MessageSquare className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50">
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {editingUser && (
        <EditUserModal
          isOpen={true}
          onClose={() => setEditingUser(null)}
          onSubmit={handleUpdateUser}
          user={editingUser}
        />
      )}
    </div>
  );
}