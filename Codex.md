# Da Nang Trip 2026 — Project Handoff

เอกสารนี้เป็นบันทึกส่งต่องานฉบับละเอียดสำหรับกลับมาพัฒนาโปรเจกต์ในครั้งถัดไป โดยสรุปทั้งสถานะปัจจุบัน แนวคิดการออกแบบ โครงสร้างระบบ ข้อจำกัด วิธีตรวจสอบ และวิธีเผยแพร่

อัปเดตล่าสุด: 14 กันยายน 2026

## 1. เป้าหมายของโปรเจกต์

เว็บไซต์นี้เป็นเครื่องมือวางแผนและติดตามค่าใช้จ่ายสำหรับทริป “Da Nang Trip 2026” วันที่ 26–30 กันยายน 2026 ผู้เดินทาง 4 คน

ผู้ใช้งานหลักคือเจ้าของทริปเพียงคนเดียว ส่วนพ่อ แม่ และแฟนมีไว้เปิดดูข้อมูลเป็นหลัก ดังนั้นแนวคิดสำคัญคือ:

- ระบบต้องเรียบง่าย ไม่สร้างระบบระดับองค์กรเกินความจำเป็น
- โทรศัพท์เป็นอุปกรณ์หลักระหว่างเดินทาง
- การเพิ่มค่าใช้จ่ายต้องเร็วและใช้มือเดียวได้
- ทุกอุปกรณ์ต้องเห็นข้อมูลชุดเดียวกัน
- ยังไม่ต้องมี Login, Role หรือระบบสมาชิก
- ยอมรับความเสี่ยงของฐานข้อมูลแบบลิงก์สาธารณะสำหรับการใช้งานภายในครอบครัว
- รักษา Source Code และ Framework เดิม ไม่เริ่มโปรเจกต์ใหม่

## 2. เว็บไซต์ที่เผยแพร่แล้ว

Production URL:

https://trip-budget-4-vs-5-days.nontakarn1596.chatgpt.site

เว็บไซต์เผยแพร่ผ่าน OpenAI Sites และตั้งค่าเป็น Public เพื่อให้สมาชิกในครอบครัวเปิดจากลิงก์ได้

Sites project ID ถูกเก็บไว้ใน `.openai/hosting.json`:

```json
{
  "project_id": "appgprj_6aa3bc40c440819199d040bf59e01c4a",
  "static": {
    "directory": "dist"
  }
}
```

ห้ามสร้าง Site ใหม่ หากยังสามารถใช้ project ID นี้ได้ ให้เผยแพร่เวอร์ชันใหม่ทับ Site เดิมเท่านั้น

## 3. Technology Stack

- Vite 7
- TypeScript 5.9
- Vanilla TypeScript และ HTML string rendering
- CSS ปกติ ไม่มี Tailwind หรือ component framework
- Supabase JavaScript Client 2.116.0
- Vitest 3
- ESLint 9
- Static hosting ผ่าน OpenAI Sites
- Supabase Postgres + Realtime สำหรับข้อมูลกลาง
- Local Storage เป็นข้อมูลสำรองในอุปกรณ์และเก็บประวัติเครื่องคิดเลข

ไม่มี React, Vue, Next.js, Router library หรือ Backend server ของโปรเจกต์เอง

## 4. คำสั่งพื้นฐาน

ติดตั้ง dependencies:

```bash
npm install
```

เปิด Development Server:

```bash
npm run dev
```

ตรวจชุดทดสอบ:

```bash
npm test
```

ตรวจ Lint:

```bash
npm run lint
```

ตรวจ TypeScript และสร้าง Production Build:

```bash
npm run build
```

Production output อยู่ใน `dist/`

## 5. ข้อกำหนดสำคัญจากผู้ใช้

ข้อกำหนดนี้ต้องรักษาในการพัฒนาครั้งถัดไป:

