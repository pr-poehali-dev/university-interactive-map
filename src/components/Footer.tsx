export default function Footer() {
  return (
    <footer
      className="py-10 text-center"
      style={{ background: 'linear-gradient(135deg, #0A2463, #1A3A8A)' }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-montserrat font-black text-xl mx-auto mb-3 shadow-lg"
          style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.2)' }}>
          А
        </div>
        <div className="font-montserrat font-black text-white text-lg mb-1">АГУ</div>
        <div className="text-white/50 text-sm font-ibm mb-4">Алтайский государственный университет</div>
        <div className="text-white/30 text-xs font-ibm">
          пр. Ленина, 61, Барнаул · asu.ru
        </div>
      </div>
    </footer>
  );
}
