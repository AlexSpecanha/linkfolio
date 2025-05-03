import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Lock, Image as ImageIcon, Link as LinkIcon, Upload, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

interface NewLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageId?: string;
  onSuccess?: () => void;
  initialData?: { 
    id?: string;
    title: string; 
    url: string;
    expiresAt?: string;
    scheduledFrom?: string;
    scheduledTo?: string;
    password?: string;
    image?: string;
    isImageLink?: boolean;
  } | null;
}

export function NewLinkModal({ isOpen, onClose, pageId, onSuccess, initialData }: NewLinkModalProps) {
  const { profile } = useAuthStore();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [hasExpiration, setHasExpiration] = useState(false);
  const [expiresAt, setExpiresAt] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledFrom, setScheduledFrom] = useState('');
  const [scheduledTo, setScheduledTo] = useState('');
  const [isProtected, setIsProtected] = useState(false);
  const [password, setPassword] = useState('');
  const [isImageLink, setIsImageLink] = useState(false);
  const [image, setImage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setUrl(initialData.url);
      setExpiresAt(initialData.expiresAt || '');
      setHasExpiration(!!initialData.expiresAt);
      setScheduledFrom(initialData.scheduledFrom || '');
      setScheduledTo(initialData.scheduledTo || '');
      setIsScheduled(!!(initialData.scheduledFrom || initialData.scheduledTo));
      setPassword(initialData.password || '');
      setIsProtected(!!initialData.password);
      setImage(initialData.image || '');
      setIsImageLink(!!initialData.isImageLink);
    } else {
      resetForm();
    }
  }, [initialData]);

  const resetForm = () => {
    setTitle('');
    setUrl('');
    setExpiresAt('');
    setHasExpiration(false);
    setScheduledFrom('');
    setScheduledTo('');
    setIsScheduled(false);
    setPassword('');
    setIsProtected(false);
    setImage('');
    setIsImageLink(false);
    setError('');
  };

  if (!isOpen || !profile) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError('Image size must be less than 10MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // If no pageId is provided, create a new page first
      let finalPageId = pageId;
      
      if (!finalPageId) {
        const { data: pageData, error: pageError } = await supabase
          .from('pages')
          .insert([{
            user_id: profile.id,
            title: 'Minha Página',
            slug: `page-${Date.now()}`,
          }])
          .select()
          .single();

        if (pageError) throw pageError;
        finalPageId = pageData.id;
      }

      const linkData = {
        page_id: finalPageId,
        title,
        url: url.startsWith('http') ? url : `https://${url}`,
        expires_at: hasExpiration ? expiresAt : null,
        scheduled_from: isScheduled ? scheduledFrom : null,
        scheduled_to: isScheduled ? scheduledTo : null,
        password: isProtected ? password : null,
        image_url: isImageLink ? image : null,
        is_image_link: isImageLink
      };

      const { data: newLink, error: linkError } = await supabase
        .from('links')
        .insert([linkData])
        .select()
        .single();

      if (linkError) throw linkError;

      onSuccess?.();
      onClose();
      resetForm();
    } catch (err: any) {
      console.error('Error saving link:', err);
      setError(err.message || 'An error occurred while saving the link');
    } finally {
      setLoading(false);
    }
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
          <h2 className="text-2xl font-bold mb-6 text-center">
            {initialData ? 'Editar Link' : 'Novo Link'}
          </h2>

          {error && (
            <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div>
                  <h4 className="font-medium">Link com Imagem</h4>
                  <p className="text-sm text-gray-600">
                    Exibir uma imagem/banner no link
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsImageLink(!isImageLink)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  isImageLink ? 'bg-purple-600' : 'bg-gray-200'
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                    isImageLink ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="Ex: Instagram"
                required
              />
            </div>

            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                URL
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="https://..."
                required
              />
            </div>

            {isImageLink && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imagem/Banner
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    {image ? (
                      <div className="relative">
                        <img
                          src={image}
                          alt="Preview"
                          className="mx-auto h-32 w-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setImage('')}
                          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500">
                            <span>Upload da imagem</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">ou arraste e solte</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF até 10MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Expiração</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasExpiration}
                    onChange={(e) => setHasExpiration(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              
              {hasExpiration && (
                <div>
                  <label htmlFor="expiresAt" className="block text-sm text-gray-600 mb-1">
                    Data de expiração
                  </label>
                  <input
                    type="datetime-local"
                    id="expiresAt"
                    value={expiresAt}
                    onChange={(e) => setExpiresAt(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    required={hasExpiration}
                  />
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Agendamento</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isScheduled}
                    onChange={(e) => setIsScheduled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              {isScheduled && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="scheduledFrom" className="block text-sm text-gray-600 mb-1">
                      Mostrar a partir de
                    </label>
                    <input
                      type="datetime-local"
                      id="scheduledFrom"
                      value={scheduledFrom}
                      onChange={(e) => setScheduledFrom(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      required={isScheduled}
                    />
                  </div>
                  <div>
                    <label htmlFor="scheduledTo" className="block text-sm text-gray-600 mb-1">
                      Mostrar até
                    </label>
                    <input
                      type="datetime-local"
                      id="scheduledTo"
                      value={scheduledTo}
                      onChange={(e) => setScheduledTo(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Proteção por Senha</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isProtected}
                    onChange={(e) => setIsProtected(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              {isProtected && (
                <div>
                  <label htmlFor="password" className="block text-sm text-gray-600 mb-1">
                    Senha
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Digite a senha"
                    required={isProtected}
                    minLength={4}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Mínimo de 4 caracteres
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:bg-purple-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {initialData ? 'Salvando...' : 'Criando...'}
                </>
              ) : (
                initialData ? 'Salvar Alterações' : 'Adicionar Link'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}