1. ผู้ใช้ไม่อนุญาตให้เปิดหรือทดสอบเว็บไซต์ผ่าน Browser เพราะต้องการประหยัด Token
2. ให้ตรวจด้วย Tests, TypeScript, Lint และ Build เท่านั้น เว้นแต่ผู้ใช้เปลี่ยนคำสั่งอย่างชัดเจน
3. เว็บไซต์ใช้โทรศัพท์เป็นหลัก ต้องออกแบบ Mobile-first
4. ไม่ต้องทำระบบ Login หรือระบบผู้ใช้ขนาดใหญ่ในตอนนี้
5. ไม่ต้องมีหน้า Split Summary และ Transportation Comparison
6. หมวดค่าใช้จ่าย `Transportation` ยังต้องมีอยู่ แม้ไม่มีหน้า Transportation
7. ไม่ควรเพิ่มฟังก์ชันเพียงเพื่อทำให้ระบบดูใหญ่ขึ้น
8. หลังแก้เว็บไซต์ ให้เผยแพร่กลับไปยัง Production URL เดิมโดยปกติ
9. ห้ามลบหรือแทนที่ Source Code เดิมทั้งหมด
10. หลีกเลี่ยง Emoji ใน Interface และใช้ icon library/ชุด SVG เดียวกัน

## 6. โครงสร้างไฟล์สำคัญ

```text
.
├── .openai/hosting.json
├── ATTRIBUTION.md
├── index.html
├── package.json
├── public/
│   ├── da-nang-dragon-bridge.jpg
│   ├── trip-guide-1.jpg
│   ├── trip-guide-2.jpg
│   ├── trip-guide-3.jpg
│   ├── trip-guide-4.jpg
│   ├── trip-guide-5.jpg
│   └── trip-guide-6.jpg
├── src/
│   ├── calculator.ts
│   ├── calculator.test.ts
│   ├── cloud.ts
│   ├── cloud.test.ts
│   ├── data.ts
│   ├── expense-list.ts
│   ├── expense-list.test.ts
│   ├── icons.ts
│   ├── main.ts
│   ├── styles.css
│   ├── types.ts
│   └── webmcp.d.ts
└── supabase/migrations/
    └── 20260912145500_add_shared_trip_document.sql
```

รายละเอียด:

- `src/main.ts` เป็น entry point และ UI หลักทั้งหมด ปัจจุบันเขียนแบบฟังก์ชันคืน HTML string และ bind event หลัง render
- `src/styles.css` รวม Design System, Responsive CSS และ styling ของทุกหน้า
- `src/types.ts` เก็บ data types และหมวดค่าใช้จ่าย
- `src/data.ts` เก็บข้อมูลเริ่มต้นของทริป
- `src/cloud.ts` ติดต่อ Supabase, normalize ข้อมูล, โหลด/บันทึก และ subscribe Realtime
- `src/calculator.ts` เป็นเครื่องคิดเลข แปลงสกุลเงิน หารต่อคน และประวัติ
- `src/expense-list.ts` แยกตรรกะค้นหา กรอง และเรียงรายการออกจาก UI เพื่อให้ทดสอบได้
- `src/icons.ts` เป็นแหล่ง SVG icon กลางของระบบ
- `public/trip-guide-*.jpg` คือคู่มือทริป 6 หน้าเวอร์ชันปรับขนาดสำหรับเว็บไซต์
- `supabase/migrations/...sql` เป็น schema และ policy ที่ใช้อยู่

ข้อสังเกต: `src/main.ts` และ `src/styles.css` มีหลายส่วนอยู่ในบรรทัดยาวมาก การแก้ควรใช้ `apply_patch` อย่างระมัดระวัง และตรวจ `git diff --check` หลังแก้

## 7. Data Model

ประเภทหลักอยู่ใน `src/types.ts`

### Settings

```ts
type Settings = {
  tripName: string
  startDate: string
  endDate: string
  budgetTHB: number
  exchangeRate: number
  travelers: Person[]
}
```

อัตราแลกเปลี่ยนหมายถึง `1 THB = exchangeRate VND`

### Expense

```ts
type Expense = {
  id: string
  date: string
  dayId?: string | null
  item: string
  category: Category
  amount: number
  currency: 'THB' | 'VND'
  payerId: string
  status: 'paid' | 'planned'
  note: string
}
```

การแปลงเป็นเงินบาท:

```ts
expense.currency === 'THB'
  ? expense.amount
  : expense.amount / settings.exchangeRate
```

### DayPlan

```ts
type DayPlan = {
  id: string
  date: string
  title: string
  activities: string
  budgetTHB: number
}
```

ค่าใช้จ่ายเชื่อมกับวันผ่าน `Expense.dayId` ไม่ได้เชื่อมจากวันที่เพียงอย่างเดียว เพื่อรองรับการย้ายรายการเข้า/ออกแผนได้ชัดเจน

