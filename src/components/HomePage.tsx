import React, { useState } from 'react';
import { Link, Sparkles, BarChart3, Palette, Shield, ArrowRight, CheckCircle2, Instagram, Youtube, Twitter, Facebook, Linkedin, TwitchIcon, Globe, UserPlus, LogIn, LayoutGrid, LineChart, Settings, Users, ArrowDown, Layers, Clock, QrCode, Smartphone, Zap, Calendar, PaintBucket, MousePointer2, Award, Crown, Rocket, Mail, HelpCircle, FileText, MessageCircle, Share2, BarChart, FormInput, Wand2, BookText as TikTok, Music, Video, Store, CalendarDays } from 'lucide-react';
import { RegisterModal } from './RegisterModal';
import { LoginModal } from './LoginModal';
import { motion } from 'framer-motion';

export function HomePage() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const handleRegisterClick = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  const features = [
    {
      icon: <PaintBucket className="w-8 h-8 text-purple-600" />,
      title: "Customização Total",
      description: "Altere cores, fontes, layout e até o formato dos botões. Use temas prontos ou crie o seu. Aqui, a página tem a sua cara de verdade."
    },
    {
      icon: <MousePointer2 className="w-8 h-8 text-purple-600" />,
      title: "Editor Visual Completo",
      description: "Arraste e solte seus links, seções e botões. Visualize em tempo real como sua página vai ficar. Sem limite de criatividade."
    },
    {
      icon: <Layers className="w-8 h-8 text-purple-600" />,
      title: "Múltiplas Páginas",
      description: "Crie diferentes páginas para diferentes propósitos. Organize seu conteúdo de forma profissional."
    },
    {
      icon: <LineChart className="w-8 h-8 text-purple-600" />,
      title: "Estatísticas Detalhadas",
      description: "Acompanhe cliques, origem dos acessos e comportamento dos visitantes em tempo real."
    },
    {
      icon: <LayoutGrid className="w-8 h-8 text-purple-600" />,
      title: "Blocos e Layouts Flexíveis",
      description: "Organize seu conteúdo com diferentes tipos de blocos e layouts personalizáveis."
    },
    {
      icon: <Calendar className="w-8 h-8 text-purple-600" />,
      title: "Links Programados",
      description: "Agende links para aparecerem e desaparecerem automaticamente em datas e horários específicos."
    }
  ];

  const examples = [
    {
      image: "https://images.unsplash.com/photo-1604079628040-94301bb21b91?w=800",
      title: "Perfil Minimalista",
      description: "Design clean e moderno"
    },
    {
      image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800",
      title: "Perfil Artístico",
      description: "Layout criativo e único"
    },
    {
      image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800",
      title: "Perfil Profissional",
      description: "Visual corporativo e elegante"
    }
  ];

  const testimonials = [
    {
      content: "Usei o Linktree por anos, mas mudei e nunca mais volto! A customização e as estatísticas são incomparáveis.",
      author: "@joaoinfluencer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      role: "Influenciador Digital"
    },
    {
      content: "Finalmente encontrei uma plataforma que me permite ter total controle sobre o design da minha página!",
      author: "@mariadesign",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      role: "Designer"
    },
    {
      content: "As estatísticas detalhadas me ajudaram a entender melhor meu público e otimizar minha estratégia.",
      author: "@pedromarketing",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      role: "Marketing Digital"
    }
  ];

  const mainFeatures = [
    {
      title: "Crie e personalize em minutos",
      description: "Conecte seu TikTok, Instagram, Twitter, site, loja, vídeos, músicas, podcasts, eventos e muito mais. Tudo isso reunido em uma landing page com link na bio, projetada para conversão.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      icons: [
        <TikTok className="w-6 h-6" />,
        <Instagram className="w-6 h-6" />,
        <Twitter className="w-6 h-6" />,
        <Store className="w-6 h-6" />,
        <Video className="w-6 h-6" />,
        <Music className="w-6 h-6" />,
        <CalendarDays className="w-6 h-6" />
      ]
    },
    {
      title: "Compartilhe em todas as suas redes",
      description: "Adicione seu LinkFolio na bio do Instagram, TikTok, Twitter e outras redes sociais. Um único link para todo seu conteúdo.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800",
      icons: [
        <Share2 className="w-6 h-6" />,
        <Globe className="w-6 h-6" />
      ]
    },
    {
      title: "Analise seu público",
      description: "Acompanhe em tempo real o desempenho dos seus links, entenda o comportamento do seu público e tome decisões baseadas em dados.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      icons: [
        <BarChart className="w-6 h-6" />,
        <Users className="w-6 h-6" />
      ]
    },
    {
      title: "Capture leads com formulários",
      description: "Em breve: Crie formulários personalizados para captura de leads diretamente na sua página.",
      image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=800",
      icons: [
        <FormInput className="w-6 h-6" />,
        <Mail className="w-6 h-6" />
      ],
      comingSoon: true
    }
  ];

  const faqs = [
    {
      question: "Como funciona o LinkFolio?",
      answer: "O LinkFolio é uma plataforma que permite você criar uma página personalizada com todos os seus links importantes. Basta se cadastrar, adicionar seus links e personalizar sua página do seu jeito."
    },
    {
      question: "Posso personalizar a aparência da minha página?",
      answer: "Sim! Você pode escolher cores, fontes, adicionar seu logo, mudar o layout dos botões e muito mais. Temos temas prontos e a opção de criar seu próprio design único."
    },
    {
      question: "Preciso saber programar?",
      answer: "Não! Nossa interface é super intuitiva e fácil de usar. Você pode criar uma página profissional em minutos, sem conhecimento técnico."
    },
    {
      question: "Posso ter mais de uma página?",
      answer: "Sim! Com o LinkFolio você pode criar múltiplas páginas para diferentes propósitos, cada uma com seu próprio design e conjunto de links."
    },
    {
      question: "Como faço para ver as estatísticas dos meus links?",
      answer: "No seu painel de controle, você tem acesso a estatísticas detalhadas como número de cliques, origem dos acessos e horários de maior engajamento."
    },
    {
      question: "Posso programar links para aparecerem em datas específicas?",
      answer: "Sim! Com nossa função de agendamento, você pode definir datas e horários para seus links aparecerem e desaparecerem automaticamente."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Link className="w-6 h-6 text-purple-600" />
              <span className="font-semibold text-xl">LinkFolio</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={handleLoginClick}
                className="text-gray-600 hover:text-purple-600 flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                Entrar
              </button>
              <button 
                onClick={handleRegisterClick}
                className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Registrar
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <Link className="w-12 h-12 text-purple-600" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl font-bold text-gray-900 mb-6"
        >
          Um link para todas suas redes
          <span className="text-purple-600">.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          Conecte todas suas redes sociais em um único link profissional. 
          Compartilhe seu conteúdo de forma elegante e aumente seu alcance.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center gap-4 mb-12"
        >
          <button 
            onClick={handleRegisterClick}
            className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            Criar Minha Página
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
        <div className="flex justify-center items-center gap-8 text-gray-400">
          <Instagram className="w-8 h-8" />
          <Youtube className="w-8 h-8" />
          <Twitter className="w-8 h-8" />
          <Facebook className="w-8 h-8" />
          <Linkedin className="w-8 h-8" />
          <TwitchIcon className="w-8 h-8" />
          <Globe className="w-8 h-8" />
        </div>
        <div className="mt-12 flex justify-center">
          <ArrowDown className="w-6 h-6 text-purple-600 animate-bounce" />
        </div>
      </header>

      {/* Quick & Easy Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-purple-100 p-3 rounded-full">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">Rápido & Fácil de usar</h2>
            <p className="text-xl text-gray-600 mb-12">
              Adicione seus links e pegue sua URL única. Leva menos de 1 minuto para começar.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">1. Crie sua conta</h3>
                <p className="text-gray-600">Registre-se gratuitamente em segundos</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Link className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">2. Adicione seus links</h3>
                <p className="text-gray-600">Organize todo seu conteúdo</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share2 className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">3. Compartilhe</h3>
                <p className="text-gray-600">Use sua URL única em todas as redes</p>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <button
                onClick={handleRegisterClick}
                className="bg-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2 mx-auto"
              >
                Começar Agora
                <Clock className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Como o LinkFolio funciona</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Uma solução completa para gerenciar sua presença online
            </p>
          </div>
          <div className="space-y-32">
            {mainFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center gap-16 ${
                  index % 2 === 1 ? 'flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 space-y-6">
                  <div className="flex gap-3 flex-wrap">
                    {feature.icons.map((icon, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600"
                      >
                        {icon}
                      </motion.div>
                    ))}
                  </div>
                  <h3 className="text-3xl font-bold">
                    {feature.title}
                    {feature.comingSoon && (
                      <span className="ml-3 text-sm bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
                        Em breve
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <motion.div
                  className="flex-1 relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className={`rounded-2xl shadow-2xl ${
                      feature.comingSoon ? 'opacity-75 blur-[2px]' : ''
                    }`}
                  />
                  {feature.comingSoon && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-medium">
                        Em Breve
                      </span>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Por que escolher o LinkFolio?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Mais que um agregador de links, uma plataforma completa para sua presença online
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="py-20 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Galeria de Inspirações</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Veja alguns exemplos do que você pode criar com o LinkFolio
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {examples.map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <img
                  src={example.image}
                  alt={example.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">{example.title}</h3>
                  <p className="text-gray-600">{example.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-sm">
              <Smartphone className="w-5 h-5 text-purple-600" />
              <span className="font-medium">Visual incrível em qualquer dispositivo</span>
            </div>
            <p className="mt-4 text-gray-600">
              Seja no celular ou no computador, sua página carrega rápido, com design moderno e responsivo.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Planos que cabem no seu bolso</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comece grátis e evolua conforme seu crescimento
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white border rounded-xl p-8 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Grátis</h3>
                <span className="text-purple-600 font-bold text-2xl">R$0</span>
              </div>
              <p className="text-gray-600 mb-6">Perfeito para começar</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Links ilimitados</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Temas básicos</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Estatísticas básicas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>QR Code para cada página</span>
                </li>
              </ul>
              <button
                onClick={handleRegisterClick}
                className="w-full py-2 border-2 border-purple-600 text-purple-600 rounded-full hover:bg-purple-50 transition-colors"
              >
                Começar Grátis
              </button>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white border-2 border-purple-600 rounded-xl p-8 hover:shadow-lg transition-shadow relative"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm">
                Mais Popular
              </div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Pro</h3>
                <div className="text-right">
                  <span className="text-purple-600 font-bold text-2xl">R$29</span>
                  <span className="text-gray-500 text-sm">/mês</span>
                </div>
              </div>
              <p className="text-gray-600 mb-6">Para profissionais</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Tudo do plano Grátis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Temas premium</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Estatísticas avançadas</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Domínio personalizado</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Sem marca d'água</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>Atendimento prioritário</span>
                </li>
              </ul>
              <button
                onClick={handleRegisterClick}
                className="w-full py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
              >
                Começar Pro
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">O que dizem nossos usuários</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Histórias reais de pessoas que transformaram sua presença online
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Perguntas Frequentes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tire suas dúvidas sobre o LinkFolio
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer bg-white rounded-lg p-6 hover:bg-gray-50">
                    <h3 className="font-semibold text-lg pr-8">{faq.question}</h3>
                    <span className="text-purple-600 transition-transform duration-300 group-open:rotate-180">
                      <ArrowDown className="w-5 h-5" />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-2">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">
              Comece agora mesmo
              <span className="inline-block ml-2">
                <Rocket className="w-8 h-8 inline animate-bounce" />
              </span>
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Crie sua página em menos de 1 minuto. Sem precisar saber programar.
            </p>
            <button
              onClick={handleRegisterClick}
              className="bg-white text-purple-600 px-10 py-5 rounded-full text-lg font-semibold hover:bg-purple-50 transition-all transform hover:scale-105 inline-flex items-center gap-2 shadow-lg"
            >
              CRIAR MINHA PÁGINA GRÁTIS
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="mt-6 text-sm text-purple-200">
              Junte-se a mais de 10.000 criadores de conteúdo
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Link className="w-6 h-6" />
                <span className="font-semibold text-xl">LinkFolio</span>
              </div>
              <p className="text-gray-400 mb-6">
                Transforme sua presença online com uma página profissional e personalizada.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Recursos</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Preços</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Cases</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    suporte@linkfolio.com
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Política de Privacidade
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400">
                © 2024 LinkFolio. Todos os direitos reservados.
              </p>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-400">Seus dados estão seguros conosco</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <RegisterModal 
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </div>
  );
}