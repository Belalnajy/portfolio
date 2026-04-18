import { useRef, useState, useEffect, Suspense, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Environment, useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Smartphone, Zap, Layers, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

// ─── Featured Projects for the 3D Showcase ────────────────
const SHOWCASE_PROJECTS = [
  { image: '/indstrz.png', key: 'indstrz' },
  { image: '/uduipa.png', key: 'uduipa' },
  { image: '/waferlee.png', key: 'waferlee' },
  { image: '/baserah.png', key: 'baserah' },
  { image: '/smartfast.png', key: 'sf_portal' },
  { image: '/journal.png', key: 'journal' },
  { image: '/profleet.png', key: 'profleet' },
  { image: '/clinic.png', key: 'clinic' },
  { image: '/manqla.png', key: 'manqla' },
  { image: '/orca.png', key: 'orca' },
  { image: '/amarna.png', key: 'amarna' },
  { image: '/inventory.png', key: 'inventory' },
  { image: '/cinemascore.png', key: 'cinemascore' },
  { image: '/movies.png', key: 'movieweb' },
  { image: '/HMS.png', key: 'hms_odoo' },
  { image: '/book.png', key: 'bookstore' },
  { image: '/library.png', key: 'library' },
  { image: '/alva.png', key: 'alva_ai' },
  { image: '/sonomedix.png', key: 'sonomedix' },
  { image: '/nextstop.png', key: 'nextstop' },
  { image: '/kmbc.png', key: 'kmbc' },
  { image: '/rabzan.png', key: 'rabzan' },
  { image: '/sems.png', key: 'sems' },
  { image: '/quotemate.png', key: 'quotemate' },
  { image: '/dmagni.png', key: 'dmagni' },
  { image: '/cme.png', key: 'cme' },
  { image: '/dpms.png', key: 'dpms' },
];

const TEXTURE_PATHS = SHOWCASE_PROJECTS.map((p) => p.image);

/* ═══════════════════════════════════════════════════════════
   3D LAPTOP MODEL — Procedural geometry (no GLTF needed)
   ═══════════════════════════════════════════════════════════ */

function LaptopModel({ currentProjectIndex, mousePosition }) {
  const groupRef = useRef();
  const screenRef = useRef();
  const fadeInProgress = useRef(0);

  // Load all project screenshot textures
  const rawTextures = useTexture(TEXTURE_PATHS);
  const textures = Array.isArray(rawTextures) ? rawTextures : [rawTextures];

  // Configure textures for correct rendering
  useEffect(() => {
    textures.forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace;
      t.minFilter = THREE.LinearFilter;
      t.generateMipmaps = false;
    });
  }, [textures]);

  // ── Texture transition state ──
  const transition = useRef({
    opacity: 1,
    phase: 'idle', // 'fade-out' | 'fade-in' | 'idle'
    displayedIndex: 0,
    targetIndex: 0,
  });

  useEffect(() => {
    const tr = transition.current;
    if (currentProjectIndex !== tr.targetIndex) {
      tr.targetIndex = currentProjectIndex;
      tr.phase = 'fade-out';
    }
  }, [currentProjectIndex]);

  // ── Animation loop ──
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const elapsed = state.clock.elapsedTime;

    // Smooth fade-in on first render (scale from 0 → 1)
    if (fadeInProgress.current < 1) {
      fadeInProgress.current = Math.min(1, fadeInProgress.current + delta * 0.7);
      const eased =
        fadeInProgress.current < 1
          ? 1 - Math.pow(1 - fadeInProgress.current, 3)
          : 1;
      groupRef.current.scale.setScalar(eased);
    }

    // Mouse-driven rotation (or gentle idle oscillation)
    const idleRotY = Math.sin(elapsed * 0.3) * 0.25;
    const idleRotX = Math.sin(elapsed * 0.2 + 1) * 0.06;

    const targetRotY = mousePosition
      ? (mousePosition.x - 0.5) * 0.5
      : idleRotY;
    const targetRotX = mousePosition
      ? -(mousePosition.y - 0.5) * 0.2
      : idleRotX;

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotX,
      0.04
    );

    // Screen texture crossfade
    if (!screenRef.current) return;
    const mat = screenRef.current.material;
    const tr = transition.current;
    const speed = 3.5;

    if (tr.phase === 'fade-out') {
      tr.opacity = Math.max(0, tr.opacity - delta * speed);
      mat.opacity = tr.opacity;
      if (tr.opacity <= 0) {
        tr.displayedIndex = tr.targetIndex;
        mat.map = textures[tr.displayedIndex];
        mat.needsUpdate = true;
        tr.phase = 'fade-in';
      }
    } else if (tr.phase === 'fade-in') {
      tr.opacity = Math.min(1, tr.opacity + delta * speed);
      mat.opacity = tr.opacity;
      if (tr.opacity >= 1) {
        tr.phase = 'idle';
      }
    }
  });

  // ── Laptop dimensions (MacBook-inspired proportions) ──
  const BASE_W = 3.0,
    BASE_H = 0.06,
    BASE_D = 2.0;
  const SCREEN_W = 3.0,
    SCREEN_H = 2.0,
    SCREEN_D = 0.04;
  const DISPLAY_W = 2.7,
    DISPLAY_H = 1.7;
  const HINGE_R = 0.035;

  const metalMat = {
    color: '#0a0a0c',
    metalness: 0.92,
    roughness: 0.12,
    envMapIntensity: 1.2,
  };

  return (
    <group ref={groupRef} position={[0, -0.3, 0]} scale={0}>
      {/* ═══ KEYBOARD BASE ═══ */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[BASE_W, BASE_H, BASE_D]} />
        <meshStandardMaterial {...metalMat} />
      </mesh>

      {/* Keyboard area highlight */}
      <mesh
        position={[0, BASE_H / 2 + 0.001, -0.05]}
        rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.4, 1.05]} />
        <meshStandardMaterial
          color="#1e1e3a"
          metalness={0.7}
          roughness={0.3}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Trackpad */}
      <mesh
        position={[0, BASE_H / 2 + 0.001, 0.58]}
        rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.85, 0.52]} />
        <meshStandardMaterial
          color="#1a1a35"
          metalness={0.85}
          roughness={0.15}
        />
      </mesh>

      {/* ═══ HINGE ═══ */}
      <mesh
        position={[0, BASE_H / 2 + HINGE_R * 0.3, -BASE_D / 2 + 0.015]}
        rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[HINGE_R, HINGE_R, BASE_W * 0.25, 16]} />
        <meshStandardMaterial
          color="#111125"
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>

      {/* ═══ SCREEN ASSEMBLY ═══ */}
      <group
        position={[0, BASE_H / 2 + HINGE_R * 0.6, -BASE_D / 2 + 0.015]}
        rotation={[-0.08, 0, 0]}>
        {/* Screen lid (back shell) */}
        <mesh position={[0, SCREEN_H / 2, 0]} castShadow>
          <boxGeometry args={[SCREEN_W, SCREEN_H, SCREEN_D]} />
          <meshStandardMaterial {...metalMat} />
        </mesh>

        {/* Screen display – project screenshot */}
        <mesh
          ref={screenRef}
          position={[0, SCREEN_H / 2, SCREEN_D / 2 + 0.001]}>
          <planeGeometry args={[DISPLAY_W, DISPLAY_H]} />
          <meshBasicMaterial
            map={textures[0]}
            transparent
            opacity={1}
            toneMapped={false}
          />
        </mesh>

        {/* Screen ambient glow (soft blue tint behind display) */}
        <mesh position={[0, SCREEN_H / 2, SCREEN_D / 2 + 0.0005]}>
          <planeGeometry args={[DISPLAY_W + 0.12, DISPLAY_H + 0.12]} />
          <meshBasicMaterial
            color="#60A5FA"
            transparent
            opacity={0.04}
            side={THREE.FrontSide}
          />
        </mesh>

        {/* Webcam dot */}
        <mesh position={[0, SCREEN_H - 0.07, SCREEN_D / 2 + 0.002]}>
          <circleGeometry args={[0.022, 16]} />
          <meshStandardMaterial
            color="#222"
            emissive="#004400"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════════
   CANVAS LOADING INDICATOR
   ═══════════════════════════════════════════════════════════ */

function CanvasLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-[3px] border-blue-400/20 border-t-blue-400 rounded-full animate-spin" />
      </div>
    </Html>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION COMPONENT — Full layout with text + 3D canvas
   ═══════════════════════════════════════════════════════════ */

const LaptopShowcase3D = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePos, setMousePos] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Auto-cycle through projects
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SHOWCASE_PROJECTS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isVisible]);

  // Progress animation value (0 to 100)
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    setProgress(0);
    const step = 100 / (5500 / 50); // duration / interval
    const timer = setInterval(() => {
      setProgress((p) => Math.min(100, p + step));
    }, 50);
    return () => clearInterval(timer);
  }, [currentIndex, isVisible]);

  const nextProject = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SHOWCASE_PROJECTS.length);
  }, []);

  const prevProject = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? SHOWCASE_PROJECTS.length - 1 : prev - 1
    );
  }, []);

  // IntersectionObserver — only render Canvas when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Mouse tracking for 3D interaction
  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  const handleMouseLeave = useCallback(() => setMousePos(null), []);

  // Feature highlights
  const features = [
    {
      icon: <Smartphone className="w-5 h-5" />,
      label: t('laptop_showcase.features.responsive'),
    },
    {
      icon: <Zap className="w-5 h-5" />,
      label: t('laptop_showcase.features.performance'),
    },
    {
      icon: <Layers className="w-5 h-5" />,
      label: t('laptop_showcase.features.modern'),
    },
    {
      icon: <Globe className="w-5 h-5" />,
      label: t('laptop_showcase.features.rtl'),
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="laptop-showcase"
      className="py-24 relative overflow-hidden">
      {/* Background gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgb(var(--primary))]/[0.03] to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* ─── TEXT CONTENT ─── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1 text-center lg:text-start">
            {/* Section label */}
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="inline-block px-4 py-1.5 rounded-full bg-[rgb(var(--primary))]/10 border border-[rgb(var(--primary))]/30 text-[rgb(var(--primary))] text-sm font-medium mb-6">
              ✦ {t('laptop_showcase.label')}
            </motion.span>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-bold mb-5 text-[rgb(var(--foreground))] leading-tight">
              {t('laptop_showcase.title')}
            </h2>

            {/* Subtitle */}
            <p className="text-[rgb(var(--muted-foreground))] text-lg mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
              {t('laptop_showcase.subtitle')}
            </p>

            {/* Feature highlights grid */}
            <div className="grid grid-cols-2 gap-3 mb-10 max-w-md mx-auto lg:mx-0">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + i * 0.08 }}
                  className="glass-card rounded-xl px-4 py-3 flex items-center gap-3 hover:border-[rgb(var(--primary))]/30 transition-colors duration-300 cursor-default">
                  <span className="text-[rgb(var(--primary))]">
                    {feature.icon}
                  </span>
                  <span className="text-sm font-medium text-[rgb(var(--foreground))]">
                    {feature.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Project navigation with Progress bar & Arrows */}
            <div className="mt-12 flex flex-col gap-6 w-full lg:w-[450px] mx-auto lg:mx-0">
              {/* Project Title + Arrows */}
              <div className="flex items-center justify-between gap-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: isArabic ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isArabic ? 20 : -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col text-start">
                    <span className="text-[rgb(var(--primary))] text-xs font-bold uppercase tracking-wider mb-1">
                      {String(currentIndex + 1).padStart(2, '0')} / {SHOWCASE_PROJECTS.length}
                    </span>
                    <span className="text-xl text-[rgb(var(--foreground))] font-bold leading-none line-clamp-1">
                      {t(`projects.items.${SHOWCASE_PROJECTS[currentIndex].key}.title`)}
                    </span>
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center gap-2">
                  <button
                    onClick={prevProject}
                    className="p-2.5 rounded-full glass-card hover:bg-[rgb(var(--primary))]/20 text-[rgb(var(--foreground))] transition-all active:scale-90 border-[rgb(var(--border))]/50"
                    aria-label="Previous project">
                    <ChevronLeft className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`} />
                  </button>
                  <button
                    onClick={nextProject}
                    className="p-2.5 rounded-full glass-card hover:bg-[rgb(var(--primary))]/20 text-[rgb(var(--foreground))] transition-all active:scale-90 border-[rgb(var(--border))]/50"
                    aria-label="Next project">
                    <ChevronRight className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Seamless Progress Bar */}
              <div className="h-1.5 w-full bg-[rgb(var(--muted))]/30 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.05, ease: 'linear' }}
                  className="absolute inset-y-0 left-0 bg-[rgb(var(--primary))] shadow-[0_0_12px_rgba(var(--primary),0.5)]"
                />
              </div>
            </div>
          </motion.div>

          {/* ─── 3D CANVAS ─── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-1 lg:order-2 relative aspect-[4/3] lg:aspect-auto lg:h-[550px] max-h-[480px] lg:max-h-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}>
            {/* Ambient glow behind canvas */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(96,165,250,0.08)_0%,transparent_70%)] rounded-3xl pointer-events-none" />

            {isVisible ? (
              <Canvas
                camera={{ position: [0, 0.6, 4.4], fov: 40 }}
                gl={{
                  antialias: true,
                  alpha: true,
                  powerPreference: 'high-performance',
                }}
                dpr={[1, 1.5]}
                style={{ background: 'transparent' }}>
                <Suspense fallback={<CanvasLoader />}>
                  {/* Lighting setup */}
                  <ambientLight intensity={0.5} />
                  <spotLight
                    position={[5, 8, 5]}
                    intensity={1}
                    angle={0.3}
                    penumbra={0.5}
                    castShadow
                  />
                  <pointLight
                    position={[-4, 3, -2]}
                    intensity={0.4}
                    color="#60A5FA"
                  />
                  <pointLight
                    position={[3, 2, 4]}
                    intensity={0.2}
                    color="#818CF8"
                  />

                  {/* Floating laptop */}
                  <Float
                    speed={1.5}
                    rotationIntensity={0}
                    floatIntensity={0.4}
                    floatingRange={[-0.1, 0.1]}>
                    <group position={[0, -0.6, 0]}>
                      <LaptopModel
                        currentProjectIndex={currentIndex}
                        mousePosition={mousePos}
                      />
                    </group>
                  </Float>

                  {/* Ground contact shadow */}
                  <ContactShadows
                    position={[0, -1.6, 0]}
                    opacity={0.35}
                    scale={8}
                    blur={2.5}
                    far={4}
                    color="#1a1a2e"
                  />

                  {/* Realistic environment reflections */}
                  <Environment preset="city" />
                </Suspense>
              </Canvas>
            ) : (
              /* Pre-visibility placeholder */
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-[3px] border-[rgb(var(--primary))]/20 border-t-[rgb(var(--primary))] rounded-full animate-spin" />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LaptopShowcase3D;
