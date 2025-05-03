import React, { useState, useEffect } from 'react';
import { Link as LinkIcon, QrCode, Share2, Pencil, Trash2, Plus, GripVertical } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { NewLinkModal } from './NewLinkModal';
import { QRCodeModal } from './QRCodeModal';
import { DeletePageModal } from './DeletePageModal';
import { PageSettings } from './PageSettings';
import { ProfilePreview } from './ProfilePreview';
import { DashboardSidebar } from './DashboardSidebar';
import { Analytics } from './Analytics';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

interface Link {
  id: string;
  title: string;
  url: string;
  clicks: number;
  expires_at?: string;
  scheduled_from?: string;
  scheduled_to?: string;
  password?: string;
  image_url?: string;
  is_image_link?: boolean;
}

interface Page {
  id: string;
  title: string;
  theme: string;
  background_color: string;
  background_image: string | null;
  button_color: string;
  text_color: string;
  font: string;
  button_radius: string;
  button_animation: string;
  show_logo: boolean;
  bio: string;
}

function SortableLink({ link, onShowQRCode, onCopyLink, onEdit, onDelete }: { 
  link: Link;
  onShowQRCode: (url: string) => void;
  onCopyLink: (url: string) => void;
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr ref={setNodeRef} style={style} className="border-b last:border-0">
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
            <GripVertical className="w-5 h-5 text-gray-400" />
          </button>
          <LinkIcon className="w-5 h-5 text-gray-400" />
          <span>{link.title}</span>
        </div>
      </td>
      <td className="py-4 px-6">
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 hover:underline"
        >
          {link.url}
        </a>
      </td>
      <td className="py-4 px-6 text-center">{link.clicks || 0}</td>
      <td className="py-4 px-6">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onShowQRCode(link.url)}
            className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50"
            title="Gerar QR Code"
          >
            <QrCode className="w-4 h-4" />
          </button>
          <button
            onClick={() => onCopyLink(link.url)}
            className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50"
            title="Copiar Link"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onEdit(link)}
            className="p-2 text-gray-600 hover:text-purple-600 rounded-lg hover:bg-purple-50"
            title="Editar Link"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(link.id)}
            className="p-2 text-red-600 hover:text-red-700 rounded-lg hover:bg-red-50"
            title="Excluir Link"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export function Dashboard() {
  const navigate = useNavigate();
  const { profile, signOut } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'links' | 'appearance' | 'analytics'>('links');
  const [isNewLinkModalOpen, setIsNewLinkModalOpen] = useState(false);
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedQRUrl, setSelectedQRUrl] = useState('');
  const [links, setLinks] = useState<Link[]>([]);
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingLink, setEditingLink] = useState<Link | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (profile?.id) {
      fetchPageAndLinks();
    }
  }, [profile?.id]);

  const fetchPageAndLinks = async () => {
    if (!profile?.id) {
      setError('No authenticated user');
      setLoading(false);
      return;
    }

    try {
      const { data: pages, error: pageError } = await supabase
        .from('pages')
        .select('*')
        .eq('user_id', profile.id)
        .limit(1)
        .single();

      if (pageError && pageError.code === 'PGRST116') {
        const { data: newPage, error: createError } = await supabase
          .from('pages')
          .insert([{
            user_id: profile.id,
            title: 'Minha Página',
            slug: `page-${Date.now()}`,
          }])
          .select()
          .single();

        if (createError) throw createError;
        setPage(newPage);
      } else if (pageError) {
        throw pageError;
      } else {
        setPage(pages);
      }

      const { data: pageLinks, error: linksError } = await supabase
        .from('links')
        .select('*')
        .order('created_at', { ascending: false });

      if (linksError) throw linksError;
      setLinks(pageLinks || []);
    } catch (err: any) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShowQRCode = (url: string) => {
    setSelectedQRUrl(url);
    setIsQRCodeModalOpen(true);
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  const handleEditLink = (link: Link) => {
    setEditingLink(link);
    setIsNewLinkModalOpen(true);
  };

  const handleDeleteLink = async (linkId: string) => {
    try {
      const { error } = await supabase
        .from('links')
        .delete()
        .eq('id', linkId);

      if (error) throw error;
      setLinks(links.filter(link => link.id !== linkId));
    } catch (err: any) {
      console.error('Error deleting link:', err);
      setError(err.message);
    }
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = links.findIndex((link) => link.id === active.id);
      const newIndex = links.findIndex((link) => link.id === over.id);
      
      const newLinks = [...links];
      const [movedLink] = newLinks.splice(oldIndex, 1);
      newLinks.splice(newIndex, 0, movedLink);
      
      setLinks(newLinks);

      try {
        console.log('New order:', newLinks.map(link => link.id));
      } catch (err) {
        console.error('Error updating link order:', err);
      }
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Não autenticado</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Voltar para o início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
        onSignOut={handleSignOut}
      />

      <div className="flex-1 flex">
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold">
                  {activeTab === 'links' 
                    ? 'Links' 
                    : activeTab === 'appearance'
                    ? 'Aparência'
                    : 'Análise'}
                </h1>
                <p className="text-gray-600">
                  {activeTab === 'links'
                    ? 'Gerencie os links desta página'
                    : activeTab === 'appearance'
                    ? 'Personalize o visual da sua página'
                    : 'Acompanhe o desempenho dos seus links'}
                </p>
              </div>
              {activeTab === 'links' && (
                <button
                  onClick={() => {
                    setEditingLink(null);
                    setIsNewLinkModalOpen(true);
                  }}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Novo Link
                </button>
              )}
            </div>

            {activeTab === 'links' ? (
              <>
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1">
                      <h2 className="text-lg font-medium mb-1">Link da Página</h2>
                      <p className="text-orange-500">
                        Defina seu nome de usuário nas configurações
                      </p>
                    </div>
                    <button
                      onClick={() => handleShowQRCode('https://example.com')}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <QrCode className="w-5 h-5" />
                      <span>QR Code</span>
                    </button>
                    <button
                      onClick={() => handleCopyLink('https://example.com')}
                      className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <Share2 className="w-5 h-5" />
                      <span>Copiar Link</span>
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50 border-b">
                          <th className="text-left py-4 px-6 font-medium text-gray-600">Título</th>
                          <th className="text-left py-4 px-6 font-medium text-gray-600">URL</th>
                          <th className="text-center py-4 px-6 font-medium text-gray-600">Cliques</th>
                          <th className="text-right py-4 px-6 font-medium text-gray-600">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan={4} className="text-center py-4">Carregando...</td>
                          </tr>
                        ) : error ? (
                          <tr>
                            <td colSpan={4} className="text-center py-4 text-red-600">{error}</td>
                          </tr>
                        ) : links.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="text-center py-4">Nenhum link encontrado</td>
                          </tr>
                        ) : (
                          <SortableContext
                            items={links.map(link => link.id)}
                            strategy={verticalListSortingStrategy}
                          >
                            {links.map((link) => (
                              <SortableLink
                                key={link.id}
                                link={link}
                                onShowQRCode={handleShowQRCode}
                                onCopyLink={handleCopyLink}
                                onEdit={handleEditLink}
                                onDelete={handleDeleteLink}
                              />
                            ))}
                          </SortableContext>
                        )}
                      </tbody>
                    </table>
                  </DndContext>
                </div>
              </>
            ) : activeTab === 'appearance' ? (
              page && <PageSettings pageId={page.id} onSuccess={fetchPageAndLinks} />
            ) : (
              <Analytics />
            )}
          </div>
        </div>

        <div className="w-[420px] bg-gray-100 border-l p-8 flex items-center justify-center">
          <ProfilePreview
            profile={{
              username: profile?.username || '',
              bio: page?.bio || '',
              avatar: '',
              theme: page?.theme || 'light',
              backgroundColor: page?.background_color || '#ffffff',
              backgroundImage: page?.background_image || '',
              buttonColor: page?.button_color || '#6b46c1',
              textColor: page?.text_color || '#1a202c',
              font: page?.font || 'Inter',
              buttonRadius: page?.button_radius || '0.5rem',
              buttonAnimation: page?.button_animation || 'none',
              showLogo: page?.show_logo || true,
            }}
            links={links}
          />
        </div>
      </div>

      <NewLinkModal
        isOpen={isNewLinkModalOpen}
        onClose={() => {
          setIsNewLinkModalOpen(false);
          setEditingLink(null);
        }}
        pageId={page?.id}
        onSuccess={() => {
          setIsNewLinkModalOpen(false);
          setEditingLink(null);
          fetchPageAndLinks();
        }}
        initialData={editingLink}
      />

      <QRCodeModal
        isOpen={isQRCodeModalOpen}
        onClose={() => setIsQRCodeModalOpen(false)}
        url={selectedQRUrl}
      />

      <DeletePageModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          setIsDeleteModalOpen(false);
        }}
        pageName="Minha Página"
      />
    </div>
  );
}