### Categories

- Flights
- Accommodation
- Transportation
- Food
- Activities
- Shopping
- Other

## 8. Supabase และการซิงก์ข้อมูล

Supabase project:

https://supabase.com/dashboard/project/zrrdfsogkjgtwuzmviwc

API URL และ Publishable Key อยู่ใน `src/cloud.ts` ปัจจุบันเป็น client-side public configuration ตามรูปแบบของ Supabase publishable key

ข้อมูลทั้งหมดของแอปเก็บเป็น JSON document หนึ่งแถวในตาราง:

```text
public.trip_documents
slug = da-nang-trip-2026
```

คอลัมน์หลัก:

- `slug` — primary key
- `data` — JSONB ของ `AppData`
- `schema_version` — ปัจจุบันเป็น 2
- `revision` — เพิ่มอัตโนมัติทุกครั้งที่ update
- `updated_at` — อัปเดตอัตโนมัติ

### RLS ปัจจุบัน

- anon และ authenticated อ่านได้
- anon และ authenticated insert/update ได้เฉพาะ slug `da-nang-trip-2026`
- anon และ authenticated ไม่มีสิทธิ์ delete/truncate
- เปิด Supabase Realtime สำหรับตารางนี้

นี่เป็นการตัดสินใจโดยเจตนาของผู้ใช้ เนื่องจากใช้งานเพียงครอบครัวและยังไม่ต้องการ Login/PIN อย่างไรก็ตาม ทุกคนที่เข้าถึง API configuration และรู้ slug ในทางเทคนิคสามารถแก้ข้อมูลได้ จึงไม่ถือว่าเป็นระบบรักษาความปลอดภัยสำหรับข้อมูลสำคัญ

หากอนาคตต้องการความปลอดภัยจริง ควรเพิ่ม Supabase Auth และปรับ RLS ไม่ควรใช้ PIN ฝั่ง client เป็นตัวป้องกันหลัก

### พฤติกรรมการซิงก์

1. เริ่มต้นจากข้อมูลสำรองใน Local Storage
2. เรียก `loadOrCreateTrip()` เพื่อโหลดข้อมูลกลาง
3. หากยังไม่มีแถว จะสร้างจากข้อมูล Local
4. ทุกการแก้ไขเรียก `save()` ซึ่งบันทึก Local ก่อน
5. Debounce ประมาณ 350 ms แล้ว upsert ไป Supabase
6. ถ้าส่งไม่สำเร็จ จะแสดงสถานะ Offline และ retry
7. Subscribe Realtime เพื่อรับการแก้ไขจากอุปกรณ์อื่น
8. ป้องกันการเขียนทับ update ระหว่างที่เครื่องปัจจุบันมี pending save แบบพื้นฐาน

ข้อจำกัด: ยังไม่มี conflict resolution ระดับ field หากสองอุปกรณ์แก้พร้อมกันจริง ๆ ระบบใช้แนวทาง document ล่าสุดชนะ

## 9. Local Storage

ข้อมูลหลักสำรองด้วย key:

```text
da-nang-trip-2026-v2
```

มี logic นำเข้าข้อมูลเก่าจาก:

```text
trip-budget-v1
```

ประวัติเครื่องคิดเลขใช้ key:

```text
da-nang-calculator-history-v2
```

ประวัติเครื่องคิดเลขเป็นข้อมูลเฉพาะอุปกรณ์ ไม่ได้ซิงก์ Supabase และเก็บสูงสุด 50 รายการ

## 10. หน้าปัจจุบัน

### Overview

- สรุปงบประมาณรวม
- ค่าใช้จ่ายที่จ่ายแล้ว
- ค่าใช้จ่ายคาดการณ์
- งบคงเหลือ
- ค่าใช้จ่ายเฉลี่ยต่อคน
- กราฟวงกลมค่าใช้จ่ายตามหมวดหมู่
- กราฟงบประมาณเทียบค่าใช้จ่าย
- แสดงอัตราแลกเปลี่ยน
- มีปุ่ม “คู่มือทริป” สำหรับเปิดหน้า Trip Guide โดยไม่เพิ่มความแออัดใน Bottom Navigation
- Desktop ยังแสดงภาพ Hero สะพานมังกร
- Mobile ซ่อน Hero เพื่อให้เห็นข้อมูลสำคัญทันที

