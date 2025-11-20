// Shvya AI - Main JavaScript File
// Interactive functionality for the AI-powered landing page

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeAIParticleBackground();
    initializeAIDeploymentTimer();
    initializeAIProductShowcase();
    initializeAITestimonialSlider();
    initializeAILiveChat();
    initializeAIScrollAnimations();
});

// Initialize all animations
function initializeAnimations() {
    // Animate deployment stages
    const stages = document.querySelectorAll('.deployment-stage');
    stages.forEach((stage, index) => {
        setTimeout(() => {
            stage.classList.add('active');
        }, index * 500);
    });

    // Animate product cards on scroll
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            anime({
                targets: card,
                opacity: 1,
                translateY: 0,
                duration: 800,
                delay: index * 100,
                easing: 'easeOutCubic'
            });
        }, 500);
    });

    // Animate statistics counters
    animateAICounters();
}

// Initialize AI particle background using p5.js
function initializeAIParticleBackground() {
    const container = document.getElementById('particle-container');
    if (!container) return;

    new p5((p) => {
        let particles = [];
        let neuralConnections = [];
        let numParticles = 60;

        p.setup = function() {
            const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
            canvas.parent(container);
            
            // Create AI neural network particles
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-0.3, 0.3),
                    vy: p.random(-0.3, 0.3),
                    size: p.random(3, 8),
                    opacity: p.random(0.4, 0.9),
                    type: p.random(['neuron', 'data'])
                });
            }
        };

        p.draw = function() {
            p.clear();
            
            // Update and draw AI neural network
            particles.forEach((particle, i) => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;
                
                // Draw particle based on type
                if (particle.type === 'neuron') {
                    p.fill(0, 102, 255, particle.opacity * 255);
                    p.noStroke();
                    p.circle(particle.x, particle.y, particle.size);
                    
                    // Draw neural connections
                    particles.forEach((other, j) => {
                        if (i !== j) {
                            const distance = p.dist(particle.x, particle.y, other.x, other.y);
                            if (distance < 120) {
                                p.stroke(0, 102, 255, (1 - distance / 120) * 80);
                                p.strokeWeight(1);
                                p.line(particle.x, particle.y, other.x, other.y);
                            }
                        }
                    });
                } else {
                    // Data particles
                    p.fill(255, 107, 53, particle.opacity * 255);
                    p.noStroke();
                    p.rect(particle.x, particle.y, particle.size * 0.8, particle.size * 0.8);
                }
            });
        };

        p.windowResized = function() {
            p.resizeCanvas(container.offsetWidth, container.offsetHeight);
        };
    });
}

// Initialize AI deployment timer
function initializeAIDeploymentTimer() {
    const counter = document.getElementById('deployment-counter');
    if (!counter) return;

    let totalSeconds = 4 * 60 * 60; // 4 hours in seconds
    let currentSeconds = 0;
    
    const timer = setInterval(() => {
        currentSeconds += 1;
        const remaining = totalSeconds - currentSeconds;
        
        if (remaining <= 0) {
            clearInterval(timer);
            counter.textContent = '0:00:00';
            return;
        }
        
        const hours = Math.floor(remaining / 3600);
        const minutes = Math.floor((remaining % 3600) / 60);
        const seconds = remaining % 60;
        
        counter.textContent = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// Initialize AI product showcase interactions
function initializeAIProductShowcase() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                rotateX: 5,
                rotateY: 5,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                rotateX: 0,
                rotateY: 0,
                duration: 300,
                easing: 'easeOutCubic'
            });
        });
        
        card.addEventListener('click', function() {
            const productType = this.dataset.product;
            showAIProductModal(productType);
        });
    });
}

