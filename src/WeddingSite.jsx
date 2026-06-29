import { useEffect, useState } from 'react'
import './WeddingSite.css'

// แก้วันเวลาแต่งงานที่นี่ (ใช้ +07:00 เพื่อให้ countdown ถูกต้องไม่ว่าใครจะเปิดจากเขตเวลาไหน)
const WEDDING_DATE = new Date('2026-12-19T18:00:00+07:00')

// แก้ลิงก์แผนที่ตรงนี้ ถ้าเปลี่ยนสถานที่
const MAP_URL =
  'https://www.google.co.th/maps/place/The+Athenee+Hotel,+a+Luxury+Collection+Hotel,+Bangkok/@13.7413541,100.5452001,17z/data=!4m9!3m8!1s0x30e2974d07377631:0xfd90058d241e8d30!5m2!4m1!1i2!8m2!3d13.7413541!4d100.547775!16s%2Fg%2F1v_v_ttb'

// ตัวอย่างกำหนดการ — แก้เวลา/หัวข้อ/คำอธิบายให้ตรงกับงานจริง เพิ่ม/ลบรายการได้เลย
const TIMELINE = [
  { time: '16:00', title: 'พิธีหมั้น', desc: 'พิธีสงฆ์และพิธีหมั้นแบบไทย' },
  { time: '17:00', title: 'ถ่ายภาพ', desc: 'ถ่ายภาพร่วมกับครอบครัวและเพื่อนๆ' },
  { time: '18:00', title: 'งานเลี้ยงฉลองมงคลสมรส', desc: 'อาหารค่ำและการแสดงความยินดี' },
  { time: '20:30', title: 'อวยพรคู่บ่าวสาว', desc: 'ช่วงเวลาพิเศษส่งท้ายงาน' },
]

// เพิ่มรูปจริงตรงนี้ทีหลังได้เลย เช่น { src: '/photos/pre-wed-01.jpg', alt: 'ปิ่นกับแมมมอธที่...' }
// ถ้า array นี้ว่าง หน้าเว็บจะโชว์ข้อความ "ภาพจะอัปเดตเร็วๆ นี้" แทนโดยอัตโนมัติ
const GALLERY_IMAGES = []

// ตัวอย่างรายชื่อแขก — แทนที่ทั้งหมดด้วยรายชื่อจริงก่อนแชร์ลิงก์ให้แขก (ชื่อด้านล่างเป็นชื่อสมมติ)
const GUEST_TABLES = [
  { name: 'สมชาย ใจดี', table: 'A1' },
  { name: 'วิภาวรรณ สุขใจ', table: 'A2' },
  { name: 'ธนกร รักเรียน', table: 'B3' },
]

