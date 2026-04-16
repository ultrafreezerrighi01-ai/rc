import React, { useState, useEffect } from 'react';
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
  Loader2
} from 'lucide-react';

// Iconos personalizados para evitar errores de exportación en lucide-react
const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const FacebookIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

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
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    empresa: '',
    mensaje: ''
  });

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
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

          {/* Botón de Menú Móvil */}
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
                   <InstagramIcon className="text-gray-500" size={20} />
                   <FacebookIcon className="text-gray-500" size={20} />
                   <LinkedinIcon className="text-gray-500" size={20} />
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

      {/* Footer */}
      <footer className="bg-[#020408] py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center">
                <Thermometer className="text-white" size={18} />
              </div>
              <span className="text-xl font-bold tracking-tight">RIGHI Solutions</span>
            </div>
            <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">
              Líderes en logística de ultra-congelación y custodia de activos biológicos. Asegurando el futuro de la investigación clínica mediante tecnología avanzada.
            </p>
            <div className="flex gap-4">
              <motion.div 
                whileHover={{ y: -5, borderColor: '#22d3ee' }}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 cursor-pointer transition-all"
              >
                <InstagramIcon size={18} />
              </motion.div>
              <motion.div 
                whileHover={{ y: -5, borderColor: '#22d3ee' }}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 cursor-pointer transition-all"
              >
                <FacebookIcon size={18} />
              </motion.div>
              <motion.div 
                whileHover={{ y: -5, borderColor: '#22d3ee' }}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 cursor-pointer transition-all"
              >
                <LinkedinIcon size={18} />
              </motion.div>
              <motion.div 
                whileHover={{ y: -5, borderColor: '#22d3ee' }}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 cursor-pointer transition-all"
              >
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

// --- SUB-VISTAS ---

const HomeView = ({ setActiveTab, scrollToSection }) => (
  <>
    {/* Hero Section */}
    <section className="relative pt-32 pb-48 flex items-center min-h-[90vh]">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="md:col-span-8 text-center md:text-left"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold tracking-[0.2em] mb-8 uppercase">
            <ShieldCheck size={14} /> El estándar de oro en cadena de frío
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[0.95]">
            Protege el futuro de tu <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">investigación.</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-gray-400 text-lg md:text-xl max-w-xl mb-12 leading-relaxed">
            Eliminamos las "zonas grises" en la logística crítica. Monitoreo en vivo, infraestructura criogénica y respaldo total para tus muestras más valiosas.
          </motion.p>
          
          <motion.div variants={fadeInUp} className="flex flex-col sm:row gap-6 justify-center md:justify-start">
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-cyan-400 transition-all flex items-center justify-center gap-3 group shadow-2xl shadow-cyan-500/20"
            >
              CONTACTAR ESPECIALISTA <ArrowRight className="group-hover:translate-x-1.5 transition-transform" />
            </button>
            <button 
              onClick={() => setActiveTab('biosystems')}
              className="px-10 py-5 bg-white/5 text-white font-bold rounded-2xl hover:bg-white/10 border border-white/10 transition-all backdrop-blur-sm"
            >
              EXPLORAR UNIDADES
            </button>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="md:col-span-4 hidden md:block"
        >
          <div className="relative w-full aspect-square bg-gradient-to-br from-cyan-500/20 to-transparent rounded-[4rem] border border-white/10 p-12 flex items-center justify-center">
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
               <Activity size={120} className="text-cyan-400 drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]" />
            </motion.div>
            <div className="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-full"></div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* PAS Section */}
    <section className="py-40 bg-[#05080f] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-24 items-center"
        >
          <div className="space-y-12">
            <motion.div variants={fadeInUp}>
              <h2 className="text-xs font-bold text-cyan-500 tracking-[0.3em] uppercase mb-4">La Realidad</h2>
              <h3 className="text-4xl font-bold leading-tight">Cada segundo fuera del entorno <br/><span className="text-gray-600">es una amenaza real.</span></h3>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 shrink-0 border border-red-500/20">
                  <ShieldAlert size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2 text-lg">Zonas Grises de Riesgo</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">Cargas, descargas y esperas en aduanas donde la mayoría de los proveedores pierden el rastro de la temperatura.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 shrink-0 border border-orange-500/20">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2 text-lg">Informes "Post-Mortem"</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">Recibir un reporte de daño después de que la muestra llegó es inútil. Necesitas intervención preventiva, no retrospectiva.</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            variants={fadeInUp}
            className="p-1 rounded-[3rem] bg-gradient-to-br from-cyan-500/40 via-blue-500/20 to-transparent"
          >
            <div className="bg-[#0a0f1a] p-12 rounded-[2.8rem] relative overflow-hidden">
               <div className="relative z-10 text-center">
                 <div className="w-20 h-20 bg-cyan-500 rounded-full mx-auto mb-8 flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.4)]">
                   <ShieldCheck className="text-white" size={40} />
                 </div>
                 <h4 className="text-2xl font-bold mb-4">Garantía RIGHI</h4>
                 <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                   Infraestructura validad bajo normas internacionales para asegurar que tus activos biológicos nunca abandonen su zona de confort térmica.
                 </p>
                 <div className="flex justify-center gap-4">
                   <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-[10px] font-bold text-gray-400">FDA COMPLIANT</div>
                   <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-[10px] font-bold text-gray-400">ISO 9001</div>
                 </div>
               </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>

    {/* Cartas de Servicio */}
    <section className="py-40 max-w-7xl mx-auto px-6">
       <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-10"
       >
          <ServiceCard 
            title="RIGHI BIOSYSTEMS"
            subtitle="Inteligencia en Tránsito"
            description="Monitoreo remoto activo con alertas predictivas. No te limitas a observar, intervienes en tiempo real."
            icon={<Activity size={40} />}
            color="cyan"
            onClick={() => setActiveTab('biosystems')}
            features={['Alertas SMS/Email', 'Validación FDA Part 11', 'Trazabilidad Cloud']}
          />
          <ServiceCard 
            title="RIGHI CRYOBANK"
            subtitle="Custodia de Activos"
            description="Almacenamiento de ultra-congelación de alta resiliencia. El búnker definitivo para tu patrimonio científico."
            icon={<Database size={40} />}
            color="blue"
            onClick={() => setActiveTab('cryobank')}
            features={['Backup Nitrógeno Líquido', 'Seguridad 24/7', 'Picking de Precisión']}
          />
       </motion.div>
    </section>
  </>
);

