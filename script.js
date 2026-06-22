document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Mobile Menu Logic
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('translate-x-full');
      mobileMenu.classList.add('translate-x-0');
    });
  }

  if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener('click', () => {
      mobileMenu.classList.remove('translate-x-0');
      mobileMenu.classList.add('translate-x-full');
    });
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu) {
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
      }
    });
  });

  // Testimonials Carousel / Slider
  const testimonials = [
    {
      name: "Sanam Baloch",
      role: "Elite Hyderabad Bride",
      text: "Hoor Mahal made my wedding day absolutely magical! Dil's bridal makeup felt so lightweight, yet lasted flawlessly through all 8 hours of photography and lights. Every single guest complimented my skin glow.",
      stars: 5,
      tag: "Bridal Transformation"
    },
    {
      name: "Ayesha Khan",
      role: "Regular Party Guest",
      text: "The absolute best salon in Latifabad! The hygiene standards are immaculate and the staff treats you like royalty from the minute you step through the door. Their facial treatments are heavenly.",
      stars: 5,
      tag: "Facial & Skin Care"
    },
    {
      name: "Zainab Yusuf",
      role: "Hair Rebonding Client",
      text: "My hair was extremely damaged, but their hair restoration styling and premium treatments completely transformed my locks. My hair feels incredibly silky and healthy now. Highly recommend!",
      stars: 5,
      tag: "Hair Therapy"
    },
    {
      name: "Saba Qamar",
      role: "Bridal Party & Makeup Special",
      text: "We booked the bridal party makeup package for my sister's big day. The efficiency, premium international cosmetics, and personalized service were second to none. Hoor Mahal defines luxury in Hyderabad.",
      stars: 5,
      tag: "Party Group Makeup"
    }
  ];

  let currentTestimonialIdx = 0;
  const testimonialContainer = document.getElementById('testimonial-card-container');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');

  function renderTestimonial(index) {
    if (!testimonialContainer) return;
    const test = testimonials[index];
    
    // Generate Stars HTML
    let starsHtml = '';
    for (let i = 0; i < test.stars; i++) {
      starsHtml += `<svg class="w-5 h-5 text-amber-500 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
    }

    // Dynamic Fade Out + In transition
    testimonialContainer.style.opacity = 0;
    testimonialContainer.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      testimonialContainer.innerHTML = `
        <div class="luxury-border p-8 md:p-12 bg-white rounded-2xl luxury-shadow-lg relative overflow-hidden flex flex-col justify-between h-full">
          <!-- Absolute Quote Accent -->
          <div class="absolute -top-6 -right-6 text-pink-100 opacity-40 font-serif text-9xl pointer-events-none select-none">“</div>
          
          <div>
            <div class="flex items-center gap-1 mb-4">
              ${starsHtml}
            </div>
            <p class="font-editorial text-xl md:text-2xl text-gray-800 italic mb-8 relative z-10 leading-relaxed">
              "${test.text}"
            </p>
          </div>
          
          <div class="flex items-center justify-between border-t border-gray-100 pt-6">
            <div>
              <h4 class="font-cinzel text-lg font-bold tracking-wider text-gray-800">${test.name}</h4>
              <p class="text-xs text-amber-600 uppercase tracking-widest font-semibold mt-1">${test.role}</p>
            </div>
            <span class="text-xs bg-pink-50 text-pink-700 px-3 py-1.5 rounded-full font-medium tracking-wide">
              ${test.tag}
            </span>
          </div>
        </div>
      `;
      testimonialContainer.style.opacity = 1;
      testimonialContainer.style.transform = 'translateY(0)';
    }, 250);
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentTestimonialIdx = (currentTestimonialIdx === 0) ? testimonials.length - 1 : currentTestimonialIdx - 1;
      renderTestimonial(currentTestimonialIdx);
    });

    nextBtn.addEventListener('click', () => {
      currentTestimonialIdx = (currentTestimonialIdx === testimonials.length - 1) ? 0 : currentTestimonialIdx + 1;
      renderTestimonial(currentTestimonialIdx);
    });

    // Initial render
    renderTestimonial(0);
    
    // Auto Rotation
    setInterval(() => {
      currentTestimonialIdx = (currentTestimonialIdx === testimonials.length - 1) ? 0 : currentTestimonialIdx + 1;
      renderTestimonial(currentTestimonialIdx);
    }, 8000);
  }

  // Interactive Custom Beauty Package Planner (Signature Services Dynamic Configurator)
  const servicesData = [
    { id: 'bridal-makeup', name: 'Premium Royal Bridal Makeup Portfolio', price: 35000, category: 'Bridal' },
    { id: 'party-makeup', name: 'HD Editorial & Glam Party Makeup', price: 8000, category: 'Makeup' },
    { id: 'hair-styling', name: 'Couture Hair Artistry / Bridal Updos', price: 4000, category: 'Hair' },
    { id: 'hair-treatment', name: 'Keratin Nourish & Smooth Hair Renewal', price: 15000, category: 'Hair' },
    { id: 'facial-treatment', name: 'Luxury Gold Brightening Custom Facial', price: 6500, category: 'Skincare' },
    { id: 'skin-care', name: 'Signature Organic Pearl Skin Elixir', price: 5000, category: 'Skincare' },
    { id: 'mani-pedi', name: 'Luxury Hand & Foot Spa Therapy (Mani/Pedi)', price: 4500, category: 'Spa' }
  ];

  const packageCheckboxes = document.querySelectorAll('.package-checkbox');
  const plannerCount = document.getElementById('planner-count');
  const plannerSubtotal = document.getElementById('planner-subtotal');
  const plannerDiscount = document.getElementById('planner-discount');
  const plannerTotal = document.getElementById('planner-total');
  const plannerDiscountBadge = document.getElementById('planner-discount-badge');
  const plannerBookBtn = document.getElementById('planner-book-btn');

  function updatePlanner() {
    if (!plannerCount) return;
    let selectedCount = 0;
    let subtotal = 0;
    let selectedServicesList = [];

    packageCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selectedCount++;
        const serviceId = checkbox.dataset.serviceId;
        const service = servicesData.find(s => s.id === serviceId);
        if (service) {
          subtotal += service.price;
          selectedServicesList.push(service.name);
        }
      }
    });

    // Multi-service package discount system
    // 2 services = 5% off, 3 services = 10% off, 4 or more services = 15% off
    let discountPercent = 0;
    if (selectedCount === 2) discountPercent = 0.05;
    else if (selectedCount === 3) discountPercent = 0.10;
    else if (selectedCount >= 4) discountPercent = 0.15;

    const discountAmount = subtotal * discountPercent;
    const finalAmount = subtotal - discountAmount;

    // UI Updates
    plannerCount.textContent = selectedCount;
    plannerSubtotal.textContent = `PKR ${subtotal.toLocaleString()}`;
    plannerDiscount.textContent = `- PKR ${discountAmount.toLocaleString()}`;
    plannerTotal.textContent = `PKR ${finalAmount.toLocaleString()}`;

    if (discountPercent > 0) {
      plannerDiscountBadge.textContent = `${discountPercent * 100}% Luxury Bundle Discount Applied!`;
      plannerDiscountBadge.classList.remove('hidden');
    } else {
      if (selectedCount > 0) {
        plannerDiscountBadge.textContent = 'Add 1 more signature service to unlock up to 15% discount!';
        plannerDiscountBadge.classList.remove('hidden');
      } else {
        plannerDiscountBadge.classList.add('hidden');
      }
    }

    // Update book button data
    if (plannerBookBtn) {
      if (selectedCount > 0) {
        plannerBookBtn.removeAttribute('disabled');
        plannerBookBtn.className = "w-full py-4 px-6 rounded-xl font-cinzel text-md tracking-wider gold-btn font-bold text-center block transition-all";
        
        // Generate pre-filled text
        const servicesString = selectedServicesList.join(', ');
        const textMessage = `Hello Hoor Mahal! I am interested in building a customized beauty experience and would like to book the following package:\n\n✨ Selected Treatments:\n${selectedServicesList.map(item => `• ${item}`).join('\n')}\n\n📊 Estimations:\n- Subtotal: PKR ${subtotal.toLocaleString()}\n- Package Discount: PKR ${discountAmount.toLocaleString()} (${discountPercent * 100}% Offer)\n- Elite Package Price: PKR ${finalAmount.toLocaleString()}`;
        
        plannerBookBtn.href = `https://wa.me/923091152287?text=${encodeURIComponent(textMessage)}`;
      } else {
        plannerBookBtn.setAttribute('disabled', 'true');
        plannerBookBtn.className = "w-full py-4 px-6 rounded-xl font-cinzel text-md tracking-wider bg-gray-100 text-gray-400 font-bold text-center block cursor-not-allowed";
        plannerBookBtn.href = "javascript:void(0)";
      }
    }
  }

  packageCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updatePlanner);
  });

  // Contact Form Submission Handler
  const contactForm = document.getElementById('luxury-contact-form');
  const formSuccessState = document.getElementById('form-success-state');
  const formSubmitBtn = document.getElementById('form-submit-btn');

  if (contactForm && formSuccessState) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const clientName = document.getElementById('client-name').value.trim();
      const clientPhone = document.getElementById('client-phone').value.trim();
      const clientService = document.getElementById('client-service').value;
      const clientDate = document.getElementById('client-date').value;
      const clientMessage = document.getElementById('client-message').value.trim();

      if (!clientName || !clientPhone || !clientService || !clientDate) {
        alert("Please complete all the required fields marked with an asterisk (*).");
        return;
      }

      // Format WhatsApp query
      const whatsappBaseText = `Hello Hoor Mahal by Dil Luxury Beauty Saloon!\n\nI want to schedule an appointment booking:\n\n👤 Name: ${clientName}\n📞 Contact Phone: ${clientPhone}\n💅 Selected Category: ${clientService}\n📆 Preferred Date: ${clientDate}\n💬 Additional Notes: ${clientMessage ? clientMessage : 'None'}`;
      const encodedText = encodeURIComponent(whatsappBaseText);
      const whatsappURL = `https://wa.me/923091152287?text=${encodedText}`;

      // Save appointment locally for VIP panel experience
      const localAppointments = JSON.parse(localStorage.getItem('hoor_mahal_appointments') || '[]');
      const newAppt = {
        name: clientName,
        phone: clientPhone,
        service: clientService,
        date: clientDate,
        createdAt: new Date().toLocaleDateString(),
        refId: 'HM-' + Math.floor(1000 + Math.random() * 9000)
      };
      localAppointments.push(newAppt);
      localStorage.setItem('hoor_mahal_appointments', JSON.stringify(localAppointments));

      // Show success screen animations
      contactForm.classList.add('hidden');
      formSuccessState.classList.remove('hidden');
      
      // Update custom details in success alert card
      const receiptDetails = document.getElementById('receipt-details');
      if (receiptDetails) {
        receiptDetails.innerHTML = `
          <div class="mt-4 p-4 rounded-xl bg-pink-50 border border-pink-100 text-left text-sm text-gray-700">
            <p class="font-semibold text-gray-800 mb-1">Reservation Reference: <span class="text-amber-700 font-mono">${newAppt.refId}</span></p>
            <p><strong>Name:</strong> ${newAppt.name}</p>
            <p><strong>Service:</strong> ${newAppt.service}</p>
            <p><strong>Scheduled Date:</strong> ${newAppt.date}</p>
            <span class="inline-block mt-3 bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-semibold">Ready to forward to WhatsApp</span>
          </div>
        `;
      }

      // Add actual action for WhatsApp continuation trigger button
      const openWhatsAppBtn = document.getElementById('open-whatsapp-btn');
      if (openWhatsAppBtn) {
        openWhatsAppBtn.addEventListener('click', () => {
          window.open(whatsappURL, '_blank');
        });
      }

      // Auto-trigger WhatsApp dispatch in 2 seconds
      setTimeout(() => {
        window.open(whatsappURL, '_blank');
      }, 2000);
    });
  }

  // Load existing personal appointments if they exist to build VIP Client Area
  function checkVIPAppointments() {
    const localAppointments = JSON.parse(localStorage.getItem('hoor_mahal_appointments') || '[]');
    const vipSec = document.getElementById('vip-appts-card');
    const vipList = document.getElementById('vip-appts-list');
    
    if (vipSec && vipList && localAppointments.length > 0) {
      vipSec.classList.remove('hidden');
      vipList.innerHTML = localAppointments.slice(-3).reverse().map(appt => `
        <div class="p-4 rounded-lg bg-white border border-pink-100 mb-3 luxury-shadow text-xs">
          <div class="flex justify-between items-center mb-1">
            <span class="font-cinzel text-amber-700 font-bold">${appt.refId}</span>
            <span class="text-gray-400">${appt.createdAt}</span>
          </div>
          <p><span class="text-gray-500">Artist Care:</span> <strong>Hoor Mahal Studio by Dil</strong></p>
          <p><span class="text-gray-500">Requested:</span> <strong class="text-gray-800">${appt.service}</strong></p>
          <p><span class="text-gray-500">Date Proposed:</span> <strong class="text-gray-800">${appt.date}</strong></p>
          <div class="flex justify-between items-center mt-2.5 pt-2 border-t border-gray-100">
            <span class="text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded font-semibold uppercase tracking-widest">Awaiting Artist Approval</span>
            <a href="https://wa.me/923091152287?text=${encodeURIComponent(`Hello, checking appointment status for ref ${appt.refId} under the name ${appt.name}.`)}" target="_blank" class="text-pink-600 hover:text-pink-800 font-bold flex items-center gap-0.5">
              Follow-up WhatsApp <span class="text-base">&rarr;</span>
            </a>
          </div>
        </div>
      `).join('');
    }
  }

  checkVIPAppointments();

  // Highlight active navigation section on scroll style
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('header nav a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id') || '';
      }
    });

    navItems.forEach(item => {
      item.classList.remove('text-amber-500', 'font-semibold');
      const href = item.getAttribute('href');
      if (href === `#${current}`) {
        item.classList.add('text-amber-500', 'font-semibold');
      }
    });
  });
});
