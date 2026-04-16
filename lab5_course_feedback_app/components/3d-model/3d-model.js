import * as THREE from 'three';

export class ThreeDModelComponent {
    constructor(container, modelUrl = null, modelTitle = null) {
        this.container = container;
        this.modelUrl = modelUrl;
        this.modelTitle = modelTitle || '3D Модель';
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.model = null;
        this.animationId = null;
        this.isDragging = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
    }

    async init() {
        console.log('Инициализация 3D модели...');

        this.setupScene();
        this.setupLights();
        this.createComputerModel();
        this.setupMouseControls();
        this.animate();

        console.log('3D модель инициализирована');
    }

    setupScene() {
        const width = this.container.clientWidth;
        const height = 400;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf5f5f7);

        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.set(4, 3, 5);
        this.camera.lookAt(0, 0.8, 0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;

        this.container.innerHTML = '';
        this.container.appendChild(this.renderer.domElement);

        const gridHelper = new THREE.GridHelper(8, 20, 0x888888, 0xcccccc);
        gridHelper.position.y = -0.5;
        this.scene.add(gridHelper);
    }

    setupMouseControls() {
        this.container.style.cursor = 'grab';

        this.container.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
            this.container.style.cursor = 'grabbing';
        });

        window.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;

            const deltaX = e.clientX - this.lastMouseX;
            const deltaY = e.clientY - this.lastMouseY;

            const center = new THREE.Vector3(0, 0.8, 0);
            const radius = this.camera.position.clone().sub(center).length();

            let theta = Math.atan2(this.camera.position.z - center.z, this.camera.position.x - center.x);
            let phi = Math.acos((this.camera.position.y - center.y) / radius);

            theta += deltaX * 0.01;
            phi -= deltaY * 0.01;

            phi = Math.max(0.1, Math.min(Math.PI - 0.1, phi));

            const newX = center.x + radius * Math.sin(phi) * Math.cos(theta);
            const newY = center.y + radius * Math.cos(phi);
            const newZ = center.z + radius * Math.sin(phi) * Math.sin(theta);

            this.camera.position.set(newX, newY, newZ);
            this.camera.lookAt(center);

            this.lastMouseX = e.clientX;
            this.lastMouseY = e.clientY;
        });

        window.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.container.style.cursor = 'grab';
        });
    }

    setupLights() {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(3, 5, 2);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);

        const fillLight = new THREE.PointLight(0x4466cc, 0.3);
        fillLight.position.set(0, 2, 2);
        this.scene.add(fillLight);

        const backLight = new THREE.PointLight(0xffaa66, 0.3);
        backLight.position.set(-2, 2, -3);
        this.scene.add(backLight);
    }

    createComputerModel() {
        console.log('Создание модели компьютера...');

        const computerGroup = new THREE.Group();

        const stand = new THREE.Mesh(
            new THREE.BoxGeometry(0.8, 0.08, 0.8),
            new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.7, roughness: 0.3 })
        );
        stand.position.y = 0.04;
        stand.castShadow = true;
        computerGroup.add(stand);

        const neck = new THREE.Mesh(
            new THREE.BoxGeometry(0.15, 0.3, 0.15),
            new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.5 })
        );
        neck.position.y = 0.25;
        neck.castShadow = true;
        computerGroup.add(neck);

        const monitorBody = new THREE.Mesh(
            new THREE.BoxGeometry(1.6, 1.2, 0.1),
            new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.3, roughness: 0.2 })
        );
        monitorBody.position.y = 0.9;
        monitorBody.castShadow = true;
        computerGroup.add(monitorBody);

        const screen = new THREE.Mesh(
            new THREE.BoxGeometry(1.4, 0.9, 0.02),
            new THREE.MeshStandardMaterial({ color: 0x3d3bff, emissive: 0x1a1a8a, emissiveIntensity: 0.5 })
        );
        screen.position.set(0, 0.9, 0.06);
        screen.castShadow = true;
        computerGroup.add(screen);

        const bezel = new THREE.Mesh(
            new THREE.BoxGeometry(1.62, 1.22, 0.02),
            new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8 })
        );
        bezel.position.set(0, 0.9, 0.04);
        computerGroup.add(bezel);

        const tower = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 1.2, 0.5),
            new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.6 })
        );
        tower.position.set(-1.2, 0.6, -0.3);
        tower.castShadow = true;
        computerGroup.add(tower);

        const powerBtn = new THREE.Mesh(
            new THREE.CylinderGeometry(0.08, 0.08, 0.02, 8),
            new THREE.MeshStandardMaterial({ color: 0x00ff00, emissive: 0x00aa00, emissiveIntensity: 0.3 })
        );
        powerBtn.rotation.x = Math.PI / 2;
        powerBtn.position.set(-1.2, 1.1, -0.05);
        computerGroup.add(powerBtn);

        const keyboardBase = new THREE.Mesh(
            new THREE.BoxGeometry(1.0, 0.05, 0.4),
            new THREE.MeshStandardMaterial({ color: 0x444444, roughness: 0.4 })
        );
        keyboardBase.position.set(0, 0.15, 0.8);
        keyboardBase.castShadow = true;
        computerGroup.add(keyboardBase);

        const mouseBase = new THREE.Mesh(
            new THREE.BoxGeometry(0.12, 0.04, 0.2),
            new THREE.MeshStandardMaterial({ color: 0x555555 })
        );
        mouseBase.position.set(0.9, 0.13, 0.9);
        mouseBase.castShadow = true;
        computerGroup.add(mouseBase);

        const mouseTop = new THREE.Mesh(
            new THREE.SphereGeometry(0.07, 16, 16),
            new THREE.MeshStandardMaterial({ color: 0x666666 })
        );
        mouseTop.position.set(0.9, 0.19, 0.9);
        mouseTop.castShadow = true;
        computerGroup.add(mouseTop);

        const particles = [];
        for (let i = 0; i < 30; i++) {
            const particle = new THREE.Mesh(
                new THREE.SphereGeometry(0.03, 6, 6),
                new THREE.MeshStandardMaterial({ color: 0x3d3bff, emissive: 0x1a1a8a, emissiveIntensity: 0.3 })
            );
            particle.position.set(
                (Math.random() - 0.5) * 4,
                Math.random() * 2.5,
                (Math.random() - 0.5) * 3
            );
            particle.castShadow = true;
            computerGroup.add(particle);
            particles.push(particle);
        }

        this.particles = particles;
        this.particleTime = 0;

        this.scene.add(computerGroup);
        this.model = computerGroup;

        console.log('Модель компьютера создана успешно');
    }

    animate() {
        const animateFunc = () => {
            this.animationId = requestAnimationFrame(animateFunc);

            if (this.particles) {
                this.particleTime += 0.01;
                this.particles.forEach((particle, index) => {
                    particle.position.y += Math.sin(this.particleTime + index) * 0.002;
                });
            }

            if (this.renderer && this.scene && this.camera) {
                this.renderer.render(this.scene, this.camera);
            }
        };

        animateFunc();
    }

    setView(view) {
        if (!this.camera) return;

        const center = new THREE.Vector3(0, 0.8, 0);
        const distance = 5;

        switch(view) {
            case 'front':
                this.camera.position.set(0, 0.8, distance);
                break;
            case 'left':
                this.camera.position.set(-distance, 0.8, 0);
                break;
            case 'right':
                this.camera.position.set(distance, 0.8, 0);
                break;
        }

        this.camera.lookAt(center);
    }

    zoomIn() {
        if (!this.camera) return;

        const center = new THREE.Vector3(0, 0.8, 0);
        const direction = this.camera.position.clone().sub(center);
        const newLength = direction.length() * 0.85;

        if (newLength > 1.5) {
            direction.normalize();
            this.camera.position.copy(center.clone().add(direction.multiplyScalar(newLength)));
            this.camera.lookAt(center);
        }
    }

    zoomOut() {
        if (!this.camera) return;

        const center = new THREE.Vector3(0, 0.8, 0);
        const direction = this.camera.position.clone().sub(center);
        const newLength = direction.length() * 1.15;

        if (newLength < 10) {
            direction.normalize();
            this.camera.position.copy(center.clone().add(direction.multiplyScalar(newLength)));
            this.camera.lookAt(center);
        }
    }

    resetView() {
        const center = new THREE.Vector3(0, 0.8, 0);
        this.camera.position.set(4, 3, 5);
        this.camera.lookAt(center);
    }

    resize() {
        if (!this.container || !this.camera || !this.renderer) return;

        const width = this.container.clientWidth;
        const height = 400;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    dispose() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        if (this.renderer) {
            this.renderer.dispose();
        }

        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}
