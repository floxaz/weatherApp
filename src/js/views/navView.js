import { elements } from './base';

export const showNav = () => {
    elements.mobileNav.classList.add('mobile-nav--showed');
}

export const prepareNavForm = () => {
    elements.mobForm.classList.add('search');
    elements.mobForm.classList.remove('mobile-nav__search');
}

const displaySearchMob = () => {
    elements.mobileNav.classList.add('mobile-nav--display-search');
}

const removeSearchMob = () => {
    elements.mobileNav.classList.remove('mobile-nav--display-search');
}

const showNavMobForm = () => {
    elements.mobForm.classList.add('mobForm--showed');
}

const removeNavMobForm = () => {
    elements.mobForm.classList.remove('mobForm--showed');
}

const changeNavIcon = iconName => {
    //elements.navIcon.firstChild.href = `img/symbol-defs.svg#${iconName}`;
    elements.navIcon.childNodes[1].setAttribute(`href`, `img/symbol-defs.svg#${iconName}`);
}

export const goDownNav = () => {
    changeNavIcon('icon-eject');
    displaySearchMob();
    showNavMobForm();
}

export const goUpNav = () => {
    changeNavIcon('icon-search');
    removeNavMobForm();
    removeSearchMob();
}

elements.mobNavBtn.addEventListener('click', () => {
    if(!elements.mobCheckbox.checked) {
        goDownNav();
    } else {
        goUpNav();
    }
})