type ProgramItem = {
  time: string;
  title: string;
};

type HostItem = {
  label: string;
  value: string;
};

type StoryCard = {
  title: string;
  text: string;
};

type SiteContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  brideName: string;
  groomName: string;
  familyName: string;
  parents: string;
  dateLabel: string;
  dateValue: string;
  dateDay: string;
  dateYear: string;
  dateIso: string;
  monthLabel: string;
  timeLabel: string;
  timeValue: string;
  venueLabel: string;
  venueValue: string;
  addressLabel: string;
  addressValue: string;
  mapUrl: string;
  intro: string;
  details: string;
  quote: string;
  invitationText: string;
  countdownTitle: string;
  storyTitle: string;
  storyCards: StoryCard[];
  program: ProgramItem[];
  hosts: HostItem[];
  mapTitle: string;
  mapText: string;
  mapButton: string;
  rsvpTitle: string;
  rsvpText: string;
  galleryText: string;
  scrollLabel: string;
  musicPlaceholder: string;
  footer: string;
};

export const siteContent: SiteContent = {
  eyebrow: "Салтанатты кешке шақыру",
  title: "Қыз ұзату",
  subtitle: "Қуанышымызға ортақ болып, ақ тілегіңізді арнауға шақырамыз.",
  brideName: "Әсем",
  groomName: "Армат",
  familyName: "",
  parents: "",
  dateLabel: "Күні",
  dateValue: "01.08.2026",
  dateDay: "01",
  dateYear: "2026",
  dateIso: "2026-08-01T19:00:00+05:00",
  monthLabel: "тамыз",
  timeLabel: "Басталуы",
  timeValue: "19:00",
  venueLabel: "Өтетін орны",
  venueValue: "Jaiyq Hall",
  addressLabel: "",
  addressValue: "",
  mapUrl: "https://2gis.kz/uralsk/geo/70000001025184006/51.306599,51.180034,",
  intro: "",
  details: "",
  quote: "",
  invitationText:
    "Құрметті ағайын-туыс, бауырлар, құда-жекжат, дос-жарандар! Сіздерді қыз ұзату салтанатымыздың қадірлі қонағы болуға шын жүректен шақырамыз.",
  countdownTitle: "Салтанат басталуына дейін",
  storyTitle: "",
  storyCards: [],
  program: [{ time: "19:00", title: "Салтанатты кештің басталуы" }],
  hosts: [],
  mapTitle: "Мекен-жайымыз",
  mapText: "2GIS арқылы бірден ашып, маршрут құруға болады.",
  mapButton: "2GIS-та ашу",
  rsvpTitle: "Келетініңізді растаңыз",
  rsvpText: "Форманы толтырып, жауабыңызды алдын ала жіберіңіз.",
  galleryText: "",
  scrollLabel: "",
  musicPlaceholder: "Музыка уақытша қолжетімсіз.",
  footer: "",
};
