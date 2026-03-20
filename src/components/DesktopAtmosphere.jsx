import React, { useEffect, useRef } from 'react';

class Particle {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > this.canvas.width || this.y < 0 || this.y > this.canvas.height) {
      this.reset();
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    this.ctx.fill();
  }
}

const DesktopAtmosphere = () => {
  const canvasRef = useRef(null);
  const parallaxRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const particleCount = 36;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      resize();
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas, ctx));
      }
    };

    const animate = () => {
      parallaxRef.current.x += (parallaxRef.current.tx - parallaxRef.current.x) * 0.06;
      parallaxRef.current.y += (parallaxRef.current.ty - parallaxRef.current.y) * 0.06;
      canvas.style.transform = `translate3d(${parallaxRef.current.x}px, ${parallaxRef.current.y}px, 0)`;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handlePointerMove = (event) => {
      const px = (event.clientX / window.innerWidth) - 0.5;
      const py = (event.clientY / window.innerHeight) - 0.5;
      parallaxRef.current.tx = px * 16;
      parallaxRef.current.ty = py * 16;
    };

    const resetParallax = () => {
      parallaxRef.current.tx = 0;
      parallaxRef.current.ty = 0;
    };

    init();
    animate();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseleave', resetParallax);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseleave', resetParallax);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="desktop-atmosphere"
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        pointerEvents: 'none', 
        zIndex: 1,
        opacity: 0.5
      }} 
    />
  );
};

export default DesktopAtmosphere;
