// src/utils/gsapAnimations.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins
gsap.registerPlugin(ScrollTrigger);

// Common animation configurations
export const animationConfig = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.2,
    verySlow: 2.0
  },
  ease: {
    smooth: "power3.out",
    bounce: "back.out(1.7)",
    elastic: "elastic.out(1, 0.3)",
    power: "power2.out"
  },
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.2
  }
};

// Fade in animation with scroll trigger
export const fadeInUp = (
  element: gsap.TweenTarget,
  options: {
    duration?: number;
    delay?: number;
    y?: number;
    trigger?: string | Element;
    start?: string;
    ease?: string;
  } = {}
) => {
  const {
    duration = animationConfig.duration.normal,
    delay = 0,
    y = 50,
    trigger = element,
    start = "top 85%",
    ease = animationConfig.ease.smooth
  } = options;

  gsap.set(element, { opacity: 0, y });

  return gsap.to(element, {
    opacity: 1,
    y: 0,
    duration,
    delay,
    ease,
    scrollTrigger: {
      trigger,
      start,
      toggleActions: "play none none reverse"
    }
  });
};

// Fade in from left
export const fadeInLeft = (
  element: gsap.TweenTarget,
  options: {
    duration?: number;
    delay?: number;
    x?: number;
    trigger?: string | Element;
    start?: string;
    ease?: string;
  } = {}
) => {
  const {
    duration = animationConfig.duration.normal,
    delay = 0,
    x = -50,
    trigger = element,
    start = "top 85%",
    ease = animationConfig.ease.smooth
  } = options;

  gsap.set(element, { opacity: 0, x });

  return gsap.to(element, {
    opacity: 1,
    x: 0,
    duration,
    delay,
    ease,
    scrollTrigger: {
      trigger,
      start,
      toggleActions: "play none none reverse"
    }
  });
};

// Fade in from right
export const fadeInRight = (
  element: gsap.TweenTarget,
  options: {
    duration?: number;
    delay?: number;
    x?: number;
    trigger?: string | Element;
    start?: string;
    ease?: string;
  } = {}
) => {
  const {
    duration = animationConfig.duration.normal,
    delay = 0,
    x = 50,
    trigger = element,
    start = "top 85%",
    ease = animationConfig.ease.smooth
  } = options;

  gsap.set(element, { opacity: 0, x });

  return gsap.to(element, {
    opacity: 1,
    x: 0,
    duration,
    delay,
    ease,
    scrollTrigger: {
      trigger,
      start,
      toggleActions: "play none none reverse"
    }
  });
};

// Scale in animation
export const scaleIn = (
  element: gsap.TweenTarget,
  options: {
    duration?: number;
    delay?: number;
    scale?: number;
    trigger?: string | Element;
    start?: string;
    ease?: string;
  } = {}
) => {
  const {
    duration = animationConfig.duration.normal,
    delay = 0,
    scale = 0.8,
    trigger = element,
    start = "top 85%",
    ease = animationConfig.ease.bounce
  } = options;

  gsap.set(element, { opacity: 0, scale });

  return gsap.to(element, {
    opacity: 1,
    scale: 1,
    duration,
    delay,
    ease,
    scrollTrigger: {
      trigger,
      start,
      toggleActions: "play none none reverse"
    }
  });
};

// Stagger animation for multiple elements
export const staggerFadeIn = (
  elements: gsap.TweenTarget,
  options: {
    duration?: number;
    stagger?: number;
    y?: number;
    trigger?: string | Element;
    start?: string;
    ease?: string;
  } = {}
) => {
  const {
    duration = animationConfig.duration.normal,
    stagger = animationConfig.stagger.normal,
    y = 30,
    trigger = elements,
    start = "top 85%",
    ease = animationConfig.ease.smooth
  } = options;

  gsap.set(elements, { opacity: 0, y });

  return gsap.to(elements, {
    opacity: 1,
    y: 0,
    duration,
    stagger,
    ease,
    scrollTrigger: {
      trigger,
      start,
      toggleActions: "play none none reverse"
    }
  });
};

// Floating animation (continuous)
export const floatingAnimation = (
  element: gsap.TweenTarget,
  options: {
    y?: number;
    duration?: number;
    delay?: number;
    ease?: string;
  } = {}
) => {
  const {
    y = -15,
    duration = 3,
    delay = 0,
    ease = "power2.inOut"
  } = options;

  return gsap.to(element, {
    y,
    duration,
    delay,
    ease,
    yoyo: true,
    repeat: -1
  });
};

// Rotate animation (continuous)
export const rotateAnimation = (
  element: gsap.TweenTarget,
  options: {
    rotation?: number;
    duration?: number;
    ease?: string;
  } = {}
) => {
  const {
    rotation = 360,
    duration = 10,
    ease = "none"
  } = options;

  return gsap.to(element, {
    rotation,
    duration,
    ease,
    repeat: -1
  });
};

