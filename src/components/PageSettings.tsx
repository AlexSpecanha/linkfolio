import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Palette, Save, Loader2, Image as ImageIcon, Trash2, Upload } from 'lucide-react';

interface PageSettingsProps {
  pageId: string;
  onSuccess?: () => void;
}

interface PageSettings {
  theme: string;
  backgroundColor: string;
  backgroundImage: string | null;
  buttonColor: string;
  textColor: string;
  font: string;
  buttonRadius: string;
  buttonAnimation: string;
  showLogo: boolean;
  bio: string;
}

const fonts = [
  'Inter',
  'Poppins',
  'Playfair Display',
  'Montserrat',
  'Roboto',
  'Open Sans',
  'Lora',
];

const themes = [
  { 
    id: 'light',
    name: 'Light',
    preview: {
      background: '#ffffff',
      text: '#1a202c',
      button: '#6b46c1'
    }
  },
  { 
    id: 'dark',
    name: 'Dark',
    preview: {
      background: '#1a202c',
      text: '#ffffff',
      button: '#9f7aea'
    }
  },
  { 
    id: 'purple',
    name: 'Purple',
    preview: {
      background: '#6b46c1',
      text: '#ffffff',
      button: '#ffffff'
    }
  },
  { 
    id: 'gradient-purple',
    name: 'Gradient Purple',
    preview: {
      background: 'linear-gradient(135deg, #6b46c1 0%, #9f7aea 100%)',
      text: '#ffffff',
      button: '#ffffff'
    }
  },
  { 
    id: 'gradient-blue',
    name: 'Gradient Blue',
    preview: {
      background: 'linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)',
      text: '#ffffff',
      button: '#ffffff'
    }
  },
  { 
    id: 'gradient-sunset',
    name: 'Gradient Sunset',
    preview: {
      background: 'linear-gradient(135deg, #f97316 0%, #fbbf24 100%)',
      text: '#ffffff',
      button: '#ffffff'
    }
  },
  { 
    id: 'gradient-green',
    name: 'Gradient Green',
    preview: {
      background: 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
      text: '#ffffff',
      button: '#ffffff'
    }
  },
  { 
    id: 'gradient-pink',
    name: 'Gradient Pink',
    preview: {
      background: 'linear-gradient(135deg, #db2777 0%, #f472b6 100%)',
      text: '#ffffff',
      button: '#ffffff'
    }
  },
  { 
    id: 'nature',
    name: 'Nature',
    preview: {
      background: 'url(https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=400)',
      text: '#ffffff',
      button: 'rgba(255, 255, 255, 0.2)'
    }
  },
  { 
    id: 'urban',
    name: 'Urban',
    preview: {
      background: 'url(https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=400)',
      text: '#ffffff',
      button: 'rgba(255, 255, 255, 0.2)'
    }
  },
  { 
    id: 'minimal',
    name: 'Minimal',
    preview: {
      background: '#f8fafc',
      text: '#1a202c',
      button: '#e2e8f0'
    }
  },
  { 
    id: 'neon',
    name: 'Neon',
    preview: {
      background: '#000000',
      text: '#00ff00',
      button: '#ff00ff'
    }
  },
  { 
    id: 'custom',
    name: 'Custom',
    preview: {
      background: '#ffffff',
      text: '#1a202c',
      button: '#6b46c1'
    }
  }
];

const buttonAnimations = [
  { id: 'none', name: 'None' },
  { id: 'scale', name: 'Scale' },
  { id: 'slide', name: 'Slide' },
  { id: 'glow', name: 'Glow' },
  { id: 'pulse', name: 'Pulse' },
  { id: 'shake', name: 'Shake' },
];