### Expenses

- เพิ่ม แก้ไข และลบรายการ
- มี Confirmation Dialog ก่อนลบ
- ค้นหาจากรายการ หมายเหตุ และชื่อผู้จ่าย
- กรองตามหมวดหมู่ สถานะ และผู้จ่าย
- เรียงตามวันที่ จำนวนเงิน หมวดหมู่ หรือสถานะ
- แสดงจำนวนและยอดรวมของผลลัพธ์ที่กรอง
- มีปุ่มล้างตัวกรอง
- Desktop แสดงเป็นตาราง
- Mobile แสดงเป็น Compact Card
- Mobile แสดงข้อมูลหลักก่อน: รายการ ยอด วันที่ หมวดหมู่ สถานะ
- ผู้จ่าย หมายเหตุ และปุ่มแก้ไข/ลบอยู่ใต้ “ดูรายละเอียด”

### Daily Plan

- เพิ่ม แก้ไข และลบวัน
- กำหนดชื่อวัน กิจกรรม และงบรายวัน
- เชื่อมค่าใช้จ่ายเข้ากับวัน
- แสดงงบ ใช้จริง และยอดเหลือ/เกินงบ
- เมื่อแก้วันที่ของ DayPlan ค่าใช้จ่ายที่เชื่อมอยู่จะเปลี่ยนวันที่ตาม
- เมื่อลบ DayPlan ค่าใช้จ่ายจะไม่ถูกลบ แต่ย้ายไป “ค่าใช้จ่ายนอกแผน”
- Mobile พับรายการค่าใช้จ่ายของแต่ละวันไว้ ลดการเลื่อน

### Trip Guide

- เป็นหน้าแยกจาก Overview เพื่อไม่ให้หน้าแรกยาวเกินไป
- มี Carousel คู่มือทริป 6 หน้า
- เปิดจากปุ่ม “คู่มือทริป” ใน Overview ได้ทั้งโทรศัพท์และคอมพิวเตอร์
- แสดงเป็นรายการใน Sidebar บนคอมพิวเตอร์
- ไม่อยู่ใน Bottom Navigation บนโทรศัพท์ เพื่อรักษา 5 เมนูหลักไม่ให้แน่นหรือตกบรรทัด

### Calculator

- เครื่องคิดเลขทั่วไป
- แปลง THB ↔ VND ตาม Exchange Rate ใน Settings
- หารยอดต่อจำนวนคน
- รองรับคีย์บอร์ด
- รองรับ `%` เช่น `200 + 10% = 220`
- ใช้ parser คณิตศาสตร์ที่จำกัด operator ปลอดภัย ไม่ใช้ `eval()`
- เก็บประวัติสูงสุด 50 รายการใน Local Storage
- เรียกผลลัพธ์เก่ากลับมาใช้ได้
- ลบทีละรายการหรือล้างทั้งหมดได้
- คัดลอกผลลัพธ์ได้
- ส่งผลลัพธ์ไปสร้าง Expense ได้
- ป้องกัน double-tap zoom บนปุ่มเครื่องคิดเลขด้วย `touch-action: manipulation`

### Settings

- แก้ชื่อทริป
- แก้งบประมาณรวม
- แก้วันเริ่มและสิ้นสุด
- แก้อัตราแลกเปลี่ยน
- แก้ชื่อผู้เดินทาง 4 คน
- สำรองข้อมูลเป็น JSON
- กู้คืนข้อมูลจาก JSON พร้อม confirmation
- คืนค่าข้อมูลเริ่มต้น

## 11. Mobile UX ที่ทำไว้

โทรศัพท์คือพื้นผิวหลักของโปรเจกต์ การออกแบบล่าสุดมีรายละเอียดดังนี้:

