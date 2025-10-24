// Typing effect
(function() {
	const words = [
		"Hacker", "full-stack developer", "Modder", "Linux enjoyer"
	];
	const el = document.getElementById('type');
	if (!el) return;
	let wordIndex = 0, charIndex = 0, deleting = false;
	function tick() {
		const word = words[wordIndex % words.length];
		if (!deleting) {
			charIndex++;
			if (charIndex >= word.length + 4) deleting = true;
		} else {
			charIndex--;
			if (charIndex <= 0) { deleting = false; wordIndex++; }
		}
		el.textContent = word.slice(0, Math.max(0, charIndex));
		const delay = deleting ? 50 : 90;
		setTimeout(tick, delay);
	}
	setTimeout(tick, 500);
})();

// Smooth scroll for nav links
(function() {
	document.querySelectorAll('a[href^="#"]').forEach(a => {
		a.addEventListener('click', e => {
			const targetId = a.getAttribute('href');
			if (!targetId || targetId === '#') return;
			const target = document.querySelector(targetId);
			if (!target) return;
			e.preventDefault();
			target.scrollIntoView({ behavior: 'smooth', block: 'start' });
		});
	});
})();

// Copy to clipboard
(function() {
	document.querySelectorAll('.copy').forEach(btn => {
		btn.addEventListener('click', async () => {
			const text = btn.getAttribute('data-copy') || '';
			try {
				await navigator.clipboard.writeText(text);
				btn.textContent = 'copied';
				setTimeout(() => { btn.textContent = 'copy'; }, 1200);
			} catch (_) {
				btn.textContent = 'failed';
				setTimeout(() => { btn.textContent = 'copy'; }, 1200);
			}
		});
	});
})();

// Footer year
(function() {
	const y = document.getElementById('year');
	if (y) y.textContent = new Date().getFullYear();
})();

// Matrix rain
(function() {
	const canvas = document.getElementById('matrix');
	if (!canvas) return;
	const ctx = canvas.getContext('2d');
	let width, height, columns, drops;

	function resize() {
		width = canvas.width = window.innerWidth;
		height = canvas.height = window.innerHeight;
		columns = Math.floor(width / 14);
		drops = Array.from({ length: columns }, () => Math.random() * height);
	}
	resize();
	window.addEventListener('resize', resize);

	const charset = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	function draw() {
		ctx.fillStyle = 'rgba(10,10,10,0.2)';
		ctx.fillRect(0, 0, width, height);
		ctx.fillStyle = '#00ff6a';
		ctx.font = '14px JetBrains Mono, monospace';
		for (let i = 0; i < drops.length; i++) {
			const text = charset[Math.floor(Math.random() * charset.length)];
			ctx.fillText(text, i * 14, drops[i] * 14);
			if (drops[i] * 14 > height && Math.random() > 0.975) drops[i] = 0;
			drops[i]++;
		}
	}

	let running = true;
	let raf;
	function loop() {
		if (!running) return;
		draw();
		raf = requestAnimationFrame(loop);
	}
	loop();

	const toggle = document.getElementById('toggle-matrix');
	if (toggle) {
		toggle.addEventListener('change', () => {
			running = toggle.checked;
			ctx.clearRect(0, 0, width, height);
			if (running) loop(); else cancelAnimationFrame(raf);
		});
	}
})();

