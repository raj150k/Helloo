let isRunning = false;

function startBoosting() {
    if (isRunning) return;
    
    const linkInput = document.getElementById('videoLink').value.trim();
    const multiplier = parseInt(document.getElementById('multiplier').value);
    const grid = document.getElementById('videoGrid');
    const statusText = document.getElementById('statusText');
    const progressBar = document.getElementById('progressBar');

    if (!linkInput) {
        alert("দয়া করে একটি ভিডিও লিংক দিন!");
        return;
    }

    isRunning = true;
    grid.innerHTML = ""; // আগের সব ক্লিন করো
    statusText.innerText = `ভিডিও প্রস্তুত হচ্ছে... ${multiplier}x ভিউ বসানো হবে।`;
    
    // প্রগ্রেস বার এনিমেশন
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        progressBar.style.width = `${progress}%`;
        if (progress >= 100) clearInterval(interval);
    }, 50);

    // ভিডিও টাইপ চেক করা
    let isTikTok = linkInput.includes('tiktok.com');
    let isInstagram = linkInput.includes('instagram.com') || linkInput.includes('instagr.am');

    console.log(`Platform: ${isTikTok ? 'TikTok' : isInstagram ? 'Instagram' : 'Unknown'}`);

    // লুপ চালানো (ভিউ সংখ্যা অনুযায়ী)
    for (let i = 0; i < multiplier; i++) {
        const card = document.createElement('div');
        card.className = 'video-card';
        
        let embedHtml = '';

        if (isTikTok) {
            // টিকটকের জন্য সঠিক iframe লিংক তৈরি করা
            // TikTok সরাসরি ভিডিও URL দিয়ে কাজ করে না, তাই আমরা iframe ব্যবহার করছি
            embedHtml = `
                <iframe 
                    src="${linkInput}" 
                    width="100%" 
                    height="280" 
                    frameborder="0" 
                    scrolling="no" 
                    allowfullscreen>
                </iframe>`;
        } 
        else if (isInstagram) {
            // ইনস্টাগ্রামের জন্য embed ট্যাগ ব্যবহার করা
            embedHtml = `
                <blockquote class="instagram-media" 
                    data-instgrm-permalink="${linkInput}" 
                    data-instgrm-version="14" 
                    style=" background:#FFF; border:0; border-radius:3px; padding: 0; box-shadow: none; width: 100%; " >
                </blockquote>`;
        } 
        else {
            // যদি অন্য কোনো সাইট হয় (যেমন সরাসরি .mp4 লিংক)
            embedHtml = `<video controls autoplay muted loop style="width:100%;"><source src="${linkInput}"></video>`;
        }

        card.innerHTML = `
            <div style="font-size:10px; color:#00ffcc; margin-bottom:2px;">View #${i + 1}</div>
            ${embedHtml}
        `;
        
        grid.appendChild(card);
    }

    // Instagram এর জন্য স্ক্রিপ্ট রিফ্রেশ করা (যদি ইনস্টাগ্রাম হয়)
    if (isInstagram && window.instgrm) {
        window.instgrm.Embeds.process();
    }

    statusText.innerText = `✅ সফলভাবে ${multiplier}টি ভিউ প্লে করা হচ্ছে!`;
    
    setTimeout(() => {
        isRunning = false;
        progressBar.style.width = '100%';
    }, 2000);
          }
