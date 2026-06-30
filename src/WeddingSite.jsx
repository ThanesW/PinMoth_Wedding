import { useEffect, useRef, useState } from 'react'
import './WeddingSite.css'

// แก้วันเวลาแต่งงานที่นี่ (ใช้ +07:00 เพื่อให้ countdown ถูกต้องไม่ว่าใครจะเปิดจากเขตเวลาไหน)
const WEDDING_DATE = new Date('2026-12-19T18:00:00+07:00')

// แก้ลิงก์แผนที่ตรงนี้ ถ้าเปลี่ยนสถานที่
const MAP_URL =
  'https://www.google.co.th/maps/place/The+Athenee+Hotel,+a+Luxury+Collection+Hotel,+Bangkok/@13.7413541,100.5452001,17z/data=!4m9!3m8!1s0x30e2974d07377631:0xfd90058d241e8d30!5m2!4m1!1i2!8m2!3d13.7413541!4d100.547775!16s%2Fg%2F1v_v_ttb'

// เมนูบนแถบนำทาง — id ต้องตรงกับ id ของแต่ละ section ด้านล่าง
const NAV_ITEMS = [
  { id: 'hero', label: 'หน้าหลัก' },
  { id: 'table-finder', label: 'ค้นหาโต๊ะ' },
  { id: 'venue', label: 'สถานที่' },
  { id: 'timeline', label: 'กำหนดการ' },
  { id: 'memory-wall', label: 'Memory Wall' },
]

// ตัวอย่างกำหนดการ — แก้เวลา/หัวข้อ/คำอธิบายให้ตรงกับงานจริง เพิ่ม/ลบรายการได้เลย
const TIMELINE = [
  { time: '16:00', title: 'พิธีหมั้น', desc: 'พิธีสงฆ์และพิธีหมั้นแบบไทย' },
  { time: '17:00', title: 'ถ่ายภาพ', desc: 'ถ่ายภาพร่วมกับครอบครัวและเพื่อนๆ' },
  { time: '18:00', title: 'งานเลี้ยงฉลองมงคลสมรส', desc: 'อาหารค่ำและการแสดงความยินดี' },
  { time: '20:30', title: 'อวยพรคู่บ่าวสาว', desc: 'ช่วงเวลาพิเศษส่งท้ายงาน' },
]

// เพิ่มรูปจริงตรงนี้ทีหลังได้เลย เช่น { src: '/photos/pre-wed-01.jpg', alt: 'ปิ่นกับแมมมอธที่...' }
// ถ้า array นี้ว่าง Memory Wall จะโชว์ข้อความ "ภาพจะอัปเดตเร็วๆ นี้" แทนโดยอัตโนมัติ
const GALLERY_IMAGES = []

// ตัวอย่างรายชื่อแขก — แทนที่ทั้งหมดด้วยรายชื่อจริงก่อนแชร์ลิงก์ให้แขก (ชื่อด้านล่างเป็นชื่อสมมติ)
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

