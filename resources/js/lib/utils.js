/**
 * Scrolls an element to the center of its scrollable container without
 * changing page scroll.
 * @param {HTMLElement} element - The element to scroll into view.
 * @param behavior - The scroll behavior as defined by the scrollTo function. Default is 'smooth'.
 */
export function scrollToCenter(element, behavior = 'smooth') {
    if (!element) return;
    const container = element.closest('.overflow-scroll');
    if (!container) return;

    const elementRect = element.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const scrollTop = container.scrollTop + elementRect.top - containerRect.top
        - (container.clientHeight - element.offsetHeight) / 2;

    container.scrollTo({ top: Math.max(0, scrollTop), behavior: behavior });
}
