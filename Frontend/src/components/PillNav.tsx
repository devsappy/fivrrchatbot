import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';

export interface NavItem {
  label: string;
  href: string;
}

export interface PillNavProps {
  logo?: string | React.ReactNode;
  logoAlt?: string;
  items: NavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  theme?: 'light' | 'dark';
  initialLoadAnimation?: boolean;
}

const PillNav: React.FC<PillNavProps> = ({
  logo,
  logoAlt = "Logo",
  items,
  activeHref,
  className = "",
  ease = "power2.easeOut",
  baseColor = "#000000",
  pillColor = "#ffffff",
  hoveredPillTextColor = "#ffffff",
  pillTextColor = "#000000",
  theme = "light",
  initialLoadAnimation = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  
  const location = useLocation();
  const currentHref = activeHref || location.pathname;

  const [activeIndex, setActiveIndex] = useState(() => {
    const idx = items.findIndex(item => item.href === currentHref);
    return idx === -1 ? 0 : idx;
  });
  
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    const idx = items.findIndex(item => item.href === currentHref);
    if (idx !== -1) setActiveIndex(idx);
  }, [currentHref, items]);

  const movePill = (duration: number) => {
    const targetIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
    const targetEl = itemsRef.current[targetIndex];
    const containerEl = containerRef.current;
    const pillEl = pillRef.current;

    if (targetEl && containerEl && pillEl) {
      const targetRect = targetEl.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();

      gsap.to(pillEl, {
        x: targetRect.left - containerRect.left,
        y: targetRect.top - containerRect.top,
        width: targetRect.width,
        height: targetRect.height,
        ease: ease,
        duration: duration
      });
    }
  };

  useEffect(() => {
    // Skip animated transition on first render — the mount effect handles initial positioning
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    movePill(0.4);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, hoveredIndex, ease]);

  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;

    // Reposition pill when any image inside the nav finishes loading
    const images = containerEl.querySelectorAll('img');
    const reposition = () => movePill(0);

    images.forEach(img => {
      if (img.complete) return;
      img.addEventListener('load', reposition);
    });

    document.fonts.ready.then(reposition);

    return () => {
      images.forEach(img => img.removeEventListener('load', reposition));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (initialLoadAnimation && containerRef.current) {
      gsap.from(containerRef.current, {
        y: -30,
        duration: 0.8,
        ease: "power3.out"
      });
    }
  }, [initialLoadAnimation]);

  const defaultTextColor = '#000000';

  return (
    <div 
      ref={containerRef} 
      className={`relative flex items-center p-2 rounded-full shadow-lg border border-gray-100 backdrop-blur-md ${className}`}
      style={{ backgroundColor: `${baseColor}80` }}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {logo && (
        <Link to="/" className="mr-48 pl-12 pr-8 flex items-center select-none" draggable={false} style={{ textDecoration: 'none' }}>
          {typeof logo === 'string' ? (
            <img src={logo} alt={logoAlt} className="h-8 select-none" draggable={false} />
          ) : (
            <div className="select-none" draggable={false}>{logo}</div>
          )}
        </Link>
      )}
      
      {/* Animated Background Pill */}
      <div
        ref={pillRef}
        className="absolute rounded-full pointer-events-none"
        style={{ backgroundColor: pillColor, left: 0, top: 0 }}
      />
      
      <div className="flex items-center relative z-10 gap-12 pr-8">
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const isHovered = index === hoveredIndex;
          const isTarget = hoveredIndex !== null ? isHovered : isActive;
          
          let color = defaultTextColor;
          if (isTarget) {
            color = isHovered ? hoveredPillTextColor : pillTextColor;
          }

          return (
            <Link
              key={item.label}
              to={item.href}
              ref={(el) => { itemsRef.current[index] = el; }}
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={() => {
                if (location.pathname === item.href) {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="px-8 py-2 text-lg font-medium transition-colors duration-300 rounded-full tracking-wide"
              style={{ color }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PillNav;