// Hacker-style click effects
(function() {
	let mouseX = 0, mouseY = 0;
	
	// Hacker messages for click effects
	const hackerMessages = [
		"ACCESS GRANTED",
		"SYSTEM BREACHED", 
		"ROOT ACCESS",
		"PENETRATION SUCCESS",
		"EXPLOIT FOUND",
		"VULNERABILITY DETECTED",
		"BACKDOOR OPENED",
		"FIREWALL BYPASSED",
		"ENCRYPTION CRACKED",
		"ADMIN PRIVILEGES"
	];

	// Track mouse position
	document.addEventListener('mousemove', (e) => {
		mouseX = e.clientX;
		mouseY = e.clientY;
	});

	// Click effects
	document.addEventListener('click', (e) => {
		// Create ripple effect
		createRippleEffect(e.clientX, e.clientY);
		
		// Show hacker message
		showHackerMessage(e.clientX, e.clientY);
		
		// Add terminal-style sound effect (optional)
		playHackerSound();
	});

	function createRippleEffect(x, y) {
		const ripple = document.createElement('div');
		ripple.className = 'ripple';
		ripple.style.left = (x - 50) + 'px';
		ripple.style.top = (y - 50) + 'px';
		ripple.style.width = '100px';
		ripple.style.height = '100px';
		
		document.body.appendChild(ripple);
		
		// Remove after animation
		setTimeout(() => {
			if (ripple.parentNode) {
				ripple.parentNode.removeChild(ripple);
			}
		}, 600);
	}


	function showHackerMessage(x, y) {
		const message = document.createElement('div');
		message.className = 'hacker-click';
		message.textContent = hackerMessages[Math.floor(Math.random() * hackerMessages.length)];
		message.style.left = x + 'px';
		message.style.top = (y - 30) + 'px';
		message.style.transform = 'translate(-50%, -50%)';
		
		document.body.appendChild(message);
		
		// Remove after animation
		setTimeout(() => {
			if (message.parentNode) {
				message.parentNode.removeChild(message);
			}
		}, 1000);
	}

	function playHackerSound() {
		// Create a simple beep sound using Web Audio API
		try {
			const audioContext = new (window.AudioContext || window.webkitAudioContext)();
			const oscillator = audioContext.createOscillator();
			const gainNode = audioContext.createGain();
			
			oscillator.connect(gainNode);
			gainNode.connect(audioContext.destination);
			
			oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
			oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.1);
			
			gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
			gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
			
			oscillator.start(audioContext.currentTime);
			oscillator.stop(audioContext.currentTime + 0.2);
		} catch (e) {
			// Silently fail if audio context is not available
		}
	}
})();

