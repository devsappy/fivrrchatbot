import { useEffect } from 'react';

const useScrollAnimation = () => {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;

          // Add animation based on data attribute
          const animationType = element.getAttribute('data-scroll-animation');

          // Add delay if specified
          const delay = element.getAttribute('data-scroll-delay');
          if (delay) {
            element.style.animationDelay = `${delay}ms`;
          }

          // Apply the appropriate animation class
          switch (animationType) {
            case 'left':
              element.classList.add('animate-fadeInLeft');
              break;
            case 'right':
              element.classList.add('animate-fadeInRight');
              break;
            case 'up':
              element.classList.add('animate-fadeInUp');
              break;
            case 'scale':
              element.classList.add('animate-scaleIn');
              break;
            default:
              element.classList.add('animate-fadeInUp');
          }

          // Remove the initial hidden state
          element.classList.remove('scroll-animate', 'scroll-animate-left', 'scroll-animate-right', 'scroll-animate-up', 'scroll-animate-scale');

          // Stop observing this element
          observer.unobserve(element);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe all elements with scroll animation classes
    const animatedElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-up, .scroll-animate-scale');
    animatedElements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
};

export default useScrollAnimation;