- Bottom navigation 5 หน้า: Overview, Expenses, Daily Plan, Calculator และ Settings
- Trip Guide เปิดจากปุ่มใน Overview และไม่แย่งพื้นที่เมนูหลัก
- ซ่อน hamburger menu บนโทรศัพท์ เพราะซ้ำกับ bottom navigation
- ปุ่มลอย “+ ค่าใช้จ่าย” ใช้งานได้จากทุกหน้า
- ปุ่มลอยเว้น safe area ของ iPhone
- ฟอร์มค่าใช้จ่ายเป็น Bottom Sheet บนโทรศัพท์
- ช่องสำคัญแสดงก่อน: รายการ, จำนวนเงิน, สกุลเงิน, หมวดหมู่, สถานะ
- วันที่, ผู้จ่าย, แผนรายวัน และหมายเหตุอยู่ใต้ “รายละเอียดเพิ่มเติม”
- เมื่อเพิ่มรายการใหม่ จะใช้สกุลเงินและผู้จ่ายจากรายการล่าสุดเป็นค่าเริ่มต้น
- ช่องจำนวนเงินใช้ `inputmode="decimal"`
- ปุ่มบันทึกของ Bottom Sheet เป็น sticky action
- Summary cards กระชับและซ่อนคำอธิบายรองบนมือถือ
- Expense cards ใช้ progressive disclosure
- Daily Plan ใช้ expand/collapse สำหรับรายการย่อย
- ปุ่มสำคัญมี touch target อย่างน้อยประมาณ 44px
- รองรับ focus state และ keyboard navigation พื้นฐาน
- ใช้ฟอนต์ Noto Sans Thai จาก Google Fonts
- ใช้ `touch-action: manipulation` ในบริเวณที่แตะเร็ว

## 12. Trip Guide Carousel

คู่มือทริป 6 หน้าอยู่ในหน้า Trip Guide แยกต่างหาก เปิดจากปุ่มใน Overview หรือ Sidebar บนคอมพิวเตอร์

ความสามารถ:

- เลื่อนอัตโนมัติทุก 6.5 วินาที
- ปัดซ้าย–ขวาบนมือถือด้วย CSS scroll snap
- ปุ่มก่อนหน้า/ถัดไป
- จุดบอกตำแหน่งและตัวเลข `1 / 6`
- หยุดอัตโนมัติขณะ pointer down, hover หรือ focus
- เริ่มใหม่หลัง interaction จบ
- ใช้ `prefers-reduced-motion` เพื่อไม่ autoplay สำหรับผู้ใช้ที่ลด motion
- รูปแรกโหลดทันที รูปถัดไปใช้ lazy loading
- มีลิงก์ “เปิดภาพเต็ม” เปิด JPEG โดยตรงเพื่ออ่านหรือซูม
- การเลื่อนด้วย JavaScript ใช้ `track.scrollTo()` เพื่อไม่ให้ autoplay เลื่อนหน้าเว็บในแนวตั้ง

ไฟล์ต้นฉบับอยู่นอกโปรเจกต์ที่:

```text
/Users/non/Desktop/Travel/Plan/ilovepdf_pages-to-jpg/
```

ต้นฉบับรวมประมาณ 22 MB ถูกทำสำเนาและลดความกว้างเป็น 2048px คุณภาพ JPEG 84 สำหรับเว็บ เหลือรวมประมาณ 5 MB ไฟล์ต้นฉบับไม่ถูกแก้ไข

## 13. Form และ Modal

Desktop ใช้ modal กลางหน้าจอ

Mobile expense form ใช้ Bottom Sheet:

- ชิดขอบล่าง
- สูงไม่เกินประมาณ 92dvh
- header และ actions เป็น sticky
- รองรับ safe area
- ช่องรองอยู่ใน `<details>`

ฟอร์มแก้ไข Expense เปิด “รายละเอียดเพิ่มเติม” ไว้โดยอัตโนมัติ ส่วนฟอร์มเพิ่มใหม่พับไว้ก่อน

ข้อจำกัดที่ยังมี: ยังไม่มีระบบตรวจจับ dirty form เพื่อเตือนก่อนปิด และยังไม่มี swipe-down-to-close เนื่องจากตั้งใจไม่เพิ่ม interaction ซับซ้อนโดยไม่จำเป็น

## 14. Search, Filter และ Sort

ตรรกะอยู่ใน `src/expense-list.ts` ผ่าน `selectExpenses()`

ค้นหาแบบ case-insensitive จาก:

- ชื่อรายการ
- หมายเหตุ
- ชื่อผู้จ่าย

ตัวกรองทำงานร่วมกันแบบ AND

การเรียงจำนวนเงินแปลงทุกสกุลเป็น THB ก่อน จึงเปรียบเทียบ THB กับ VND ได้ถูกต้อง

ช่องค้นหาอัปเดตเฉพาะ `#expenseResults` ไม่ render ทั้งหน้า เพื่อไม่ให้ input เสีย focus ระหว่างพิมพ์

