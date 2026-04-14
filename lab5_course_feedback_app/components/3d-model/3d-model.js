
export class ThreeDModelComponent {
    constructor(container, modelUrl = null, modelTitle = null) {
        this.container = container;
        this.modelUrl = modelUrl;
        this.modelTitle = modelTitle || '3D Модель';
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.model = null;
        this.controls = null;
        this.animationId = null;
    }

    async init() {
        console.log('Инициализация 3D модели компьютера...');

        const THREE = await import('three');
        const { OrbitControls } = await import('three/addons/controls/OrbitControls.js');

        this.THREE = THREE;
        this.OrbitControls = OrbitControls;

        this.setupScene();
        this.setupLights();
        this.createComputerModel(); // Создаем модель компьютера

        this.animate();

        console.log('3D модель компьютера инициализирована');
    }

    setupScene() {
        const width = this.container.clientWidth;
        const height = 400;

        this.scene = new this.THREE.Scene();
        this.scene.background = new this.THREE.Color(0xf5f5f7);

        this.camera = new this.THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.set(4, 3, 5);
        this.camera.lookAt(0, 0.5, 0);

        this.renderer = new this.THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;

        this.container.innerHTML = '';
        this.container.appendChild(this.renderer.domElement);

        this.controls = new this.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.autoRotate = false;
        this.controls.enableZoom = true;
        this.controls.target.set(0, 0.8, 0);

        const gridHelper = new this.THREE.GridHelper(8, 20, 0x888888, 0xcccccc);
        gridHelper.position.y = -0.5;
        this.scene.add(gridHelper);
    }

    setupLights() {
        const ambientLight = new this.THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new this.THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(3, 5, 2);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);

        const fillLight = new this.THREE.PointLight(0x4466cc, 0.3);
        fillLight.position.set(0, 2, 2);
        this.scene.add(fillLight);

        const backLight = new this.THREE.PointLight(0xffaa66, 0.3);
        backLight.position.set(-2, 2, -3);
        this.scene.add(backLight);

