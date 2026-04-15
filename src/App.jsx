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
  ShieldAlert
} from 'lucide-react';

// --- ANIMATION VARIANTS ---

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

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    empresa: '',
    servicio: 'Logística Integral',
    temperatura: '-80°C'
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
    }
  };

  const NavItem = ({ id, label }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setIsMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}
      className="relative px-4 py-2 text-sm font-medium tracking-wide transition-colors"
    >
      <span className={activeTab === id ? 'text-cyan-400' : 'text-gray-400 hover:text-white'}>
        {label}
      </span>
      {activeTab === id && (
        <motion.div 
          layoutId="navUnderline"
          className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400"
        />
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#020408] text-gray-100 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* Background Orbs */}
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

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#05080f]/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl' : 'bg-transparent py-6'}`}>
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

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Content */}
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
              {[Globe, Activity, Mail].map((Icon, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5, borderColor: '#22d3ee' }}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 cursor-pointer transition-all"
                >
                  <Icon size={18} />
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 tracking-widest text-xs uppercase">Servicios</h4>
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
            <h4 className="text-white font-bold mb-8 tracking-widest text-xs uppercase">Compliance</h4>
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

// --- SUB-VIEWS ---

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

    {/* Service Cards Staggered */}
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
        <h3 className="text-5xl md:text-6xl font-black mb-8 leading-tight">RIGHI <br/><span className="text-cyan-400">BIOSYSTEMS</span></h3>
        <p className="text-gray-400 text-lg mb-12 leading-relaxed">
          Nuestra tecnología patentada BIOSYSTEMS permite el seguimiento inteligente de cada vial. Sensores de grado aeroespacial que transmiten datos cifrados directamente a tu panel de control central.
        </p>
        <div className="grid grid-cols-2 gap-6">
          {[
            { label: 'Dashboards', desc: 'Acceso en tiempo real' },
            { label: 'Predicción', desc: 'Detección de fallas antes de ocurrir' },
            { label: 'Compliance', desc: 'Documentación audit-ready' },
            { label: 'Escalable', desc: 'Desde 1 vial hasta biobancos enteros' }
          ].map((item, i) => (
            <div key={i} className="p-5 bg-white/5 rounded-2xl border border-white/5">
              <h5 className="font-bold text-white text-sm mb-1">{item.label}</h5>
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
      <h2 className="text-xs font-bold text-blue-500 tracking-[0.4em] uppercase mb-6">Custodia de Alta Seguridad</h2>
      <h3 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">RIGHI <span className="text-blue-500">CRYOBANK</span></h3>
      <p className="max-w-2xl mx-auto text-gray-500 text-lg leading-relaxed">
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
          <h4 className="text-xl font-bold mb-6">{box.title}</h4>
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
        <h4 className="text-3xl font-bold mb-4">Plan de Backup Inmediato</h4>
        <p className="text-gray-500 text-sm leading-relaxed">
          ¿Tu equipo ha fallado? Tenemos espacio reservado para emergencias 24/7. Traslado y custodia garantizada en menos de 90 minutos.
        </p>
      </div>
      <button 
        onClick={() => scrollToSection('contact')}
        className="px-10 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/40 uppercase tracking-widest text-xs"
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
        className="text-4xl font-bold mb-16 text-center"
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
              <span className="font-bold text-lg">{faq.q}</span>
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
                  <p className="p-8 pt-0 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-6">
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

const ContactSection = ({ formData, setFormData }) => (
  <section id="contact" className="py-40 relative">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-6xl font-black mb-8 tracking-tighter leading-tight">
            Asegura tu <br/><span className="text-cyan-400 underline decoration-cyan-500/30 underline-offset-8">patrimonio científico.</span>
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-md">
            Un especialista técnico evaluará tu cadena de frío en una sesión de 15 minutos sin cargo.
          </p>
          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all"><Mail /></div>
              <div>
                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Email Corporativo</p>
                <p className="text-white font-bold">solutions@righi.tech</p>
              </div>
            </div>
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all"><Globe /></div>
              <div>
                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Centro Logístico</p>
                <p className="text-white font-bold">Global Cryo-Center Hub 01</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0a0f1a] p-12 md:p-16 rounded-[4rem] border border-white/10 shadow-3xl shadow-cyan-500/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5"><ShieldCheck size={120} /></div>
          <form onSubmit={(e) => { e.preventDefault(); alert('Solicitud enviada con éxito'); }} className="relative z-10 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Nombre y Apellido</label>
                <input type="text" className="w-full bg-white/5 border-b border-white/20 px-0 py-3 focus:border-cyan-500 outline-none transition-all text-white font-medium" placeholder="Dr. Alan Turing" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Email de Empresa</label>
                <input type="email" className="w-full bg-white/5 border-b border-white/20 px-0 py-3 focus:border-cyan-500 outline-none transition-all text-white font-medium" placeholder="alan@pharma.com" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Empresa / Institución</label>
              <input type="text" className="w-full bg-white/5 border-b border-white/20 px-0 py-3 focus:border-cyan-500 outline-none transition-all text-white font-medium" placeholder="Global Genetics Inc." required />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Unidad de Interés</label>
                <select className="w-full bg-transparent border-b border-white/20 px-0 py-3 focus:border-cyan-500 outline-none transition-all text-white font-medium">
                  <option className="bg-[#0a0f1a]">BIOSYSTEMS</option>
                  <option className="bg-[#0a0f1a]">CRYOBANK</option>
                  <option className="bg-[#0a0f1a]">Logística Pharma</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Temperatura</label>
                <select className="w-full bg-transparent border-b border-white/20 px-0 py-3 focus:border-cyan-500 outline-none transition-all text-white font-medium">
                  <option className="bg-[#0a0f1a]">-80°C (Ultra)</option>
                  <option className="bg-[#0a0f1a]">-196°C (LN2)</option>
                  <option className="bg-[#0a0f1a]">+2°C / +8°C</option>
                </select>
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-6 bg-cyan-500 text-white font-black rounded-3xl hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/20 uppercase tracking-[0.2em] text-xs"
            >
              Solicitar Consultoría Técnica
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  </section>
);

export default App;