## 15. Backup และ Recovery

หน้า Settings สามารถดาวน์โหลดข้อมูลเป็นไฟล์:

```text
da-nang-trip-2026-backup.json
```

ไฟล์มี `schemaVersion`, `exportedAt` และ `data`

การ Import:

1. อ่าน JSON
2. ตรวจรูปแบบด้วย `isAppData()`
3. ขอ confirmation
4. แทนที่ข้อมูลปัจจุบัน
5. บันทึก Local และซิงก์ขึ้น Supabase

ควรแนะนำให้ดาวน์โหลด Backup ก่อนการแก้ schema หรือข้อมูลครั้งใหญ่

## 16. WebMCP

ใน `src/main.ts` มีการลงทะเบียน tools เมื่อ browser รองรับ `document.modelContext`:

- `read_trip_summary` — อ่านยอดสรุปทริป
- `add_trip_expense` — เพิ่มค่าใช้จ่าย

หากแก้ data model ต้องตรวจ input schema ของ WebMCP ให้สอดคล้องด้วย

## 17. Testing

ปัจจุบันมี 3 test files รวม 9 tests:

- `src/calculator.test.ts` — parser และการคำนวณ
- `src/cloud.test.ts` — validation/normalization ของข้อมูลกลาง
- `src/expense-list.test.ts` — search, combined filters และ mixed-currency sorting

สถานะล่าสุดก่อนสร้างเอกสารนี้:

- Tests ผ่าน 9/9
- TypeScript ผ่าน
- ESLint ผ่านโดยไม่มี warning
- Vite production build ผ่าน

ผู้ใช้ไม่อนุญาต Browser test จึงไม่มีการทำ visual regression หรือ end-to-end browser verification ในรอบล่าสุด

## 18. Styling และ Visual Direction

แนวทางภาพรวม:

- สว่าง สะอาด อบอุ่น และมีกลิ่นอายทะเลดานัง
- สีหลัก teal
- accent สีส้ม
- สีรองน้ำเงินอ่อนและทราย
- ใช้ card สีขาว เส้นขอบบาง และ shadow เบา
- หลีกเลี่ยง gradient มากเกินไป ยกเว้น overlay ภาพและ visualization ที่จำเป็น
- ไม่ใช้ Emoji ใน UI
- SVG icons มาจาก `src/icons.ts`
- ตัวเลขเงินใช้ `Intl.NumberFormat('th-TH')`
- วันที่ใช้ `Intl.DateTimeFormat('th-TH')`

Design tokens หลักอยู่ใน `:root` ของ `src/styles.css`

## 19. สิ่งที่ถูกถอดออกโดยเจตนา

- หน้า Split Summary
- หน้า Transportation Comparison

เหตุผล: ผู้ใช้ต้องการระบบขนาดเล็ก เน้นเจ้าของเป็นผู้ใช้งานหลัก และเห็นว่าสองหน้านี้ยังไม่จำเป็น

อย่านำกลับมาโดยอัตโนมัติ เว้นแต่ผู้ใช้ร้องขอ

ใน `src/data.ts` ยังมี `transportOptions` ที่ไม่ได้ใช้จากเวอร์ชันเก่า สามารถปล่อยไว้เพื่อรักษาประวัติหรือค่อยลบใน cleanup ที่ได้รับอนุญาต แต่ไม่ควรสร้างหน้า Transportation กลับมาเพียงเพราะข้อมูลนี้ยังอยู่

## 20. Known Limitations และความเสี่ยง

1. ไม่มี Authentication — ใครที่เข้าถึง endpoint/slug อาจแก้ข้อมูลได้
2. Last-write-wins — การแก้พร้อมกันจากหลายอุปกรณ์อาจเขียนทับกัน
3. AppData เก็บเป็น JSON document เดียว — เรียบง่ายแต่ไม่เหมาะกับข้อมูลขนาดใหญ่มาก
4. Calculator history ไม่ซิงก์ข้ามอุปกรณ์
5. Exchange rate เป็นค่าที่ผู้ใช้กรอกเอง ไม่ดึง live rate
6. Trip guide JPEG รวมประมาณ 5 MB แม้ optimize แล้ว อาจใช้เวลาโหลดบนเน็ตช้า แต่ lazy load ช่วยลด initial load
7. ยังไม่มี service worker หรือ offline-first PWA
8. ยังไม่มี installable app manifest
9. ยังไม่มี dirty-form warning
10. ยังไม่มี automated browser/E2E test ตามข้อกำหนดผู้ใช้

