# 🍰 Desserts - Product List with Cart

A responsive e-commerce product listing page with a functional shopping cart, built as a solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d).

## 🚀 Live Demo

**[View Live Site](https://lisk-product-list.vercel.app)** 

## 📱 Features

- 🛒 **Interactive Shopping Cart** - Add, remove, and adjust quantities
- 💾 **Persistent Storage** - Cart data saved in browser's local storage
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ♿ **Accessible Design** - Keyboard navigation and screen reader support
- 🎨 **Modern UI** - Smooth animations and hover effects
- 🌱 **Carbon Neutral** - Eco-friendly branding elements 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- ✅ Add items to the cart and remove them
- ✅ Increase/decrease the number of items in the cart
- ✅ See an order confirmation modal when they click "Confirm Order"
- ✅ Reset their selections when they click "Start New Order"
- ✅ View the optimal layout for the interface depending on their device's screen size
- ✅ See hover and focus states for all interactive elements on the page

### Screenshot

![Product List with Cart](./preview.jpg)

*The application features a responsive product grid with a functional shopping cart, order confirmation modal, and carbon-neutral branding.*

### Links

- **Live Demo**: [View Live Site](https://lisk-product-list.vercel.app) 
- **Frontend Mentor**: [Challenge Details](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d)
- **Repository**: [GitHub](https://github.com/odingaval/lisk-product-list-.git) 

## My process

### Built with

- **HTML5** - Semantic markup with proper accessibility attributes
- **CSS3** - Custom properties, Flexbox, CSS Grid, responsive design
- **JavaScript (ES6+)** - Class-based architecture, Local Storage API
- **Responsive Images** - Optimized for mobile, tablet, and desktop
- **Local Storage** - Cart persistence across browser sessions

### What I learned

This project helped me reinforce several important concepts:

**🎨 CSS Architecture:**
- Using CSS custom properties for consistent theming and easy maintenance
- Mobile-first responsive design with progressive enhancement
- CSS Grid for flexible layouts that adapt to different screen sizes
- Proper use of Flexbox for component-level layouts
- Smooth animations and hover effects for better UX

**⚡ JavaScript Best Practices:**
- Class-based architecture for better code organization and reusability
- Event delegation and proper event handling to avoid memory leaks
- Local Storage for state persistence across browser sessions
- Async/await for clean data fetching and error handling
- Debouncing for performance optimization on window resize events

**♿ Accessibility:**
- Semantic HTML structure for better screen reader support
- Proper focus management and keyboard navigation
- ARIA attributes and alt text for images
- Color contrast compliance with WCAG guidelines
- Touch-friendly interface elements for mobile users

**Key Code Snippets:**

```javascript
// Cart state management with Local Storage
class Cart {
  saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(Array.from(this.items.entries())));
  }
  
  loadFromStorage() {
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.items = new Map(JSON.parse(saved));
    }
  }
}
```

```css
/* Responsive design with CSS Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-md);
}

@media (min-width: 768px) {
  .content {
    grid-template-columns: 1fr 350px;
  }
}
```

```javascript
// Responsive image handling
getResponsiveImage(images) {
  const width = window.innerWidth;
  if (width >= 1440) return images.desktop;
  if (width >= 768) return images.tablet;
  return images.mobile;
}
```

### Continued development

Areas I'd like to continue improving:

1. **🚀 Performance Optimization**: 
   - Implement virtual scrolling for large product lists
   - Add image lazy loading and optimization
   - Implement code splitting for better load times

2. **📊 State Management**: 
   - Consider using a more robust state management solution for larger applications
   - Add undo/redo functionality for cart operations

3. **🧪 Testing**: 
   - Add unit tests and integration tests
   - Implement end-to-end testing with Cypress or Playwright

4. **🎭 Animation**: 
   - Add more sophisticated animations and transitions
   - Implement skeleton loading states

5. **📱 PWA Features**: 
   - Add service worker for offline functionality
   - Implement push notifications for order updates

### Useful resources

- [CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) - Essential for creating responsive layouts
- [Local Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) - For persisting cart state across sessions
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) - For maintainable theming and design systems
- [Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) - For optimal image loading and performance
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) - For creating inclusive user experiences
- [Frontend Mentor](https://www.frontendmentor.io/) - For practicing frontend development with real-world projects

## Author

👋 **Your Name**

- **GitHub**: [@yourusername](https://github.com/odingaval)
- **Frontend Mentor**: [@yourusername](https://www.frontendmentor.io/profile/odngaval)
- **LinkedIn**: [Your Name](https://linkedin.com/in/odingavalery)

*Feel free to connect with me!*

---

## 📝 Project Summary

This project was built as part of the Frontend Mentor challenges to improve my frontend development skills. The design and requirements were provided by Frontend Mentor, and the implementation was completed independently.

### 🎯 Key Achievements:
- ✅ **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- ✅ **Functional Cart** - Add, remove, and adjust quantities with persistence
- ✅ **Accessible Design** - Keyboard navigation and screen reader support
- ✅ **Modern CSS** - Custom properties, Grid, Flexbox, and smooth animations
- ✅ **Clean JavaScript** - Class-based architecture with proper error handling
- ✅ **Performance Optimized** - Responsive images and efficient event handling

The project demonstrates proficiency in modern frontend development practices and creates an engaging user experience for an e-commerce product listing page.

---

**⭐ If you found this project helpful, please give it a star!**
