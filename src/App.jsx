import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Cpu, Zap, ArrowRight, ChevronDown, Activity, Network, Play, Mail, ShieldAlert } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// 1. Capa de Textura CyberPunk
const NoiseOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-10 mix-blend-overlay border-none">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)"/>
    </svg>
  </div>
);

// 2. Isla de Navegación (Navbar) Funcional
const Navbar = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if(el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-40 px-6 py-4 mix-blend-difference flex justify-between items-center pointer-events-none bg-black/10 backdrop-blur-sm border-b border-[#00f0ff]/10">
      <div 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} 
        className="flex items-center gap-3 text-white pointer-events-auto cursor-pointer"
      >
        <Cpu size={28} className="text-[#00f0ff]" />
        <span className="font-drama text-2xl font-bold tracking-tighter">NEXUS</span>
      </div>
      <div className="hidden md:flex gap-8 font-data text-xs text-[#00f0ff] pointer-events-auto">
        <span onClick={() => scrollTo('telemetria')} className="hover:text-white cursor-pointer transition-colors">&gt;&gt; ESTATUS</span>
        <span onClick={() => scrollTo('proyectos')} className="hover:text-white cursor-pointer transition-colors">&gt;&gt; PROYECTOS</span>
        <span onClick={() => scrollTo('videos')} className="hover:text-white cursor-pointer transition-colors">&gt;&gt; REGISTROS</span>
      </div>
      <button 
        onClick={() => scrollTo('contacto')}
        className="pointer-events-auto font-data text-xs px-5 py-2.5 border border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-all cursor-pointer shadow-[0_0_10px_rgba(0,240,255,0.2)] hover:shadow-[0_0_20px_rgba(0,240,255,0.6)]"
      >
        [ ACCEDER RED ]
      </button>
    </nav>
  );
};

// 3. Hero Cinemático usando YouTube (Embed sin controles)
const Hero = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 80,
        opacity: 0,
        rotation: 2,
        duration: 1.4,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2
      });
      // Desactivamos el parallax con IFRAME para mejor performance visual
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      <div className="bg-video-container absolute inset-0 z-0 h-[100%] pointer-events-none">
        {/* Usamos un video Cyberpunk ambiente loop de Youtube ocultando controles */}
        <iframe 
            className="w-full h-full scale-150 transform object-cover object-center opacity-40" 
            src="https://www.youtube.com/embed/yQdMCWIfPtw?autoplay=1&mute=1&loop=1&controls=0&disablekb=1&playlist=yQdMCWIfPtw" 
            frameBorder="0" 
            allow="autoplay; encrypted-media" 
            allowFullScreen
        ></iframe>
        <div className="absolute inset-0 bg-[#050505]/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505]" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
        <div className="hero-text font-data text-[#00f0ff] mb-6 tracking-[0.3em] text-xs px-3 py-1 border border-[#00f0ff]/30 inline-block bg-[#00f0ff]/5 backdrop-blur-sm">
          SYS.OPERATOR_WAITING
        </div>
        <h1 className="hero-text font-drama text-[2rem] leading-none sm:text-5xl md:text-7xl lg:text-8xl font-bold uppercase text-white mb-6 glitch-text tracking-tight break-words">
          Ingeniería <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-white to-[#ff003c]">Distribuida</span>
        </h1>
        <p className="hero-text text-lg md:text-xl text-[#e0e7ff]/70 max-w-2xl mx-auto mb-12 font-light">
          La resistencia a la obsolescencia. Conectamos entusiastas para forjar tecnología casera, nodos P2P y hardware de vanguardia.
        </p>
        
        <div className="hero-text flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => {
              const el = document.getElementById('contacto');
              if(el) el.scrollIntoView({behavior: 'smooth'});
            }}
            className="group relative px-8 py-5 bg-[#ff003c] text-white font-data text-sm tracking-[0.2em] overflow-hidden hover:-translate-y-1 transition-transform cursor-pointer shadow-[0_0_15px_rgba(255,0,60,0.4)] hover:shadow-[0_0_25px_rgba(255,0,60,0.8)]"
          >
            <div className="absolute inset-0 w-0 bg-white transition-all duration-[400ms] ease-out group-hover:w-full z-0"></div>
            <span className="relative z-10 flex items-center gap-3 group-hover:text-[#ff003c] transition-colors font-bold">
              <Terminal size={18} /> INICIAR_SINCRO 
            </span>
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#00f0ff]/40 animate-pulse flex flex-col items-center">
        <span className="font-data text-[10px] mb-2 tracking-widest">SCROLL_DOWN</span>
        <ChevronDown size={24} />
      </div>
    </section>
  );
};