## 21. แนวทางพัฒนาต่อ

สถานะปัจจุบันถือว่า Feature-complete สำหรับการใช้งานในครอบครัว ไม่ควรเพิ่มระบบใหญ่โดยไม่มีปัญหาจากการใช้งานจริง

หากผู้ใช้กลับมาพร้อม feedback ให้แก้เฉพาะจุดตามลำดับ:

1. Bug ที่ทำให้บันทึกหรือซิงก์ข้อมูลผิด
2. ปัญหาการใช้งานบนโทรศัพท์ เช่น ปุ่มกดยาก ข้อความล้น หรือ keyboard บังช่อง
3. ลดขั้นตอนการเพิ่ม Expense
4. ปรับข้อมูลที่ควรเห็นใน Overview/Daily Plan
5. Performance ของภาพหรือ Supabase

สิ่งที่อาจพิจารณาในอนาคตเมื่อผู้ใช้ร้องขอเท่านั้น:

- PWA installable + offline queue
- Supabase Auth แบบ magic link
- Conflict handling ที่ละเอียดขึ้น
- อัตราแลกเปลี่ยนอัตโนมัติ
- Export PDF/Excel
- Share link แบบ read-only จริง
- เตือน dirty form ก่อนปิด

## 22. ขั้นตอนมาตรฐานก่อนส่งงานรอบถัดไป

1. อ่าน `Codex.md` นี้
2. ตรวจ `git status --short`
3. ตรวจไฟล์เฉพาะส่วนที่จะเปลี่ยน ไม่ต้อง scan ทั้งโปรเจกต์โดยไม่จำเป็น
4. ใช้ `apply_patch` แก้ Source Code
5. รักษาการเปลี่ยนแปลงเดิมของผู้ใช้และอย่าลบไฟล์โดยไม่จำเป็น
6. รัน:

```bash
npm test
npm run lint
npm run build
```

7. ห้ามเปิด Browser test ตามข้อกำหนดปัจจุบัน
8. ตรวจ `git diff --check`
9. Commit source และ `dist/` ที่ build ล่าสุด
10. เผยแพร่ Production ผ่าน Vercel project `da-nang-trip-2026`
11. รอ deployment status จนเป็น `READY`
12. ส่ง `https://da-nang-trip-2026.vercel.app` ให้ผู้ใช้พร้อมสรุปสั้น ๆ

## 23. แนวทางเผยแพร่ผ่าน Sites

โปรเจกต์นี้เป็น existing Sites project แบบ static output

ภาพรวมขั้นตอน:

1. ใช้ Sites building/hosting skill ที่ติดตั้งอยู่
2. เรียก `configure-execution-profile.mjs`
3. ใช้ project ID จาก `.openai/hosting.json`
4. ตรวจ build สำเร็จและ `dist/index.html` มีอยู่
5. Commit source state ที่ตรงกับ build
6. ขอ source repository write credential สำหรับ Site เดิม
7. Push commit ไป remote/branch ที่ credential ระบุ โดยใช้ per-command authorization header ห้ามบันทึก token ลง Git config หรือ remote URL
8. ใช้ `package-site.mjs` สร้าง archive จากโปรเจกต์
9. เรียก Sites `save_site_version` ด้วย full commit SHA และ archive
10. Site เป็น Public อยู่แล้ว จึงใช้ `deploy_site_version` และรักษา audience เดิม
11. Poll `get_deployment_status` จนสำเร็จหรือ failed
12. ไม่ต้องเปิด URL ผ่าน Browser เพื่อจบ deployment

อย่าใส่ credential หรือ token ชั่วคราวลงเอกสาร Source Code หรือข้อความตอบผู้ใช้

## 24. Git History ที่สำคัญ

ลำดับพัฒนาหลักล่าสุด:

