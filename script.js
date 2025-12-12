// Hero Counter Animation
function animateValue(obj, start, end, duration, prefix = "", suffix = "") {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        obj.innerHTML = prefix + value.toLocaleString() + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

document.addEventListener('DOMContentLoaded', () => {
    const leadsObj = document.getElementById("counter-leads");
    const revObj = document.getElementById("counter-rev");

    setTimeout(() => {
        animateValue(leadsObj, 0, 14205, 2000);
        animateValue(revObj, 0, 450, 2000, "$", "M+");
    }, 500);

    // Ticker Logic
    const ticker = document.getElementById('live-ticker');
    const metrics = [
        "Avg Open Rate: 72%",
        "Replies Today: 243",
        "Latest Booking: HealthTech ($120k)",
        "Domains Warmed: 1,200+",
        "B2B Tech Lead Quality: 9.8/10",
        "Spam Complaint Rate: <0.01%"
    ];

    // Simulating dynamic ticker updates
    setInterval(() => {
        // In a real app, this would fetch from an API
        const randomMetric = metrics[Math.floor(Math.random() * metrics.length)];
        // For this CSS ticker, we'd typically append to the list to keep it flowing, 
        // but since it is a loop, we can just let it run or update text occasionally if we rebuilt the DOM.
        // Keeping it static loop for visual stability in this demo.
    }, 5000);
});

// Calculator Functions
function openCalculator() {
    const modal = document.getElementById('calc-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeCalculator() {
    const modal = document.getElementById('calc-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function calculateROI() {
    const revenue = parseFloat(document.getElementById('calc-revenue').value) || 0;
    const dealSize = parseFloat(document.getElementById('calc-deal').value) || 0;
    const closeRate = parseFloat(document.getElementById('calc-rate').value) || 0;

    if (dealSize === 0 || closeRate === 0) return;

    // Deals needed
    const dealsNeeded = revenue / dealSize;

    // Leads needed (assuming close rate is from Lead to Deal for simplicity in this demo logic, 
    // though usually it's Meeting to Deal. Let's assume 20% meeting-to-deal, and 5% lead-to-meeting)
    // User inputs "Close Rate" which usually implies meeting-to-close in this context.
    // Let's assume a standard 5% lead-to-meeting conversion rate for cold email.

    const meetingsNeeded = dealsNeeded / (closeRate / 100);
    const leadsNeeded = Math.ceil(meetingsNeeded / 0.05); // 5% booking rate assumption

    document.getElementById('result-leads').innerText = leadsNeeded.toLocaleString();
    document.getElementById('result-leads-weekly').innerText = Math.ceil(leadsNeeded / 4).toLocaleString();
}

// Contact Modal Logic
function openContactModal() {
    const modal = document.getElementById('contact-modal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    const modal = document.getElementById('contact-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Timeline Logic
const timelineData = {
    phase1: {
        title: "Phase 1: Domain & Infrastructure",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
        items: [
            "Configuring secondary domains (SPF, DKIM, DMARC)",
            "Warming up email accounts via VroommNetwork",
            "Building your prospect list (ICP verification)"
        ]
    },
    phase2: {
        title: "Phase 2: Copy & Testing",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        items: [
            "A/B testing subject lines on small cohorts",
            "Refining value proposition based on reply data",
            "Scaling volume to 50% capacity"
        ]
    },
    phase3: {
        title: "Phase 3: Full Scale Launch",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
        items: [
            "Full volume outreach (1000+ contacts/day)",
            "Automated lead handoff to your CRM",
            "Booking meetings on your calendar"
        ]
    }
};

let currentPhase = null;

function updateTimeline(val) {
    const tooltip = document.getElementById('slider-tooltip');
    const slider = document.getElementById('timeline-slider');
    const contentDiv = document.getElementById('timeline-content');
    const visualDiv = document.getElementById('timeline-visual');

    // Logic for smooth sliding but integer days
    const displayDay = Math.round(val);

    // Move tooltip
    const min = slider.min ? parseFloat(slider.min) : 0;
    const max = slider.max ? parseFloat(slider.max) : 100;
    const percentage = ((val - min) * 100) / (max - min);

    tooltip.innerHTML = `Day ${displayDay}`;
    tooltip.style.left = `calc(${percentage}% + (${8 - percentage * 0.15}px))`;

    // Determine Phase
    let phaseKey = 'phase1';
    if (displayDay > 7 && displayDay <= 14) phaseKey = 'phase2';
    if (displayDay > 14) phaseKey = 'phase3';

    // Only update DOM if phase changes
    if (currentPhase !== phaseKey) {
        currentPhase = phaseKey;
        const phase = timelineData[phaseKey];

        visualDiv.innerHTML = `<img src="${phase.image}" alt="${phase.title}" class="w-full h-full object-cover fade-in-up">
                                       <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>`;

        let html = `<div class="fade-in-up">
                                <h3 class="text-2xl font-bold text-white">${phase.title}</h3>
                                <ul class="space-y-4 text-gray-300 mt-6">`;

        phase.items.forEach(item => {
            html += `<li class="flex items-start">
                                <svg class="w-6 h-6 text-volt mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                                ${item}
                            </li>`;
        });
        html += `</ul></div>`;

        contentDiv.innerHTML = html;
    }
}

// FAQ Toggle Logic
function toggleFaq(element) {
    // Check if currently active
    const isActive = element.classList.contains('active');

    // Close all
    const allFaqs = document.querySelectorAll('.faq-item');
    allFaqs.forEach(item => {
        item.classList.remove('active');
    });

    // If it wasn't active before, make it active now (accordion behavior)
    if (!isActive) {
        element.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // ... existing hero init code ...

    // Timeline Init
    const slider = document.getElementById('timeline-slider');
    if (slider) {
        slider.addEventListener('input', (e) => updateTimeline(e.target.value));
    }

    // Calc Init
    calculateROI();

    // Bot Auto-Open
    setTimeout(() => {
        const chatWindow = document.getElementById('chat-window');
        if (chatWindow && chatWindow.classList.contains('hidden')) {
            toggleChat();
        }
    }, 15000);
});

// Lightbox Logic
function openLightbox(id) {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    // Simulate video loading
    const content = document.getElementById('lightbox-content');
    content.innerHTML = `<div class="animate-pulse flex flex-col items-center">
                                    <div class="w-16 h-16 border-4 border-volt border-t-transparent rounded-full animate-spin mb-4"></div>
                                    <p class="text-volt">Loading High-Res Case Study...</p>
                                 </div>`;
    setTimeout(() => {
        content.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="w-full h-full rounded-lg"></iframe>`;
    }, 1500);
}

function closeLightbox(e, force = false) {
    if (force || e.target.id === 'lightbox') {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.add('hidden');
        document.body.style.overflow = 'auto';
        document.getElementById('lightbox-content').innerHTML = '';
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox(null, true);
        closeContactModal();
    }
});

// VroommBot Logic
let chatState = 0;
const chatHistory = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatWindow = document.getElementById('chat-window');

function toggleChat() {
    if (chatWindow.classList.contains('hidden')) {
        chatWindow.classList.remove('hidden');
        // Animation classes
        setTimeout(() => {
            chatWindow.classList.remove('opacity-0', 'scale-95');
            chatWindow.classList.add('opacity-100', 'scale-100');
        }, 10);
        if (chatHistory.children.length === 0) {
            initChat();
        }
    } else {
        chatWindow.classList.remove('opacity-100', 'scale-100');
        chatWindow.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
            chatWindow.classList.add('hidden');
        }, 300);
    }
}

function addMessage(text, sender = 'bot') {
    const div = document.createElement('div');
    div.className = `flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`;

    const bubble = document.createElement('div');
    bubble.className = `max-w-[85%] rounded-lg px-4 py-2 text-sm ${sender === 'user'
            ? 'bg-volt text-black font-medium'
            : 'bg-gray-700 text-white'
        }`;
    bubble.innerHTML = text;

    div.appendChild(bubble);
    chatHistory.appendChild(div);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function initChat() {
    addMessage("Hi there! 👋 I'm VroommBot.");
    setTimeout(() => addMessage("I can estimate your ROI instantly. What industry are you in? (e.g. Fintech, SaaS)"), 800);
}

function handleChatKey(e) {
    if (e.key === 'Enter') sendChatMessage();
}

function sendChatMessage() {
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    chatInput.value = '';

    // Simulate "typing" delay
    setTimeout(() => {
        processBotResponse(text);
    }, 1000);
}

function processBotResponse(input) {
    if (chatState === 0) {
        addMessage(`Got it, ${input} is a great fit for our data partners.`);
        setTimeout(() => addMessage("What is your average deal size? (approx $)"), 600);
        chatState++;
    } else if (chatState === 1) {
        const amount = parseFloat(input.replace(/[^0-9.]/g, ''));
        if (amount < 1000) {
            addMessage("It looks like your deal size might be a bit low for our enterprise pay-per-lead model.");
            addMessage("I recommend checking out our free Cold Email Academy resources instead!");
            chatState = 99; // End
        } else {
            addMessage("Perfect. Last question: Do you currently have an outbound team?");
            chatState++;
        }
    } else if (chatState === 2) {
        addMessage("Understood. Analyzing your potential...");
        setTimeout(() => {
            addMessage(`<strong>Good news!</strong> Based on your inputs, we could generate <strong>15-20 qualified leads</strong> in your first month.`);
            addMessage(`<a href="#contact" class="underline text-volt hover:text-white">Click here to book a strategy call</a> to lock in this volume.`);
        }, 1500);
        chatState++;
    } else {
        addMessage("Is there anything else I can help you with?");
    }
}

// Scroll Reveal Logic
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.05,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Custom Cursor Logic
    const cursor = document.getElementById('custom-cursor');

    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            // Update position while maintaining centering
            cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
        });

        // Add hover effect for clickable elements
        const clickableElements = document.querySelectorAll('a, button, input[type="range"], input[type="checkbox"], .cursor-pointer');
        clickableElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    } else {
        // Hide custom cursor on touch devices
        cursor.style.display = 'none';
        document.body.style.cursor = 'auto';
    }
});

// 3D Moving Dots Background Logic
(function () {
    const canvas = document.getElementById('dots-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let dots = [];
    const numDots = 80; // Number of dots
    const perspective = 500;

    function resize() {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Dot {
        constructor() {
            this.init(true);
        }

        init(randomZ = false) {
            // Random x/y in a wide range to allow moving into view
            this.x = (Math.random() - 0.5) * width * 3;
            this.y = (Math.random() - 0.5) * height * 3;
            // Z represents depth. Higher is further away.
            // We move from far (2000) to near (0).
            this.z = randomZ ? Math.random() * 2000 : 2000;
        }

        update() {
            this.z -= 2; // Speed of movement towards camera
            if (this.z <= 10) { // Reset when it hits the "camera"
                this.init();
            }
        }

        draw() {
            // Projection formula
            const scale = perspective / (perspective + this.z);
            const x2d = (this.x * scale) + (width / 2);
            const y2d = (this.y * scale) + (height / 2);
            const radius = Math.max(0.2, 4 * scale); // Size based on depth
            const opacity = Math.min(1, scale * 1.5); // Opacity based on depth

            // Only draw if within bounds
            if (x2d > -10 && x2d < width + 10 && y2d > -10 && y2d < height + 10) {
                ctx.fillStyle = `rgba(204, 255, 0, ${opacity})`; // Volt Green
                ctx.beginPath();
                ctx.arc(x2d, y2d, radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    // Initialize
    for (let i = 0; i < numDots; i++) {
        dots.push(new Dot());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        dots.forEach(dot => {
            dot.update();
            dot.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
})();