// Show AI product modal with details
function showAIProductModal(productType) {
    const productData = {
        crm: {
            name: 'Shvya CRM',
            description: 'AI-powered customer relationship management with predictive analytics',
            features: [
                'AI-powered lead scoring and prediction',
                'Automated customer interaction analysis',
                'Predictive sales forecasting',
                'Intelligent workflow automation',
                'Real-time AI insights and recommendations'
            ],
            aiCapabilities: [
                'Machine learning algorithms for customer behavior prediction',
                'Natural language processing for email analysis',
                'Automated lead qualification and routing',
                'Predictive customer lifetime value calculation'
            ],
            demoContent: 'AI CRM Dashboard with real-time analytics'
        },
        inventory: {
            name: 'Smart Billing Inventory',
            description: 'AI-driven inventory management with automated billing and forecasting',
            features: [
                'AI-powered demand forecasting',
                'Automated billing and invoicing',
                'Intelligent stock level optimization',
                'Predictive reorder point calculation',
                'Real-time financial analytics'
            ],
            aiCapabilities: [
                'Machine learning for demand prediction',
                'Automated invoice generation and processing',
                'Intelligent inventory optimization algorithms',
                'Predictive analytics for cash flow management'
            ],
            demoContent: 'AI Inventory Dashboard with predictive charts'
        },
        school: {
            name: 'School ERP',
            description: 'AI-enhanced educational management with smart attendance and grading',
            features: [
                'AI-powered attendance tracking',
                'Automated grading and assessment',
                'Intelligent student performance analysis',
                'Predictive academic success modeling',
                'Smart timetable optimization'
            ],
            aiCapabilities: [
                'Computer vision for attendance recognition',
                'Machine learning for grade prediction',
                'Natural language processing for feedback analysis',
                'Predictive modeling for student outcomes'
            ],
            demoContent: 'AI School Dashboard with student analytics'
        },
        hospital: {
            name: 'Hospital ERP',
            description: 'AI-powered healthcare management with predictive patient care',
            features: [
                'AI-driven patient care optimization',
                'Predictive health risk assessment',
                'Automated appointment scheduling',
                'Intelligent resource allocation',
                'Real-time clinical decision support'
            ],
            aiCapabilities: [
                'Machine learning for patient outcome prediction',
                'Computer vision for medical image analysis',
                'Natural language processing for clinical notes',
                'Predictive analytics for resource planning'
            ],
            demoContent: 'AI Hospital Dashboard with patient insights'
        },
        restaurant: {
            name: 'Restaurant ERP',
            description: 'AI-optimized food service management with demand forecasting',
            features: [
                'AI-powered demand forecasting',
                'Automated inventory management',
                'Intelligent menu optimization',
                'Predictive staff scheduling',
                'Real-time customer preference analysis'
            ],
            aiCapabilities: [
                'Machine learning for demand prediction',
                'Computer vision for food quality monitoring',
                'Natural language processing for reviews analysis',
                'Predictive analytics for customer behavior'
            ],
            demoContent: 'AI Restaurant Dashboard with demand charts'
        },
        hrm: {
            name: 'HRM + Payroll',
            description: 'AI-driven human resources with automated payroll and compliance',
            features: [
                'AI-powered recruitment screening',
                'Automated payroll processing',
                'Intelligent performance evaluation',
                'Predictive employee retention modeling',
                'Smart compliance monitoring'
            ],
            aiCapabilities: [
                'Machine learning for candidate matching',
                'Natural language processing for resume analysis',
                'Predictive analytics for employee turnover',
                'Automated compliance checking algorithms'
            ],
            demoContent: 'AI HRM Dashboard with employee analytics'
        },
        geofencing: {
            name: 'Geofencing',
            description: 'AI-powered location-based services with smart automation',
            features: [
                'AI-powered location analytics',
                'Automated attendance tracking',
                'Intelligent route optimization',
                'Predictive location-based alerts',
                'Real-time location intelligence'
            ],
            aiCapabilities: [
                'Machine learning for location pattern recognition',
                'Computer vision for place recognition',
                'Predictive analytics for movement patterns',
                'Intelligent geofence optimization algorithms'
            ],
            demoContent: 'AI Geofencing Dashboard with location insights'
        },
        ecommerce: {
            name: 'E-commerce Platform',
            description: 'AI-enhanced online commerce with predictive analytics and automation',
            features: [
                'AI-powered product recommendations',
                'Automated inventory management',
                'Intelligent pricing optimization',
                'Predictive customer behavior analysis',
                'Real-time sales analytics'
            ],
            aiCapabilities: [
                'Machine learning for recommendation engines',
                'Natural language processing for review analysis',
                'Predictive analytics for sales forecasting',
                'Computer vision for product recognition'
            ],
            demoContent: 'AI E-commerce Dashboard with sales analytics'
        }
    };
    
    const product = productData[productType];
    if (!product) return;
    
    // Create AI-themed modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-90vh overflow-y-auto">
            <div class="p-6 border-b border-gray-200 bg-gradient-to-r from-shvya-blue to-shvya-orange text-white">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                            <span class="text-2xl">🤖</span>
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold">${product.name}</h2>
                            <p class="text-sm opacity-90">AI-Powered Solution</p>
                        </div>
                    </div>
                    <button class="text-white hover:text-gray-200" onclick="this.closest('.fixed').remove()">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div class="p-6">
                <div class="grid md:grid-cols-2 gap-8">
                    <div>
                        <div class="mb-6">
                            <h3 class="text-lg font-semibold text-shvya-charcoal mb-3">🤖 AI Features</h3>
                            <ul class="space-y-2 mb-6">
                                ${product.features.map(feature => `<li class="flex items-center space-x-2"><span class="text-shvya-blue">🤖</span><span class="text-sm">${feature}</span></li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="mb-6">
                            <h3 class="text-lg font-semibold text-shvya-charcoal mb-3">🧠 AI Capabilities</h3>
                            <ul class="space-y-2 mb-6">
                                ${product.aiCapabilities.map(capability => `<li class="flex items-center space-x-2"><span class="text-shvya-orange">🧠</span><span class="text-sm">${capability}</span></li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="bg-gradient-to-r from-shvya-blue/10 to-shvya-orange/10 rounded-lg p-4 mb-6">
                            <div class="flex items-center space-x-2 mb-2">
                                <span class="text-shvya-blue font-bold">⚡</span>
                                <span class="font-semibold text-shvya-charcoal">4-Hour AI Deployment</span>
                            </div>
                            <p class="text-sm text-gray-600">Get started with AI-powered automation in just 4 hours</p>
                        </div>
                        
                        <button class="w-full bg-gradient-to-r from-shvya-blue to-shvya-orange text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all">
                            Start AI Deployment
                        </button>
                    </div>
                    
                    <div>
                        <h3 class="text-lg font-semibold text-shvya-charcoal mb-4">🖥️ Live AI Demo</h3>
                        <div class="bg-shvya-navy rounded-lg overflow-hidden h-64 flex items-center justify-center text-white">
                            <div class="text-center">
                                <div class="text-4xl mb-4">🤖</div>
                                <div class="font-semibold mb-2">${product.demoContent}</div>
                                <div class="text-sm opacity-75">Interactive AI Interface</div>
                                <div class="mt-4 flex justify-center space-x-2">
                                    <div class="w-2 h-2 bg-shvya-blue rounded-full animate-pulse"></div>
                                    <div class="w-2 h-2 bg-shvya-orange rounded-full animate-pulse" style="animation-delay: 0.5s;"></div>
                                    <div class="w-2 h-2 bg-shvya-green rounded-full animate-pulse" style="animation-delay: 1s;"></div>
                                </div>
                            </div>
                        </div>
                        <p class="text-sm text-gray-600 mt-2">${product.description}</p>
                        
                        <div class="mt-6">
                            <button class="w-full bg-shvya-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-shvya-green/90 transition-all">
                                Book AI Demo Call
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate modal appearance
    anime({
        targets: modal,
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutCubic'
    });
}

// Initialize AI testimonial slider
function initializeAITestimonialSlider() {
    const slider = document.getElementById('testimonial-slider');
    if (!slider) return;
    
    new Splide(slider, {
        type: 'loop',
        autoplay: true,
        interval: 6000,
        pauseOnHover: true,
        arrows: false,
        pagination: true,
        gap: '2rem',
        breakpoints: {
            768: {
                gap: '1rem'
            }
        }
    }).mount();
}

// Initialize AI live chat
function initializeAILiveChat() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatWidget = document.getElementById('chat-widget');
    const chatClose = document.getElementById('chat-close');
    
    if (!chatToggle || !chatWidget || !chatClose) return;
    
    chatToggle.addEventListener('click', function() {
        chatWidget.classList.toggle('hidden');
        
        if (!chatWidget.classList.contains('hidden')) {
            anime({
                targets: chatWidget,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 300,
                easing: 'easeOutCubic'
            });
        }
    });
    
    chatClose.addEventListener('click', function() {
        anime({
            targets: chatWidget,
            opacity: [1, 0],
            translateY: [0, 20],
            duration: 300,
            easing: 'easeOutCubic',
            complete: () => {
                chatWidget.classList.add('hidden');
            }
        });
    });
}

// Initialize AI scroll animations
function initializeAIScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                anime({
                    targets: target,
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 800,
                    easing: 'easeOutCubic'
                });
                
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.deployment-stage, .product-card, section > div > div');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Animate AI counters
function animateAICounters() {
    const counters = document.querySelectorAll('.text-3xl.font-bold.text-shvya-blue');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const suffix = counter.textContent.replace(/[\d]/g, '');
        
        anime({
            targets: { count: 0 },
            count: target,
            duration: 2000,
            easing: 'easeOutCubic',
            update: function(anim) {
                counter.textContent = Math.floor(anim.animatables[0].target.count) + suffix;
            }
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Reinitialize AI particle background on resize
    const container = document.getElementById('particle-container');
    if (container) {
        container.innerHTML = '';
        initializeAIParticleBackground();
    }
}, 250));

// Handle smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading states for AI buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        if (this.textContent.includes('Start') || this.textContent.includes('Deploy') || this.textContent.includes('Book')) {
            const originalText = this.textContent;
            this.textContent = 'Processing...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
                
                // Show AI-powered response
                if (originalText.includes('Book AI Demo Call')) {
                    alert('🤖 AI Assistant: Demo request received! Our AI specialist will contact you within 15 minutes to schedule your personalized AI demonstration.');
                } else if (originalText.includes('Start AI Deployment')) {
                    alert('🤖 AI Deployment System: Initiating 4-hour AI deployment process. Our intelligent automation will have your solution ready shortly!');
                } else if (originalText.includes('Start Deploy')) {
                    alert('🤖 AI Deployment System: Ready to deploy your AI solution! Please contact our team to begin the 4-hour deployment process.');
                }
            }, 2000);
        }
    });
});

// Add hover effects for interactive elements
function addAIHoverEffects() {
    const interactiveElements = document.querySelectorAll('button, .product-card, .deployment-stage');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (!this.classList.contains('product-card')) {
                anime({
                    targets: this,
                    scale: 1.02,
                    duration: 200,
                    easing: 'easeOutCubic'
                });
            }
        });
        
        element.addEventListener('mouseleave', function() {
            if (!this.classList.contains('product-card')) {
                anime({
                    targets: this,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutCubic'
                });
            }
        });
    });
}

// Initialize AI hover effects after DOM is loaded
document.addEventListener('DOMContentLoaded', addAIHoverEffects);