        const bottomLight = new this.THREE.PointLight(0x3d3bff, 0.2);
        bottomLight.position.set(0, -1, 0);
        this.scene.add(bottomLight);
    }

    createComputerModel() {
        console.log('Создание модели компьютера...');

        const computerGroup = new this.THREE.Group();

        const stand = new this.THREE.Mesh(
            new this.THREE.BoxGeometry(0.8, 0.08, 0.8),
            new this.THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.7, roughness: 0.3 })
        );
        stand.position.y = 0.04;
        stand.castShadow = true;
        computerGroup.add(stand);

        const neck = new this.THREE.Mesh(
            new this.THREE.BoxGeometry(0.15, 0.3, 0.15),
            new this.THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.5 })
        );
        neck.position.y = 0.25;
        neck.castShadow = true;
        computerGroup.add(neck);

        const monitorBody = new this.THREE.Mesh(
            new this.THREE.BoxGeometry(1.6, 1.2, 0.1),
            new this.THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.3, roughness: 0.2 })
        );
        monitorBody.position.y = 0.9;
        monitorBody.castShadow = true;
        computerGroup.add(monitorBody);

        const screen = new this.THREE.Mesh(
            new this.THREE.BoxGeometry(1.4, 0.9, 0.02),
            new this.THREE.MeshStandardMaterial({ color: 0x3d3bff, emissive: 0x1a1a8a, emissiveIntensity: 0.5 })
        );
        screen.position.set(0, 0.9, 0.06);
        screen.castShadow = true;
        computerGroup.add(screen);

        const bezel = new this.THREE.Mesh(
            new this.THREE.BoxGeometry(1.62, 1.22, 0.02),
            new this.THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.8 })
        );
        bezel.position.set(0, 0.9, 0.04);
        computerGroup.add(bezel);

        const tower = new this.THREE.Mesh(
            new this.THREE.BoxGeometry(0.5, 1.2, 0.5),
            new this.THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.6 })
        );
        tower.position.set(-1.2, 0.6, -0.3);
        tower.castShadow = true;
        computerGroup.add(tower);

        const powerBtn = new this.THREE.Mesh(
            new this.THREE.CylinderGeometry(0.08, 0.08, 0.02, 8),
            new this.THREE.MeshStandardMaterial({ color: 0x00ff00, emissive: 0x00aa00, emissiveIntensity: 0.3 })
        );
        powerBtn.rotation.x = Math.PI / 2;
        powerBtn.position.set(-1.2, 1.1, -0.05);
        computerGroup.add(powerBtn);

        const usbPorts = new this.THREE.Mesh(
            new this.THREE.BoxGeometry(0.3, 0.05, 0.02),
            new this.THREE.MeshStandardMaterial({ color: 0x888888 })
        );
        usbPorts.position.set(-1.2, 0.7, -0.05);
        computerGroup.add(usbPorts);

        const keyboardBase = new this.THREE.Mesh(
            new this.THREE.BoxGeometry(1.0, 0.05, 0.4),
            new this.THREE.MeshStandardMaterial({ color: 0x444444, roughness: 0.4 })
        );
        keyboardBase.position.set(0, 0.15, 0.8);
        keyboardBase.castShadow = true;
        computerGroup.add(keyboardBase);

        const keyMaterial = new this.THREE.MeshStandardMaterial({ color: 0x666666 });
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 8; j++) {
                const key = new this.THREE.Mesh(
                    new this.THREE.BoxGeometry(0.07, 0.03, 0.07),
                    keyMaterial
                );
                key.position.set(-0.3 + (j * 0.09), 0.19, 0.7 + (i * 0.1));
                key.castShadow = true;
                computerGroup.add(key);
            }
        }

        const mouseBase = new this.THREE.Mesh(
            new this.THREE.BoxGeometry(0.12, 0.04, 0.2),
            new this.THREE.MeshStandardMaterial({ color: 0x555555 })
        );
        mouseBase.position.set(0.9, 0.13, 0.9);
        mouseBase.castShadow = true;
        computerGroup.add(mouseBase);

        const mouseTop = new this.THREE.Mesh(
            new this.THREE.SphereGeometry(0.07, 16, 16),
            new this.THREE.MeshStandardMaterial({ color: 0x666666 })
        );
        mouseTop.position.set(0.9, 0.19, 0.9);
        mouseTop.castShadow = true;
        computerGroup.add(mouseTop);

        const cup = new this.THREE.Mesh(
            new this.THREE.CylinderGeometry(0.12, 0.1, 0.12, 8),
            new this.THREE.MeshStandardMaterial({ color: 0xcd853f })
        );
        cup.position.set(1.2, 0.1, 0.5);
        cup.castShadow = true;
        computerGroup.add(cup);

        const steamMat = new this.THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
        for (let i = 0; i < 3; i++) {
            const steam = new this.THREE.Mesh(
                new this.THREE.SphereGeometry(0.03, 4, 4),
                steamMat
            );
            steam.position.set(1.18 + (i * 0.03), 0.2 + (i * 0.03), 0.48);
            computerGroup.add(steam);
        }

        const codeParticles = [];
        const symbols = ['&lt;', '/&gt;', '{}', '()', '[]', 'JS', 'CSS', 'HTML'];

        for (let i = 0; i < 30; i++) {
            const particle = new this.THREE.Mesh(
                new this.THREE.SphereGeometry(0.03, 6, 6),
                new this.THREE.MeshStandardMaterial({ color: 0x3d3bff, emissive: 0x1a1a8a, emissiveIntensity: 0.3 })
            );
            particle.position.set(
                (Math.random() - 0.5) * 4,
                Math.random() * 2.5,
                (Math.random() - 0.5) * 3
            );
            particle.castShadow = true;
            computerGroup.add(particle);
            codeParticles.push(particle);
        }

        this.particles = codeParticles;
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

            if (this.controls) {
                this.controls.update();
            }

            if (this.renderer && this.scene && this.camera) {
                this.renderer.render(this.scene, this.camera);
            }
        };

        animateFunc();
    }

    resize() {
        if (!this.container || !this.camera || !this.renderer) return;

        const width = this.container.clientWidth;
        const height = 400;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    setView(view) {
        if (!this.camera || !this.controls) return;

        switch(view) {
            case 'front':
                this.camera.position.set(0, 0.8, 4);
                break;
            case 'left':
                this.camera.position.set(-4, 0.8, 0);
                break;
            case 'right':
                this.camera.position.set(4, 0.8, 0);
                break;
            default:
                this.camera.position.set(4, 3, 5);
        }

        this.controls.target.set(0, 0.8, 0);
        this.controls.update();
    }

    zoomIn() {
        if (this.camera) {
            this.camera.position.multiplyScalar(0.9);
            this.controls.update();
        }
    }

    zoomOut() {
        if (this.camera) {
            this.camera.position.multiplyScalar(1.1);
            this.controls.update();
        }
    }

    resetView() {
        this.camera.position.set(4, 3, 5);
        this.controls.target.set(0, 0.8, 0);
        this.controls.update();
    }

    dispose() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        if (this.controls) {
            this.controls.dispose();
        }

        if (this.renderer) {
            this.renderer.dispose();
        }

        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}
