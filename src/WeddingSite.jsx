import { useEffect, useRef, useState } from 'react'
import './WeddingSite.css'

function SlotDigit({ digit }) {
  return (
    <span className="slot-digit">
      <span
        className="slot-digit-col"
        style={{ transform: `translateY(-${Number(digit) * 10}%)` }}
      >
        {[0,1,2,3,4,5,6,7,8,9].map(n => (
          <span key={n} className="slot-digit-num">{n}</span>
        ))}
      </span>
    </span>
  )
}

const WEDDING_DATE = new Date('2026-12-19T18:00:00+07:00')

const MAP_URL =
  'https://www.google.co.th/maps/place/The+Athenee+Hotel,+a+Luxury+Collection+Hotel,+Bangkok/@13.7413541,100.5452001,17z'

const NAV_ITEMS = [
  { id: 'hero', label: 'หน้าหลัก' },
  { id: 'table-finder', label: 'ค้นหาโต๊ะ' },
  { id: 'venue', label: 'สถานที่' },
  { id: 'timeline', label: 'กำหนดการ' },
  { id: 'gallery', label: 'Gallery' },
]

const TIMELINE = [
  { time: '18:00', title: 'Guest Arrival', desc: 'แขกเริ่มเดินทางมาถึงงาน', icon: '/icons/tl-01.png' },
  { time: '18:30', title: 'Couple Entrance', desc: 'เจ้าบ่าวเจ้าสาวเดินเข้างาน', icon: '/icons/tl-02.png' },
  { time: '19:00', title: 'I Do', desc: 'พิธีแลกแหวนและปฏิญาณตน', icon: '/icons/tl-03.png' },
  { time: '19:30', title: 'Dinner', desc: 'รับประทานอาหารค่ำร่วมกัน', icon: '/icons/tl-04.png' },
  { time: '20:00', title: 'Cake Cutting', desc: 'ตัดเค้กมงคลสมรส', icon: '/icons/tl-05.png' },
  { time: '21:00', title: 'Bouquet Toss', desc: 'โยนช่อดอกไม้ส่งท้ายงาน', icon: '/icons/tl-06.png' },
]

const GALLERY_IMAGES = [
  { src: '/photos/pre-wed-01.jpg', alt: 'ปิ่นกับแมมมอธบนสะพานเหล็ก ถือดอกกุหลาบสีชมพู' },
  { src: '/photos/pre-wed-02.jpg', alt: 'ปิ่นกับแมมมอธนั่งเล่นบนราวสะพานพระพุทธยอดฟ้า' },
  { src: '/photos/pre-wed-03.jpg', alt: 'ปิ่นกับแมมมอธยืนหน้าตึกเก่าย่านเมืองเก่ายามค่ำ' },
  { src: '/photos/pre-wed-04.jpg', alt: 'ปิ่นกับแมมมอธเดินจูงมือกันยามค่ำคืน' },
  { src: '/photos/pre-wed-05.jpg', alt: 'ปิ่นกับแมมมอธในชุดกิโมโน ใต้ต้นซากุระที่เกียวโต' },
  { src: '/photos/pre-wed-06.jpg', alt: 'แหวนหมั้นในกล่องสีแดง ใต้ดอกซากุระ' },
  { src: '/photos/pre-wed-07.jpg', alt: 'ปิ่นกับแมมมอธในชุดกิโมโน โชว์แหวนหมั้นใต้ต้นซากุระ' },
  { src: '/photos/pre-wed-08.jpg', alt: 'ช่อดอกกุหลาบสีชมพูพาสเทล' },
  { src: '/photos/pre-wed-09.jpg', alt: 'ปิ่นกับแมมมอธกอดกัน ยิ้มหัวเราะริมแม่น้ำ' },
  { src: '/photos/pre-wed-10.jpg', alt: 'ปิ่นกับแมมมอธนั่งคุยกันริมสะพาน' },
  { src: '/photos/pre-wed-11.jpg', alt: 'ปิ่นกับแมมมอธถ่ายรูปคู่ริมสะพานพระพุทธยอดฟ้า' },
]

