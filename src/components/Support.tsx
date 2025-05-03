import React, { useState } from 'react';
import { MessageCircle, ArrowLeft, Send, Clock, CheckCircle2, AlertCircle, Search, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Ticket {
  id: number;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  lastUpdate: string;
  responses: {
    id: number;
    message: string;
    isAdmin: boolean;
    createdAt: string;
  }[];
}

const mockTickets: Ticket[] = [
  {
    id: 1,
    subject: "Problema com pagamento",
    message: "Não consigo atualizar meu cartão de crédito",
    status: "open",
    priority: "high",
    createdAt: "2024-03-15T10:30:00",
    lastUpdate: "2024-03-15T10:30:00",
    responses: []
  },
  {
    id: 2,
    subject: "Links não funcionando",
    message: "Meus links pararam de funcionar hoje",
    status: "in_progress",
    priority: "medium",
    createdAt: "2024-03-14T15:45:00",
    lastUpdate: "2024-03-15T09:20:00",
    responses: [
      {
        id: 1,
        message: "Por favor, verifique se os links estão corretamente configurados nas suas páginas. Caso o problema persista, me informe para que possamos investigar mais a fundo.",
        isAdmin: true,
        createdAt: "2024-03-15T09:20:00"
      }
    ]
  },
  {
    id: 3,
    subject: "Como mudar username?",
    message: "Preciso alterar meu nome de usuário",
    status: "resolved",
    priority: "low",
    createdAt: "2024-03-13T11:20:00",
    lastUpdate: "2024-03-14T14:30:00",
    responses: [
      {
        id: 1,
        message: "Você pode alterar seu nome de usuário nas configurações do perfil. Vá em Configurações > Perfil > Nome de usuário",
        isAdmin: true,
        createdAt: "2024-03-14T10:30:00"
      },
      {
        id: 2,
        message: "Obrigado! Consegui alterar.",
        isAdmin: false,
        createdAt: "2024-03-14T14:30:00"
      }
    ]
  }
];

export function Support() {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'open' | 'in_progress' | 'resolved'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [newMessage, setNewMessage] = useState('');
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesStatus = selectedStatus === 'all' || ticket.status === selectedStatus;
    const matchesSearch = searchTerm === '' || 
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.message.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle ticket submission logic here
    setNewSubject('');
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-purple-600"
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Suporte</h1>
              <p className="text-gray-600">Como podemos ajudar?</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-lg font-medium mb-4">Envie sua mensagem</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assunto
                </label>
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Ex: Problema com pagamento"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mensagem
                </label>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  rows={5}
                  placeholder="Descreva em detalhes como podemos ajudar..."
                />
              </div>
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Enviar Mensagem
              </button>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium">Seus Tickets</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar tickets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'open' | 'in_progress' | 'resolved')}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                >
                  <option value="all">Todos os status</option>
                  <option value="open">Em aberto</option>
                  <option value="in_progress">Em andamento</option>
                  <option value="resolved">Resolvidos</option>
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {filteredTickets.map((ticket) => (
                <div key={ticket.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-medium">{ticket.subject}</h3>
                      <p className="text-sm text-gray-500">
                        Criado em {formatDate(ticket.createdAt)}
                      </p>
                    </div>
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
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-gray-700">{ticket.message}</p>
                  </div>

                  {ticket.responses.length > 0 && (
                    <div className="space-y-4">
                      {ticket.responses.map((response) => (
                        <div
                          key={response.id}
                          className={`flex ${response.isAdmin ? 'justify-start' : 'justify-end'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              response.isAdmin
                                ? 'bg-gray-100'
                                : 'bg-purple-50'
                            }`}
                          >
                            <p className="text-sm">{response.message}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDate(response.createdAt)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {ticket.status !== 'resolved' && (
                    <div className="mt-4 pt-4 border-t">
                      <textarea
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        rows={2}
                        placeholder="Responder..."
                      />
                      <div className="flex justify-end mt-2">
                        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Enviar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}