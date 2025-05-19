document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const targetId = anchor.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    if(targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if(window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

const typedTextSpan = document.querySelector('.hero h1 span');
const textToType = typedTextSpan.textContent;
typedTextSpan.textContent = '';

let charIndex = 0;
function type() {
  if(charIndex < textToType.length) {
    typedTextSpan.textContent += textToType.charAt(charIndex);
    charIndex++;
    setTimeout(type, 150);
  }
}
type();

document.querySelectorAll('.project-button').forEach(button => {
  button.addEventListener('click', () => {
    const projectCard = button.closest('.project-card');
    projectCard.classList.toggle('expanded');
    if(projectCard.classList.contains('expanded')) {
      button.textContent = 'Show Less';
    } else {
      button.textContent = 'See Project';
    }
  });
});

const contactForm = document.querySelector('.contact form');
const formMessage = document.createElement('p');
formMessage.style.color = 'red';
formMessage.style.marginTop = '10px';
contactForm.appendChild(formMessage);

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = contactForm.querySelector('input[type="text"]').value.trim();
  const email = contactForm.querySelector('input[type="email"]').value.trim();
  const message = contactForm.querySelector('textarea').value.trim();
  if(!name || !email || !message) {
    formMessage.textContent = 'Please fill in all fields.';
    return;
  }
  if(!validateEmail(email)) {
    formMessage.textContent = 'Please enter a valid email address.';
    return;
  }
  formMessage.style.color = 'green';
  formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
  contactForm.reset();
  setTimeout(() => {
    formMessage.textContent = '';
    formMessage.style.color = 'red';
  }, 5000);
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

const backToTop = document.createElement('button');
backToTop.textContent = '↑ Top';
backToTop.id = 'backToTop';
backToTop.style.position = 'fixed';
backToTop.style.bottom = '30px';
backToTop.style.right = '30px';
backToTop.style.padding = '10px 15px';
backToTop.style.fontSize = '16px';
backToTop.style.border = 'none';
backToTop.style.borderRadius = '5px';
backToTop.style.backgroundColor = 'var(--blue)';
backToTop.style.color = 'white';
backToTop.style.cursor = 'pointer';
backToTop.style.display = 'none';
backToTop.style.zIndex = '1000';
document.body.appendChild(backToTop);

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  if(window.scrollY > 300) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 5; 
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'none';
  });
});
