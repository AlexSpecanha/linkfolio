import React from 'react';
import { Upload, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface LinkItem {
  id: number;
  title: string;
  url: string;
  clicks: number;
  expiresAt?: string;
  scheduledFrom?: string;
  scheduledTo?: string;
  password?: string;
  image?: string;
  isImageLink?: boolean;
}

interface Profile {
  username: string;
  bio: string;
  avatar: string;
  theme: 'light' | 'dark' | 'purple' | 'gradient-purple' | 'gradient-blue' | 'gradient-sunset' | 'nature' | 'urban' | 'custom';
  backgroundColor: string;
  backgroundImage: string;
  buttonColor: string;
  textColor: string;
  font: string;
  buttonRadius: string;
  buttonAnimation: string;
  showLogo: boolean;
}

interface ProfilePreviewProps {
  profile: Profile;
  links: LinkItem[];
}

const buttonAnimations = {
  none: {},
  scale: {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  },
  slide: {
    whileHover: { x: 5 },
    whileTap: { x: -2 },
    transition: { type: "spring", stiffness: 400, damping: 17 }
  },
  glow: {
    whileHover: { 
      boxShadow: "0 0 8px rgba(255,255,255,0.5)",
      transition: { duration: 0.2 }
    }
  }
};

export function ProfilePreview({ profile, links }: ProfilePreviewProps) {
  const getThemeStyles = () => {
    switch (profile.theme) {
      case 'dark':
        return {
          background: 'bg-gray-900',
          text: 'text-white',
          button: 'bg-white/10 hover:bg-white/20'
        };
      case 'purple':
        return {
          background: 'bg-purple-600',
          text: 'text-white',
          button: 'bg-white/10 hover:bg-white/20'
        };
      case 'gradient-purple':
      case 'gradient-blue':
      case 'gradient-sunset':
      case 'nature':
      case 'urban':
      case 'custom':
        return {
          background: '',
          text: '',
          button: ''
        };
      default:
        return {
          background: 'bg-white',
          text: 'text-gray-900',
          button: 'bg-gray-100 hover:bg-gray-200'
        };
    }
  };

  const themeStyles = getThemeStyles();
  const customStyle = profile.theme !== 'light' && profile.theme !== 'dark' && profile.theme !== 'purple' ? {
    background: profile.backgroundImage 
      ? `url(${profile.backgroundImage}) center/cover`
      : profile.backgroundColor,
    color: profile.textColor,
    fontFamily: profile.font || 'Inter, sans-serif'
  } : {};

  const buttonStyle = profile.theme !== 'light' && profile.theme !== 'dark' && profile.theme !== 'purple' ? {
    backgroundColor: profile.buttonColor,
    color: profile.textColor,
    borderRadius: profile.buttonRadius || '0.5rem',
    fontFamily: profile.font || 'Inter, sans-serif'
  } : {};

  const containerAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const getButtonAnimation = (index: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { delay: index * 0.1 }
    },
    ...buttonAnimations[profile.buttonAnimation as keyof typeof buttonAnimations]
  });

  const getActiveLinks = () => {
    const now = new Date();
    return links.filter(link => {
      const isExpired = link.expiresAt && new Date(link.expiresAt) < now;
      const isScheduledForFuture = link.scheduledFrom && new Date(link.scheduledFrom) > now;
      const isScheduledForPast = link.scheduledTo && new Date(link.scheduledTo) < now;
      return !isExpired && !isScheduledForFuture && !isScheduledForPast;
    });
  };

  const activeLinks = getActiveLinks();

  return (
    <motion.div 
      className="w-[375px] h-[667px] bg-gray-100 rounded-profile p-6 shadow-xl overflow-hidden"
      {...containerAnimation}
    >
      <motion.div
        className={`h-full rounded-3xl p-6 space-y-6 ${themeStyles.background} ${themeStyles.text} overflow-y-auto`}
        style={customStyle}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {profile.avatar ? (
            <motion.img
              src={profile.avatar}
              alt={profile.username}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            />
          ) : (
            <motion.div 
              className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Upload className="w-8 h-8 text-gray-400" />
            </motion.div>
          )}
          <motion.h2 
            className="text-xl font-bold mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            @{profile.username || 'username'}
          </motion.h2>
          <motion.p 
            className="text-center text-sm opacity-75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {profile.bio || 'Sua bio aparecerá aqui'}
          </motion.p>
        </motion.div>
        <div className="space-y-3">
          {activeLinks.map((link, index) => (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block w-full overflow-hidden ${link.isImageLink ? 'rounded-lg' : 'p-3 rounded-lg text-center'} transition-all ${themeStyles.button}`}
              style={buttonStyle}
              {...getButtonAnimation(index)}
            >
              {link.isImageLink && link.image ? (
                <div className="relative">
                  <img
                    src={link.image}
                    alt={link.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <span className="text-white font-medium">{link.title}</span>
                  </div>
                </div>
              ) : (
                link.title
              )}
            </motion.a>
          ))}
        </div>
        
        {profile.showLogo && (
          <motion.div
            className="flex items-center justify-center gap-2 mt-6 opacity-75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{ delay: 0.6 }}
          >
            <LinkIcon className="w-4 h-4" />
            <span className="text-sm">LinkFolio</span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}