// ตำแหน่ง/สี/ขนาดจุดคอนเฟ็ตตี้ในส่วน hero — แก้ตัวเลขเพื่อจัดวางใหม่ได้
const CONFETTI = [
  { top: '8%', left: '10%', size: 14, color: 'var(--marigold)' },
  { top: '14%', left: '82%', size: 10, color: 'var(--jade)' },
  { top: '70%', left: '6%', size: 12, color: 'var(--pink)' },
  { top: '78%', left: '88%', size: 16, color: 'var(--coral)' },
  { top: '4%', left: '46%', size: 8, color: 'var(--jade)' },
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

export default function WeddingSite() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)
  const [rsvpStatus, setRsvpStatus] = useState(null)
  const [tableQuery, setTableQuery] = useState('')

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  const countdownUnits = [
    { key: 'days', label: 'วัน', value: timeLeft.days },
    { key: 'hours', label: 'ชม.', value: timeLeft.hours },
    { key: 'minutes', label: 'นาที', value: timeLeft.minutes },
    { key: 'seconds', label: 'วิ', value: timeLeft.seconds },
  ]

  const trimmedQuery = tableQuery.trim()
  const tableMatches = trimmedQuery
    ? GUEST_TABLES.filter((g) => g.name.toLowerCase().includes(trimmedQuery.toLowerCase()))
    : []

  return (
    <div className="wedding-page">
      <section className="wedding-hero">
        {CONFETTI.map((dot, i) => (
          <span
            key={i}
            className="wedding-confetti"
            style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size, background: dot.color }}
          />
        ))}
        <span className="wedding-badge wedding-badge--center">save the date ✦</span>
        <h1 className="wedding-names">ปิ่น &amp; แมมมอธ</h1>
        <p className="wedding-date">19 ธันวาคม 2569</p>
        <div className="wedding-countdown">
          {countdownUnits.map((unit) => (
            <div className={`wedding-sticker wedding-sticker--${unit.key}`} key={unit.key}>
              <span className="wedding-sticker-number">{unit.value}</span>
              <span className="wedding-sticker-label">{unit.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="wedding-block wedding-block--cream">
        <div className="wedding-intro">
          <p>
            ขอเชิญทุกท่านร่วมเป็นสักขีพยาน
            <br />
            ในวันสำคัญของเรา
          </p>
        </div>
      </section>

      <section className="wedding-block wedding-block--coral">
        <span className="wedding-badge wedding-badge--center wedding-badge--light">timeline</span>
        <div className="wedding-sticker-card">
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

      <section className="wedding-block wedding-block--cream">
        <span className="wedding-badge wedding-badge--center">venue</span>
        <div className="wedding-sticker-card wedding-sticker-card--center">
          <h2 className="wedding-venue-name">The Athenee Hotel</h2>
          <p className="wedding-venue-sub">a Luxury Collection Hotel, Bangkok</p>
          <div className="wedding-map-placeholder">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3A1F3D" strokeWidth="2">
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

      <section className="wedding-block wedding-block--jade">
        <span className="wedding-badge wedding-badge--center wedding-badge--light">gallery</span>
        <div className="wedding-sticker-card wedding-sticker-card--center">
          {GALLERY_IMAGES.length > 0 ? (
            <div className="wedding-gallery-grid">
              {GALLERY_IMAGES.map((img, i) => (
                <img key={i} src={img.src} alt={img.alt} className="wedding-gallery-photo" />
              ))}
            </div>
          ) : (
            <>
              <div className="wedding-gallery-empty-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3A1F3D" strokeWidth="2">
                  <rect x="3" y="7" width="18" height="13" rx="2" />
                  <path d="M8 7l1.5-2.5h5L16 7" />
                  <circle cx="12" cy="13.5" r="3.2" />
                </svg>
              </div>
              <p className="wedding-gallery-empty-text">ภาพพรีเวดดิ้งจะอัปเดตเร็วๆ นี้</p>
            </>
          )}
        </div>
      </section>

      <section className="wedding-block wedding-block--cream">
        <span className="wedding-badge wedding-badge--center">rsvp</span>
        <div className="wedding-sticker-card wedding-sticker-card--center">
          <h2 className="wedding-rsvp-question">ท่านจะเข้าร่วมงานหรือไม่</h2>
          <p className="wedding-rsvp-sub">กรุณายืนยันก่อนวันที่ 30 พฤศจิกายน</p>
          <div className="wedding-rsvp-buttons">
            <button type="button" className="wedding-btn wedding-btn--fill" onClick={() => setRsvpStatus('yes')}>
              เข้าร่วม
            </button>
            <button type="button" className="wedding-btn wedding-btn--fill-alt" onClick={() => setRsvpStatus('no')}>
              ไม่สามารถ
            </button>
          </div>
          {rsvpStatus === 'yes' && <p className="wedding-rsvp-message">ขอบคุณค่ะ บันทึกแล้วว่าจะเข้าร่วม 🎉</p>}
          {rsvpStatus === 'no' && <p className="wedding-rsvp-message">เสียดายจัง ขอบคุณที่แจ้งล่วงหน้านะคะ</p>}
        </div>
      </section>

      <section className="wedding-block wedding-block--coral">
        <span className="wedding-badge wedding-badge--center wedding-badge--light">find your table</span>
        <div className="wedding-sticker-card wedding-sticker-card--center">
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

      <footer className="wedding-block wedding-block--plum wedding-footer">
        <p className="wedding-footer-text">with love, Pin &amp; Mammoth</p>
      </footer>
    </div>
  )
}
