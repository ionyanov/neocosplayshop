export function detectMobileDevice(): boolean {
    const isMobile = window.matchMedia;
    if (!isMobile) return false;

    const device = isMobile('(pointer:coarse)');
    return device.matches;
}