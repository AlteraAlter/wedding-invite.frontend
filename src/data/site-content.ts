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
  brideNameGenitive: string;
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
  mapPreviewUrl: string;
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
  eyebrow: "Қыз ұзату",
  title: "Зарина",
  subtitle: "",
  brideName: "Зарина",
  brideNameGenitive: "",
  groomName: "",
  familyName: "",
  parents: "Армат & Асем",
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
  mapPreviewUrl:
    "https://static-maps.yandex.ru/1.x/?ll=51.180034,51.306599&z=16&l=map&size=650,350&pt=51.180034,51.306599,pm2rdm",
  intro:
    "Құрметті Ағайын-туыс, Бауырлар, Құда-жекжат, Нағашы-жиен, Бөлелер, Дос-жаран, Әріптестер, Көршілер!",
  details: "Сіздерді аяулы қызымыздың",
  quote: "",
  invitationText: "ұзату тойына арналған ақ дастарханымыздың қадірлі қонағы болуға шақырамыз.",
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
