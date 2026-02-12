function isElementVisible(element) {
    var rect = element.getBoundingClientRect();
    return rect.top <= -rect.height;
}

function handleScroll() {
    var tidioChat = document.getElementById('tidio-chat')
    var waifu = document.getElementById('waifu')
    if (!isElementVisible(document.getElementById('l_cover'))) {
        if (tidioChat) tidioChat.style.opacity = 0
        if (waifu) waifu.style.opacity = 0
    } else {
        if (tidioChat) tidioChat.style.opacity = 1
        if (waifu) waifu.style.opacity = 1
    }
}

window.addEventListener('scroll', handleScroll);