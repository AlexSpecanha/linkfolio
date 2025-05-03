import React, { useState } from 'react';
import { X, Crown, Star } from 'lucide-react';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { id: number; plan: 'free' | 'pro' }) => void;
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
    plan: 'free' | 'pro';
  };
}

export function EditUserModal({ isOpen, onClose, onSubmit, user }: EditUserModalProps) {
  const [plan, setPlan] = useState<'free' | 'pro'>(user.plan);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ id: user.id, plan });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Editar Usuário</h2>

          <div className="mb-6">
            <h3 className="font-medium mb-2">{user.name}</h3>
            <div className="text-sm text-gray-500">
              <p>{user.username}</p>
              <p>{user.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Plano do Usuário
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPlan('free')}
                  className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                    plan === 'free'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-600'
                  }`}
                >
                  <Star className={`w-6 h-6 ${plan === 'free' ? 'text-purple-600' : 'text-gray-400'}`} />
                  <span className={plan === 'free' ? 'text-purple-600' : 'text-gray-600'}>Grátis</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPlan('pro')}
                  className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                    plan === 'pro'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-600'
                  }`}
                >
                  <Crown className={`w-6 h-6 ${plan === 'pro' ? 'text-purple-600' : 'text-gray-400'}`} />
                  <span className={plan === 'pro' ? 'text-purple-600' : 'text-gray-600'}>Pro</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Salvar Alterações
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}