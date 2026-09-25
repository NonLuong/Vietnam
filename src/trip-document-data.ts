export type TripDocumentCategory = 'flight' | 'banahills' | 'hotel' | 'insurance' | 'prearrival'

export type TripDocument = {
  id: string
  category: TripDocumentCategory
  title: string
  description: string
  owners: string[]
  groupName?: string
  version: number
}

export const tripDocumentCategories: {id: TripDocumentCategory; label: string; description: string; icon: string}[] = [
  {id:'flight',label:'เที่ยวบิน',description:'รายละเอียดเที่ยวบิน ที่นั่ง และสัมภาระ',icon:'plane'},
  {id:'banahills',label:'บานาฮิลส์',description:'บัตรและรายละเอียดการจองแยกตามโปรโมชั่น',icon:'ticket'},
  {id:'hotel',label:'ที่พัก',description:'ใบยืนยันการจองแยกตามโรงแรม',icon:'hotel'},
  {id:'insurance',label:'ประกันการเดินทาง',description:'กรมธรรม์และความคุ้มครองของแต่ละคน',icon:'shield'},
  {id:'prearrival',label:'เอกสารก่อนเดินทาง',description:'เอกสารที่เตรียมไว้ใช้ก่อนออกเดินทาง',icon:'file'}
]

export const tripDocuments: TripDocument[] = [
  {id:'airasia-booking',category:'flight',title:'AirAsia ขาไป–กลับ',description:'เที่ยวบิน FD636 และ FD639 · รวมข้อมูลที่นั่ง',owners:['ทุกคน'],version:1},
  {id:'banahills-nont-mameow',category:'banahills',title:'บัตรบานาฮิลส์ · นนท์และมะเหมี่ยว',description:'เอกสารการจองโปรโมชั่นชุดที่ 1',owners:['นนท์','มะเหมี่ยว'],version:1},
  {id:'banahills-parents',category:'banahills',title:'บัตรบานาฮิลส์ · พ่อและแม่',description:'เอกสารการจองโปรโมชั่นชุดที่ 2',owners:['พ่อ','แม่'],version:1},
  {id:'hotel-menora-family',category:'hotel',groupName:'Menora Premium Da Nang',title:'ห้อง Family',description:'26–28 ก.ย. · เลขการจองลงท้าย 4223',owners:['ทุกคน'],version:1},
  {id:'hotel-menora-deluxe',category:'hotel',groupName:'Menora Premium Da Nang',title:'ห้อง Deluxe',description:'26–28 ก.ย. · เลขการจองลงท้าย 4227',owners:['ทุกคน'],version:1},
  {id:'insurance-nont',category:'insurance',title:'ประกันการเดินทาง · นนท์',description:'กรมธรรม์และรายละเอียดความคุ้มครอง',owners:['นนท์'],version:1},
  {id:'insurance-mameow',category:'insurance',title:'ประกันการเดินทาง · มะเหมี่ยว',description:'กรมธรรม์และรายละเอียดความคุ้มครอง',owners:['มะเหมี่ยว'],version:1},
  {id:'insurance-father',category:'insurance',title:'ประกันการเดินทาง · พ่อ',description:'กรมธรรม์และรายละเอียดความคุ้มครอง',owners:['พ่อ'],version:1},
  {id:'insurance-mother',category:'insurance',title:'ประกันการเดินทาง · แม่',description:'กรมธรรม์และรายละเอียดความคุ้มครอง',owners:['แม่'],version:1},
  {id:'prearrival-mm',category:'prearrival',title:'เอกสารก่อนเดินทาง · นนท์และมะเหมี่ยว',description:'เอกสารที่เตรียมไว้ก่อนออกเดินทาง',owners:['นนท์','มะเหมี่ยว'],version:1},
  {id:'prearrival-parents',category:'prearrival',title:'เอกสารก่อนเดินทาง · พ่อและแม่',description:'เอกสารที่เตรียมไว้ก่อนออกเดินทาง',owners:['พ่อ','แม่'],version:1}
]
