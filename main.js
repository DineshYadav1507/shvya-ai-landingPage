// SaaS Pro - Main JavaScript File
// Interactive functionality for the landing page

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeParticleBackground();
    initializeDeploymentTimer();
    initializeProductShowcase();
    initializeComparisonTool();
    initializeTestimonialSlider();
    initializeLiveChat();
    initializeScrollAnimations();
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
    animateCounters();
}

// Initialize particle background using p5.js
function initializeParticleBackground() {
    const container = document.getElementById('particle-container');
    if (!container) return;

    new p5((p) => {
        let particles = [];
        let numParticles = 50;

        p.setup = function() {
            const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
            canvas.parent(container);
            
            // Create particles
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-0.5, 0.5),
                    vy: p.random(-0.5, 0.5),
                    size: p.random(2, 6),
                    opacity: p.random(0.3, 0.8)
                });
            }
        };

        p.draw = function() {
            p.clear();
            
            // Update and draw particles
            particles.forEach(particle => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;
                
                // Draw particle
                p.fill(0, 212, 255, particle.opacity * 255);
                p.noStroke();
                p.circle(particle.x, particle.y, particle.size);
                
                // Draw connections
                particles.forEach(other => {
                    const distance = p.dist(particle.x, particle.y, other.x, other.y);
                    if (distance < 100) {
                        p.stroke(0, 212, 255, (1 - distance / 100) * 50);
                        p.strokeWeight(1);
                        p.line(particle.x, particle.y, other.x, other.y);
                    }
                });
            });
        };

        p.windowResized = function() {
            p.resizeCanvas(container.offsetWidth, container.offsetHeight);
        };
    });
}

// Initialize deployment timer
function initializeDeploymentTimer() {
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

// Initialize product showcase interactions
function initializeProductShowcase() {
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
            showProductModal(productType);
        });
    });
}

