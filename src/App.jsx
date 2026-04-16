import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Thermometer, 
  ShieldCheck, 
  Activity, 
  Database, 
  ArrowRight, 
  CheckCircle2, 
  Mail, 
  ChevronDown, 
  Globe, 
  Zap, 
  Menu, 
  X,
  FileText,
  Clock,
  ShieldAlert,
  Loader2,
  Sparkles,
  MessageSquare
} from 'lucide-react';

// --- ICONOS DE REDES SOCIALES (SVG Personalizados para evitar errores de librería) ---
const InstagramIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const FacebookIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const LinkedinIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
);

// --- CONFIGURACIÓN DE LA API DE GEMINI ---
const apiKey = ""; 

const callGemini = async (prompt, systemInstruction) => {
  let delay = 1000;
  for (let i = 0; i < 5; i++) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] }
        })
      });
      if (!response.ok) throw new Error('API Error');
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text;
    } catch (error) {
      if (i === 4) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
};

// --- VARIANTES DE ANIMACIÓN ---

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const tabTransition = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.4 }
};

const mobileMenuVariants = {
  closed: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  open: { opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeInOut" } }
};

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    empresa: '',
    mensaje: ''
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const NavItem = ({ id, label, mobile = false }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setIsMenuOpen(false);
      }}
      className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors ${mobile ? 'text-left w-full py-4 border-b border-white/5' : ''}`}
    >
      <span className={activeTab === id ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}>
        {label}
      </span>
      {!mobile && activeTab === id && (
        <motion.div 
          layoutId="navUnderline"
          className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400"
        />
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#020408] text-gray-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* Orbes de Fondo */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{ 
            x: [0, 100, 0], 
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0], 
            y: [0, 100, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-700/10 rounded-full blur-[150px]"
        />
      </div>

      {/* Navegación */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled || isMenuOpen ? 'bg-[#05080f]/95 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Thermometer className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              RIGHI <span className="text-cyan-400 font-light">COLDCHAIN</span>
            </span>
          </motion.div>

          {/* Nav de Escritorio */}
          <div className="hidden md:flex items-center gap-2">
            <NavItem id="home" label="HOME" />
            <NavItem id="biosystems" label="BIOSYSTEMS" />
            <NavItem id="cryobank" label="CRYOBANK" />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className="ml-6 px-6 py-2 bg-white text-black text-sm font-extrabold rounded-full hover:bg-cyan-400 transition-colors shadow-lg"
            >
              CONTACTAR
            </motion.button>
          </div>

          <button 
            className="md:hidden text-white p-2 focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} className="text-cyan-400" /> : <Menu size={28} />}
          </button>
        </div>

        {/* Contenido del Menú Móvil */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="md:hidden bg-[#05080f] overflow-hidden px-6"
            >
              <div className="flex flex-col py-6 space-y-2">
                <NavItem id="home" label="HOME" mobile={true} />
                <NavItem id="biosystems" label="BIOSYSTEMS" mobile={true} />
                <NavItem id="cryobank" label="CRYOBANK" mobile={true} />
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="w-full mt-6 py-4 bg-white text-black font-black rounded-2xl hover:bg-cyan-400 transition-all uppercase text-xs tracking-widest shadow-xl"
                >
                  Contactar Especialista
                </button>
                <div className="pt-8 pb-4 flex justify-center gap-8 border-t border-white/5">
                   <InstagramIcon size={20} />
                   <FacebookIcon size={20} />
                   <LinkedinIcon size={20} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Contenido */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={tabTransition}
          >
            {activeTab === 'home' && <HomeView setActiveTab={setActiveTab} scrollToSection={scrollToSection} />}
            {activeTab === 'biosystems' && <BiosystemsView scrollToSection={scrollToSection} />}
            {activeTab === 'cryobank' && <CryobankView scrollToSection={scrollToSection} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <FAQSection />
      <ContactSection formData={formData} setFormData={setFormData} />

      {/* Floating Chat Asistente IA ✨ */}
      <ChatWidget isOpen={isChatOpen} toggle={() => setIsChatOpen(!isChatOpen)} />

      {/* Footer */}
      <footer className="bg-[#020408] py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center">
                <Thermometer className="text-white" size={18} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white uppercase tracking-widest">RIGHI Solutions</span>
            </div>
            <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
              Líderes en logística de ultra-congelación y custodia de activos biológicos. Asegurando el futuro de la investigación clínica mediante tecnología avanzada.
            </p>
            <div className="flex gap-4">
              <motion.div whileHover={{ y: -5, borderColor: '#22d3ee' }} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 cursor-pointer transition-all">
                <InstagramIcon size={18} />
              </motion.div>
              <motion.div whileHover={{ y: -5, borderColor: '#22d3ee' }} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 cursor-pointer transition-all">
                <FacebookIcon size={18} />
              </motion.div>
              <motion.div whileHover={{ y: -5, borderColor: '#22d3ee' }} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 cursor-pointer transition-all">
                <LinkedinIcon size={18} />
              </motion.div>
              <motion.div whileHover={{ y: -5, borderColor: '#22d3ee' }} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 cursor-pointer transition-all">
                <Mail size={18} />
              </motion.div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 tracking-widest text-xs uppercase text-gray-400">Servicios</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              {['RIGHI Biosystems', 'RIGHI Cryobank', 'Logística Pharma', 'Backup de Emergencia'].map(item => (
                <li key={item} className="hover:text-cyan-400 cursor-pointer transition-colors flex items-center gap-2 group">
                   <div className="w-1 h-1 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                   {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 tracking-widest text-xs uppercase text-gray-400">Compliance</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-cyan-500" /> GMP Certified</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-cyan-500" /> GDP Compliant</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-cyan-500" /> FDA 21 CFR Part 11</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- COMPONENTES AUXILIARES ---

const ChatWidget = ({ isOpen, toggle }) => {
  const [messages, setMessages] = useState([{ role: 'ai', text: 'Hola ✨. Soy tu asistente científico de RIGHI. ¿Tienes alguna duda técnica sobre almacenamiento criogénico o normativas?' }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await callGemini(
        `El usuario pregunta: ${input}`,
        "Eres un asesor experto en logística de cadena de frío y criopreservación biológica para RIGHI Coldchain Solutions. Responde de forma técnica, profesional pero empática. Habla sobre protocolos a -20, -80 y -196 grados, cumplimiento de normas FDA y trazabilidad. Mantén las respuestas breves y precisas."
      );
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: "Lo siento, he tenido un problema de conexión. Por favor, inténtalo de nuevo en unos momentos." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-80 md:w-96 bg-[#0a0f1a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl"
          >
            <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-white" />
                <span className="text-sm font-bold text-white uppercase tracking-widest">Asesor IA ✨</span>
              </div>
              <button onClick={toggle} className="text-white/70 hover:text-white"><X size={20}/></button>
            </div>
            <div ref={scrollRef} className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${m.role === 'user' ? 'bg-cyan-500 text-white' : 'bg-white/5 text-gray-300 border border-white/5'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-2xl flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-cyan-400" />
                    <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Analizando...</span>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 bg-white/5 border-t border-white/5 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe tu consulta técnica..."
                className="flex-1 bg-[#05080f] border border-white/10 rounded-xl px-4 py-2 text-xs focus:border-cyan-500 outline-none text-white"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-cyan-500 text-white p-2 rounded-xl hover:bg-cyan-400 transition-colors"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggle}
        className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-cyan-500/30"
      >
        <MessageSquare size={28} />
      </motion.button>
    </div>
  );
};

// --- SUB-VISTAS ---

const HomeView = ({ setActiveTab, scrollToSection }) => (
  <>
    <section className="relative pt-32 pb-48 flex items-center min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="md:col-span-8 text-center md:text-left">
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold tracking-[0.2em] mb-8 uppercase">
            <ShieldCheck size={14} /> El estándar de oro en cadena de frío
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[0.95] text-white">
            Protege el futuro de tu <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 uppercase tracking-tighter">investigación.</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-gray-400 text-lg md:text-xl max-w-xl mb-12 leading-relaxed">
            Eliminamos las "zonas grises" en la logística crítica. Monitoreo en vivo, infraestructura criogénica y respaldo total para tus muestras más valiosas.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-col sm:row gap-6 justify-center md:justify-start">
            <button onClick={() => scrollToSection('contact')} className="px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-cyan-500/20 uppercase text-xs tracking-widest">
              Contactar Especialista <ArrowRight className="group-hover:translate-x-1.5 transition-transform" />
            </button>
            <button onClick={() => setActiveTab('biosystems')} className="px-10 py-5 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 border border-white/10 transition-all backdrop-blur-sm uppercase text-xs tracking-widest">
              Explorar Unidades
            </button>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.8, rotate: -5 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1, delay: 0.2 }} className="md:col-span-4 hidden md:block">
          <div className="relative w-full aspect-square bg-gradient-to-br from-cyan-500/20 to-transparent rounded-[4rem] border border-white/10 p-12 flex items-center justify-center">
            <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <Activity size={120} className="text-cyan-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]" />
            </motion.div>
            <div className="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-full"></div>
          </div>
        </motion.div>
      </div>
    </section>

    <section className="py-40 bg-[#05080f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid md:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <motion.div variants={fadeInUp}>
              <h2 className="text-xs font-bold text-cyan-500 tracking-[0.3em] uppercase mb-4 tracking-[0.4em]">La Realidad</h2>
              <h3 className="text-4xl font-bold leading-tight uppercase tracking-tighter">Cada segundo fuera del entorno <br/><span className="text-gray-600">es una amenaza real.</span></h3>
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-8">
              <div className="flex gap-6 italic text-sm text-gray-400"><ShieldAlert className="text-red-500 shrink-0" /> Zonas Grises: Cargas y aduanas donde la mayoría pierde el rastro térmico.</div>
              <div className="flex gap-6 italic text-sm text-gray-400"><Clock className="text-orange-500 shrink-0" /> Reportes Post-Mortem: Recibir un informe de daño cuando ya es tarde no sirve.</div>
            </motion.div>
          </div>
          <div className="p-1 rounded-[3rem] bg-gradient-to-br from-cyan-500/40 via-blue-500/20 to-transparent">
             <div className="bg-[#0a0f1a] p-12 rounded-[2.8rem] text-center">
                <ShieldCheck className="text-cyan-400 mx-auto mb-6" size={48} />
                <h4 className="text-xl font-bold mb-4 uppercase tracking-widest">Protocolos de Resiliencia</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Monitoreo activo que permite intervención inmediata antes de alcanzar el umbral crítico.</p>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  </>
);

const BiosystemsView = () => (
  <div className="py-32 max-w-7xl mx-auto px-6">
    <div className="grid lg:grid-cols-2 gap-24 items-center mb-40">
      <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
        <h2 className="text-xs font-bold text-cyan-500 tracking-[0.4em] uppercase mb-6">Unidad de Monitoreo</h2>
        <h3 className="text-5xl md:text-7xl font-black mb-8 leading-tight text-white uppercase tracking-tighter">RIGHI <span className="text-cyan-400">BIOSYSTEMS</span></h3>
        <p className="text-gray-400 text-lg mb-12 leading-relaxed italic">
          "Tus muestras nunca están solas. BIOSYSTEMS es el sistema de ojos digitales que vigila la integridad de tu carga en tránsito o in situ."
        </p>
      </motion.div>
      <div className="h-96 bg-gradient-to-br from-cyan-900/20 to-transparent rounded-[4rem] border border-cyan-500/20 flex flex-col items-center justify-center">
         <Activity className="text-cyan-500 mb-4 animate-pulse" size={64} />
         <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.4em]">Sincronización en la Nube</span>
      </div>
    </div>
  </div>
);

const CryobankView = () => (
  <div className="py-32 max-w-7xl mx-auto px-6 text-center">
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-32">
      <h2 className="text-xs font-bold text-blue-500 tracking-[0.4em] uppercase mb-6 text-blue-400">Custodia de Alta Seguridad</h2>
      <h3 className="text-5xl md:text-7xl font-black mb-8 leading-tight text-white uppercase tracking-tighter">RIGHI <span className="text-blue-500">CRYOBANK</span></h3>
      <p className="max-w-2xl mx-auto text-gray-500 text-lg leading-relaxed italic">
        Almacenamiento de ultra-congelación (-80°C y LN2) en nuestra planta estratégica. Redundancia operativa del 100% para activos críticos.
      </p>
    </motion.div>
    <div className="grid md:grid-cols-3 gap-8 mb-40">
      {['Ultra Frío', 'Resiliencia', 'Inventario Crítico'].map((title, i) => (
        <div key={i} className="p-10 bg-[#0a0f1a] rounded-[3rem] border border-white/5 hover:border-blue-500/30 transition-all text-center group">
           <Database className="text-blue-500 mx-auto mb-6 group-hover:scale-110 transition-transform" size={40} />
           <h4 className="text-xl font-bold uppercase tracking-widest text-white">{title}</h4>
        </div>
      ))}
    </div>
  </div>
);

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(0);
  const faqs = [
    { q: "¿Es este servicio mucho más caro que una logística estándar?", a: "La logística estándar es barata hasta que pierdes una carga de un millón de dólares. RIGHI es la inversión más eficiente." },
    { q: "¿Qué tan difícil es implementar el monitoreo remoto?", a: "Es inmediato. Nosotros instalamos los sensores BIOSYSTEMS y accedes vía web o móvil sin infraestructuras complejas." },
    { q: "¿Cómo garantizan la seguridad ante un corte de energía?", a: "Redundancia triple: generadores, inyección de LN2 y guardia técnica presencial 24/7." }
  ];

  return (
    <section className="py-40 max-w-4xl mx-auto px-6">
      <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-4xl font-black mb-16 text-center text-white uppercase tracking-tighter">Preguntas Frecuentes</motion.h2>
      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <motion.div key={idx} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            <button onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)} className="w-full p-8 text-left flex justify-between items-center hover:bg-white/5 transition-colors">
              <span className="font-bold text-lg text-gray-200">{faq.q}</span>
              <ChevronDown className={`transition-transform duration-500 ${openIdx === idx ? 'rotate-180 text-cyan-400' : ''}`} />
            </button>
            <AnimatePresence>
              {openIdx === idx && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <p className="p-8 pt-0 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-6 italic">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const ContactSection = ({ formData, setFormData }) => {
  const [submissionStatus, setSubmissionStatus] = useState("idle"); 
  const [diagnosis, setDiagnosis] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateDiagnosis = async () => {
    if (!formData.mensaje.trim() || isGenerating) return;
    setIsGenerating(true);
    setDiagnosis('');
    try {
      const prompt = `Analiza los siguientes detalles del proyecto y sugiere un protocolo de cadena de frío optimizado: "${formData.mensaje}". Indica temperatura sugerida, riesgos y contingencia.`;
      const result = await callGemini(prompt, "Eres un consultor experto en bio-logística de RIGHI Coldchain Solutions. Genera diagnósticos técnicos rápidos, profesionales y directos.");
      setDiagnosis(result);
    } catch (e) { setDiagnosis("Análisis no disponible en este momento."); } 
    finally { setIsGenerating(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus("sending");

    try {
      const response = await fetch("https://formspree.io/f/lucas1882@gmail.com", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.nombre,
          email: formData.email,
          company: formData.empresa,
          message: formData.mensaje
        })
      });

      if (response.ok) {
        setSubmissionStatus("success");
        setFormData({ nombre: '', email: '', empresa: '', mensaje: '' });
      } else {
        setSubmissionStatus("error");
      }
    } catch (error) {
      setSubmissionStatus("error");
    }
  };

  return (
    <section id="contact" className="py-40 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-6xl font-black mb-8 tracking-tighter leading-tight text-white uppercase">
              Asegura tu <br/><span className="text-cyan-400 underline decoration-cyan-500/30 underline-offset-8">patrimonio científico.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-md leading-relaxed italic">Un especialista técnico evaluará tu cadena de frío en una sesión de 15 minutos sin cargo.</p>
            <div className="flex items-center gap-6 group cursor-pointer bg-white/5 p-6 rounded-3xl border border-white/5 hover:bg-cyan-500/5 transition-all">
              <Mail className="text-cyan-400" size={32} />
              <div><p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Email Corporativo</p><p className="text-white font-black">solutions@righi.tech</p></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[#0a0f1a] p-12 md:p-16 rounded-[4.5rem] border border-white/10 shadow-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5"><ShieldCheck size={120} /></div>
            
            {submissionStatus === "success" ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 text-center py-20">
                <CheckCircle2 size={64} className="text-cyan-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white uppercase tracking-tighter mb-4">Solicitud Recibida</h3>
                <p className="text-gray-400 text-sm mb-8">Un asesor de RIGHI se contactará en menos de 2 horas. Revisa tu bandeja de entrada.</p>
                <button onClick={() => setSubmissionStatus("idle")} className="text-cyan-400 font-bold uppercase text-[10px] tracking-widest hover:underline">Volver al formulario</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-2">Nombre Completo</label>
                    <input type="text" className="w-full bg-[#05080f] border border-white/10 rounded-2xl px-6 py-4 outline-none text-white font-bold focus:border-cyan-500 transition-all" placeholder="Dr. Alan Turing" value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-2">Email Corporativo</label>
                    <input type="email" className="w-full bg-[#05080f] border border-white/10 rounded-2xl px-6 py-4 outline-none text-white font-bold focus:border-cyan-500 transition-all" placeholder="alan@pharma.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-2">Detalles del Requerimiento</label>
                  <textarea className="w-full bg-[#05080f] border border-white/10 rounded-2xl px-6 py-4 outline-none text-white font-bold focus:border-cyan-500 transition-all min-h-[140px] resize-none" placeholder="Indique unidad de interés, rango de temperatura y volumen..." value={formData.mensaje} onChange={(e) => setFormData({...formData, mensaje: e.target.value})} required />
                  
                  <button type="button" onClick={generateDiagnosis} disabled={isGenerating} className="flex items-center gap-2 text-[9px] font-black text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-[0.2em] mt-2">
                    {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />} Análisis Científico IA ✨
                  </button>
                </div>

                {diagnosis && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl">
                    <p className="text-[10px] font-black text-cyan-400 uppercase mb-2 tracking-widest">Sugerencia Técnica ✨</p>
                    <p className="text-[11px] text-gray-400 leading-relaxed italic">{diagnosis}</p>
                  </motion.div>
                )}

                {submissionStatus === "error" && (
                  <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-2xl">
                    <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest text-center">
                      Error al enviar. Por favor, revisa tu bandeja de entrada en lucas1882@gmail.com para activar el formulario (link de Formspree).
                    </p>
                  </div>
                )}

                <motion.button disabled={submissionStatus === "sending"} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-6 bg-cyan-500 text-white font-black rounded-3xl hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/20 uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3">
                  {submissionStatus === "sending" ? <><Loader2 size={18} className="animate-spin" /> Procesando...</> : "Solicitar Consultoría Técnica"}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default App;