// 4. Telemetría
const TelemetryInfo = () => {
  return (
    <section id="telemetria" className="py-12 border-y border-[#00f0ff]/20 bg-[#050505] relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { icon: <Activity className="w-4 h-4 text-[#ff003c]" />, label: "SYS_STATUS", val: "OPERACIONAL_100%" },
          { icon: <Network className="w-4 h-4 text-[#00f0ff]" />, label: "NODOS_ACTIVOS", val: "4,096_ONL" },
          { icon: <Cpu className="w-4 h-4 text-[#00f0ff]" />, label: "PROY_HARDWARE", val: "842_REPO" },
          { icon: <Zap className="w-4 h-4 text-[#ff003c]" />, label: "CICLO_RELOJ", val: "ESTABLE_5GZ" }
        ].map((item, i) => (
          <div key={i} className="flex flex-col font-data text-xs md:text-sm border-l-2 border-[#00f0ff]/30 pl-4">
            <span className="text-[#e0e7ff]/40 mb-2 flex items-center gap-2">{item.icon} [{item.label}]</span>
            <span className="text-[#00f0ff] font-bold tracking-widest text-base">{item.val}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

// 5. Tarjetas Horizontales (3 alineadas) interactuables
const ProjectsGrid = () => {
  const containerRef = useRef();

  useLayoutEffect(() => {
    // La animación GSAP de entrada se eliminó para evitar que las tarjetas queden retenidas en opacity: 0
    // La interactividad principal (blur, glow y parallax) funciona de manera impecable por CSS globalmente.
  }, []);

  const projects = [
    { num: "01", title: "Robótica Casera", desc: "Diseño y programación de brazos mecatrónicos usando microservos bajo protocolos libres." },
    { num: "02", title: "Redes IoT", desc: "Clústers hogareños encriptados. Servidores bare-metal en el garaje sin dependencias." },
    { num: "03", title: "Firmware Mutante", desc: "Reescribiendo los límites del silicio barato con rutinas de bajo nivel y ensamblador." }
  ];

  return (
    <section id="proyectos" className="bg-[#050505] py-28 relative z-10" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col items-center text-center">
        <h2 className="font-drama text-4xl md:text-5xl text-white mb-6 uppercase">
          <span className="text-[#00f0ff]">/</span> Vectores Operativos
        </h2>
        <p className="font-data text-[#e0e7ff]/60 max-w-2xl text-sm leading-relaxed">
          Tres sub-redes activas listas para integrar nuevo hardware. Explora nuestros protocolos y únete al desarrollo distribuido.
        </p>
      </div>

      {/* Uso estricto de GRID de 3 columnas para alinear horizontalmente sin importar animacion */}
      <div className="max-w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 auto-rows-fr">
        {projects.map((proj, i) => (
          <div key={i} className="grid-card group outline outline-1 outline-[#00f0ff]/20 bg-[#0a0a0f] p-8 md:p-10 relative overflow-hidden flex flex-col justify-between h-auto min-h-[350px] cursor-pointer hover:-translate-y-2 hover:outline-[#00f0ff]/80 transition-all duration-300 ease-out shadow-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]">
            {/* Tarjeta 100% visible, sin difuminación para evitar bloqueos táctiles o de GSAP */}
            
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            <div className="relative z-10">
              <span className="font-data text-[#ff003c] text-5xl mb-6 block opacity-30 group-hover:opacity-100 transition-opacity duration-300 font-bold">{proj.num}</span>
              <h3 className="font-drama text-2xl text-white mb-4 uppercase tracking-wide group-hover:text-[#00f0ff] transition-colors">{proj.title}</h3>
              <p className="font-data text-[#e0e7ff]/60 text-sm leading-relaxed group-hover:text-[#e0e7ff] transition-colors">{proj.desc}</p>
            </div>
            
            <div className="relative z-10 flex items-center justify-between border-t border-[#00f0ff]/10 pt-6 mt-8">
              <span className="text-[#00f0ff]/40 group-hover:text-[#00f0ff] font-data text-[10px] lg:text-xs uppercase tracking-widest flex items-center gap-2 transition-colors">
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-300" />
                Examinar Núcleo
              </span>
              <Cpu size={18} className="text-[#00f0ff]/20 group-hover:text-[#00f0ff] transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// 6. Showcase de YouTube Videos - Alternando Posición (Izquierda/Derecha)
const VideoShowcase = () => {
    // Usamos videos de ambiente Cyberpunk/Tech de YouTube 
    const videos = [
        {
            title: "ENSAMBLE MECÁNICO V1",
            desc: "Registro de la cámara de la mesa mecatrónica automatizada. Nodos de servo-motores acoplados mediante señales P2P encriptadas para control de precisión y ensamblado a distancia.",
            url: "https://www.youtube.com/embed/gCcx85zbxz4?autoplay=1&mute=1&loop=1&controls=0&playlist=gCcx85zbxz4"
        },
        {
            title: "TERMINAL HACK PROTOCOL",
            desc: "Visualización de paquetes de datos durante la compilación del firmware de bajo nivel. Interfaz de usuario directa conectada a los repositorios de supervivencia del clúster principal.",
            url: "https://www.youtube.com/embed/9ix7TUGVYIo?autoplay=1&mute=1&loop=1&controls=0&playlist=9ix7TUGVYIo"
        },
        {
            title: "RED ESTRUCTURAL CORE",
            desc: "Sistemas distribuidos funcionando a máxima capacidad bajo protocolos experimentales. Transmisión directa de la arquitectura del entorno metropolitano simulado.",
            url: "https://www.youtube.com/embed/P99qJGrPNLs?autoplay=1&mute=1&loop=1&controls=0&playlist=P99qJGrPNLs"
        }
    ];

    return (
        <section id="videos" className="py-28 bg-black relative border-y border-[#00f0ff]/20 shadow-[0_0_50px_rgba(0,240,255,0.03)] z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxjaXJjbGUgY3g9IjMiIGN5PSIzIiByPSIxIiBmaWxsPSJyZ2JhKDAsIDI0MCwgMjU1LCAwLjE1KSIvPjwvc3ZnPg==')] opacity-10"></div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 mb-24">
                <h2 className="font-drama text-3xl md:text-5xl text-white mb-4 uppercase flex items-center gap-4 border-b border-[#00f0ff]/20 pb-6">
                    <Play className="text-[#ff003c]" size={36} fill="currentColor" /> Registros Audiovisuales
                </h2>
             </div>

             <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col gap-32">
                 {videos.map((v, i) => {
                     // Alterna la dirección: Fila normal o inversa
                     const directionClass = i % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row';
                     
                     return (
                         <div key={i} className={`flex flex-col ${directionClass} items-center gap-10 md:gap-16`}>
                             
                             {/* Video Bloque (Iframe Youtube) */}
                             <div className="w-full md:w-1/2 aspect-video bg-[#050505] p-2 border border-[#00f0ff]/30 shadow-lg relative group">
                                 {/* Hover pulse effect decorativo */}
                                 <div className="absolute inset-0 border border-[#00f0ff] opacity-0 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500 pointer-events-none"></div>
                                 
                                 <iframe 
                                     className="w-full h-full relative z-10 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-500 pointer-events-auto"
                                     src={v.url} 
                                     title={v.title}
                                     frameBorder="0"
                                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                     allowFullScreen
                                 ></iframe>
                                 
                                 {/* Badge Cyberpunk superpuesto - Ignora clics */}
                                 <div className="absolute bottom-6 -right-4 md:-right-6 z-20 pointer-events-none bg-black text-[#00f0ff] font-data text-[10px] px-3 py-1 border border-[#00f0ff] uppercase shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                                     REC // CH_0{i+1}
                                 </div>
                             </div>

                             {/* Descripción Bloque */}
                             <div className="w-full md:w-1/2">
                                <span className="font-data text-[#ff003c] text-xs tracking-[0.3em] font-bold block mb-4 uppercase">CINTA_{i+1}.DAT</span>
                                <h3 className="font-drama text-3xl lg:text-4xl text-white mb-6 uppercase">{v.title}</h3>
                                <div className="w-16 h-[2px] bg-[#00f0ff] mb-6"></div>
                                <p className="font-data text-[#e0e7ff]/70 leading-relaxed text-sm md:text-base">
                                    {v.desc}
                                </p>
                             </div>

                         </div>
                     );
                 })}
             </div>
        </section>
    );
};

// 7. Contact Footer
const ContactFooter = () => {
    return (
        <section id="contacto" className="py-28 bg-[#050505] relative flex flex-col items-center justify-center border-t border-[#00f0ff]/10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#ff003c]/40 to-transparent"></div>
            
            <div className="relative z-10 max-w-3xl w-full px-6 text-center mb-24">
                <div className="inline-block p-4 rounded-full bg-[#ff003c]/10 border border-[#ff003c]/30 mb-8">
                   <ShieldAlert size={40} className="text-[#ff003c]" />
                </div>
                <h2 className="font-drama text-4xl md:text-6xl text-white mb-6 uppercase glitch-text leading-tight">
                    Establecer Conexión Dirigida
                </h2>
                <p className="font-data text-[#e0e7ff]/70 text-sm md:text-base mb-14 max-w-2xl mx-auto">
                    Abre un canal seguro. Introduce tus coordenadas (email) y adjunta el paquete de datos explicativo para integrar tus proyectos a la red Nexus.
                </p>

                <form className="flex flex-col gap-8 text-left max-w-xl mx-auto neon-border bg-black/50 p-8 md:p-12 backdrop-blur-sm" onSubmit={e => e.preventDefault()}>
                    <div className="flex flex-col gap-3 relative">
                        <label className="font-data text-xs text-[#00f0ff] uppercase tracking-[0.2em] pl-1 flex items-center gap-2">
                           &gt;&gt; Identificador de Señal
                        </label>
                        <input type="email" placeholder="sys.operator@domain.com" className="w-full bg-[#0a0a0f] border-b border-[#00f0ff]/30 focus:border-[#00f0ff] text-white font-data text-sm px-4 py-4 outline-none transition-colors" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <label className="font-data text-xs text-[#00f0ff] uppercase tracking-[0.2em] pl-1 flex items-center gap-2">
                           &gt;&gt; Paquete de Datos Raw
                        </label>
                        <textarea rows="4" placeholder="Interés en colaboración hardware..." className="w-full bg-[#0a0a0f] border-b border-[#00f0ff]/30 focus:border-[#00f0ff] text-white font-data text-sm px-4 py-4 outline-none transition-colors resize-y min-h-[100px]"></textarea>
                    </div>
                    <button className="relative w-full py-5 border border-[#ff003c] text-[#ff003c] font-data text-sm uppercase tracking-[0.2em] transition-all duration-300 mt-6 group bg-[#ff003c]/5 overflow-hidden hover:shadow-[0_0_20px_rgba(255,0,60,0.3)] cursor-pointer">
                        <div className="absolute inset-0 w-0 bg-[#ff003c] transition-all duration-500 ease-out group-hover:w-full z-0"></div>
                        <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors">
                            <Mail size={18} /> TRANSMITIR_PROTOCOLO
                        </span>
                    </button>
                </form>
            </div>
            
            <footer className="w-full px-6 py-8 border-t border-white/5 bg-black flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-3 text-white/40 font-data text-[11px] tracking-widest uppercase">
                    <Terminal size={14} className="text-[#00f0ff]/40"/>
                    <span>EOF // NEXUS_ENG // EST(2026) // ALL PROTOCOLS RESERVED.</span>
                </div>
                <div className="flex gap-8 text-[11px] font-data tracking-widest flex-wrap justify-center">
                    <span className="text-white/40 hover:text-[#00f0ff] cursor-pointer transition-colors border-b border-transparent hover:border-[#00f0ff]">GITHUB_REPO</span>
                    <span className="text-white/40 hover:text-[#00f0ff] cursor-pointer transition-colors border-b border-transparent hover:border-[#00f0ff]">FORO_UNDERGOUND</span>
                    <span className="text-white/40 hover:text-[#ff003c] cursor-pointer transition-colors border-b border-transparent hover:border-[#ff003c]">SOPORTE_SISTEMAS</span>
                </div>
            </footer>
        </section>
    );
};

export default function App() {
  return (
    <main className="bg-[#050505] min-h-screen text-[#e0e7ff] selection:bg-[#ff003c] selection:text-white relative font-body">
      <NoiseOverlay />
      <Navbar />
      <Hero />
      <TelemetryInfo />
      <ProjectsGrid />
      <VideoShowcase />
      <ContactFooter />
    </main>
  );
}