```text
61adb28 feat: refine standalone Trip Guide renderer
1ec6d13 feat: move Trip Guide to a separate navigation view and add Codex.md
29e977b Add trip guide carousel
5277933 Optimize primary mobile trip flows
2cbb6b8 Add compact mobile expense cards
2e4838e Prevent calculator double tap zoom
310f4c8 Polish mobile expense experience
394037f Improve expense filtering and mobile layout
c650fee Make daily plans editable and link expenses
c941647 Add shared Supabase trip sync
996490b Remove split and transport views
5093d6f Enhance calculator with modes and history
d24412f Add calculator with local history
d6fd6b0 Expand site into Da Nang trip planner
7abd736 Build trip budget comparison site
```

เอกสารถูกสร้างครั้งแรกหลัง commit `29e977b` และปรับให้ตรงกับโครงสร้าง Trip Guide แบบหน้าแยกในวันที่ 14 กันยายน 2026

## 25. สรุปสั้นสำหรับ Codex รอบถัดไป

นี่คือ Vite + TypeScript static SPA สำหรับวางแผนงบทริปดานัง 4 คน ข้อมูลหลักซิงก์ผ่าน Supabase JSON document และสำรอง Local Storage หน้าใช้งานคือ Overview, Expenses, Daily Plan, Trip Guide, Calculator และ Settings ระบบเน้น Mobile-first มี floating add button, expense bottom sheet, compact cards, collapsible daily details และ carousel คู่มือ 6 ภาพ หน้า Trip Guide แยกจาก Overview แต่ไม่อยู่ใน Bottom Navigation บนโทรศัพท์ โดยเปิดจากปุ่มใน Overview แทน เว็บไซต์ Public และเผยแพร่หลักผ่าน Vercel ที่ `https://da-nang-trip-2026.vercel.app`; OpenAI Sites URL เดิมยังคงอยู่เป็นสำรอง ผู้ใช้ไม่ต้องการ Login และห้ามเปิด Browser ทดสอบ ให้ใช้ TypeScript และ production build แทน อย่าเพิ่มระบบใหม่โดยไม่มีคำขอหรือ feedback จากการใช้งานจริง

## 26. การแก้สถานะงานค้างวันที่ 14 กันยายน 2026

- ตรวจพบว่ามีการย้าย Trip Guide ออกจาก Overview ไปเป็นหน้าแยกไว้แล้วใน commit `1ec6d13` และปรับ renderer ต่อใน `61adb28`
- แก้ปัญหา Bottom Navigation ซึ่งเดิมมี 6 รายการแต่ CSS รองรับเพียง 5 คอลัมน์
- คง Trip Guide เป็นหน้าแยกและอยู่ใน Sidebar บน Desktop
- Mobile Bottom Navigation กลับมาเหลือ 5 เมนูหลัก
- เพิ่มปุ่ม “คู่มือทริป” ใน Overview เป็นทางเข้า Trip Guide บนโทรศัพท์
- อัปเดตหัวข้อ Overview, Mobile UX, Trip Guide, Git History และสรุปส่งต่องานในเอกสารนี้ให้ตรงกับ Source Code
- ข้อความส่วนนี้เป็นประวัติของรอบเดิม; ขั้นตอนเผยแพร่ปัจจุบันให้ยึดหัวข้อ 27 และใช้ Vercel เป็น Production หลัก

## 27. การย้าย Production Hosting ไป Vercel วันที่ 21 กันยายน 2026

- Production หลักย้ายไป Vercel project `da-nang-trip-2026` ภายใต้ทีม `nonluongs-projects`
- Production URL หลัก: `https://da-nang-trip-2026.vercel.app`
- ใช้ `vercel.json` ระบุ Vite build, output `dist` และ cache policy สำหรับ HTML/hashed assets
- `.vercel/` และ environment files เป็นข้อมูลเฉพาะเครื่องและต้องไม่ commit
- Supabase project, schema, publishable key และข้อมูลกลางไม่เปลี่ยน การเปิดจาก Vercel จึงใช้ข้อมูลเดียวกับเว็บไซต์เดิม
- OpenAI Sites URL เดิมยังออนไลน์เป็น fallback; ห้ามลบหรือปิดจนกว่าผู้ใช้จะสั่ง
- ขั้นตอนเผยแพร่รอบถัดไป: `npm run build`, `vercel pull --yes --environment production`, `vercel build --yes --target production`, แล้ว `vercel deploy --prebuilt --prod --yes`
- หลัง Deploy ต้องตรวจสถานะจาก CLI ว่า `READY`; ไม่ต้องเปิด Browser ทดสอบตามข้อกำหนดของผู้ใช้
