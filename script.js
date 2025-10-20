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

