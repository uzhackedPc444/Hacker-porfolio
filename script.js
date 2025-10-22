// Typing effect
(function() {
	const words = [
        "Hacker", "full-stack developer", "Modder", "Linux enjoyer", "Kali enthusiast"
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

// Command palette / mini-terminal
(function() {
    const overlay = document.getElementById('cmd');
    const input = document.getElementById('cmd-input');
    const list = document.getElementById('cmd-suggestions');
    if (!overlay || !input || !list) return;

    const commands = [
        { id: 'help', label: 'help — buyruqlar roʻyxati', run: showHelp },
        { id: 'about', label: 'about — About bo‘limiga o‘tish', run: () => go('#about') },
        { id: 'skills', label: 'skills — Skills bo‘limiga o‘tish', run: () => go('#skills') },
        { id: 'projects', label: 'projects — Projects bo‘limiga o‘tish', run: () => go('#projects') },
        { id: 'contact', label: 'contact — Contact bo‘limiga o‘tish', run: () => go('#contact') },
        { id: 'matrix on', label: 'matrix on — yomg‘irni yoqish', run: () => setMatrix(true) },
        { id: 'matrix off', label: 'matrix off — yomg‘irni o‘chirish', run: () => setMatrix(false) },
    ];

    function open() {
        overlay.setAttribute('aria-hidden', 'false');
        input.value = '';
        render();
        setTimeout(() => input.focus(), 0);
    }
    function close() {
        overlay.setAttribute('aria-hidden', 'true');
    }
    function go(hash) {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        close();
    }
    function setMatrix(on) {
        const t = document.getElementById('toggle-matrix');
        if (t) {
            t.checked = on;
            t.dispatchEvent(new Event('change'));
        }
        close();
    }

    function showHelp() {
        list.innerHTML = '';
        const li = document.createElement('li');
        li.textContent = 'Commands: help, about, skills, projects, contact, "matrix on", "matrix off"';
        list.appendChild(li);
    }

    function render() {
        const q = input.value.trim().toLowerCase();
        const filtered = q ? commands.filter(c => c.id.startsWith(q)) : commands;
        list.innerHTML = '';
        filtered.forEach((c, idx) => {
            const li = document.createElement('li');
            if (idx === 0) li.classList.add('active');
            li.textContent = c.label;
            li.dataset.id = c.id;
            list.appendChild(li);
        });
    }

    function runActive() {
        const first = list.querySelector('li');
        const id = first?.dataset.id;
        const cmd = commands.find(c => c.id === id || c.id === input.value.trim().toLowerCase());
        if (cmd) cmd.run();
        else close();
    }

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (overlay.getAttribute('aria-hidden') === 'true') open(); else close();
        }
        if (e.key === '/' && overlay.getAttribute('aria-hidden') === 'true') {
            e.preventDefault();
            open();
        }
    });

    overlay.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
        if (e.key === 'Enter') runActive();
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            const items = Array.from(list.querySelectorAll('li'));
            if (!items.length) return;
            let idx = items.findIndex(x => x.classList.contains('active'));
            idx = e.key === 'ArrowDown' ? Math.min(items.length - 1, idx + 1) : Math.max(0, idx - 1);
            items.forEach(x => x.classList.remove('active'));
            items[idx].classList.add('active');
            input.value = items[idx].dataset.id || '';
            e.preventDefault();
        }
    });

    input.addEventListener('input', render);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
    });
})();

