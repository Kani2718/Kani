// generate_ppt.js
// Node script to create a PowerPoint summarizing the premium authentication flow

const PptxGenJS = require('pptxgenjs');

let pptx = new PptxGenJS();

function addTitleSlide(title, subtitle) {
  let slide = pptx.addSlide();
  slide.addText(title, { x:1, y:1, w:'80%', h:1, fontSize:36, bold:true, color:'363636' });
  if (subtitle) {
    slide.addText(subtitle, { x:1, y:2.2, w:'80%', h:0.8, fontSize:20, color:'6F6F6F' });
  }
}

function addBulletSlide(title, bullets) {
  let slide = pptx.addSlide();
  slide.addText(title, { x:0.5, y:0.5, w:'90%', h:0.6, fontSize:28, bold:true, color:'363636' });
  let txt = bullets.map(b=>`• ${b}`).join('\n');
  slide.addText(txt, { x:0.7, y:1.2, w:'90%', h:4, fontSize:18, color:'424242', lineSpacing:24 });
}

addTitleSlide('Smart Campus AI', 'Premium Authentication & User Flow');

addBulletSlide('Overview', [
  'Goal: Modern, production-quality SaaS authentication experience.',
  'Premium UI with split-screen layout and glassmorphic cards.',
  'Full client‑side & server‑side validation.',
  'Secure session management & role‑based access.'
]);

addBulletSlide('Authentication Flow', [
  'New User: Landing → Register → Success → Auto‑redirect to Login → Login → Dashboard.',
  'Existing User: Landing → Login → Dashboard.',
  'After registration: show success banner, pre‑fill email, do NOT auto‑open dashboard.'
]);

addBulletSlide('Premium Login UI', [
  'Split‑screen: left visual, right auth card.',
  'Glassmorphic card with backdrop blur, rounded corners.',
  'Fields: Email, Password, Remember Me, Forgot Password.',
  'Demo Account button for hackathon.'
]);

addBulletSlide('Premium Register UI', [
  'Same split‑screen layout.',
  'Fields: Full Name, Email, Phone, Institution, Campus, Role, Password, Confirm Password.',
  'Terms & Privacy checkbox.',
  'Password strength meter (Weak → Medium → Strong).',
  'Success screen with animation and auto‑redirect countdown.'
]);

addBulletSlide('Validation Rules', [
  'Full Name: required, ≥2 chars.',
  'Email: required, valid format, unique.',
  'Phone: required, valid format.',
  'Password: ≥8 chars, upper, lower, number, special.',
  'Confirm Password must match.',
  'Role selection required.',
  'Real‑time client validation + server checks.'
]);

addBulletSlide('Routing & Protection', [
  'Public routes: /, /about, /features, /login, /register, /forgot-password.',
  'Protected routes: /dashboard, /classrooms, /energy, ….',
  'Unauthenticated access → redirect to /login.',
  'After login, redirect back to originally requested page.'
]);

addBulletSlide('Session Management', [
  'Secure password hashing.',
  'JWT or secure cookies for auth tokens.',
  'Session stored in localStorage/sessionStorage.',
  'Logout clears session and redirects to login.',
  'Role‑based authorization for protected pages.'
]);

addBulletSlide('Demo Account (Hackathon)', [
  'Email: demo@smartcampus.ai',
  'Password: configurable via env vars.',
  'Button fills login form and authenticates normally.'
]);

addBulletSlide('Logout Flow', [
  'Profile dropdown includes Logout option.',
  'Confirmation modal with Cancel / Sign Out.',
  'On sign out: destroy session, show success toast, redirect to login.'
]);

addBulletSlide('Branding & Micro‑Interactions', [
  'Deep navy/black gradient background with subtle glows.',
  'Glassmorphic auth cards, modern typography (Inter/Manrope).',
  'Animations: input focus glow, button hover/press, password visibility toggle, success checkmark pop, error shake, card entrance.'
]);

addBulletSlide('Responsive Design', [
  'Desktop: 50/50 split‑screen.',
  'Tablet & mobile: hide illustration, full‑width form, large touch targets, no horizontal scroll.',
  'Consistent branding across all auth pages.'
]);

// Save the PPTX file
pptx.writeFile({ fileName: 'Smart_Campus_AI_Auth_Flow.pptx' })
  .then(() => console.log('Presentation saved.'))
  .catch(err => console.error(err));