// Parallax effect
export const parallaxEffect = (
  element: gsap.TweenTarget,
  options: {
    y?: number;
    trigger?: string | Element;
    start?: string;
    end?: string;
    scrub?: boolean | number;
  } = {}
) => {
  const {
    y = -100,
    trigger = element,
    start = "top bottom",
    end = "bottom top",
    scrub = 1
  } = options;

  return gsap.to(element, {
    y,
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub
    }
  });
};

// Button hover animation
export const buttonHover = (
  element: HTMLElement,
  options: {
    scale?: number;
    duration?: number;
    ease?: string;
  } = {}
) => {
  const {
    scale = 1.05,
    duration = animationConfig.duration.fast,
    ease = animationConfig.ease.power
  } = options;

  const handleMouseEnter = () => {
    gsap.to(element, {
      scale,
      duration,
      ease
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      scale: 1,
      duration,
      ease
    });
  };

  element.addEventListener('mouseenter', handleMouseEnter);
  element.addEventListener('mouseleave', handleMouseLeave);

  // Return cleanup function
  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Card hover animation
export const cardHover = (
  element: HTMLElement,
  options: {
    y?: number;
    scale?: number;
    duration?: number;
    ease?: string;
  } = {}
) => {
  const {
    y = -10,
    scale = 1.02,
    duration = animationConfig.duration.fast,
    ease = animationConfig.ease.power
  } = options;

  const handleMouseEnter = () => {
    gsap.to(element, {
      y,
      scale,
      duration,
      ease
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      y: 0,
      scale: 1,
      duration,
      ease
    });
  };

  element.addEventListener('mouseenter', handleMouseEnter);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Icon rotation hover
export const iconRotateHover = (
  element: HTMLElement,
  options: {
    rotation?: number;
    scale?: number;
    duration?: number;
    ease?: string;
  } = {}
) => {
  const {
    rotation = 360,
    scale = 1.1,
    duration = 0.5,
    ease = animationConfig.ease.bounce
  } = options;

  const handleMouseEnter = () => {
    gsap.to(element, {
      rotation,
      scale,
      duration,
      ease
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      rotation: 0,
      scale: 1,
      duration: animationConfig.duration.fast,
      ease: animationConfig.ease.power
    });
  };

  element.addEventListener('mouseenter', handleMouseEnter);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Text reveal animation
export const textReveal = (
  element: gsap.TweenTarget,
  options: {
    duration?: number;
    delay?: number;
    trigger?: string | Element;
    start?: string;
    ease?: string;
  } = {}
) => {
  const {
    duration = animationConfig.duration.slow,
    delay = 0,
    trigger = element,
    start = "top 85%",
    ease = animationConfig.ease.smooth
  } = options;

  gsap.set(element, {
    opacity: 0,
    y: 50,
    clipPath: "inset(0 0 100% 0)"
  });

  return gsap.to(element, {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    duration,
    delay,
    ease,
    scrollTrigger: {
      trigger,
      start,
      toggleActions: "play none none reverse"
    }
  });
};

// Timeline creator for complex animations
export const createTimeline = (options: GSAPTimelineVars = {}) => {
  return gsap.timeline(options);
};

// Cleanup function for scroll triggers
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};

// Refresh scroll triggers (useful for dynamic content)
export const refreshScrollTriggers = () => {
  ScrollTrigger.refresh();
};

// Master kill switch for all animations
export const killAllAnimations = () => {
  gsap.killTweensOf("*");
  cleanupScrollTriggers();
};

// Loading animation
export const loadingAnimation = (
  elements: gsap.TweenTarget[],
  options: {
    duration?: number;
    stagger?: number;
    ease?: string;
  } = {}
) => {
  const {
    duration = animationConfig.duration.slow,
    stagger = animationConfig.stagger.normal,
    ease = animationConfig.ease.smooth
  } = options;

  const tl = createTimeline();

  // Set initial states
  elements.forEach(element => {
    gsap.set(element, { opacity: 0, y: 50 });
  });

  // Animate in sequence
  tl.to(elements, {
    opacity: 1,
    y: 0,
    duration,
    stagger,
    ease
  });

  return tl;
};

// Page transition animation
export const pageTransition = (
  exitElement: gsap.TweenTarget,
  enterElement: gsap.TweenTarget,
  options: {
    duration?: number;
    ease?: string;
  } = {}
) => {
  const {
    duration = animationConfig.duration.normal,
    ease = animationConfig.ease.smooth
  } = options;

  const tl = createTimeline();

  tl.to(exitElement, {
    opacity: 0,
    y: -50,
    duration,
    ease
  })
  .set(enterElement, { opacity: 0, y: 50 })
  .to(enterElement, {
    opacity: 1,
    y: 0,
    duration,
    ease
  });

  return tl;
};

export default {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerFadeIn,
  floatingAnimation,
  rotateAnimation,
  parallaxEffect,
  buttonHover,
  cardHover,
  iconRotateHover,
  textReveal,
  createTimeline,
  cleanupScrollTriggers,
  refreshScrollTriggers,
  killAllAnimations,
  loadingAnimation,
  pageTransition,
  animationConfig
};