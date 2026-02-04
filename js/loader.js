(() => {
    const LOADER_ATTR = 'data-loader';
    const DEFAULT_EVENT = 'load';
    const HIDE_DELAY = 450;

    const resolveShell = (reference) => {
        if (!reference) return null;
        if (reference instanceof Element) {
            return reference.matches(`[${LOADER_ATTR}]`) ? reference : reference.closest(`[${LOADER_ATTR}]`);
        }
        if (typeof reference === 'string') {
            const node = document.querySelector(reference);
            return node ? resolveShell(node) : null;
        }
        return null;
    };

    const hideOverlay = (shell) => {
        if (!shell || shell.classList.contains('loader-shell--ready')) return;
        const overlay = shell.querySelector('.loader-overlay');
        if (!overlay) return;

        overlay.classList.add('loader-overlay--hidden');
        shell.classList.add('loader-shell--ready');

        setTimeout(() => {
            overlay.style.display = 'none';
        }, HIDE_DELAY);
    };

    const isTargetLoaded = (target) => {
        if (!target) return false;
        const tag = target.tagName;
        if (tag === 'IMG') {
            return target.complete && target.naturalWidth > 0;
        }
        if (tag === 'IFRAME') {
            try {
                return target.contentDocument?.readyState === 'complete';
            } catch {
                return false;
            }
        }
        if (tag === 'VIDEO' || tag === 'AUDIO') {
            return typeof target.readyState === 'number' && target.readyState >= 3;
        }
        return false;
    };

    const registerShell = (shell) => {
        if (!shell || shell.dataset.loaderInitialized === 'true') return;

        const overlay = shell.querySelector('.loader-overlay');
        if (!overlay) return;

        const targetSelector = shell.dataset.loaderSelector;
        const target =
            (targetSelector ? shell.querySelector(targetSelector) : null) ||
            shell.querySelector('[data-loader-target]') ||
            shell.querySelector('iframe, img, video, audio');

        if (!target) return;

        const eventName = target.dataset.loaderEvent || shell.dataset.loaderEvent || DEFAULT_EVENT;
        const markReady = () => hideOverlay(shell);

        target.addEventListener(eventName, markReady, { once: true });

        if (isTargetLoaded(target)) {
            hideOverlay(shell);
        }

        shell.dataset.loaderInitialized = 'true';
    };

    const initLoaders = () => {
        document.querySelectorAll(`[${LOADER_ATTR}]`).forEach(registerShell);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLoaders);
    } else {
        initLoaders();
    }

    window.LoaderOverlay = {
        markReady(reference) {
            const shell = resolveShell(reference);
            if (shell) {
                hideOverlay(shell);
            }
        },
    };

    window.onVideoEmbedLoad = () => {
        window.LoaderOverlay.markReady('#video-loader');
    };
})();
