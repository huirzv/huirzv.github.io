// Easter Egg for RoRanks logo spam click
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const logo = document.getElementById('logo-easter-egg');
        const logoMsg = document.getElementById('logo-easter-egg-message');
        if (logo && logoMsg) {
            let clickCount = 0;
            let lastClick = 0;
            let msgIdx = 0;
            const messages = [
                "Woah? What's your rush?",
                "Seriously stop",
                "Stop",
                "Come on bro"
            ];
            function resetEasterEgg() {
                clickCount = 0;
                msgIdx = 0;
                logoMsg.textContent = '';
            }
            logo.addEventListener('click', function(e) {
                const now = Date.now();
                if (now - lastClick > 3000) {
                    resetEasterEgg();
                }
                lastClick = now;
                clickCount++;
                if (clickCount > 5) {
                    if (msgIdx < messages.length) {
                        logoMsg.textContent = messages[msgIdx];
                        msgIdx++;
                    } else {
                        logoMsg.textContent = messages[messages.length - 1];
                    }
                }
                clearTimeout(logoMsg._hideTimeout);
                logoMsg._hideTimeout = setTimeout(resetEasterEgg, 4000);
            });
        }
    });
})();
