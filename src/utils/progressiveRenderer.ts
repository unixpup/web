import * as THREE from 'three';

export enum RenderingMode {
  WEBGPU = 'webgpu',
  WEBGL = 'webgl',
  FALLBACK = 'fallback'
}

export interface RendererOptions {
  container: HTMLElement;
  particleCount?: number;
  onRenderingModeChange?: (mode: RenderingMode) => void;
}

export class ProgressiveRenderer {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer | null = null;
  private particleSystem: THREE.Points | null = null;
  private animationId: number | null = null;
  private mouseX = 0;
  private mouseY = 0;
  private targetMouseX = 0;
  private targetMouseY = 0;

  private renderingMode: RenderingMode = RenderingMode.FALLBACK;
  private container: HTMLElement;
  private particleCount: number;
  private onRenderingModeChange?: (mode: RenderingMode) => void;

  constructor(options: RendererOptions) {
    this.container = options.container;
    this.particleCount = options.particleCount || 200;
    this.onRenderingModeChange = options.onRenderingModeChange;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.initRenderer();

    window.addEventListener('resize', this.handleResize.bind(this));
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  private async initRenderer(): Promise<void> {
    // Try WebGPU first (check if the API exists)
    if ('gpu' in navigator) {
      try {
        // Just check if WebGPU is available - we'll still use Three.js WebGLRenderer
        // but optimize settings for high-performance devices
        const adapter = await (navigator as any).gpu?.requestAdapter();
        if (adapter) {
          this.renderingMode = RenderingMode.WEBGPU;
          console.log('Using optimized renderer for WebGPU-capable device');
          // Setup renderer with higher quality settings
          this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
          });
          this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap at 2x for performance
        } else {
          throw new Error('WebGPU adapter not available');
        }
      } catch (e) {
        console.warn('WebGPU not available:', e);
        this.initWebGLRenderer();
      }
    } else {
      this.initWebGLRenderer();
    }

    if (this.renderer) {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.container.appendChild(this.renderer.domElement);

      // Notify about the rendering mode change
      if (this.onRenderingModeChange) {
        this.onRenderingModeChange(this.renderingMode);
      }

      this.createParticleSystem();
      this.camera.position.z = 5;
      this.animate();
    }
  }

  private initWebGLRenderer(): void {
    try {
      // Test if WebGL is available
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

      if (gl) {
        this.renderingMode = RenderingMode.WEBGL;
        this.renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: 'default'
        });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      } else {
        console.warn('WebGL not available');
        this.renderingMode = RenderingMode.FALLBACK;
        // Create a simple WebGL renderer with minimal settings
        this.renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: false,
          powerPreference: 'low-power'
        });
        this.renderer.setPixelRatio(1);
      }
    } catch (e) {
      console.error('Error initializing WebGL:', e);
      this.renderingMode = RenderingMode.FALLBACK;
    }
  }

  private createParticleSystem(): void {
    // Create particle system with count based on performance capability
    const particleMultiplier = this.renderingMode === RenderingMode.WEBGPU ? 1.5 :
                              (this.renderingMode === RenderingMode.WEBGL ? 1 : 0.7);

    const adjustedCount = Math.floor(this.particleCount * particleMultiplier);

    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(adjustedCount * 3);
    const sizes = new Float32Array(adjustedCount);

    for (let i = 0; i < adjustedCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      sizes[i] = Math.random() * 0.05 + 0.01;
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Create shader material
    const particleMaterial = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        void main() {
          float distance = distance(gl_PointCoord, vec2(0.5, 0.5));
          if (distance > 0.5) discard;
          gl_FragColor = vec4(1.0, 1.0, 1.0, 0.5);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    this.particleSystem = new THREE.Points(particles, particleMaterial);
    this.scene.add(this.particleSystem);
  }

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);

    if (!this.renderer || !this.particleSystem) return;

    // Smooth mouse movement - faster for better performance feeling
    const easing = this.renderingMode === RenderingMode.WEBGPU ? 0.08 : 0.06;
    this.targetMouseX += (this.mouseX - this.targetMouseX) * easing;
    this.targetMouseY += (this.mouseY - this.targetMouseY) * easing;

    // Rotate particle system - faster for better performance feeling
    const rotationSpeed = this.renderingMode === RenderingMode.WEBGPU ? 1.5 : 1.2;
    this.particleSystem.rotation.x += 0.001 * rotationSpeed;
    this.particleSystem.rotation.y += 0.002 * rotationSpeed;

    // Add subtle movement to camera
    this.camera.position.x += (this.targetMouseX * 0.5 - this.camera.position.x) * 0.01;
    this.camera.position.y += (this.targetMouseY * 0.5 - this.camera.position.y) * 0.01;
    this.camera.lookAt(this.scene.position);

    this.renderer.render(this.scene, this.camera);
  };

  private handleResize = (): void => {
    if (!this.renderer) return;

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  private handleMouseMove = (event: MouseEvent): void => {
    this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  public dispose(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }

    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('mousemove', this.handleMouseMove);

    if (this.renderer) {
      this.container.removeChild(this.renderer.domElement);
      this.renderer.dispose();
    }

    if (this.particleSystem) {
      this.scene.remove(this.particleSystem);
      this.particleSystem.geometry.dispose();
      (this.particleSystem.material as THREE.Material).dispose();
    }
  }

  public getRenderingMode(): RenderingMode {
    return this.renderingMode;
  }
}