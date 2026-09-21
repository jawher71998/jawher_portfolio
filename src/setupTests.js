// jest-dom ajoute des vérifications sur le DOM :
// expect(element).toBeInTheDocument(), toHaveAttribute(...), etc.
import '@testing-library/jest-dom';

// L'environnement de test (jsdom) ne connaît ni IntersectionObserver ni scrollIntoView,
// que le portfolio utilise pour les animations et la navigation : on les simule.
class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback;
  }
  observe(target) {
    // On considère que chaque section est visible.
    this.callback([{ isIntersecting: true, target }], this);
  }
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
global.IntersectionObserver = IntersectionObserverMock;

window.HTMLElement.prototype.scrollIntoView = jest.fn();