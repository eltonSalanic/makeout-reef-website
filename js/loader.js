(() => {
    const ATTR = 'data-loader';
    const DEFAULT_EVENT = 'load';
    const HIDE_DELAY = 450;

    const resolveWrapper = (reference) => {
        if (!reference) return null;
        if (reference instanceof Element) {
            return reference.matches(`[${ATTR}]`) ? reference : reference.closest(`[${ATTR}]`);
        }
        if (typeof reference === 'string') {
            return resolveWrapper(document.querySelector(reference));
        }
        return null;
    };

    const pickTarget = (wrapper) => {
        const selector = wrapper.dataset.loaderSelector;
        if (selector) {
            const explicit = wrapper.querySelector(selector);
            if (explicit) return explicit;
        }
        return (
            wrapper.querySelector('[data-loader-target]') ||
            wrapper.querySelector('iframe, img, video, audio')
        );
    };

    const isLoaded = (node) => {
        if (!node) return false;
        const tag = node.tagName;
        if (tag === 'IMG') {
            return node.complete && node.naturalWidth > 0;
        }
        if (tag === 'IFRAME') {
            try {
                return node.contentDocument?.readyState === 'complete';
            } catch {
                return false;
            }
        }
        if (tag === 'VIDEO' || tag === 'AUDIO') {
            return typeof node.readyState === 'number' && node.readyState >= 3;
        }
        return false;
    };

    const hideOverlay = (wrapper) => {
        const overlay = wrapper?.querySelector('.loader-overlay');
        if (!overlay || wrapper.classList.contains('loader-wrapper--ready')) return;

        overlay.classList.add('loader-overlay--hidden');
        wrapper.classList.add('loader-wrapper--ready');

        setTimeout(() => {
            overlay.style.display = 'none';
        }, HIDE_DELAY);
    };

    const setupWrapper = (wrapper) => {
        if (!wrapper || wrapper.dataset.loaderReady === 'true') return;

        const overlay = wrapper.querySelector('.loader-overlay');
        const target = pickTarget(wrapper);
        if (!overlay || !target) return;

        const eventName = target.dataset.loaderEvent || wrapper.dataset.loaderEvent || DEFAULT_EVENT;
        const reveal = () => hideOverlay(wrapper);

        target.addEventListener(eventName, reveal, { once: true });

        if (isLoaded(target)) {
            hideOverlay(wrapper);
        }

        wrapper.dataset.loaderReady = 'true';
    };

    const initLoaders = () => {
        document.querySelectorAll(`[${ATTR}]`).forEach(setupWrapper);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLoaders);
    } else {
        initLoaders();
    }

    window.LoaderOverlay = {
        hide(reference) {
            const wrapper = resolveWrapper(reference);
            if (wrapper) hideOverlay(wrapper);
        },
        refresh() {
            initLoaders();
        },
    };

    window.onVideoEmbedLoad = () => window.LoaderOverlay.hide('#video-loader');
})();