const ServiceCard = ({ title, subtitle, description, icon, color, onClick, features }) => (
  <motion.div 
    variants={fadeInUp}
    whileHover={{ y: -10 }}
    onClick={onClick}
    className={`group relative p-12 bg-white/5 rounded-[3rem] border border-white/10 hover:border-${color}-500/50 transition-all cursor-pointer overflow-hidden`}
  >
    <div className={`absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-15 transition-all group-hover:scale-110 text-${color}-400`}>
      {icon}
    </div>
    <span className={`text-${color}-500 text-[10px] font-black tracking-[0.2em] uppercase mb-4 block`}>{subtitle}</span>
    <h3 className="text-3xl font-bold mb-6">{title}</h3>
    <p className="text-gray-400 mb-10 leading-relaxed text-sm">
      {description}
    </p>
    <ul className="space-y-4 mb-10">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-3 text-xs text-gray-500 font-medium">
          <CheckCircle2 className={`text-${color}-500`} size={16} /> {f}
        </li>
      ))}
    </ul>
    <div className={`text-${color}-400 font-black text-xs flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-widest`}>
      VER DETALLES TÉCNICOS <ArrowRight size={18} />
    </div>
  </motion.div>
);

const BiosystemsView = ({ scrollToSection }) => (
  <div className="py-24 max-w-7xl mx-auto px-6">
    <div className="grid lg:grid-cols-2 gap-24 items-center mb-40">
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-xs font-bold text-cyan-500 tracking-[0.4em] uppercase mb-6">Unidad de Monitoreo</h2>
        <h3 className="text-5xl md:text-6xl font-black mb-8 leading-tight text-white uppercase tracking-tighter">RIGHI <span className="text-cyan-400">BIOSYSTEMS</span></h3>
        <p className="text-gray-400 text-lg mb-12 leading-relaxed italic">
          "Tus muestras nunca están solas. BIOSYSTEMS es el sistema de ojos digitales que vigila la integridad de tu carga en tránsito o in situ."
        </p>
        <div className="grid grid-cols-2 gap-6">
          {[
            { label: 'Dashboards', desc: 'Acceso en tiempo real' },
            { label: 'Predicción', desc: 'Detección de fallas antes de ocurrir' },
            { label: 'Compliance', desc: 'Documentación audit-ready' },
            { label: 'Escalable', desc: 'Desde 1 vial hasta biobancos enteros' }
          ].map((item, i) => (
            <div key={i} className="p-5 bg-white/5 rounded-2xl border border-white/5">
              <h5 className="font-bold text-white text-sm mb-1 uppercase tracking-tight">{item.label}</h5>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="aspect-video bg-gradient-to-br from-cyan-900/40 to-[#020408] rounded-[3rem] border border-cyan-500/20 flex flex-col items-center justify-center p-12 overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-48 h-48 rounded-full border-[10px] border-cyan-500/20 border-t-cyan-500 flex items-center justify-center mb-8"
          >
            <Activity className="text-cyan-500" size={60} />
          </motion.div>
          <span className="text-xs font-black tracking-[0.3em] text-cyan-400">SISTEMA ONLINE</span>
        </div>
      </motion.div>
    </div>

    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="bg-white/5 p-16 rounded-[4rem] border border-white/5 text-center"
    >
      <motion.h4 variants={fadeInUp} className="text-2xl font-bold mb-12 uppercase tracking-widest">Áreas de Especialización</motion.h4>
      <div className="grid md:grid-cols-4 gap-8">
        {['Oncología', 'Fertilidad', 'Genómica', 'Vacunas mRNA'].map((area, i) => (
          <motion.div 
            key={i} 
            variants={fadeInUp}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.08)' }}
            className="p-8 bg-white/5 rounded-3xl border border-white/5 transition-all"
          >
            <p className="font-bold text-sm tracking-widest uppercase">{area}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);

const CryobankView = ({ scrollToSection }) => (
  <div className="py-24 max-w-7xl mx-auto px-6">
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-32"
    >
      <h2 className="text-xs font-bold text-blue-500 tracking-[0.4em] uppercase mb-6 text-blue-400">Custodia de Alta Seguridad</h2>
      <h3 className="text-5xl md:text-7xl font-black mb-8 tracking-tight text-white uppercase tracking-tighter">RIGHI <span className="text-blue-500">CRYOBANK</span></h3>
      <p className="max-w-2xl mx-auto text-gray-500 text-lg leading-relaxed italic">
        Nuestra planta de almacenamiento centralizada ofrece condiciones de criopreservación inalterables. Redundancia operativa del 100% para activos biológicos críticos.
      </p>
    </motion.div>

    <div className="grid md:grid-cols-3 gap-8 mb-40">
      {[
        { title: 'Ultra Frío', list: ['Freezers -80°C mecánicos', 'Inyección LN2 automática', 'Estabilidad térmica ±1°C'], icon: <Thermometer /> },
        { title: 'Resiliencia', list: ['Backup eléctrico propio', 'Guardias técnicos 24/7', 'Protocolos S.O.P. estáticos'], icon: <ShieldCheck /> },
        { title: 'Inventario', list: ['Trazabilidad por barcoding', 'Picking en sala fría', 'Master Cell Bank hosting'], icon: <FileText /> }
      ].map((box, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-10 bg-[#0a0f1a] rounded-[3rem] border border-white/5 hover:border-blue-500/30 transition-all group"
        >
          <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 mb-8 group-hover:scale-110 transition-transform">
            {box.icon}
          </div>
          <h4 className="text-xl font-bold mb-6 text-white uppercase tracking-tight">{box.title}</h4>
          <ul className="space-y-4">
            {box.list.map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 text-xs text-gray-500">
                <div className="w-1 h-1 bg-blue-500 rounded-full" /> {item}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>

    <motion.div 
      whileInView={{ backgroundColor: ['rgba(59,130,246,0.05)', 'rgba(59,130,246,0.1)'] }}
      className="p-12 md:p-20 rounded-[4rem] border border-blue-500/20 flex flex-col md:row items-center justify-between gap-12 bg-blue-500/5 backdrop-blur-sm"
    >
      <div className="max-w-md">
        <h4 className="text-3xl font-bold mb-4 uppercase tracking-tighter">Plan de Backup Inmediato</h4>
        <p className="text-gray-500 text-sm leading-relaxed font-medium">
          ¿Tu equipo ha fallado? Tenemos espacio reservado para emergencias 24/7. Traslado y custodia garantizada en menos de 90 minutos.
        </p>
      </div>
      <button 
        onClick={() => scrollToSection('contact')}
        className="px-10 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/40 uppercase tracking-widest text-[10px]"
      >
        ACTIVAR PROTOCOLO EMERGENCIA
      </button>
    </motion.div>
  </div>
);

const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState(0);
  const faqs = [
    {
      q: "¿Es este servicio mucho más caro que una logística estándar?",
      a: "La logística estándar es barata hasta que pierdes una carga de un millón de dólares. Al prevenir pérdidas, RIGHI es la inversión más eficiente."
    },
    {
      q: "¿Qué tan difícil es implementar el monitoreo remoto?",
      a: "Es inmediato. Nosotros instalamos los sensores BIOSYSTEMS. Accedes a tus datos vía web o móvil sin infraestructuras complejas."
    },
    {
      q: "¿Cómo garantizan la seguridad ante un corte de energía?",
      a: "Redundancia triple: generadores diesel, inyección de nitrógeno líquido y guardia técnica presencial 24/7."
    }
  ];

  return (
    <section className="py-40 max-w-4xl mx-auto px-6">
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-4xl font-bold mb-16 text-center text-white uppercase tracking-tighter"
      >
        Preguntas Frecuentes
      </motion.h2>
      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
          >
            <button 
              onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
              className="w-full p-8 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
            >
              <span className="font-bold text-lg text-gray-200">{faq.q}</span>
              <ChevronDown className={`transition-transform duration-500 ${openIdx === idx ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openIdx === idx && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="p-8 pt-0 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-6 italic">
                    {faq.a}
                  </p>
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
  const [submissionStatus, setSubmissionStatus] = useState("idle"); // idle, sending, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus("sending");

    try {
      // Usamos fetch para enviar los datos a Formspree (lucas1882@gmail.com)
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
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl font-black mb-8 tracking-tighter leading-tight text-white uppercase">
              Asegura tu <br/><span className="text-cyan-400 underline decoration-cyan-500/30 underline-offset-8">patrimonio científico.</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-md leading-relaxed">
              Un especialista técnico evaluará tu cadena de frío en una sesión de 15 minutos sin cargo.
            </p>
            <div className="space-y-8">
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all shadow-xl">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-1">Email Corporativo</p>
                  <p className="text-white font-black tracking-tight">solutions@righi.tech</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group cursor-pointer">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all shadow-xl">
                  <Globe size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mb-1">Centro Logístico</p>
                  <p className="text-white font-black tracking-tight">Global Cryo-Center Hub 01</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0a0f1a] p-12 md:p-16 rounded-[4.5rem] border border-white/10 shadow-3xl shadow-cyan-500/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-12 opacity-5"><ShieldCheck size={120} /></div>
            
            {submissionStatus === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 text-center py-20"
              >
                <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} className="text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter">Mensaje Enviado</h3>
                <p className="text-gray-400 mb-8">Gracias por contactarnos. Un especialista técnico se comunicará contigo a la brevedad.</p>
                <button 
                  onClick={() => setSubmissionStatus("idle")}
                  className="text-cyan-400 font-bold uppercase text-xs tracking-widest hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10 space-y-10">
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-4">Nombre y Apellido</label>
                    <input 
                      type="text" 
                      name="name"
                      className="w-full bg-transparent border-b border-white/20 px-4 py-3 outline-none text-white font-bold placeholder-gray-700" 
                      placeholder="Dr. Alan Turing" 
                      value={formData.nombre}
                      onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-4">Email Corporativo</label>
                    <input 
                      type="email" 
                      name="email"
                      className="w-full bg-transparent border-b border-white/20 px-4 py-3 outline-none text-white font-bold placeholder-gray-700" 
                      placeholder="alan@pharma.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-4">Institución / Empresa</label>
                  <input 
                    type="text" 
                    name="company"
                    className="w-full bg-transparent border-b border-white/20 px-4 py-3 outline-none text-white font-bold placeholder-gray-700" 
                    placeholder="Global Genetics Inc." 
                    value={formData.empresa}
                    onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                    required 
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-4">Detalles de su Requerimiento</label>
                  <textarea 
                    name="message"
                    className="w-full bg-transparent border-b border-white/20 px-4 py-3 outline-none text-white font-bold placeholder-gray-700 min-h-[120px] resize-none"
                    placeholder="Describa brevemente la unidad de interés, rango de temperatura y volumen de muestras..."
                    value={formData.mensaje}
                    onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                    required
                  />
                </div>

                <div className="relative">
                  {submissionStatus === "error" && (
                    <p className="text-red-500 text-[10px] uppercase font-bold mb-4 tracking-widest">
                      Ocurrió un error. Por favor, intente nuevamente.
                    </p>
                  )}
                  <motion.button 
                    disabled={submissionStatus === "sending"}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-6 bg-cyan-500 text-white font-black rounded-[2rem] hover:bg-cyan-400 transition-all shadow-2xl shadow-cyan-500/30 uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-2"
                  >
                    {submissionStatus === "sending" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        ENVIANDO...
                      </>
                    ) : (
                      "Solicitar Consultoría Técnica"
                    )}
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default App;