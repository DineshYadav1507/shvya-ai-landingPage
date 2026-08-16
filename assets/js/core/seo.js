const META={
 'index.html':{title:'Shvya AI — One Platform for Sales, Operations & Growth',description:'Shvya AI brings CRM, ERP, automation and business operations into one unified platform.'},
 'products.html':{title:'Shvya AI Products — CRM, ERP & Business Automation',description:'Explore Shvya AI products for CRM, ERP, HR, inventory, education, healthcare and automation.'},
 'shvya-services.html':{title:'Shvya AI Services — Build, Automate & Deploy Faster',description:'Technology, automation and deployment services from Shvya AI.'},
 'shvya-about.html':{title:'About Shvya AI — Business Technology, Simplified',description:'Learn how Shvya AI helps businesses simplify operations with connected software and automation.'},
 'shvya-contact.html':{title:'Contact Shvya AI — Talk to Our Team',description:'Contact Shvya AI for product, implementation and automation conversations.'},
 'shvya-deployment.html':{title:'Shvya AI 4HR Deploy — Go Live Faster',description:'Accelerate business software deployment with Shvya AI 4HR Deploy.'}
};
export function initSEO(){const key=(location.pathname.split('/').pop()||'index.html').toLowerCase();const meta=META[key];if(!meta)return;document.title=meta.title;let description=document.querySelector('meta[name="description"]');if(!description){description=document.createElement('meta');description.name='description';document.head.appendChild(description);}description.content=meta.description;let canonical=document.querySelector('link[rel="canonical"]');if(!canonical){canonical=document.createElement('link');canonical.rel='canonical';document.head.appendChild(canonical);}canonical.href=location.href.split('#')[0];}
