// Utility
    function setText(id, text) { const el = document.getElementById(id); if (el) el.textContent = text; }
    function copyToClipboard(text, label) { navigator.clipboard.writeText(text).then(() => { Swal.fire({ html: `${label} <span style="color:#4da6ff;font-weight:600">${text}</span> copied`, background: '#12151a', color: '#e6eef3', icon: 'success', timer: 2000, showConfirmButton: false, timerProgressBar: true, iconColor: '#4da6ff' }); }); }

    // Copy buttons
    document.getElementById('copy-ipv4').addEventListener('click', () => copyToClipboard(document.getElementById('ipv4').textContent, 'IPv4'));
    document.getElementById('copy-ipv6').addEventListener('click', () => copyToClipboard(document.getElementById('ipv6').textContent, 'IPv6'));
    document.getElementById('copy-coords').addEventListener('click', () => copyToClipboard(document.getElementById('coordinates').textContent, 'Coordinates'));

    // Fetch IP Info
    async function fetchIPInfo() {
      try {
        const res4 = await fetch('https://api.ipify.org?format=json'); const data4 = await res4.json(); setText('ipv4', data4.ip);
      } catch (e) { setText('ipv4', 'Error'); }
      try {
        const res6 = await fetch('https://api6.ipify.org?format=json'); const data6 = await res6.json(); setText('ipv6', data6.ip);
      } catch (e) { setText('ipv6', 'N/A'); }

      try {
        const resGeo = await fetch('https://ipwho.is/'); const data = await resGeo.json();
        if (!data.success) throw new Error(data.message || 'API failed');
        setText('continent', data.continent);
        setText('country', `${data.country} (${data.country_code})`);
        setText('region', `${data.region} · ${data.city}`);
        setText('coordinates', `${data.latitude}, ${data.longitude}`);
        setText('isp', `${data.connection?.isp} · ASN ${data.connection?.asn}`);
        setText('org', data.connection?.org || '—');
        setText('timezone', data.timezone?.id || '—');
        setText('vpn', data.security?.proxy ? 'Yes' : 'No');
        setText('status-summary', `Online · ${data.country} · ${data.connection?.isp}`);
      } catch (e) {
        Swal.fire({ title: 'Error', text: 'No Internet Connection', background: '#12151a', color: '#e6eef3', icon: 'error', showConfirmButton: false, timer: 2000, timerProgressBar: true, iconColor: '#ff4c4c' });
        setText('status-summary', 'No Internet Connection');
      }
    }

    // Browser info
    function detectBrowser() {
      const ua = navigator.userAgent; setText('useragent', ua); setText('screen', `${window.screen.width}×${window.screen.height}`);
      const osMatch = ua.match(/\(([^)]+)\)/); setText('os', osMatch ? osMatch[1] : '—');
      const browserMatch = ua.match(/(Firefox|Chrome|Safari|Edge|Opera|MSIE|Trident)\/?\s*(\d+)/);
      setText('browser', browserMatch ? `${browserMatch[1]} ${browserMatch[2]}` : '—');
    }

    // Refresh All
    document.getElementById('refresh-all').addEventListener('click', async () => {
      setText('timestamp', 'Last updated: Updating…');
      setText('status-summary', 'Refreshing…');
      await fetchIPInfo(); detectBrowser();
      const now = new Date(); setText('timestamp', `Last updated: ${now.toLocaleString()}`);
    });

    // Initial load
    (async () => {
      const now = new Date(); setText('timestamp', `Last updated: ${now.toLocaleString()}`);
      await fetchIPInfo(); detectBrowser();
    })();
