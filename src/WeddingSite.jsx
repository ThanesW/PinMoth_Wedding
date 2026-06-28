import { useEffect, useState } from 'react'
import './WeddingSite.css'

// แก้วันเวลาแต่งงานที่นี่ (ใช้ +07:00 เพื่อให้ countdown ถูกต้องไม่ว่าใครจะเปิดจากเขตเวลาไหน)
const WEDDING_DATE = new Date('2026-12-19T18:00:00+07:00')

// แก้ลิงก์แผนที่ตรงนี้ ถ้าเปลี่ยนสถานที่
const MAP_URL =
  'https://www.google.co.th/maps/place/The+Athenee+Hotel,+a+Luxury+Collection+Hotel,+Bangkok/@13.7413541,100.5452001,17z/data=!4m9!3m8!1s0x30e2974d07377631:0xfd90058d241e8d30!5m2!4m1!1i2!8m2!3d13.7413541!4d100.547775!16s%2Fg%2F1v_v_ttb'

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

  return (
    <div className="wedding-page">
      <section className="wedding-hero">
        <p className="wedding-eyebrow">we&apos;re getting married</p>
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

      <section className="wedding-intro">
        <p>
          ขอเชิญทุกท่านร่วมเป็นสักขีพยาน
          <br />
          ในวันสำคัญของเรา
        </p>
      </section>

      <section className="wedding-section">
        <p className="wedding-eyebrow wedding-eyebrow--center">venue</p>
        <div className="wedding-card wedding-card--center">
          <h2 className="wedding-venue-name">The Athenee Hotel</h2>
          <p className="wedding-venue-sub">a Luxury Collection Hotel, Bangkok</p>
          <div className="wedding-map-placeholder">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#7D5A5A" strokeWidth="1.5">
              <path d="M12 21s7-7.58 7-12a7 7 0 1 0-14 0c0 4.42 7 12 7 12Z" />
              <circle cx="12" cy="9" r="2.3" />
            </svg>
          </div>
          <p className="wedding-venue-time">งานเลี้ยง · 18:00 น. เป็นต้นไป</p>
          <a className="wedding-btn" href={MAP_URL} target="_blank" rel="noopener noreferrer">
            ดูแผนที่
          </a>
        </div>
      </section>

      <section className="wedding-section">
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

      <footer className="wedding-footer">
        <div className="wedding-divider wedding-divider--small" />
        <p className="wedding-footer-text">with love, Pin &amp; Mammoth</p>
      </footer>
    </div>
  )
}