// Show product modal with details
function showProductModal(productType) {
    const productData = {
        inventory: {
            name: 'Inventory Pro',
            description: 'Complete warehouse and inventory management solution',
            features: ['Real-time stock tracking', 'Barcode scanning', 'Multi-warehouse support', 'Automated reordering', 'Detailed reporting'],
            price: 'From $99/month',
            demoUrl: 'https://kimi-web-img.moonshot.cn/img/www.veeqo.com/9f23316a0a99b2a3d32fe7860156f54cd518a6a2'
        },
        school: {
            name: 'EduManage',
            description: 'Comprehensive school management system',
            features: ['Student records', 'Attendance tracking', 'Grade management', 'Parent portal', 'Fee collection'],
            price: 'From $149/month',
            demoUrl: 'https://kimi-web-img.moonshot.cn/img/eskooly.com/3972e8d1cd8095efb5fd264fd6337700cb1e5e19.png'
        },
        hospital: {
            name: 'MediCore',
            description: 'Hospital management with AI-powered patient care',
            features: ['Patient records', 'Appointment scheduling', 'Billing system', 'Pharmacy management', 'AI diagnostics'],
            price: 'From $299/month',
            demoUrl: 'https://kimi-web-img.moonshot.cn/img/graffersid.com/db72abf0eefd82e897baab04310fa4576f213f05.webp'
        },
        hrm: {
            name: 'WorkForce',
            description: 'Complete HR management from recruitment to retirement',
            features: ['Employee records', 'Payroll processing', 'Leave management', 'Performance reviews', 'Recruitment'],
            price: 'From $199/month',
            demoUrl: 'https://kimi-web-img.moonshot.cn/img/peoplemanagingpeople.com/59ecd7ded045e83d040b931514b8203ed3abf3f3.png'
        },
        ecommerce: {
            name: 'ShopFlow',
            description: 'Enterprise eCommerce with omnichannel capabilities',
            features: ['Online store', 'Inventory sync', 'Payment processing', 'Shipping integration', 'Multi-channel sales'],
            price: 'From $249/month',
            demoUrl: 'https://kimi-web-img.moonshot.cn/img/res.cloudinary.com/1e67eced19c0f462805dff0dd18d17541c6d3156.jpg'
        },
        crm: {
            name: 'LeadMaster',
            description: 'AI-powered CRM for sales teams',
            features: ['Lead tracking', 'Sales pipeline', 'Customer management', 'Analytics', 'Automation'],
            price: 'From $179/month',
            demoUrl: 'https://kimi-web-img.moonshot.cn/img/www.leadsquared.com/7a6884c4e13b740852048379654ddc6661f95802.jpg'
        },
        lms: {
            name: 'LearnHub',
            description: 'Advanced learning management with AI course creation',
            features: ['Course management', 'Student progress', 'Certifications', 'AI content creation', 'Virtual classrooms'],
            price: 'From $129/month',
            demoUrl: 'https://kimi-web-img.moonshot.cn/img/www.jotform.com/1446c03cf880b59525045bb39561c27b19ee6334.webp'
        },
        project: {
            name: 'TaskFlow',
            description: 'Agile project management with real-time collaboration',
            features: ['Task tracking', 'Team collaboration', 'Time management', 'Project analytics', 'Resource planning'],
            price: 'From $89/month',
            demoUrl: 'https://kimi-web-img.moonshot.cn/img/www.clickmaint.com/5dd4b0fc95ae6b230dea9fd316bfabecd1f4cd07.png'
        }
    };
    
    const product = productData[productType];
    if (!product) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-90vh overflow-y-auto">
            <div class="p-6 border-b border-gray-200">
                <div class="flex items-center justify-between">
                    <h2 class="text-2xl font-bold text-charcoal">${product.name}</h2>
                    <button class="text-gray-500 hover:text-gray-700" onclick="this.closest('.fixed').remove()">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div class="p-6">
                <div class="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 class="text-lg font-semibold text-charcoal mb-4">Product Features</h3>
                        <ul class="space-y-2 mb-6">
                            ${product.features.map(feature => `<li class="flex items-center space-x-2"><span class="text-cyan">✓</span><span>${feature}</span></li>`).join('')}
                        </ul>
                        
                        <div class="bg-gray-50 rounded-lg p-4 mb-6">
                            <div class="text-2xl font-bold text-cyan mb-2">${product.price}</div>
                            <div class="text-sm text-gray-600">4-hour deployment included</div>
                        </div>
                        
                        <button class="w-full bg-cyan text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan/90 transition-all">
                            Start 4-Hour Deployment
                        </button>
                    </div>
                    
                    <div>
                        <h3 class="text-lg font-semibold text-charcoal mb-4">Live Demo</h3>
                        <div class="bg-gray-100 rounded-lg overflow-hidden">
                            <img src="${product.demoUrl}" alt="${product.name} Demo" class="w-full h-64 object-cover">
                        </div>
                        <p class="text-sm text-gray-600 mt-2">${product.description}</p>
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

// Initialize comparison tool
function initializeComparisonTool() {
    const compareBtn = document.getElementById('compare-btn');
    const chartContainer = document.getElementById('comparison-chart');
    
    if (!compareBtn || !chartContainer) return;
    
    compareBtn.addEventListener('click', function() {
        const product1 = document.getElementById('product1').value;
        const product2 = document.getElementById('product2').value;
        
        showProductComparison(product1, product2);
    });
}

// Show product comparison chart
function showProductComparison(product1, product2) {
    const chartContainer = document.getElementById('comparison-chart');
    
    const comparisonData = {
        inventory: { features: 95, ease: 90, support: 95, value: 85 },
        school: { features: 90, ease: 95, support: 90, value: 80 },
        hospital: { features: 98, ease: 85, support: 95, value: 90 },
        hrm: { features: 92, ease: 88, support: 92, value: 85 },
        ecommerce: { features: 96, ease: 90, support: 88, value: 85 },
        crm: { features: 94, ease: 92, support: 90, value: 88 },
        lms: { features: 91, ease: 93, support: 89, value: 82 },
        project: { features: 89, ease: 94, support: 91, value: 90 }
    };
    
    const data1 = comparisonData[product1];
    const data2 = comparisonData[product2];
    
    const chart = echarts.init(chartContainer);
    
    const option = {
        title: {
            text: 'Product Comparison',
            left: 'center',
            textStyle: {
                color: '#2d3748',
                fontSize: 18,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: [product1.toUpperCase(), product2.toUpperCase()],
            bottom: 10
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['Features', 'Ease of Use', 'Support', 'Value'],
            axisLabel: {
                color: '#666'
            }
        },
        yAxis: {
            type: 'value',
            max: 100,
            axisLabel: {
                color: '#666',
                formatter: '{value}%'
            }
        },
        series: [
            {
                name: product1.toUpperCase(),
                type: 'bar',
                data: [data1.features, data1.ease, data1.support, data1.value],
                itemStyle: {
                    color: '#00d4ff'
                }
            },
            {
                name: product2.toUpperCase(),
                type: 'bar',
                data: [data2.features, data2.ease, data2.support, data2.value],
                itemStyle: {
                    color: '#ff6b35'
                }
            }
        ]
    };
    
    chart.setOption(option);
    
    // Animate chart
    anime({
        targets: chartContainer,
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutCubic'
    });
}

// Initialize testimonial slider
function initializeTestimonialSlider() {
    const slider = document.getElementById('testimonial-slider');
    if (!slider) return;
    
    new Splide(slider, {
        type: 'loop',
        autoplay: true,
        interval: 5000,
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

// Initialize live chat
function initializeLiveChat() {
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

// Initialize scroll animations
function initializeScrollAnimations() {
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

// Animate counters
function animateCounters() {
    const counters = document.querySelectorAll('.text-3xl.font-bold.text-cyan');
    
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
    // Reinitialize particle background on resize
    const container = document.getElementById('particle-container');
    if (container) {
        container.innerHTML = '';
        initializeParticleBackground();
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

// Add loading states for buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        if (this.textContent.includes('Start') || this.textContent.includes('Deploy')) {
            const originalText = this.textContent;
            this.textContent = 'Processing...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        }
    });
});

// Add hover effects for interactive elements
function addHoverEffects() {
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

// Initialize hover effects after DOM is loaded
document.addEventListener('DOMContentLoaded', addHoverEffects);