// Skills modal functionality
(function() {
	// Skills data
	const skillsData = {
		linux: {
			title: "Linux",
			description: "Ochiq manbali operatsion tizim yadrosi va distributivlari. Server boshqaruvi, tizim dasturlash va xavfsizlik uchun asosiy platforma.",
			features: [
				"Ubuntu, CentOS, Debian distributivlari",
				"Bash skriptlash va avtomatlashtirish",
				"Tizim boshqaruvi va monitoring",
				"Xavfsizlik mustahkamlash va penetratsiya testlari",
				"Konteyner orkestratsiyasi (Docker, Kubernetes)"
			],
			links: [
				{ text: "Linux.org", url: "https://linux.org" },
				{ text: "Ubuntu", url: "https://ubuntu.com" }
			]
		},
		bash: {
			title: "Bash/Zsh",
			description: "Unix shell skriptlash tillari. Tizim avtomatlashtirish, DevOps va kundalik vazifalar uchun kuchli qurollar.",
			features: [
				"Shell skriptlash va avtomatlashtirish",
				"Jarayon boshqaruvi va ish nazorati",
				"Matn qayta ishlash (grep, sed, awk)",
				"Tizim monitoring va log yozish",
				"CI/CD pipeline skriptlash"
			],
			links: [
				{ text: "Bash Qo'llanma", url: "https://www.gnu.org/software/bash/manual/" },
				{ text: "Zsh Hujjatlari", url: "https://zsh.sourceforge.io/Doc/" }
			]
		},
		python: {
			title: "Python",
			description: "Yuqori darajadagi dasturlash tili. Web dasturlash, ma'lumotlar ilmi, avtomatlashtirish va xavfsizlik vositalari uchun eng mashhur til.",
			features: [
				"Web frameworklar (Django, Flask, FastAPI)",
				"Ma'lumotlar ilmi (Pandas, NumPy, Matplotlib)",
				"Machine Learning (TensorFlow, PyTorch)",
				"Xavfsizlik vositalari va penetratsiya testlari",
				"Avtomatlashtirish va skriptlash"
			],
			links: [
				{ text: "Python.org", url: "https://python.org" },
				{ text: "Django", url: "https://djangoproject.com" }
			]
		},
		javascript: {
			title: "JavaScript/TypeScript",
			description: "Web dasturlash uchun asosiy til. Frontend va backend dasturlash, real vaqt dasturlari.",
			features: [
				"ES6+ zamonaviy JavaScript xususiyatlari",
				"TypeScript tur xavfsizligi uchun",
				"Node.js backend dasturlash",
				"React, Vue, Angular frameworklar",
				"Web API va brauzer avtomatlashtirish"
			],
			links: [
				{ text: "MDN JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
				{ text: "TypeScript", url: "https://typescriptlang.org" }
			]
		},
		node: {
			title: "Node.js",
			description: "Server-side dasturlash uchun JavaScript runtime. Yuqori ishlash, hodisa asosidagi dasturlar.",
			features: [
				"Server-side JavaScript dasturlash",
				"RESTful API va GraphQL",
				"Real vaqt dasturlari (WebSocket)",
				"Microservices arxitektura",
				"Paket boshqaruvi (npm, yarn)"
			],
			links: [
				{ text: "Node.js", url: "https://nodejs.org" },
				{ text: "Express.js", url: "https://expressjs.com" }
			]
		},
		react: {
			title: "React",
			description: "Foydalanuvchi interfeyslarini yaratish uchun mashhur JavaScript kutubxonasi. Komponent asosidagi arxitektura.",
			features: [
				"Komponent asosidagi arxitektura",
				"Virtual DOM va ishlash optimizatsiyasi",
				"Hooks va funksional komponentlar",
				"Holat boshqaruvi (Redux, Context)",
				"Server-side rendering (Next.js)"
			],
			links: [
				{ text: "React", url: "https://reactjs.org" },
				{ text: "React Hooks", url: "https://reactjs.org/docs/hooks-intro.html" }
			]
		},
		nextjs: {
			title: "Next.js",
			description: "Ishlab chiqarish uchun React framework. Server-side rendering, statik generatsiya va optimizatsiya.",
			features: [
				"Server-side rendering (SSR)",
				"Statik sayt generatsiyasi (SSG)",
				"API yo'llari va backend integratsiyasi",
				"Rasm optimizatsiyasi va ishlash",
				"Deployment optimizatsiyasi"
			],
			links: [
				{ text: "Next.js", url: "https://nextjs.org" },
				{ text: "Vercel", url: "https://vercel.com" }
			]
		},
		express: {
			title: "Express.js",
			description: "Node.js uchun minimalist web framework. Tez, fikr bildirmaydigan, moslashuvchan.",
			features: [
				"RESTful API dasturlash",
				"Middleware arxitektura",
				"Template engine qo'llab-quvvatlash",
				"Sessiya boshqaruvi",
				"Xavfsizlik middleware"
			],
			links: [
				{ text: "Express.js", url: "https://expressjs.com" },
				{ text: "Express Qo'llanma", url: "https://expressjs.com/en/guide/routing.html" }
			]
		},
		postgresql: {
			title: "PostgreSQL",
			description: "Ilg'or ochiq manbali relatsion ma'lumotlar bazasi. ACID muvofiqlik, kengaytirilish va ishlash.",
			features: [
				"ACID muvofiqlik va transaksiyalar",
				"Ilg'or ma'lumot turlari (JSON, Arrays)",
				"To'liq matn qidiruv imkoniyatlari",
				"Replikatsiya va klasterlash",
				"Kengaytmalar va maxsus funksiyalar"
			],
			links: [
				{ text: "PostgreSQL", url: "https://postgresql.org" },
				{ text: "PostgreSQL Hujjatlari", url: "https://postgresql.org/docs/" }
			]
		},
		docker: {
			title: "Docker",
			description: "Konteynerlashtirish platformasi. Dastur paketlash, deployment va masshtablash.",
			features: [
				"Konteynerlashtirish va izolyatsiya",
				"Ko'p konteyner dasturlar uchun Docker Compose",
				"Rasm yaratish va optimizatsiya",
				"Konteyner orkestratsiyasi",
				"CI/CD integratsiyasi"
			],
			links: [
				{ text: "Docker", url: "https://docker.com" },
				{ text: "Docker Hub", url: "https://hub.docker.com" }
			]
		},
		nmap: {
			title: "Nmap",
			description: "Tarmoq kashfiyoti va xavfsizlik audit vositasi. Port skanlash, xizmat aniqlash.",
			features: [
				"Tarmoq kashfiyoti va xaritalash",
				"Port skanlash va xizmat aniqlash",
				"OS fingerprinting",
				"Zaiflik skanlash",
				"Skriptlash dvigateli (NSE)"
			],
			links: [
				{ text: "Nmap.org", url: "https://nmap.org" },
				{ text: "Nmap Skriptlari", url: "https://nmap.org/nsedoc/" }
			]
		},
		burp: {
			title: "Burp Suite",
			description: "Web dastur xavfsizligi testlash platformasi. Proxy, skaner va avtomatlashtirilgan testlash.",
			features: [
				"Web dastur proxy",
				"Avtomatlashtirilgan zaiflik skanlash",
				"Qo'lda testlash vositalari",
				"Intruder va repeater modullari",
				"Kengaytma dasturlash"
			],
			links: [
				{ text: "PortSwigger", url: "https://portswigger.net" },
				{ text: "Burp Akademiyasi", url: "https://portswigger.net/web-security" }
			]
		},
		owasp: {
			title: "OWASP Top 10",
			description: "Web dastur xavfsizlik xavflari. Xavfsizlik xabardorligi uchun sanoat standarti.",
			features: [
				"Injection hujumlaridan himoya",
				"Autentifikatsiya va sessiya boshqaruvi",
				"Cross-site scripting (XSS)",
				"Xavfsizlik noto'g'ri sozlash",
				"Zaif komponentlarni aniqlash"
			],
			links: [
				{ text: "OWASP", url: "https://owasp.org" },
				{ text: "OWASP Top 10", url: "https://owasp.org/www-project-top-ten/" }
			]
		}
	};

	// Create modal HTML
	function createModal() {
		const modal = document.createElement('div');
		modal.className = 'skill-modal';
		modal.innerHTML = `
			<div class="skill-modal-content">
				<div class="skill-modal-header">
					<h3 class="skill-modal-title"></h3>
					<button class="skill-modal-close">×</button>
				</div>
				<div class="skill-modal-body">
					<div class="skill-description"></div>
					<div class="skill-features">
						<h4>Asosiy Xususiyatlar:</h4>
						<ul class="skill-features-list"></ul>
					</div>
					<div class="skill-links"></div>
				</div>
			</div>
		`;
		document.body.appendChild(modal);
		return modal;
	}

	// Show modal with skill data
	function showSkillModal(skillKey) {
		const data = skillsData[skillKey];
		if (!data) return;

		let modal = document.querySelector('.skill-modal');
		if (!modal) {
			modal = createModal();
		}

		// Populate modal content
		modal.querySelector('.skill-modal-title').textContent = data.title;
		modal.querySelector('.skill-description').textContent = data.description;
		
		const featuresList = modal.querySelector('.skill-features-list');
		featuresList.innerHTML = data.features.map(feature => `<li>${feature}</li>`).join('');
		
		const linksContainer = modal.querySelector('.skill-links');
		linksContainer.innerHTML = data.links.map(link => 
			`<a href="${link.url}" target="_blank" class="skill-link">${link.text}</a>`
		).join('');

		// Show modal
		modal.classList.add('active');
		document.body.style.overflow = 'hidden';
	}

	// Close modal
	function closeModal() {
		const modal = document.querySelector('.skill-modal');
		if (modal) {
			modal.classList.remove('active');
			document.body.style.overflow = '';
		}
	}

	// Event listeners
	document.addEventListener('DOMContentLoaded', () => {
		// Add click listeners to skill items
		document.querySelectorAll('.skill').forEach(skill => {
			skill.style.cursor = 'pointer';
			skill.addEventListener('click', (e) => {
				e.preventDefault();
				const skillClass = skill.className.split(' ').find(cls => cls !== 'skill');
				if (skillClass) {
					showSkillModal(skillClass);
				}
			});
		});

		// Close modal events
		document.addEventListener('click', (e) => {
			if (e.target.classList.contains('skill-modal')) {
				closeModal();
			}
			if (e.target.classList.contains('skill-modal-close')) {
				closeModal();
			}
		});

		// Close on Escape key
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				closeModal();
			}
		});
	});
})();