const GUEST_TABLES = [
  { name: 'สมชาย ใจดี', table: 'A1' },
  { name: 'วิภาวรรณ สุขใจ', table: 'A2' },
  { name: 'ธนกร รักเรียน', table: 'B3' },
]

function getTimeLeft() {
  const diff = Math.max(0, WEDDING_DATE.getTime() - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('is-visible'); observer.unobserve(el) } },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

export default function WeddingSite() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)
  const [rsvpStatus, setRsvpStatus] = useState(null)
  const [tableQuery, setTableQuery] = useState('')

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  const countdownUnits = [
    { label: 'Days', value: String(timeLeft.days) },
    { label: 'Hours', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'Min', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'Sec', value: String(timeLeft.seconds).padStart(2, '0') },
  ]

  const trimmedQuery = tableQuery.trim()
  const tableMatches = trimmedQuery
    ? GUEST_TABLES.filter((g) => g.name.toLowerCase().includes(trimmedQuery.toLowerCase()))
    : []

  const midRef = useReveal()
  const venueRef = useReveal()
  const galleryRef = useReveal()
  const rsvpRef = useReveal()
  const tableRef = useReveal()

  function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="wedding-page">
      <nav className="wedding-nav">
        <span className="wedding-nav-mark">P &amp; M</span>
        <div className="wedding-nav-links">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} type="button" className="wedding-nav-link" onClick={() => scrollToSection(item.id)}>
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <section id="hero" className="wedding-hero">
        <p className="wedding-eyebrow">the wedding of</p>
        <p className="wedding-names-script">Pin &amp; Mammoth</p>
        <div className="wedding-divider" />
        <p className="wedding-date">19 December 2026</p>
        <div className="wedding-countdown">
          {countdownUnits.map((unit) => (
            <div className="wedding-countdown-box" key={unit.label}>
              <div className="wedding-countdown-number-wrap">
                <span className="wedding-countdown-number">
                  {String(unit.value).split('').map((d, i) => (
                    <SlotDigit key={i} digit={d} />
                  ))}
                </span>
              </div>
              <span className="wedding-countdown-label">{unit.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="timeline" ref={midRef} className="wedding-section wedding-reveal">
        <div className="wedding-inner">
          <p className="wedding-eyebrow wedding-eyebrow--center">timeline</p>
          <div className="wedding-timeline-icon-list">
            {TIMELINE.map((item, i) => (
              <div className="wedding-tl-row" key={item.title}>
                <div className="wedding-tl-icon-wrap">
                  <img src={item.icon} alt={item.title} className="wedding-tl-icon" />
                </div>
                <div className="wedding-tl-dash">—</div>
                <div className="wedding-tl-info">
                  <p className="wedding-tl-time">{item.time}</p>
                  <p className="wedding-tl-title">{item.title}</p>
                </div>
                {i < TIMELINE.length - 1 && <div className="wedding-tl-sep" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="venue" ref={venueRef} className="wedding-section wedding-reveal">
        <div className="wedding-inner">
          <p className="wedding-eyebrow wedding-eyebrow--center">venue</p>
          <div className="wedding-card wedding-card--center" style={{ maxWidth: 600, margin: '0 auto' }}>
            <h2 className="wedding-venue-name">The Athenee Hotel</h2>
            <p className="wedding-venue-sub">a Luxury Collection Hotel, Bangkok</p>
            <div className="wedding-map-embed">
              <iframe
                title="แผนที่ The Athenee Hotel"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.621443029729!2d100.54520007509002!3d13.741354086649425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2974d07377631%3A0xfd90058d241e8d30!2sThe%20Athenee%20Hotel%2C%20a%20Luxury%20Collection%20Hotel%2C%20Bangkok!5e0!3m2!1sen!2sth!4v1782820744309!5m2!1sen!2sth"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <p className="wedding-venue-time">งานเลี้ยง · 18:00 น. เป็นต้นไป</p>
            <a className="wedding-btn wedding-btn--fill" href={MAP_URL} target="_blank" rel="noopener noreferrer">
              ดูแผนที่
            </a>
          </div>
        </div>
      </section>

      <section ref={rsvpRef} className="wedding-section wedding-reveal">
        <div className="wedding-inner">
          <p className="wedding-eyebrow wedding-eyebrow--center">rsvp</p>
          <div className="wedding-card wedding-card--center" style={{ maxWidth: 480, margin: '0 auto' }}>
            <h2 className="wedding-rsvp-question">ท่านจะเข้าร่วมงานหรือไม่</h2>
            <p className="wedding-rsvp-sub">กรุณายืนยันก่อนวันที่ 30 พฤศจิกายน</p>
            <div className="wedding-rsvp-buttons">
              <button type="button" className="wedding-btn wedding-btn--fill" onClick={() => setRsvpStatus('yes')}>
                เข้าร่วม
              </button>
              <button type="button" className="wedding-btn" onClick={() => setRsvpStatus('no')}>
                ไม่สามารถ
              </button>
            </div>
            {rsvpStatus === 'yes' && <p className="wedding-rsvp-message">ขอบคุณค่ะ บันทึกแล้วว่าจะเข้าร่วม</p>}
            {rsvpStatus === 'no' && <p className="wedding-rsvp-message">เสียดายจัง ขอบคุณที่แจ้งล่วงหน้านะคะ</p>}
          </div>
        </div>
      </section>

      <section id="table-finder" ref={tableRef} className="wedding-section wedding-reveal">
        <div className="wedding-inner">
          <p className="wedding-eyebrow wedding-eyebrow--center">find your table</p>
          <div className="wedding-card wedding-card--center" style={{ maxWidth: 480, margin: '0 auto' }}>
            <h2 className="wedding-table-question">ค้นหาโต๊ะของท่าน</h2>
            <p className="wedding-table-sub">พิมพ์ชื่อ-นามสกุลของท่าน</p>
            <input
              type="text"
              className="wedding-input"
              placeholder="เช่น สมชาย ใจดี"
              value={tableQuery}
              onChange={(e) => setTableQuery(e.target.value)}
            />
            {trimmedQuery !== '' && (
              tableMatches.length > 0 ? (
                <ul className="wedding-table-results">
                  {tableMatches.map((g) => (
                    <li key={g.name} className="wedding-table-result-item">
                      <span>{g.name}</span>
                      <span className="wedding-table-number">โต๊ะ {g.table}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="wedding-table-empty">
                  ไม่พบชื่อนี้ในรายชื่อ ลองตรวจสอบการสะกด หรือทักหาเจ้าบ่าวเจ้าสาวได้เลยค่ะ
                </p>
              )
            )}
          </div>
        </div>
      </section>

      <section id="gallery" ref={galleryRef} className="wedding-section wedding-section--olive wedding-reveal">
        <p className="wedding-eyebrow wedding-eyebrow--center wedding-eyebrow--light">gallery</p>
        {GALLERY_IMAGES.length > 0 ? (
          <div className="wedding-gallery-masonry">
            {GALLERY_IMAGES.map((img, i) => (
              <img key={i} src={img.src} alt={img.alt} className="wedding-gallery-photo" />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div className="wedding-gallery-empty-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F1D1D1" strokeWidth="1.4">
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M8 7l1.5-2.5h5L16 7" />
                <circle cx="12" cy="13.5" r="3.2" />
              </svg>
            </div>
            <p className="wedding-gallery-empty-text">ภาพความทรงจำจะอัปเดตเร็วๆ นี้</p>
          </div>
        )}
      </section>

      <footer className="wedding-footer">
        <p className="wedding-footer-mark">P &amp; M</p>
        <p className="wedding-footer-text">with love, Pin &amp; Mammoth</p>
      </footer>
    </div>
  )
}