export function PageSettings({ pageId, onSuccess }: PageSettingsProps) {
  const [settings, setSettings] = useState<PageSettings>({
    theme: 'light',
    backgroundColor: '#ffffff',
    backgroundImage: null,
    buttonColor: '#6b46c1',
    textColor: '#1a202c',
    font: 'Inter',
    buttonRadius: '0.5rem',
    buttonAnimation: 'none',
    showLogo: true,
    bio: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchSettings();
  }, [pageId]);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('pages')
        .select('theme, background_color, background_image, button_color, text_color, font, button_radius, button_animation, show_logo, bio')
        .eq('id', pageId)
        .single();

      if (error) throw error;

      if (data) {
        setSettings({
          theme: data.theme || 'light',
          backgroundColor: data.background_color || '#ffffff',
          backgroundImage: data.background_image,
          buttonColor: data.button_color || '#6b46c1',
          textColor: data.text_color || '#1a202c',
          font: data.font || 'Inter',
          buttonRadius: data.button_radius || '0.5rem',
          buttonAnimation: data.button_animation || 'none',
          showLogo: data.show_logo ?? true,
          bio: data.bio || '',
        });
      }
    } catch (err: any) {
      console.error('Error fetching settings:', err);
      setError(err.message);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError('Image size must be less than 5MB');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `backgrounds/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from('public')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            setUploadProgress((progress.loaded / progress.total) * 100);
          },
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('public')
        .getPublicUrl(filePath);

      setSettings({ ...settings, backgroundImage: publicUrl });
    } catch (err: any) {
      console.error('Error uploading image:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleThemeSelect = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (!theme) return;

    let newSettings = {
      ...settings,
      theme: themeId,
    };

    // Apply theme defaults unless it's custom
    if (themeId !== 'custom') {
      newSettings = {
        ...newSettings,
        backgroundColor: theme.preview.background.startsWith('linear-gradient') || theme.preview.background.startsWith('url') 
          ? '#ffffff' 
          : theme.preview.background,
        backgroundImage: theme.preview.background.startsWith('url')
          ? theme.preview.background.slice(4, -1).replace(/['"]/g, '')
          : null,
        buttonColor: theme.preview.button,
        textColor: theme.preview.text,
      };
    }

    setSettings(newSettings);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase
        .from('pages')
        .update({
          theme: settings.theme,
          background_color: settings.backgroundColor,
          background_image: settings.backgroundImage,
          button_color: settings.buttonColor,
          text_color: settings.textColor,
          font: settings.font,
          button_radius: settings.buttonRadius,
          button_animation: settings.buttonAnimation,
          show_logo: settings.showLogo,
          bio: settings.bio,
        })
        .eq('id', pageId);

      if (error) throw error;

      onSuccess?.();
    } catch (err: any) {
      console.error('Error saving settings:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <Palette className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-lg font-medium">Aparência</h2>
            <p className="text-sm text-gray-600">Personalize o visual da sua página</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              value={settings.bio}
              onChange={(e) => setSettings({ ...settings, bio: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              rows={3}
              placeholder="Fale um pouco sobre você..."
              maxLength={160}
            />
            <p className="mt-1 text-sm text-gray-500">
              {settings.bio.length}/160 caracteres
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Tema
            </label>
            <div className="grid grid-cols-3 gap-4">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => handleThemeSelect(theme.id)}
                  className={`aspect-video rounded-lg p-4 flex flex-col items-center justify-center gap-2 border-2 transition-all ${
                    settings.theme === theme.id
                      ? 'border-purple-600 ring-2 ring-purple-100'
                      : 'border-gray-200 hover:border-purple-600'
                  }`}
                  style={{
                    background: theme.preview.background,
                    color: theme.preview.text,
                  }}
                >
                  <div 
                    className="w-16 h-8 rounded-lg"
                    style={{ 
                      background: theme.preview.button,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  />
                  <span className="font-medium" style={{ 
                    color: theme.preview.text,
                    textShadow: theme.id !== 'light' ? '0 1px 2px rgba(0,0,0,0.3)' : 'none'
                  }}>
                    {theme.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {settings.theme === 'custom' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cor de Fundo
                </label>
                <input
                  type="color"
                  value={settings.backgroundColor}
                  onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
                  className="w-full h-10 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagem de Fundo
                </label>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <input
                      type="url"
                      value={settings.backgroundImage || ''}
                      onChange={(e) => setSettings({ ...settings, backgroundImage: e.target.value })}
                      placeholder="URL da imagem (opcional)"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <button
                        type="button"
                        className="h-full px-4 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                      >
                        <Upload className="w-4 h-4" />
                        Upload
                      </button>
                    </div>
                  </div>

                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-purple-600 h-2.5 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}

                  {settings.backgroundImage && (
                    <div className="relative">
                      <img
                        src={settings.backgroundImage}
                        alt="Background Preview"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setSettings({ ...settings, backgroundImage: null })}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cor dos Botões
                </label>
                <input
                  type="color"
                  value={settings.buttonColor}
                  onChange={(e) => setSettings({ ...settings, buttonColor: e.target.value })}
                  className="w-full h-10 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cor do Texto
                </label>
                <input
                  type="color"
                  value={settings.textColor}
                  onChange={(e) => setSettings({ ...settings, textColor: e.target.value })}
                  className="w-full h-10 rounded-lg cursor-pointer"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fonte
            </label>
            <select
              value={settings.font}
              onChange={(e) => setSettings({ ...settings, font: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              {fonts.map((font) => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Formato dos Botões
            </label>
            <div className="grid grid-cols-4 gap-3">
              {['0rem', '0.5rem', '1rem', '9999px'].map((radius) => (
                <button
                  key={radius}
                  type="button"
                  onClick={() => setSettings({ ...settings, buttonRadius: radius })}
                  className={`h-10 border transition-colors ${
                    settings.buttonRadius === radius
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-600'
                  }`}
                  style={{ borderRadius: radius }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Animação dos Botões
            </label>
            <div className="grid grid-cols-3 gap-3">
              {buttonAnimations.map((animation) => (
                <button
                  key={animation.id}
                  type="button"
                  onClick={() => setSettings({ ...settings, buttonAnimation: animation.id })}
                  className={`p-2 border rounded-lg text-center transition-colors ${
                    settings.buttonAnimation === animation.id
                      ? 'border-purple-600 bg-purple-50 text-purple-600'
                      : 'border-gray-200 hover:border-purple-600'
                  }`}
                >
                  {animation.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-gray-700">Mostrar Logo</span>
              <p className="text-sm text-gray-500">
                Exibir "Feito com LinkFolio" no rodapé
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showLogo}
                onChange={(e) => setSettings({ ...settings, showLogo: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:bg-purple-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Salvar Alterações
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}