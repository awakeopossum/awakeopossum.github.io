function getBackgroundColor() {
    //get css variable --bg
    let bg = String(getComputedStyle(document.documentElement).getPropertyValue('--bg'));
    return bg;
}