// ใส่ ref ของ section ใดๆ เข้าฟังก์ชันนี้ แล้ว element จะค่อยๆ เลื่อนปรากฏตอน scroll เข้ามาในจอ
function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
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
    { label: 'วัน', value: timeLeft.days },
    { label: 'ชม.', value: timeLeft.hours },
    { label: 'นาที', value: timeLeft.minutes },
    { label: 'วิ', value: timeLeft.seconds },
  ]

  const trimmedQuery = tableQuery.trim()
  const tableMatches = trimmedQuery
    ? GUEST_TABLES.filter((g) => g.name.toLowerCase().includes(trimmedQuery.toLowerCase()))
    : []

  const introRef = useReveal()
  const timelineRef = useReveal()
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
            <button
              key={item.id}
              type="button"
              className="wedding-nav-link"
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <section id="hero" className="wedding-hero">
        <p className="wedding-eyebrow">the wedding of</p>
        <h1 className="wedding-names">ปิ่น &amp; แมมมอธ</h1>
        <div className="wedding-divider" />
        <p className="wedding-date">19 ธันวาคม 2569</p>
        <div className="wedding-countdown">
          {countdownUnits.map((unit) => (
            <div className="wedding-countdown-box" key={unit.label}>
              <span className="wedding-countdown-number">{unit.value}</span>
              <span className="wedding-countdown-label">{unit.label}</span>
            </div>
          ))}
        </div>
      </section>

      <div ref={introRef} className="wedding-reveal">
        <div className="wedding-intro">
          <p>
            ขอเชิญทุกท่านร่วมเป็นสักขีพยาน
            <br />
            ในวันสำคัญของเรา
          </p>
        </div>
      </div>

      <section id="timeline" ref={timelineRef} className="wedding-section wedding-reveal">
        <p className="wedding-eyebrow wedding-eyebrow--center">timeline</p>
        <div className="wedding-card">
          <div className="wedding-timeline">
            {TIMELINE.map((item, i) => (
              <div className="wedding-timeline-item" key={item.title}>
                <div className="wedding-timeline-time">{item.time}</div>
                <div className="wedding-timeline-marker-col">
                  <span className="wedding-timeline-dot" />
                  {i !== TIMELINE.length - 1 && <span className="wedding-timeline-line" />}
                </div>
                <div className="wedding-timeline-content">
                  <h3 className="wedding-timeline-title">{item.title}</h3>
                  <p className="wedding-timeline-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="venue" ref={venueRef} className="wedding-section wedding-reveal">
        <p className="wedding-eyebrow wedding-eyebrow--center">venue</p>
        <div className="wedding-card wedding-card--center">
          <h2 className="wedding-venue-name">The Athenee Hotel</h2>
          <p className="wedding-venue-sub">a Luxury Collection Hotel, Bangkok</p>
          <div className="wedding-map-placeholder">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#4B5842" strokeWidth="1.4">
              <path d="M12 21s7-7.58 7-12a7 7 0 1 0-14 0c0 4.42 7 12 7 12Z" />
              <circle cx="12" cy="9" r="2.3" />
            </svg>
          </div>
          <p className="wedding-venue-time">งานเลี้ยง · 18:00 น. เป็นต้นไป</p>
          <a className="wedding-btn wedding-btn--fill" href={MAP_URL} target="_blank" rel="noopener noreferrer">
            ดูแผนที่
          </a>
        </div>
      </section>

      <section
        id="memory-wall"
        ref={galleryRef}
        className="wedding-section wedding-section--olive wedding-reveal"
      >
        <p className="wedding-eyebrow wedding-eyebrow--center wedding-eyebrow--light">memory wall</p>
        {GALLERY_IMAGES.length > 0 ? (
          <div className="wedding-gallery-grid">
            {GALLERY_IMAGES.map((img, i) => (
              <img key={i} src={img.src} alt={img.alt} className="wedding-gallery-photo" />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div className="wedding-gallery-empty-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A65C" strokeWidth="1.4">
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M8 7l1.5-2.5h5L16 7" />
                <circle cx="12" cy="13.5" r="3.2" />
              </svg>
            </div>
            <p className="wedding-gallery-empty-text">ภาพความทรงจำจะอัปเดตเร็วๆ นี้</p>
          </div>
        )}
      </section>

      <section ref={rsvpRef} className="wedding-section wedding-reveal">
        <p className="wedding-eyebrow wedding-eyebrow--center">rsvp</p>
        <div className="wedding-card wedding-card--center">
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
      </section>

      <section id="table-finder" ref={tableRef} className="wedding-section wedding-reveal">
        <p className="wedding-eyebrow wedding-eyebrow--center">find your table</p>
        <div className="wedding-card wedding-card--center">
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
      </section>

      <footer className="wedding-footer">
        <p className="wedding-footer-mark">P &amp; M</p>
        <p className="wedding-footer-text">with love, Pin &amp; Mammoth</p>
      </footer>
    </div>
  )
}
