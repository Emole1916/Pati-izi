import React, { useState, useEffect, useMemo } from 'react';
import {
  PawPrint,
  Heart,
  ShieldCheck,
  Scale,
  PhoneCall,
  HelpCircle,
  BarChart3,
  FlaskConical,
  Image as ImageIcon,
  BookOpen,
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ExternalLink,
  Sparkles,
  Award,
  RefreshCw,
  Edit3,
  Save,
  Info,
  Compass,
  Users,
  Trees,
  Stethoscope,
  Home,
  Utensils,
  Microscope,
  HeartHandshake,
  Search,
  ChevronRight,
  Share2,
  Check
} from 'lucide-react';

// ============================================================================
// VERİ KATMANI (Bilimsel, Hukuki ve Doğrulanmış Referans İçerikleri)
// ============================================================================

const NAV_ITEMS = [
  { id: 'home', label: 'Ana Sayfa', icon: PawPrint },
  { id: 'knowledge', label: 'Bilgi Merkezi', icon: ShieldCheck },
  { id: 'law', label: 'Mevzuat', icon: Scale },
  { id: 'report', label: 'Bildirim Rehberi', icon: PhoneCall },
  { id: 'volunteer', label: 'Gönüllülük', icon: HeartHandshake },
  { id: 'quiz', label: 'İnteraktif Test', icon: HelpCircle },
  { id: 'survey', label: 'Farkındalık Anketi', icon: BarChart3 },
  { id: 'tubitak', label: 'TÜBİTAK Projesi', icon: FlaskConical },
  { id: 'gallery', label: 'Galeri & Poster', icon: ImageIcon },
  { id: 'references', label: 'Kaynakça', icon: BookOpen }
];

const HOME_VERIFIED_CARDS = [
  {
    badge: 'Uluslararası Refah Standardı',
    title: 'Hayvan Refahının Beş Özgürlüğü',
    description:
      'Dünya Hayvan Sağlığı Örgütü (WOAH) tarafından benimsenen evrensel çerçeveye göre her hayvan; açlık ve susuzluktan, rahatsızlıktan, ağrı-yaralanma-hastalıktan, korku ve stresten uzak olma ile doğal davranışlarını sergileme özgürlüğüne sahiptir.',
    source: 'Kaynak: Dünya Hayvan Sağlığı Örgütü (WOAH) – Terrestrial Animal Health Code',
    url: 'https://www.woah.org/en/what-we-do/animal-health-and-welfare/animal-welfare/'
  },
  {
    badge: 'Tarihsel Evrensel Bildirge',
    title: '1978 Hayvan Hakları Evrensel Bildirgesi',
    description:
      '15 Ekim 1978 tarihinde Paris’te UNESCO binasında ilan edilen bildirgenin 1. maddesi: "Bütün hayvanlar yaşam önünde eşit doğarlar ve aynı var olma hakkına sahiptirler." ilkesini küresel etik temel olarak kabul eder.',
    source: 'Kaynak: UNESCO / Uluslararası Hayvan Hakları Birliği (1978)',
    url: 'https://www.unesco.org'
  },
  {
    badge: 'Ulusal Hukuki Güvence',
    title: '5199 Sayılı Hayvanları Koruma Kanunu',
    description:
      'Türkiye Cumhuriyeti mevzuatında 2021 yılında 7332 sayılı Kanun ile yapılan köklü değişiklikle hayvanlar "mal/eşya" statüsünden çıkarılarak "can" statüsüne alınmış ve kasten öldürme ile işkence fiilleri hapis cezası kapsamına dahil edilmiştir.',
    source: 'Kaynak: T.C. Resmî Gazete – 5199 ve 7332 Sayılı Kanunlar',
    url: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5199&MevzuatTur=1&MevzuatTertip=5'
  },
  {
    badge: 'Ekosistem ve Biyoçeşitlilik',
    title: 'Doğal Yaşam Alanlarının Korunması',
    description:
      'Birleşmiş Milletler Çevre Programı (UNEP) ve IPBES değerlendirmeleri, habitat kaybı ve kirliliğin yaban hayatı popülasyonları üzerindeki en temel tehdit olduğunu; ekosistem sağlığının doğrudan insan ve hayvan sağlığıyla (Tek Sağlık) bağlantılı olduğunu vurgular.',
    source: 'Kaynak: Birleşmiş Milletler Çevre Programı (UNEP) – Biodiversity',
    url: 'https://www.unep.org/topics/biodiversity'
  }
];

const NINE_RIGHTS_DATA = [
  {
    id: 1,
    category: 'Temel Varoluş',
    title: '1. Yaşam Hakkı',
    icon: Heart,
    image:
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80',
    scientificExplanation:
      'Biyolojik ve etik açıdan yaşam hakkı, tüm diğer hakların ön koşuludur. Sinir sistemine sahip omurgalı ve birçok omurgasız canlı, çevresel uyaranları algılar, acı ve haz hisseder (sentience / duyarlılık). Cambridge Bilinç Deklarasyonu (2012), insan dışı hayvanların da bilinçli farkındalık için gerekli nöroanatomik yapılara sahip olduğunu bilimsel olarak ortaya koymuştur.',
    caseStudy:
      'Örnek Durum: Yerleşim yerlerinde "görüntü kirliliği" veya "korku" gerekçesiyle sağlıklı hayvanların yaşam alanlarından uzaklaştırılmaya veya itlaf edilmeye çalışılması, yaşam hakkının doğrudan ihlalidir.',
    solutions: [
      'Yerel yönetimlerin öldürme yerine "Yakala-Kısırlaştır-Aşılat-Yerinde Yaşat" bilimsel yöntemini eksiksiz uygulaması.',
      'Toplumda "türcülük" yerine tüm canlıların yaşam hakkına saygı temelli eğitim programlarının yaygınlaştırılması.',
      '5199 sayılı Kanun kapsamında yaşam hakkına yönelik saldırıların cezasız kalmaması için hukuki takip.'
    ],
    reference: '5199 Sayılı Kanun Madde 4 & Hayvan Hakları Evrensel Bildirgesi Madde 1-2'
  },
  {
    id: 2,
    category: 'Fiziksel Bütünlük',
    title: '2. İşkence ve Kötü Muameleden Korunma',
    icon: ShieldCheck,
    image:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80',
    scientificExplanation:
      'Hayvanlarda ağrı reseptörleri (nosiseptörler) ve stres hormonları (kortizol, adrenalin) insanlarla benzer fizyolojik mekanizmalarla çalışır. Fiziksel şiddet, dövüştürme, eziyet ve psikolojik travma; hayvanlarda kronik korkuya, bağışıklık sisteminin çökmesine ve kalıcı davranış bozukluklarına yol açar.',
    caseStudy:
      'Örnek Durum: Yasa dışı hayvan dövüşleri düzenlenmesi veya savunmasız sokak hayvanlarına kesici/delici aletlerle zarar verilmesi hem ağır bir vicdani suç hem de Türk Ceza Hukuku kapsamında adli suçtur.',
    solutions: [
      'Şiddet olaylarına tanık olunduğunda derhal görüntü/konum kaydı alarak 112 ve HAYDİ uygulamasına bildirimde bulunmak.',
      'Hayvan dövüşü ve bahis organizasyonlarına karşı kolluk kuvvetleriyle iş birliği yapmak.',
      'Okullarda empati ve şiddetsiz iletişim temelli değerler eğitimi vermek.'
    ],
    reference: '5199 Sayılı Kanun Madde 14 & Madde 28/A (Hapis Cezası Hükümleri)'
  },
  {
    id: 3,
    category: 'Temel İhtiyaçlar',
    title: '3. Aç ve Susuz Bırakılmama',
    icon: Utensils,
    image:
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=900&q=80',
    scientificExplanation:
      'Metabolik homeostazın korunması için her canlının türüne uygun enerji, protein, vitamin ve temiz suya düzenli erişimi şarttır. Özellikle yaz aylarında yüksek sıcaklıklar dehidrasyona (sıvı kaybı) ve böbrek yetmezliğine; kış aylarında ise hipotermiye karşı yüksek kalori ihtiyacına yol açar.',
    caseStudy:
      'Örnek Durum: Sıcak yaz günlerinde asfalt ve betonlaşmış kent merkezlerinde su kaynağı bulamayan kuşlar, kediler ve köpeklerin güneş çarpması ve böbrek yetmezliği nedeniyle yaşamını yitirmesi.',
    solutions: [
      'Kapı önlerine, park köşelerine ve gölge alanlara devrilmeyecek kaplarda düzenli temiz su bırakmak.',
      'Besleme yaparken hayvanlara zararlı (baharatlı, şekerli, kemikli/kılçıklı ev artıkları) gıdalar yerine uygun kuru/yaş mama kullanmak.',
      'Besleme noktalarını temiz tutarak çevre sakinleriyle uzlaşı kültürünü geliştirmek.'
    ],
    reference: 'WOAH Hayvan Refahı 1. Özgürlük: Açlık ve Susuzluktan Uzak Olma'
  },
  {
    id: 4,
    category: 'Yaşam Koşulları',
    title: '4. Barınma ve Uygun Yaşam Koşulları',
    icon: Home,
    image:
      'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=900&q=80',
    scientificExplanation:
      'Hayvanların ekstrem hava koşullarından (don, aşırı sıcak, yağış) korunabilecekleri yalıtımlı alanlara ihtiyaçları vardır. Ayrıca evcil hayvanların sürekli kısa zincirle bağlanması veya dar kafeslerde tutulması, kas-iskelet sistemi deformasyonlarına ve stereotipik stres davranışlarına neden olur.',
    caseStudy:
      'Örnek Durum: Kışın dondurucu soğukta açık alanda korunaksız bırakılan veya yazın kapalı, havasız araç içinde bırakılan hayvanların kısa sürede hayati tehlike yaşaması.',
    solutions: [
      'Soğuk havalarda geri dönüştürülmüş malzemelerle su geçirmez, strafor yalıtımlı kedi/köpek kulübeleri hazırlamak.',
      'Evcil hayvanların 5199 sayılı Kanun gereği hareket özgürlüğünü kısıtlayacak şekilde sürekli bağlı tutulmasını önlemek.',
      'Belediyelerin belirlediği alanlarda güvenli beslenme ve barınma odakları oluşturulmasını desteklemek.'
    ],
    reference: '5199 Sayılı Kanun Madde 5 (Hayvan Sahiplerinin Sorumlulukları)'
  },
  {
    id: 5,
    category: 'Sağlık & Refah',
    title: '5. Sağlık ve Veteriner Hizmetlerine Erişim',
    icon: Stethoscope,
    image:
      'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=900&q=80',
    scientificExplanation:
      'Hastalık ve yaralanma durumlarında tıbbi müdahaleye erişim hem hayvanın acısını dindirir hem de zoonotik (hayvanlardan insanlara veya insanlardan hayvanlara geçebilen) hastalıkların kontrolünü sağlar. Kuduz, iç-dış parazit ve viral enfeksiyonlara karşı aşılama "Tek Sağlık" (One Health) yaklaşımının temelidir.',
    caseStudy:
      'Örnek Durum: Trafik kazası geçiren bir sokak hayvanının zamanında veteriner müdahalesi alamaması sonucu iç kanama veya enfeksiyon nedeniyle hayatını kaybetmesi.',
    solutions: [
      'Yaralı veya hasta hayvan görüldüğünde belediye veteriner işleri müdürlüklerine veya en yakın veteriner kliniğine ulaştırmak.',
      'Evcil ve sahipsiz hayvanların düzenli aşı ve parazit kontrollerinin yapılmasını teşvik etmek.',
      'Belediye bakımevlerinin veteriner hekim kadrosu ve tıbbi ekipman kapasitesinin artırılmasını talep etmek.'
    ],
    reference: 'WOAH Tek Sağlık (One Health) & 5199 Sayılı Kanun Madde 6'
  },
  {
    id: 6,
    category: 'Ekosistem',
    title: '6. Doğal Yaşam Alanlarının Korunması',
    icon: Trees,
    image:
      'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=900&q=80',
    scientificExplanation:
      'Ormanlar, sulak alanlar, bozkırlar ve denizler milyonlarca yaban hayvanının evidir. Plansız kentleşme, orman yangınları, tarım ilaçları (pestisitler), plastik kirliliği ve kaçak avcılık besin zincirini parçalayarak türlerin neslinin tükenmesine yol açar.',
    caseStudy:
      'Örnek Durum: Denizlere ve akarsulara karışan plastik atıkların deniz kaplumbağaları ve su kuşları tarafından besin sanılarak yutulması ve ölümcül sindirim tıkanıklıklarına yol açması.',
    solutions: [
      'Tek kullanımlık plastik tüketimini azaltmak ve doğaya çöp bırakmamak.',
      'Kaçak avcılık ve yaban hayvanı ticareti durumlarını Doğa Koruma ve Milli Parklar Genel Müdürlüğüne (DKMP) bildirmek.',
      'Ağaçlandırma ve sulak alan koruma projelerine gönüllü katılım sağlamak.'
    ],
    reference: 'UNEP Biyoçeşitlilik Sözleşmesi & Bern Sözleşmesi'
  },
  {
    id: 7,
    category: 'Bilim Etiği',
    title: '7. Deney Hayvanlarının Korunması (3R İlkesi)',
    icon: Microscope,
    image:
      'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=80',
    scientificExplanation:
      'Modern bilim etiğinde hayvan deneyleri sıkı etik kurul denetimine tabidir. Russell ve Burch (1959) tarafından geliştirilen "3R İlkesi" zorunludur: Replacement (Yerine Koyma - bilgisayar simülasyonları, hücre kültürleri kullanma), Reduction (Azaltma - en az sayıda hayvan kullanma), Refinement (İyileştirme - ağrı ve stresi en aza indirme).',
    caseStudy:
      'Örnek Durum: Kozmetik ürün testlerinde hayvan deneylerinin Avrupa Birliği ve Türkiye mevzuatında yasaklanması ve yerini in-vitro (laboratuvar ortamı) alternatif test yöntemlerine bırakması.',
    solutions: [
      'Kozmetik ve temizlik ürünlerinde "Cruelty-Free" (Hayvanlar üzerinde test edilmemiştir) sertifikalı ürünleri tercih etmek.',
      'Bilimsel araştırmalarda yapay zeka modellemeleri ve organ-on-a-chip teknolojilerinin kullanımını desteklemek.',
      'HADYEK (Hayvan Deneyleri Yerel Etik Kurulları) denetim standartlarının şeffaflığını savunmak.'
    ],
    reference: '5199 Sayılı Kanun Madde 9 & Deneysel ve Diğer Bilimsel Amaçlar İçin Kullanılan Hayvanların Refah ve Korunmasına Dair Yönetmelik'
  },
  {
    id: 8,
    category: 'Toplumsal Yaşam',
    title: '8. Sokak Hayvanlarının Hakları',
    icon: PawPrint,
    image:
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80',
    scientificExplanation:
      'Şehir ekosisteminin bir parçası olan sahipsiz kedi ve köpekler, yüzyıllar boyunca insanlarla birlikte evrimleşmiş ve kent yaşamına adapte olmuş canlılardır. Popülasyon kontrolünde bilimsel olarak kanıtlanmış tek insancıl yöntem, eş zamanlı ve yaygın kısırlaştırma ile aşılama programlarıdır.',
    caseStudy:
      'Örnek Durum: Kısırlaştırılmadan başka bir ilçenin kırsalına veya ormanlık alana bırakılan hayvanların hem açlıktan ölmesi hem de üremeye devam ederek sorunu büyütmesi.',
    solutions: [
      'Yerel yönetimlerin kısırlaştırma ve rehabilitasyon merkezlerinin kapasitesini ve şeffaflığını takip etmek.',
      'Mahalle sakinleri ve belediye iş birliğiyle küpeli (kısırlaştırılmış ve aşılı) hayvanların yaşam alanlarında korunmasını sağlamak.',
      'Hayvan davranışları ve beden dili konusunda toplumsal farkındalık eğitimleri düzenlemek.'
    ],
    reference: '5199 Sayılı Kanun Madde 6 & Hayvanların Korunmasına Dair Uygulama Yönetmeliği'
  },
  {
    id: 9,
    category: 'Sorumluluk Bilinci',
    title: '9. Hayvanların Terk Edilmesinin Sonuçları',
    icon: AlertTriangle,
    image:
      'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=900&q=80',
    scientificExplanation:
      'Ev ortamında büyüyen bir hayvan, avlanma, trafik tehlikesinden kaçınma ve hastalıklarla mücadele gibi sokak becerilerine sahip değildir. Sokağa veya ormana terk edilen evcil hayvanların büyük çoğunluğu ilk haftalarda trafik kazası, açlık, hipotermi veya yoğun ayrılık anksiyetesi nedeniyle yaşamını yitirir.',
    caseStudy:
      'Örnek Durum: Yazlık bölgelerde tatil süresince bakılıp sezon sonunda sokağa bırakılan kedi ve köpeklerin kış aylarında besin ve barınak bulamayarak dramatik biçimde zarar görmesi.',
    solutions: [
      'Hayvan sahiplenmeden önce 10-15 yıllık ömür boyu bakım, sağlık ve zaman sorumluluğunu gerçekçi biçimde değerlendirmek.',
      'Evcil hayvanlara mikroçip taktırarak dijital kimliklendirme sistemine (PETVET) kayıt yaptırmak.',
      'Bakım imkânı ortadan kalktığında hayvanı sokağa bırakmak yerine güvenilir yeni bir yuva bulmak veya ilgili kurumlara başvurmak.'
    ],
    reference: '5199 Sayılı Kanun Madde 5 ve Madde 28 (Terk Etme Fiiline İdari Para Cezası)'
  }
];

const LEGAL_SECTIONS = [
  {
    title: '5199 Sayılı Hayvanları Koruma Kanunu ve 7332 Sayılı Reform',
    badge: 'Temel Mevzuat',
    summary:
      '24 Haziran 2004 tarihinde kabul edilen 5199 sayılı Hayvanları Koruma Kanunu, Türkiye’de hayvan haklarının anayasası niteliğindedir. 9 Temmuz 2021 tarihinde kabul edilen 7332 sayılı Kanun ile tarihi değişiklikler yapılmıştır.',
    points: [
      '"Mal" Statüsünden "Can" Statüsüne Geçiş: Hayvanlar artık Türk Ceza Kanunu kapsamında eşya/mal olarak değil, hisseden canlı varlıklar olarak değerlendirilmektedir.',
      'Dijital Kimliklendirme (Mikroçip): Ev hayvanlarının deri altına mikroçip uygulanarak Tarım ve Orman Bakanlığı PETVET sistemine kaydedilmesi zorunlu hale getirilmiştir.',
      'Petshop Düzenlemesi: Kedi ve köpeklerin petshoplarda kafeslerde sergilenerek satılması yasaklanmış, yalnızca katalog/dijital ortam üzerinden yetkili üretim yerlerinden veya bakımevlerinden sahiplendirme esası getirilmiştir.'
    ]
  },
  {
    title: 'Hayvanlara Kötü Muamele ve Adli Yaptırımlar (Madde 28/A)',
    badge: 'Ceza Hukuku',
    summary:
      '7332 sayılı Kanun düzenlemesi ile hayvanlara yönelik ağır fiiller "kabahat" kapsamından çıkarılarak "suç" kapsamına alınmış ve hapis cezası yaptırımı getirilmiştir.',
    points: [
      'Nesli yok olma tehlikesi altında olan bir hayvanı öldüren kişiye 1 yıldan 5 yıla kadar hapis cezası verilir.',
      'Bir hayvan neslini yok eden kişiye 5 yıldan 10 yıla kadar hapis cezası uygulanır.',
      'Ev hayvanını veya evcil hayvanı kasten öldüren kişi 6 aydan 4 yıla kadar hapis cezası ile cezalandırılır.',
      'Hayvanlara cinsel saldırıda bulunan veya tecavüz eden kişi 6 aydan 3 yıla kadar hapis ve adli para cezası alır.',
      'Hayvanlara işkence eden veya acımasız ve zalimce muamelede bulunan kişi 6 aydan 3 yıla kadar hapis cezası ile yargılanır.',
      'Hayvanları dövüştüren kişilere 3 aydan 2 yıla kadar hapis veya adli para cezası verilir.'
    ]
  },
  {
    title: 'Yerel Yönetimlerin (Belediyelerin) Yasal Sorumlulukları',
    badge: 'Kamu Hizmeti',
    summary:
      '5199 sayılı Kanun ve ilgili Uygulama Yönetmeliği uyarınca Büyükşehir Belediyeleri ile il ve ilçe belediyeleri sahipsiz hayvanların korunması ve rehabilitasyonundan doğrudan sorumludur.',
    points: [
      'Hayvan Bakımevi Kurma Zorunluluğu: Belediyeler, sahipsiz veya güçten düşmüş hayvanların bakımı, tedavisi ve rehabilitasyonu için standartlara uygun geçici hayvan bakımevleri kurmak ve işletmekle yükümlüdür.',
      'Kısırlaştırma ve Aşılama: Sahipsiz hayvanların kontrolsüz üremesini önlemek amacıyla bilimsel yöntemlerle kısırlaştırılması, kuduz başta olmak üzere aşılanması ve işaretlenmesi (kulak küpesi/mikroçip) belediyelerin asli görevidir.',
      'Gönüllü İş Birliği ve Eğitim: Belediyeler, yerel hayvan koruma görevlileri ve sivil toplum kuruluşlarıyla iş birliği yaparak toplumda sahiplendirme ve farkındalık çalışmaları yürütür.'
    ]
  },
  {
    title: 'Tarım ve Orman Bakanlığı & DKMP Çalışmaları',
    badge: 'Bakanlık Denetimi',
    summary:
      'T.C. Tarım ve Orman Bakanlığı bünyesindeki Doğa Koruma ve Milli Parklar Genel Müdürlüğü (DKMP), yaban hayatının korunması, bakımevlerinin denetimi ve idari yaptırımların uygulanmasından sorumludur.',
    points: [
      'Yaban Hayatı Kurtarma ve Rehabilitasyon Merkezleri: Doğada yaralı bulunan yaban hayvanlarının tedavisi ve tekrar doğaya kazandırılması DKMP merkezlerinde gerçekleştirilir.',
      'Bakımevi ve Üretim Yeri Denetimi: Hayvan bakımevleri, deney hayvanı üniteleri ve ev hayvanı satış yerleri Bakanlık müfettişlerince düzenli denetlenir.',
      'Cezai Yaptırım ve El Koyma: Kötü muamele tespit edilen hayvanlara Bakanlık yetkililerince el konulur ve hayvanlar koruma altına alınır.'
    ]
  }
];

const QUIZ_QUESTIONS = [
  {
    question:
      '1. 15 Ekim 1978 tarihinde Paris’te UNESCO binasında ilan edilen Hayvan Hakları Evrensel Bildirgesi’nin 1. maddesi hangi temel ilkeyi vurgular?',
    options: [
      'Sadece evcil hayvanların korunma hakkı vardır.',
      'Bütün hayvanlar yaşam önünde eşit doğarlar ve aynı var olma hakkına sahiptirler.',
      'Hayvanların hakları yalnızca ekonomik değerlerine göre belirlenir.',
      'Yaban hayvanları koruma kapsamının dışındadır.'
    ],
    correctIndex: 1,
    explanation:
      'Hayvan Hakları Evrensel Bildirgesi’nin 1. maddesi açıkça "Bütün hayvanlar yaşam önünde eşit doğarlar ve aynı var olma hakkına sahiptirler" diyerek tür ayrımı gözetmeksizin yaşam hakkını temel alır.'
  },
  {
    question:
      '2. Dünya Hayvan Sağlığı Örgütü (WOAH) tarafından kabul edilen "Hayvan Refahının Beş Özgürlüğü" arasında aşağıdakilerden hangisi yer ALMAZ?',
    options: [
      'Açlık ve susuzluktan uzak olma',
      'Ağrı, yaralanma ve hastalıktan uzak olma',
      'Korku ve stresten uzak olma',
      'Sürekli kapalı ve dar alanlarda izole edilme'
    ],
    correctIndex: 3,
    explanation:
      'Beş Özgürlük; (1) Açlık ve susuzluktan uzak olma, (2) Rahatsızlıktan uzak olma, (3) Ağrı, yaralanma ve hastalıktan uzak olma, (4) Normal davranışlarını sergileme özgürlüğü, (5) Korku ve stresten uzak olmadır. Dar alanlarda izolasyon refah ihlalidir.'
  },
  {
    question:
      '3. Türkiye’de 2021 yılında kabul edilen 7332 sayılı Kanun ile 5199 sayılı Hayvanları Koruma Kanunu’nda yapılan en önemli hukuki statü değişikliği nedir?',
    options: [
      'Hayvanların "mal/eşya" statüsünden çıkarılarak "can" statüsüne alınması',
      'Hayvanlara yönelik suçların tamamen cezadan muaf tutulması',
      'Belediyelerin bakımevi kurma zorunluluğunun kaldırılması',
      'Mikroçip uygulamasının tamamen yasaklanması'
    ],
    correctIndex: 0,
    explanation:
      '7332 sayılı Kanun ile hayvanlar Türk hukukunda "mal" kapsamından çıkarılarak "can" statüsüne alınmış, kasten öldürme, işkence ve cinsel saldırı gibi fiillere hapis cezası getirilmiştir.'
  },
  {
    question:
      '4. Bilimsel araştırmalarda deney hayvanlarının korunması amacıyla uygulanan etik "3R İlkesi" hangi üç kavramı ifade eder?',
    options: [
      'Read, Run, Rest (Oku, Koş, Dinlen)',
      'Replacement (Yerine Koyma), Reduction (Azaltma), Refinement (İyileştirme)',
      'Remove, Repeat, Recycle (Kaldır, Tekrarla, Dönüştür)',
      'Rescue, Release, Return (Kurtar, Sal, Geri Dön)'
    ],
    correctIndex: 1,
    explanation:
      '3R İlkesi; hayvan yerine alternatif yöntemler kullanmayı (Replacement), zorunlu hallerde en az sayıda hayvan kullanmayı (Reduction) ve ağrı/stresi en aza indirmeyi (Refinement) zorunlu kılar.'
  },
  {
    question:
      '5. Trafik kazası geçirmiş veya ağır yaralı bir sokak hayvanıyla karşılaştığınızda ilk olarak hangi adım atılmalıdır?',
    options: [
      'Hayvana zorla su ve yemek vermeye çalışmak',
      'Hiçbir önlem almadan doğrudan çıplak elle boynundan tutup kaldırmak',
      'Kendi güvenliğinizi ve hayvanın trafiğe karşı güvenliğini sağlayıp 112 / Belediye Veteriner İşleri (ALO 153) birimlerine konum bildirmek',
      'Hayvanı olay yerinden uzaklaştırıp ıssız bir ormana bırakmak'
    ],
    correctIndex: 2,
    explanation:
      'Yaralı bir hayvan acı ve korku nedeniyle savunma refleksi gösterebilir ve iç kanaması olabilir. Önce trafik güvenliği sağlanmalı, mümkünse dikkatlice kutu/battaniye ile sabitlenmeli ve profesyonel veteriner müdahalesi için yetkili birimlere haber verilmelidir.'
  },
  {
    question:
      '6. Ev ortamında büyümüş bir evcil hayvanın sokağa veya ormanlık alana terk edilmesinin en temel bilimsel sonucu nedir?',
    options: [
      'Doğal içgüdüleriyle hemen vahşi yaşama uyum sağlar ve uzun yıllar yaşar.',
      'Avlanma, trafik ve hastalıklarla mücadele becerileri gelişmediği için açlık, kaza ve travma nedeniyle yüksek ölüm riskiyle karşılaşır.',
      'Diğer hayvanlara liderlik ederek ekosistemi güçlendirir.',
      'Hiçbir fiziksel veya psikolojik stres yaşamaz.'
    ],
    correctIndex: 1,
    explanation:
      'Evcil hayvanlar insan bakımına bağımlı yetişir. Sokağa terk edildiklerinde besin bulamama, trafik kazaları, hipotermi ve yoğun terk edilme stresi nedeniyle hayatta kalma şansları son derece düşüktür. Ayrıca 5199 sayılı Kanun’a göre terk etmek yasaktır.'
  },
  {
    question:
      '7. Hayvanlara yönelik şiddet, işkence veya kötü muamele durumlarında Emniyet ve Jandarma birimlerine hızlı ihbar yapılmasını sağlayan resmî mobil uygulama hangisidir?',
    options: ['HAYDİ (Hayvan Durum İzleme)', 'E-Okul', 'MHRS', 'UYAP'],
    correctIndex: 0,
    explanation:
      'İçişleri Bakanlığı Emniyet Genel Müdürlüğü tarafından geliştirilen HAYDİ (Hayvan Durum İzleme) mobil uygulaması ve 112 Acil Çağrı Merkezi, çevre ve hayvanlara karşı işlenen suçlara hızlı müdahale edilmesini sağlar.'
  },
  {
    question:
      '8. İnsan sağlığı, hayvan sağlığı ve ekosistem sağlığının birbirinden ayrılmaz bir bütün olduğunu savunan küresel bilimsel yaklaşımın adı nedir?',
    options: [
      'Tek Sağlık (One Health) Yaklaşımı',
      'Endüstriyel Tüketim Modeli',
      'Kentsel İzolasyon Teorisi',
      'Yapay Seçilim Kuramı'
    ],
    correctIndex: 0,
    explanation:
      'Dünya Sağlık Örgütü (WHO), WOAH ve UNEP tarafından desteklenen "Tek Sağlık (One Health)" yaklaşımı; hayvanların, insanların ve çevrenin sağlığının birbirine doğrudan bağlı olduğunu ortaya koyar.'
  },
  {
    question:
      '9. Sokak hayvanlarını beslerken aşağıdakilerden hangisi doğru ve sağlıklı bir uygulamadır?',
    options: [
      'Baharatlı, tuzlu ve pişmiş tavuk kemikleri vermek',
      'Çikolata, soğanlı yemek ve şekerli gıdalar bırakmak',
      'Temiz ve taze su ile türüne uygun kuru/yaş mamayı hijyenik kaplarda, çevreye zarar vermeyecek noktalara bırakmak',
      'Plastik poşetlerin içinde mamayı doğrudan yere dökmek'
    ],
    correctIndex: 2,
    explanation:
      'Pişmiş tavuk kemikleri mide-bağırsak yırtılmalarına, çikolata ve soğan ise zehirlenmelere yol açar. Uygun mama ve temiz suyun hijyenik biçimde verilmesi hem hayvan sağlığını hem de çevre düzenini korur.'
  },
  {
    question:
      '10. Sahiplenilen kedi ve köpeklere deri altına uygulanan mikroçip ve PETVET kayıt sisteminin temel amacı nedir?',
    options: [
      'Hayvanın iletişim kurmasını sağlamak',
      'Hayvanın kimliklendirilmesini, aşı takibini, kaybolduğunda bulunmasını ve terk edilmesinin önlenmesini sağlamak',
      'Hayvanın rengini değiştirmek',
      'Sadece yurt dışı yarışmalarında kullanmak'
    ],
    correctIndex: 1,
    explanation:
      'Mikroçip ve PETVET sistemi, her evcil hayvana benzersiz bir dijital kimlik numarası tanımlayarak sağlık/aşı geçmişinin izlenmesini, kayıp hayvanların sahiplerine ulaştırılmasını ve sokağa terk edilmenin caydırılmasını sağlar.'
  }
];

const REPORT_SCENARIOS = [
  {
    id: 'injured',
    title: 'Yaralı veya Hasta Hayvanla Karşılaşıldığında',
    badge: 'Acil İlk Yardım Protokolü',
    color: 'orange',
    steps: [
      'Güvenliği Sağlayın: Hayvan yol ortasındaysa önce kendi can güvenliğinizi riske atmadan trafiği uyarın. Yaralı hayvan korku ve ağrı nedeniyle ısırabilir veya tırmalayabilir; sakin ve yavaş hareket edin.',
      'Sabitleme ve Koruma: Mümkünse kalın bir havlu, ceket veya karton kutu yardımıyla hayvanı nazikçe güvenli bir kenara alın. Omurga veya iç organ yaralanması ihtimaline karşı sarsmadan taşıyın.',
      'Bilinçsiz İlaç Vermeyin: İnsanlar için üretilen ağrı kesiciler (özellikle parasetamol, ibuprofen) kedi ve köpekler için ölümcül zehirdir. Kesinlikle ilaç vermeyin.',
      'Yetkili Birimi Arayın: Bulunduğunuz il/ilçe Belediyesinin Veteriner İşleri Müdürlüğünü (ALO 153 / Beyaz Masa) arayarak tam konum paylaşın. Yaban hayvanı ise Doğa Koruma ve Milli Parklar (DKMP) birimine bilgi verin.'
    ]
  },
  {
    id: 'violence',
    title: 'Şiddet, İşkence veya Kötü Muamele Görüldüğünde',
    badge: 'Adli Suç Bildirimi',
    color: 'navy',
    steps: [
      'Kişisel Güvenliğinizi Koruyun: Şiddet uygulayan kişiyle doğrudan fiziksel çatışmaya girmeyin; güvenli bir mesafeden durumu kayıt altına alın.',
      'Delil Toplayın: Olayın tarihini, saatini, açık adresini, varsa araç plakasını ve durumu kanıtlayan fotoğraf/video kayıtlarını net biçimde alın.',
      '112 ve HAYDİ Uygulamasını Kullanın: 112 Acil Çağrı Merkezini arayarak "5199 sayılı Kanun kapsamında hayvana şiddet/kötü muamele ihbarı" kaydı açtırın ve Emniyet Genel Müdürlüğü HAYDİ mobil uygulamasından ihbar gönderin.',
      'Tutanak ve Takip: Olay yerine gelen kolluk kuvvetlerinden tutanak tutulmasını talep edin; gerekirse Cumhuriyet Başsavcılığına suç duyurusunda bulunun.'
    ]
  },
  {
    id: 'municipal',
    title: 'Belediyelere ve Yetkili Kurumlara Başvuru Yöntemleri',
    badge: 'Resmî Başvuru Süreci',
    color: 'green',
    steps: [
      'Kısırlaştırma ve Aşılama Talebi: Mahallenizdeki sahipsiz kedi ve köpeklerin 5199 sayılı Kanun kapsamında kısırlaştırılıp aşılanması ve alındığı ortama geri bırakılması için Belediye Veteriner İşleri Müdürlüğüne başvurun.',
      'Bakımevi ve İhmal Şikayetleri: Görevini yerine getirmeyen kurumlar veya ruhsatsız üretim/satış yerleri için T.C. Tarım ve Orman Bakanlığı İl/İlçe Müdürlüklerine ve CİMER üzerinden yazılı başvuru yapın.',
      'Başvuru Takip Numarası Alın: Yaptığınız her telefon veya internet başvurusunda mutlaka kayıt/takip numarası alarak yasal cevap süresini izleyin.'
    ]
  },
  {
    id: 'emergency',
    title: 'Acil Durumlarda Dikkat Edilmesi Gerekenler',
    badge: 'Kritik Uyarılar',
    color: 'amber',
    steps: [
      'Doğal Afet ve Yangınlar: Deprem, sel veya orman yangını gibi afetlerde bölgedeki hayvanların tahliyesi için AFAD koordinasyonundaki resmî arama-kurtarma ve veteriner ekiplerine bilgi verin.',
      'Kapalı Araçta Bırakılan Hayvanlar: Sıcak havada camları kapalı araçta bırakılan hayvanlar dakikalar içinde sıcak çarpmasından ölebilir. Araç sahibine ulaşılamıyorsa derhal 112 polis/itfaiye ekiplerini arayın.',
      'Doğru Bilgilendirme: Sosyal medyada teyit edilmemiş veya eski tarihli haberleri yaymak yerine güncel, doğru konum ve resmî başvuru numarası içeren bilgilendirmeler paylaşın.'
    ]
  }
];

const OFFICIAL_CHANNELS = [
  {
    name: '112 Acil Çağrı Merkezi',
    role: 'Polis, Jandarma, İtfaiye ve Acil Durum Koordinasyonu',
    detail: 'Hayvana yönelik şiddet, işkence, öldürme, trafik kazası ve acil kurtarma durumlarında 7/24 aranabilir.',
    actionLabel: 'Acil Hat: 112',
    url: 'https://www.112.gov.tr'
  },
  {
    name: 'HAYDİ Mobil Uygulaması (EGM)',
    role: 'Emniyet Genel Müdürlüğü Çevre, Doğa ve Hayvanları Koruma Şube Müdürlüğü',
    detail: 'Akıllı telefonlardan konum ve görsel ekleyerek doğrudan kolluk kuvvetlerine ihbar iletilmesini sağlar.',
    actionLabel: 'EGM Bilgi Sayfası',
    url: 'https://www.egm.gov.tr'
  },
  {
    name: 'T.C. Tarım ve Orman Bakanlığı / DKMP',
    role: 'Doğa Koruma ve Milli Parklar Genel Müdürlüğü',
    detail: '5199 sayılı Kanun denetimleri, yaban hayvanı kurtarma ve idari yaptırım başvuruları için yetkili kurum.',
    actionLabel: 'DKMP Resmî Sitesi',
    url: 'https://www.tarimorman.gov.tr/DKMP'
  },
  {
    name: 'CİMER & Belediye ALO 153',
    role: 'Cumhurbaşkanlığı İletişim Merkezi & Yerel Yönetim Veteriner İşleri',
    detail: 'Kısırlaştırma, tedavi, bakımevi talepleri ve resmî yazılı şikayet/başvuru süreçleri için kullanılır.',
    actionLabel: 'CİMER Başvuru Portalı',
    url: 'https://www.cimer.gov.tr'
  }
];

const VOLUNTEER_ACTIONS = [
  {
    id: 'water_food',
    title: 'Sokak Hayvanları İçin Mevsimsel Su ve Mama Desteği',
    tag: 'Günlük Eylem',
    description:
      'Özellikle aşırı sıcak yaz günlerinde su kaplarını gölge alanlara yerleştirmek ve dondurucu kış günlerinde yüksek enerjili kuru mama desteği sağlamak hayati önem taşır.',
    tips: [
      'Su kaplarını güneş altında bırakmayın; yosunlaşmayı önlemek için gün aşırı yıkayın.',
      'Besleme noktalarını apartman girişi veya okul kapısı gibi geçiş güzergahlarının uzağında, sakin köşelerde belirleyin.'
    ]
  },
  {
    id: 'adoption_consciousness',
    title: 'Hayvan Sahiplenme Bilinci ve Ömür Boyu Sorumluluk',
    tag: 'Bilinçli Karar',
    description:
      'Bir kedi veya köpeğin ortalama ömrü 12-18 yıldır. Sahiplenme kararı hevesle değil; ailenin tüm bireylerinin onayı, zaman, sabır ve veteriner bakım bütçesi planlanarak verilmelidir.',
    tips: [
      'Sahiplenmeden önce alerji, taşınma veya tatil dönemleri için bakım planı yapın.',
      'Mikroçip ve düzenli aşı takvimini aksatmayın.'
    ]
  },
  {
    id: 'adopt_dont_shop',
    title: 'Satın Alma, Sahiplen!',
    tag: 'Etik Tercih',
    description:
      'Ticari üretim çiftliklerinde hayvanların aşırı üremeye zorlanması genetik hastalıklara ve refah kaybına yol açar. Belediye bakımevlerinde ve sokaklarda yuva bekleyen binlerce cana kapınızı açın.',
    tips: [
      'Yerel belediye geçici hayvan bakımevlerini ziyaret ederek sahiplendirme ilanlarını inceleyin.',
      'Engelli veya yaşlı hayvanlara yuva olarak onlara ikinci bir yaşam şansı tanıyın.'
    ]
  },
  {
    id: 'shelter_volunteer',
    title: 'Barınak Gönüllülüğü ve Bakımevi Desteği',
    tag: 'Saha Desteği',
    description:
      'Belediye bakımevleri ve onaylı rehabilitasyon merkezlerinde gönüllü olarak hayvanların sosyalleşmesine, yürüyüşlerine ve sahiplendirme duyurularının hazırlanmasına katkı sağlayabilirsiniz.',
    tips: [
      'Bakımevi ziyaret saatlerinde mama, battaniye veya temizlik malzemesi desteğinde bulunun.',
      '18 yaş altı öğrenciler velileri veya okul kulüpleri eşliğinde gönüllü ziyaretler planlayabilir.'
    ]
  },
  {
    id: 'environment',
    title: 'Çevre Temizliği ve Doğal Yaşamın Korunması',
    tag: 'Ekosistem',
    description:
      'Doğaya atılan cam kırıkları, plastik halkalar ve açık konserve kutuları hem sokak hem de yaban hayvanlarında ağır yaralanmalara yol açar.',
    tips: [
      'Konserve kutularını atmadan önce ağızlarını ezerek hayvanların başlarının sıkışmasını önleyin.',
      'Piknik ve orman alanlarında tek bir çöp bile bırakmayın.'
    ]
  },
  {
    id: 'social_media',
    title: 'Doğru Bilgiyle Sosyal Medya Farkındalığı',
    tag: 'Dijital Savunuculuk',
    description:
      'Sosyal medyada teyit edilmiş sahiplendirme ilanlarını paylaşmak, 5199 sayılı Kanun haklarını anlatmak ve bilimsel içerikler üretmek toplumsal bilinci hızla büyütür.',
    tips: [
      'İlan paylaşırken mutlaka şehir/ilçe, tarih ve doğrulanmış iletişim bilgisi ekleyin.',
      'Nefret dili yerine yapıcı, bilimsel ve çözüm odaklı bir iletişim dili kullanın.'
    ]
  }
];

const INITIAL_TUBITAK_SECTIONS = [
  {
    key: 'purpose',
    title: '1. Projenin Amacı',
    content:
      'Bu araştırmanın temel amacı; lise öğrencileri ve toplum bireyleri arasında hayvan hakları, hayvan refahı (WOAH Beş Özgürlük ilkesi) ve 5199 sayılı Hayvanları Koruma Kanunu hakkındaki bilgi düzeyini ölçmek; dijital ve bilimsel temelli bir farkındalık platformu ("PATİ İZİ") aracılığıyla toplumsal duyarlılığı artırmaktır.'
  },
  {
    key: 'problem',
    title: '2. Problem Durumu',
    content:
      'Günümüzde kentleşmenin artmasıyla birlikte sokak hayvanlarıyla birlikte yaşam kültürü, evcil hayvanların sokağa terk edilmesi, doğal yaşam alanlarının tahribi ve hayvanlara yönelik kötü muamele önemli bir toplumsal ve ekolojik problem olarak öne çıkmaktadır. Mevcut yasal düzenlemelerin (5199 ve 7332 sayılı Kanunlar) toplum tarafından yeterince bilinmemesi, ihlaller karşısında doğru başvuru kanallarının kullanılamamasına yol açmaktadır.'
  },
  {
    key: 'question',
    title: '3. Araştırma Sorusu',
    content:
      'Bilimsel verilere, ulusal mevzuata ve etkileşimli öğrenme araçlarına dayalı dijital bir farkındalık platformunun kullanılması, 9. sınıf öğrencileri ve katılımcıların hayvan hakları konusundaki bilgi düzeyini ve koruyucu tutumlarını anlamlı düzeyde etkiler mi?'
  },
  {
    key: 'hypothesis',
    title: '4. Hipotez',
    content:
      'H1: Hayvan hakları, mevzuat ve doğru müdahale yöntemlerini etkileşimli test, anket ve vaka analizleriyle sunan dijital farkındalık platformunu inceleyen bireylerin hayvan hakları bilgi puanları ve olumlu tutum düzeyleri artış gösterecektir.'
  },
  {
    key: 'method',
    title: '5. Yöntem',
    content:
      'Araştırmada nicel ve nitel yaklaşımların bir arada kullanıldığı karma araştırma deseni planlanmıştır. Literatür taraması ile ulusal mevzuat (5199 sayılı Kanun) ve uluslararası bildirgeler (UNESCO 1978, WOAH) incelenmiş; ardından web tabanlı etkileşimli eğitim ve farkındalık platformu geliştirilmiştir. Uygulama aşamasında gönüllü katılımcılara ön-test / son-test ve farkındalık anketi uygulanması öngörülmektedir.'
  },
  {
    key: 'tools',
    title: '6. Veri Toplama Araçları',
    content:
      '1) Literatür ve Mevzuat Tarama Formu (TÜBİTAK, Tarım ve Orman Bakanlığı, WOAH, UNEP kaynakları)\n2) 10 Soruluk Hayvan Hakları Bilgi Ölçme Testi\n3) 5 Boyutlu Hayvan Hakları Farkındalık ve Tutum Anketi (5’li Likert Ölçeği)\n[Araştırmacı Notu: Saha verileri henüz toplanma aşamasındadır; platform üzerindeki anket modülü gerçek veri toplama altyapısı olarak tasarlanmıştır.]'
  },
  {
    key: 'expected',
    title: '7. Beklenen Sonuçlar',
    content:
      'Katılımcıların; hayvanların "mal" değil "can" statüsünde olduğu, kötü muamele durumlarında 112 / HAYDİ / DKMP kanallarına nasıl başvurulacağı ve "Satın Alma, Sahiplen" bilinci konularında bilgi eksikliklerinin giderilmesi ve farkındalık düzeylerinde ölçülebilir bir artış sağlanması beklenmektedir.'
  },
  {
    key: 'contribution',
    title: '8. Toplumsal Katkı',
    content:
      'Proje, okul çağındaki gençlerden başlayarak ailelere ve yerel topluma yayılan bilimsel bir empati ve sorumluluk kültürü oluşturmayı hedefler. "Tek Sağlık" yaklaşımı doğrultusunda hayvan refahının korunması, hem ekosistem dengesine hem de toplumsal şiddetin önlenmesine doğrudan katkı sunar.'
  },
  {
    key: 'conclusion',
    title: '9. Sonuç ve Öneriler',
    content:
      'Hayvan haklarının korunması yalnızca yasal yaptırımlarla değil, erken yaşta başlayan bilimsel ve etik eğitimle kalıcı hale gelebilir. Okullarda hayvan refahı ve ekoloji atölyelerinin kurulması, yerel yönetimlerin şeffaf kısırlaştırma/rehabilitasyon projelerini gençlerle buluşturması önerilmektedir. [Not: Saha uygulaması tamamlandığında elde edilen bulgular bu bölüme eklenecektir.]'
  }
];

const GALLERY_ITEMS = [
  {
    id: 1,
    category: 'Sokak Dostlarımız',
    title: 'Kent Ekosisteminin Sessiz Sakinleri',
    caption: 'Aynı sokakları paylaştığımız can dostlarımızın yaşam ve barınma hakkı hepimize emanettir.',
    image:
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    category: 'Koruma ve Sevgi',
    title: 'Koşulsuz Güven ve Empati',
    caption: 'Hayvanlarla kurulan sevgi bağı, çocuklarda ve gençlerde empati duygusunu güçlendirir.',
    image:
      'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    category: 'Yaban Hayatı',
    title: 'Doğanın Dengesi ve Biyoçeşitlilik',
    caption: 'Ormanlar, sulak alanlar ve dağlar yaban hayatının vazgeçilmez yaşam alanlarıdır.',
    image:
      'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 4,
    category: 'Sokak Dostlarımız',
    title: 'Bir Kap Su, Bir Kap Sevgi',
    caption: 'Özellikle sıcak yaz ve soğuk kış günlerinde temiz suya erişim hayat kurtarır.',
    image:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 5,
    category: 'Yaban Hayatı',
    title: 'Gökyüzünün Özgür Kanatları',
    caption: 'Göçmen kuşların ve tüm kanatlı canlıların yaşam alanları kirlilikten korunmalıdır.',
    image:
      'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 6,
    category: 'Koruma ve Sevgi',
    title: 'Satın Alma, Sahiplen!',
    caption: 'Bakımevinde yuva bekleyen bir canı sahiplenmek, bir hayatı baştan sona değiştirmektir.',
    image:
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=900&q=80'
  }
];

const AWARENESS_POSTERS = [
  {
    id: 'p1',
    badge: 'FARKINDALIK POSTERİ #01',
    slogan: 'ONLAR EŞYA DEĞİL, HİSSEDEN CANLARDIR!',
    subtext:
      '5199 Sayılı Kanun ile hayvanlar "mal" statüsünden çıkarılarak "can" statüsüne alınmıştır. Acı çekerler, korkarlar ve yaşam hakkına sahiptirler.',
    footer: 'PATİ İZİ • Onların Sesi Ol, Haklarını Koru!',
    theme: 'bg-gradient-to-br from-[#1B4332] to-[#0F172A] text-white'
  },
  {
    id: 'p2',
    badge: 'FARKINDALIK POSTERİ #02',
    slogan: 'SATIN ALMA, SAHİPLEN! ÖMÜR BOYU YUVA OL.',
    subtext:
      'Bir hevesle sahiplenilip sokağa terk edilen her evcil hayvan, dış dünyada hayatta kalma mücadelesi verir. Sorumluluk al, terk etme!',
    footer: 'PATİ İZİ • Bilinçli Sahiplenme Hareketi',
    theme: 'bg-gradient-to-br from-[#EA580C] to-[#9A3412] text-white'
  },
  {
    id: 'p3',
    badge: 'FARKINDALIK POSTERİ #03',
    slogan: 'BİR KAP SU, BİR CAN DEMEKTİR.',
    subtext:
      'Betonlaşan şehirlerde su kaynaklarına erişemeyen sokak hayvanları ve kuşlar için kapının önüne bir kap temiz su bırakmayı unutma.',
    footer: 'PATİ İZİ • WOAH 5 Özgürlük İlkesi',
    theme: 'bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white'
  },
  {
    id: 'p4',
    badge: 'FARKINDALIK POSTERİ #04',
    slogan: 'ŞİDDETE SESSİZ KALMA, 112 VE HAYDİ’YE BİLDİR!',
    subtext:
      'Hayvanlara yönelik işkence ve kötü muamele Türk Ceza Hukuku kapsamında suçtur. Tanık olduğun ihlalleri resmî kanallara bildir.',
    footer: 'PATİ İZİ • Toplumsal Duyarlılık Ağı',
    theme: 'bg-gradient-to-br from-[#2D6A4F] to-[#1B4332] text-white'
  }
];

const REFERENCES_LIST = [
  {
    category: 'Ulusal Mevzuat ve Resmî Kurumlar',
    items: [
      {
        title: '5199 Sayılı Hayvanları Koruma Kanunu (Kabul Tarihi: 24.06.2004, Resmî Gazete: 01.07.2004 / 25509)',
        institution: 'T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi / Resmî Gazete',
        description: 'Türkiye Cumhuriyeti sınırları içinde hayvanların rahat yaşamalarını ve hayvanlara iyi ve uygun muamele edilmesini temin eden temel kanun metni.',
        url: 'https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5199&MevzuatTur=1&MevzuatTertip=5'
      },
      {
        title: '7332 Sayılı Hayvanları Koruma Kanunu ile Türk Ceza Kanununda Değişiklik Yapılmasına Dair Kanun (14.07.2021 / 31541)',
        institution: 'T.C. Resmî Gazete',
        description: 'Hayvanların "mal" statüsünden çıkarılarak adli suç kapsamına alınması, hapis cezaları ve mikroçip zorunluluğu düzenlemeleri.',
        url: 'https://www.resmigazete.gov.tr/eskiler/2021/07/20210714-9.htm'
      },
      {
        title: 'T.C. Tarım ve Orman Bakanlığı – Doğa Koruma ve Milli Parklar Genel Müdürlüğü (DKMP)',
        institution: 'T.C. Tarım ve Orman Bakanlığı',
        description: 'Yaban hayatı koruma, bakımevi denetimleri, CITES sözleşmesi uygulamaları ve hayvan hakları mevzuat rehberleri.',
        url: 'https://www.tarimorman.gov.tr/DKMP'
      },
      {
        title: 'TÜBİTAK – Türkiye Bilimsel ve Teknolojik Araştırma Kurumu (2204-A Lise Öğrencileri Araştırma Projeleri)',
        institution: 'TÜBİTAK Bilim İnsanı Destek Programları Başkanlığı (BİDEB)',
        description: 'Ortaöğretim öğrencilerini bilimsel araştırma yapmaya teşvik eden proje yarışması rehberi ve etik kuralları.',
        url: 'https://tubitak.gov.tr/tr/burslar/lisans-on-lisans/egitim-burs-programlari/2204-a-lise-ogrencileri-arastirma-projeleri-yarismasi'
      }
    ]
  },
  {
    category: 'Uluslararası Örgütler ve Bilimsel Bildirgeler',
    items: [
      {
        title: 'World Organisation for Animal Health (WOAH) – Animal Welfare & Five Freedoms',
        institution: 'Dünya Hayvan Sağlığı Örgütü (WOAH)',
        description: 'Hayvan refahının küresel bilimsel standartları, Beş Özgürlük çerçevesi ve Tek Sağlık (One Health) politikaları.',
        url: 'https://www.woah.org/en/what-we-do/animal-health-and-welfare/animal-welfare/'
      },
      {
        title: 'United Nations Environment Programme (UNEP) – Biodiversity & Ecosystems',
        institution: 'Birleşmiş Milletler Çevre Programı (UNEP)',
        description: 'Küresel biyoçeşitlilik kaybı, doğal yaşam alanlarının korunması ve ekosistem sağlığı raporları.',
        url: 'https://www.unep.org/topics/biodiversity'
      },
      {
        title: 'Universal Declaration of Animal Rights (Hayvan Hakları Evrensel Bildirgesi, Paris 1978)',
        institution: 'UNESCO / Ligue Internationale des Droits de l’Animal',
        description: '15 Ekim 1978 tarihinde UNESCO merkezinde ilan edilen, tüm hayvanların yaşam ve korunma haklarını tanımlayan temel etik bildirge.',
        url: 'https://www.unesco.org'
      },
      {
        title: 'The Cambridge Declaration on Consciousness (2012)',
        institution: 'Francis Crick Memorial Conference – Cambridge Üniversitesi',
        description: 'İnsan dışı memeliler, kuşlar ve diğer birçok canlının bilinçli farkındalık için gerekli nörolojik substratlara sahip olduğunu ortaya koyan bilimsel deklarasyon.',
        url: 'https://fcmconference.org/img/CambridgeDeclarationOnConsciousness.pdf'
      }
    ]
  },
  {
    category: 'Akademik Literatür ve Bilimsel Temeller',
    items: [
      {
        title: 'Russell, W. M. S., & Burch, R. L. (1959). The Principles of Humane Experimental Technique.',
        institution: 'Johns Hopkins Bloomberg School of Public Health (Altweb)',
        description: 'Deney hayvanlarının korunmasında evrensel etik standart kabul edilen 3R İlkesinin (Replacement, Reduction, Refinement) kurucu bilimsel eseri.',
        url: 'https://caat.jhsph.edu/principles/the-principles-of-humane-experimental-technique'
      },
      {
        title: 'Ankara Üniversitesi Veteriner Fakültesi – Hayvan Refahı ve Mevzuat Yayınları',
        institution: 'Ankara Üniversitesi',
        description: 'Veteriner hekimliği etiği, hayvan hakları tarihi ve 5199 sayılı Kanun üzerine akademik derleme ve ders kaynakları.',
        url: 'https://www.veterinary.ankara.edu.tr'
      }
    ]
  }
];

// Temsili referans dağılımı (Gerçek kullanıcı verilerinden kesinlikle ayrı tutulur)
const SAMPLE_REFERENCE_SURVEY = [
  {
    id: 'awareness',
    label: 'Hayvan haklarının yasal güvence altında olması gerektiğini düşünüyorum.',
    sampleAvg: 4.7
  },
  {
    id: 'adoption',
    label: 'Hayvan sahiplenirken satın almak yerine bakımevinden sahiplenmeyi tercih ederim.',
    sampleAvg: 4.5
  },
  {
    id: 'stray_coexistence',
    label: 'Sokak hayvanlarının kısırlaştırılıp aşılanarak yaşam alanlarında korunmasını destekliyorum.',
    sampleAvg: 4.4
  },
  {
    id: 'anti_violence',
    label: 'Hayvanlara yönelik şiddet ve kötü muameleye verilen cezaların caydırıcı olması gerekir.',
    sampleAvg: 4.8
  },
  {
    id: 'legal_knowledge',
    label: '5199 sayılı Hayvanları Koruma Kanunu ve bildirim kanalları (112/HAYDİ) hakkında bilgi sahibiyim.',
    sampleAvg: 3.1
  }
];

// ============================================================================
// ANA UYGULAMA BİLEŞENİ
// ============================================================================

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Bilgi Merkezi state
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRightId, setExpandedRightId] = useState(1);

  // İhlal Bildirim Rehberi state
  const [activeReportId, setActiveReportId] = useState('injured');

  // Gönüllülük Kişisel Sorumluluk Kontrol Listesi state
  const [checkedActions, setCheckedActions] = useState(['water_food', 'adopt_dont_shop']);

  // İnteraktif Test state
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Farkındalık Anketi state (Gerçek oturum verileri)
  const [surveyForm, setSurveyForm] = useState({
    awareness: 5,
    adoption: 5,
    stray_coexistence: 4,
    anti_violence: 5,
    legal_knowledge: 3,
    comment: ''
  });
  const [realSessionResponses, setRealSessionResponses] = useState([]);
  const [surveySubmittedBanner, setSurveySubmittedBanner] = useState(false);

  // TÜBİTAK Projesi Düzenlenebilir Bilimsel Rapor state
  const [tubitakSections, setTubitakSections] = useState(INITIAL_TUBITAK_SECTIONS);
  const [isEditingTubitak, setIsEditingTubitak] = useState(false);
  const [tubitakSavedNotice, setTubitakSavedNotice] = useState(false);

  // Galeri kategori ve paylaşım bildirimi state
  const [galleryCategory, setGalleryCategory] = useState('Tümü');
  const [copiedPosterId, setCopiedPosterId] = useState(null);

  // SEO Başlık, Meta Açıklama ve Google Fonts yüklemesi
  useEffect(() => {
    document.title = 'PATİ İZİ | Hayvan Haklarını Koruma ve Toplumsal Farkındalık Platformu';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content =
      'PATİ İZİ – Onların Sesi Ol, Haklarını Koru! 9. sınıf TÜBİTAK öğrenci projesi kapsamında bilimsel temelli hayvan hakları, 5199 sayılı kanun, bildirim rehberi ve farkındalık platformu.';

    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href =
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap';
    document.head.appendChild(fontLink);
  }, []);

  const navigateTo = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Bilgi Merkezi filtreleme
  const categories = useMemo(() => {
    const unique = Array.from(new Set(NINE_RIGHTS_DATA.map((item) => item.category)));
    return ['Tümü', ...unique];
  }, []);

  const filteredRights = useMemo(() => {
    return NINE_RIGHTS_DATA.filter((item) => {
      const matchesCat = selectedCategory === 'Tümü' || item.category === selectedCategory;
      const matchesQuery =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.scientificExplanation.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Quiz hesaplamaları
  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIdx];
  const currentSelectedOption = selectedAnswers[currentQuestionIdx];
  const hasAnsweredCurrent = currentSelectedOption !== undefined;

  const quizScoreStats = useMemo(() => {
    let correct = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) correct += 1;
    });
    const total = QUIZ_QUESTIONS.length;
    const points = correct * 10;
    return { correct, wrong: total - correct, total, points };
  }, [selectedAnswers]);

  const handleSelectOption = (optionIdx) => {
    if (hasAnsweredCurrent) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIdx]: optionIdx
    }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIdx(0);
    setQuizCompleted(false);
  };

  // Anket gönderimi
  const handleSurveySubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      ...surveyForm
    };
    setRealSessionResponses((prev) => [newEntry, ...prev]);
    setSurveySubmittedBanner(true);
    setTimeout(() => setSurveySubmittedBanner(false), 5000);
  };

  // Gerçek oturum anket ortalamaları
  const realSessionAverages = useMemo(() => {
    if (realSessionResponses.length === 0) return null;
    const keys = ['awareness', 'adoption', 'stray_coexistence', 'anti_violence', 'legal_knowledge'];
    const result = {};
    keys.forEach((k) => {
      const sum = realSessionResponses.reduce((acc, item) => acc + Number(item[k] || 0), 0);
      result[k] = Number((sum / realSessionResponses.length).toFixed(2));
    });
    return result;
  }, [realSessionResponses]);

  const toggleVolunteerAction = (id) => {
    setCheckedActions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleTubitakChange = (index, newValue) => {
    setTubitakSections((prev) =>
      prev.map((sec, idx) => (idx === index ? { ...sec, content: newValue } : sec))
    );
  };

  const handleSaveTubitak = () => {
    setIsEditingTubitak(false);
    setTubitakSavedNotice(true);
    setTimeout(() => setTubitakSavedNotice(false), 4000);
  };

  const handleCopyPosterSlogan = (poster) => {
    const textToCopy = `${poster.slogan}\n${poster.subtext}\n— ${poster.footer}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy).catch(() => {});
    }
    setCopiedPosterId(poster.id);
    setTimeout(() => setCopiedPosterId(null), 2500);
  };

  // ==========================================================================
  // BÖLÜM RENDER FONKSİYONLARI
  // ==========================================================================

  const renderHome = () => (
    <div className="space-y-16 pb-16 animate-fadeIn">
      {/* HERO ALANI */}
      <section className="relative overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4 shadow-2xl border border-[#1B4332]/20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1800&q=85"
            alt="Birlikte yürüyen sevimli köpekler"
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#1B4332]/85 to-[#0F172A]/70" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-14 py-16 sm:py-24 lg:py-28">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FAF8F5] text-xs sm:text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 text-[#F97316]" />
            <span>9. Sınıf TÜBİTAK Bilimsel Araştırma ve Toplumsal Farkındalık Projesi</span>
          </div>

          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            HER CANLININ YAŞAMA HAKKI VARDIR.
          </h1>

          <p className="mt-6 text-base sm:text-xl text-[#FAF8F5]/90 max-w-2xl leading-relaxed font-normal">
            Hayvanlar konuşamaz ama acı çeker, korkar, sever ve yaşamak ister. Onların haklarını
            korumak hepimizin sorumluluğudur.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigateTo('knowledge')}
              className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-base sm:text-lg shadow-lg shadow-[#F97316]/30 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Hayvan Haklarını Keşfet</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigateTo('volunteer')}
              className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/30 text-white font-bold text-base sm:text-lg transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Heart className="w-5 h-5 text-[#F97316]" />
              <span>Sen de Bir Fark Yarat</span>
            </button>
          </div>

          {/* Hızlı Erişim Rozetleri */}
          <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
            <button
              onClick={() => navigateTo('law')}
              className="text-left p-3.5 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 transition cursor-pointer"
            >
              <p className="text-xs text-[#F97316] font-semibold uppercase tracking-wider">Ulusal Mevzuat</p>
              <p className="text-sm sm:text-base font-bold mt-1">5199 Sayılı Kanun</p>
            </button>
            <button
              onClick={() => navigateTo('quiz')}
              className="text-left p-3.5 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 transition cursor-pointer"
            >
              <p className="text-xs text-[#F97316] font-semibold uppercase tracking-wider">Kendini Ölç</p>
              <p className="text-sm sm:text-base font-bold mt-1">10 Soruluk Bilgi Testi</p>
            </button>
            <button
              onClick={() => navigateTo('report')}
              className="text-left p-3.5 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 transition cursor-pointer"
            >
              <p className="text-xs text-[#F97316] font-semibold uppercase tracking-wider">Acil Durum</p>
              <p className="text-sm sm:text-base font-bold mt-1">İhlal Bildirim Rehberi</p>
            </button>
            <button
              onClick={() => navigateTo('tubitak')}
              className="text-left p-3.5 rounded-2xl bg-white/5 hover:bg-white/15 border border-white/10 transition cursor-pointer"
            >
              <p className="text-xs text-[#F97316] font-semibold uppercase tracking-wider">Bilimsel Rapor</p>
              <p className="text-sm sm:text-base font-bold mt-1">TÜBİTAK 2204-A Dosyası</p>
            </button>
          </div>
        </div>
      </section>

      {/* DOĞRULANMIŞ BİLİMSEL VE HUKUKİ REFERANS KARTLARI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#2D6A4F] bg-[#2D6A4F]/10 px-3 py-1 rounded-full">
              Doğrulanmış Bilimsel ve Hukuki Çerçeve
            </span>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-3"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Hayvan Haklarının Evrensel ve Ulusal Dayanakları
            </h2>
          </div>
          <p className="text-sm text-[#1E293B]/75 max-w-md">
            Platformumuzdaki tüm içerikler uluslararası bilimsel örgütler ve Türkiye Cumhuriyeti resmî mevzuat kaynakları referans alınarak hazırlanmıştır.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {HOME_VERIFIED_CARDS.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-md hover:shadow-xl border border-[#1B4332]/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <span className="inline-block text-xs font-bold text-[#EA580C] bg-[#F97316]/10 px-3 py-1 rounded-full mb-3">
                  {card.badge}
                </span>
                <h3
                  className="text-xl font-bold text-[#0F172A] mb-3"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {card.title}
                </h3>
                <p className="text-[#1E293B]/85 text-sm sm:text-base leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-[#2D6A4F]">{card.source}</span>
                <a
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0F172A] hover:text-[#F97316] shrink-0 transition"
                >
                  <span>Kaynağa Git</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJE TANITIMI VE FARKINDALIK ÇAĞRISI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1B4332] to-[#0F172A] rounded-3xl p-8 sm:p-12 text-white shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-[#F97316] font-bold text-sm">
              <PawPrint className="w-5 h-5" />
              <span>PATİ İZİ PROJESİ NEDİR?</span>
            </div>
            <h2
              className="text-2xl sm:text-4xl font-extrabold leading-snug"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Bilim, Hukuk ve Empati ile Hayvan Haklarını Savunuyoruz
            </h2>
            <p className="text-[#FAF8F5]/85 leading-relaxed text-sm sm:text-base">
              <strong>PATİ İZİ</strong>, 9. sınıf TÜBİTAK öğrenci projesi kapsamında geliştirilmiş;
              toplumda hayvan hakları bilincini yükseltmeyi, yanlış bilinen doğruları bilimsel
              gerçeklerle düzeltmeyi ve hayvanlara yönelik hak ihlallerinde vatandaşlara doğru
              resmî başvuru yollarını göstermeyi amaçlayan etkileşimli bir eğitim platformudur.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => navigateTo('quiz')}
                className="px-6 py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm transition cursor-pointer"
              >
                10 Soruluk Bilgi Testini Çöz
              </button>
              <button
                onClick={() => navigateTo('survey')}
                className="px-6 py-3 rounded-xl bg-white text-[#0F172A] hover:bg-[#FAF8F5] font-bold text-sm transition cursor-pointer"
              >
                Farkındalık Anketine Katıl
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-lg text-[#F97316]">Platformda Neler Var?</h3>
              <ul className="space-y-3 text-sm text-[#FAF8F5]/90">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                  <span>9 temel hayvan hakkı üzerine bilimsel ve hukuki vaka analizleri</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                  <span>5199 Sayılı Kanun ve 7332 Sayılı Reform düzenlemeleri özeti</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                  <span>Yaralı veya şiddet gören hayvanlar için adım adım bildirim rehberi</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                  <span>Canlı grafikli farkındalık anketi ve TÜBİTAK bilimsel araştırma dosyası</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderKnowledgeCenter = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      {/* Üst Başlık */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-[#1B4332]/10">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2D6A4F] bg-[#2D6A4F]/10 px-3 py-1 rounded-full">
          <ShieldCheck className="w-4 h-4" />
          Hayvan Hakları Bilgi Merkezi
        </span>
        <h1
          className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] mt-3"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Hayvanların 9 Temel Hakkı ve Bilimsel Temelleri
        </h1>
        <p className="mt-3 text-[#1E293B]/80 max-w-3xl text-sm sm:text-base leading-relaxed">
          Her başlıkta ilgili hakkın biyolojik ve etik açıklaması, gerçek yaşamdan örnek olay
          analizi ve uygulanabilir çözüm önerileri yer almaktadır.
        </p>

        {/* Arama ve Kategori Filtresi */}
        <div className="mt-6 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1B4332] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-[#1E293B] hover:bg-[#1B4332]/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Başlık veya kavram ara..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-slate-200 text-sm focus:outline-none focus:border-[#2D6A4F]"
            />
          </div>
        </div>
      </div>

      {/* 9 Temel Hak Kartları */}
      <div className="grid grid-cols-1 gap-6">
        {filteredRights.map((item) => {
          const IconComponent = item.icon;
          const isExpanded = expandedRightId === item.id;

          return (
            <article
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md border border-[#1B4332]/10 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Görsel Alanı */}
                <div className="lg:col-span-4 relative min-h-[220px] lg:min-h-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#0F172A]/85 backdrop-blur-md text-white text-xs font-bold">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* İçerik Alanı */}
                <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center shrink-0">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <h2
                          className="text-xl sm:text-2xl font-extrabold text-[#0F172A]"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          {item.title}
                        </h2>
                      </div>

                      <button
                        onClick={() => setExpandedRightId(isExpanded ? null : item.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#FAF8F5] hover:bg-[#F97316]/10 text-[#0F172A] hover:text-[#EA580C] text-xs font-bold border border-slate-200 transition shrink-0 cursor-pointer"
                      >
                        {isExpanded ? 'Özeti Daralt' : 'Detaylı İncele'}
                      </button>
                    </div>

                    {/* Bilimsel Açıklama */}
                    <div className="mt-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] mb-1.5">
                        Bilimsel ve Etik Açıklama
                      </h3>
                      <p className="text-[#1E293B]/85 text-sm sm:text-base leading-relaxed">
                        {item.scientificExplanation}
                      </p>
                    </div>

                    {/* Örnek Olay ve Çözüm Önerileri */}
                    {(isExpanded || filteredRights.length <= 3) && (
                      <div className="mt-6 space-y-4 pt-5 border-t border-slate-100">
                        <div className="p-4 rounded-2xl bg-[#FAF8F5] border-l-4 border-[#F97316]">
                          <p className="text-sm text-[#0F172A] font-medium leading-relaxed">
                            {item.caseStudy}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#1B4332] mb-2">
                            Somut Çözüm Önerileri
                          </h4>
                          <ul className="space-y-2">
                            {item.solutions.map((sol, sIdx) => (
                              <li
                                key={sIdx}
                                className="flex items-start gap-2.5 text-sm text-[#1E293B]/90"
                              >
                                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-1" />
                                <span>{sol}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <span className="font-medium text-[#2D6A4F]">
                      Dayanak: {item.reference}
                    </span>
                    {!isExpanded && filteredRights.length > 3 && (
                      <button
                        onClick={() => setExpandedRightId(item.id)}
                        className="inline-flex items-center gap-1 font-bold text-[#F97316] hover:underline cursor-pointer"
                      >
                        <span>Örnek Olay & Çözüm Önerilerini Gör</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );

  const renderLawPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      {/* Başlık */}
      <div className="bg-gradient-to-r from-[#0F172A] to-[#1B4332] rounded-3xl p-8 sm:p-10 text-white shadow-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#F97316] text-xs font-bold mb-4">
          <Scale className="w-4 h-4" />
          <span>TÜRKİYE CUMHURİYETİ HAYVAN HAKLARI MEVZUATI</span>
        </div>
        <h1
          className="text-2xl sm:text-4xl font-extrabold"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Türkiye’de Hayvan Hakları ve Hukuki Düzenlemeler
        </h1>
        <p className="mt-3 text-[#FAF8F5]/85 max-w-3xl text-sm sm:text-base leading-relaxed">
          5199 sayılı Hayvanları Koruma Kanunu, 7332 sayılı Reform Kanunu ile getirilen adli
          yaptırımlar, yerel yönetimlerin yasal sorumlulukları ve resmî mevzuat kaynakları.
        </p>
      </div>

      {/* Mevzuat Kartları */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {LEGAL_SECTIONS.map((sec, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#1B4332]/10 flex flex-col justify-between"
          >
            <div>
              <span className="inline-block text-xs font-bold text-[#2D6A4F] bg-[#2D6A4F]/10 px-3 py-1 rounded-full mb-3">
                {sec.badge}
              </span>
              <h2
                className="text-xl font-extrabold text-[#0F172A] mb-3"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {sec.title}
              </h2>
              <p className="text-sm text-[#1E293B]/80 leading-relaxed mb-5">{sec.summary}</p>

              <ul className="space-y-3">
                {sec.points.map((pt, pIdx) => (
                  <li
                    key={pIdx}
                    className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF8F5] text-sm text-[#0F172A]"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Resmî Mevzuat ve Kurum Bağlantıları */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#1B4332]/10">
        <h3
          className="text-xl font-extrabold text-[#0F172A] mb-4"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Doğrudan Resmî Mevzuat ve Kamu Kurumu Bağlantıları
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5199&MevzuatTur=1&MevzuatTertip=5"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-[#FAF8F5] hover:bg-[#1B4332] hover:text-white border border-slate-200 transition group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#F97316]">T.C. Mevzuat Sistemi</span>
              <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100" />
            </div>
            <p className="font-bold mt-2">5199 Sayılı Hayvanları Koruma Kanunu Tam Metni</p>
          </a>

          <a
            href="https://www.resmigazete.gov.tr/eskiler/2021/07/20210714-9.htm"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-[#FAF8F5] hover:bg-[#1B4332] hover:text-white border border-slate-200 transition group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#F97316]">T.C. Resmî Gazete</span>
              <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100" />
            </div>
            <p className="font-bold mt-2">7332 Sayılı Kanun Değişiklik Metni (14.07.2021)</p>
          </a>

          <a
            href="https://www.tarimorman.gov.tr/DKMP"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-[#FAF8F5] hover:bg-[#1B4332] hover:text-white border border-slate-200 transition group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#F97316]">Tarım ve Orman Bakanlığı</span>
              <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100" />
            </div>
            <p className="font-bold mt-2">Doğa Koruma ve Milli Parklar Genel Müdürlüğü</p>
          </a>
        </div>
      </div>
    </div>
  );

  const renderReportGuide = () => {
    const activeScenario =
      REPORT_SCENARIOS.find((s) => s.id === activeReportId) || REPORT_SCENARIOS[0];

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
        {/* Bilgilendirme Uyarısı */}
        <div className="bg-amber-50 border-l-4 border-[#F97316] rounded-2xl p-5 flex items-start gap-3.5 shadow-sm">
          <Info className="w-6 h-6 text-[#EA580C] shrink-0 mt-0.5" />
          <div>
            <h2 className="font-bold text-[#0F172A] text-sm sm:text-base">
              Önemli Bilgilendirme: Bu Sayfa Bir Eğitim ve Yönlendirme Rehberidir
            </h2>
            <p className="text-xs sm:text-sm text-[#1E293B]/85 mt-1 leading-relaxed">
              PATİ İZİ doğrudan bir ihbar hattı değildir. Acil durumlarda vakit kaybetmemek için
              aşağıda yer alan <strong>112 Acil Çağrı Merkezi, HAYDİ Uygulaması, DKMP ve Belediye
              Veteriner İşleri</strong> gibi resmî başvuru kanallarını kullanmanız gerekmektedir.
            </p>
          </div>
        </div>

        {/* Durum Seçici Kartlar */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-md border border-[#1B4332]/10">
          <h1
            className="text-2xl sm:text-4xl font-extrabold text-[#0F172A]"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Hayvan Hakları İhlali Bildirim ve Müdahale Rehberi
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#1E293B]/80">
            Karşılaştığınız durumu seçerek izlemeniz gereken güvenli ve hukuki adımları inceleyin:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
            {REPORT_SCENARIOS.map((sc) => (
              <button
                key={sc.id}
                onClick={() => setActiveReportId(sc.id)}
                className={`p-4 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                  activeReportId === sc.id
                    ? 'border-[#F97316] bg-[#F97316]/10 shadow-sm'
                    : 'border-slate-100 bg-[#FAF8F5] hover:border-[#2D6A4F]/40'
                }`}
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#2D6A4F]">
                  {sc.badge}
                </span>
                <p className="font-bold text-sm sm:text-base text-[#0F172A] mt-1">{sc.title}</p>
              </button>
            ))}
          </div>

          {/* Seçili Senaryo Adımları */}
          <div className="mt-8 bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-slate-200/80">
            <div className="flex items-center gap-2 text-[#EA580C] font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>{activeScenario.badge}</span>
            </div>
            <h2
              className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mt-1 mb-6"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {activeScenario.title}
            </h2>

            <div className="space-y-4">
              {activeScenario.steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100"
                >
                  <div className="w-8 h-8 rounded-full bg-[#1B4332] text-white font-bold text-sm flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm sm:text-base text-[#1E293B] leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resmî Başvuru Kanalları */}
        <div>
          <h2
            className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Resmî Başvuru ve İhbar Kanalları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {OFFICIAL_CHANNELS.map((ch, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 shadow-md border border-[#1B4332]/10 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-[#2D6A4F]">{ch.role}</span>
                  <h3 className="text-lg font-extrabold text-[#0F172A] mt-1">{ch.name}</h3>
                  <p className="text-sm text-[#1E293B]/80 mt-2 leading-relaxed">{ch.detail}</p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#EA580C] bg-[#F97316]/10 px-3 py-1 rounded-full">
                    {ch.actionLabel}
                  </span>
                  <a
                    href={ch.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1B4332] hover:text-[#F97316] transition"
                  >
                    <span>Resmî Site</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderVolunteerPage = () => {
    const progressPercent = Math.round((checkedActions.length / VOLUNTEER_ACTIONS.length) * 100);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
        {/* Başlık ve Kişisel Farkındalık Taahhüdü */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-md border border-[#1B4332]/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EA580C] bg-[#F97316]/10 px-3 py-1 rounded-full">
                <HeartHandshake className="w-4 h-4" />
                Çözüm Önerileri ve Gönüllülük
              </span>
              <h1
                className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] mt-3"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Sen de Bir Fark Yarat: Somut Eylem Planı
              </h1>
              <p className="mt-3 text-sm sm:text-base text-[#1E293B]/80 leading-relaxed">
                Hayvan haklarını korumak günlük hayatımızda atacağımız bilinçli adımlarla başlar.
                Aşağıdaki 6 eylem alanını inceleyebilir ve uygulayabileceğiniz adımları işaretleyerek
                kendi farkındalık taahhüdünüzü oluşturabilirsiniz.
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#FAF8F5] rounded-2xl p-5 border border-[#2D6A4F]/20">
              <div className="flex items-center justify-between text-sm font-bold text-[#0F172A]">
                <span>Kişisel Eylem Taahhüdün</span>
                <span className="text-[#2D6A4F]">
                  {checkedActions.length} / {VOLUNTEER_ACTIONS.length} Adım
                </span>
              </div>
              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mt-3">
                <div
                  className="h-full bg-gradient-to-r from-[#2D6A4F] to-[#F97316] transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-xs text-[#1E293B]/75 mt-3">
                {progressPercent === 100
                  ? 'Harika! Tüm sorumluluk adımlarını taahhüt listene ekledin.'
                  : 'Kartların sağ üstündeki kutucukları işaretleyerek kendi eylem planını oluştur.'}
              </p>
            </div>
          </div>
        </div>

        {/* 6 Eylem Kartı */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VOLUNTEER_ACTIONS.map((act) => {
            const isChecked = checkedActions.includes(act.id);

            return (
              <div
                key={act.id}
                className={`rounded-3xl p-6 shadow-md border-2 transition-all flex flex-col justify-between ${
                  isChecked
                    ? 'bg-white border-[#2D6A4F]'
                    : 'bg-white border-transparent hover:border-slate-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold text-[#2D6A4F] bg-[#2D6A4F]/10 px-3 py-1 rounded-full">
                      {act.tag}
                    </span>

                    <button
                      onClick={() => toggleVolunteerAction(act.id)}
                      aria-label={`${act.title} taahhüt et`}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                        isChecked
                          ? 'bg-[#2D6A4F] text-white'
                          : 'bg-[#FAF8F5] text-[#0F172A] hover:bg-[#F97316]/15'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>{isChecked ? 'Taahhüt Edildi' : 'Ben de Yaparım'}</span>
                    </button>
                  </div>

                  <h2
                    className="text-lg font-extrabold text-[#0F172A]"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {act.title}
                  </h2>
                  <p className="text-sm text-[#1E293B]/80 mt-2.5 leading-relaxed">
                    {act.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                  <p className="text-xs font-bold text-[#EA580C]">Uygulama İpuçları:</p>
                  {act.tips.map((tip, tIdx) => (
                    <p key={tIdx} className="text-xs text-[#1E293B]/85 flex items-start gap-2">
                      <span className="text-[#2D6A4F] font-bold">•</span>
                      <span>{tip}</span>
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderQuizPage = () => {
    const getResultMessage = (points) => {
      if (points >= 90) {
        return {
          badge: 'Hayvan Hakları Elçisi',
          message:
            'Olağanüstü! Hem uluslararası hayvan refahı standartlarına hem de 5199 sayılı Hayvanları Koruma Kanunu’na tam hakimsin. Çevrendeki bireyleri bilinçlendirmeye öncülük edebilirsin.'
        };
      }
      if (points >= 70) {
        return {
          badge: 'Bilinçli Doğa ve Can Dostu',
          message:
            'Çok iyi bir sonuç! Hayvan hakları ve sorumluluk bilinci konusunda güçlü bir temele sahipsin. Bilgi Merkezi bölümümüzü inceleyerek uzmanlığını pekiştirebilirsin.'
        };
      }
      if (points >= 50) {
        return {
          badge: 'Gelişen Farkındalık Gönüllüsü',
          message:
            'Güzel bir başlangıç! Temel kavramları biliyorsun ancak mevzuat ve acil müdahale protokolleri konusunda birkaç noktayı tekrar gözden geçirmen faydalı olacaktır.'
        };
      }
      return {
        badge: 'Keşif Yolcusu',
        message:
          'Bu test senin için harika bir öğrenme fırsatı! Bilgi Merkezi ve Mevzuat sayfalarımızı okuduktan sonra testi yeniden çözerek bilgini test edebilirsin.'
      };
    };

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-[#1B4332]/10">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F97316] bg-[#F97316]/10 px-3 py-1 rounded-full">
                <HelpCircle className="w-4 h-4" />
                İnteraktif Bilgi Ölçme Modülü
              </span>
              <h1
                className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mt-2"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Hayvan Hakları Farkındalık Testi
              </h1>
            </div>

            {!quizCompleted && (
              <div className="text-right">
                <span className="text-xs font-bold text-slate-500">İlerleme</span>
                <p className="text-lg font-extrabold text-[#1B4332]">
                  {currentQuestionIdx + 1} / {QUIZ_QUESTIONS.length}
                </p>
              </div>
            )}
          </div>

          {!quizCompleted ? (
            <div className="mt-6 space-y-6">
              {/* İlerleme Çubuğu */}
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#1B4332] transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIdx + 1) / QUIZ_QUESTIONS.length) * 100}%`
                  }}
                />
              </div>

              {/* Soru Metni */}
              <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] leading-snug">
                {currentQuestion.question}
              </h2>

              {/* Seçenekler */}
              <div className="space-y-3">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = currentSelectedOption === idx;
                  const isCorrect = currentQuestion.correctIndex === idx;

                  let buttonStyle =
                    'bg-[#FAF8F5] border-slate-200 text-[#0F172A] hover:border-[#2D6A4F]';
                  if (hasAnsweredCurrent) {
                    if (isCorrect) {
                      buttonStyle = 'bg-emerald-50 border-emerald-600 text-emerald-950 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      buttonStyle = 'bg-rose-50 border-rose-500 text-rose-950';
                    } else {
                      buttonStyle = 'bg-slate-50 border-slate-200 text-slate-500 opacity-75';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={hasAnsweredCurrent}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 cursor-pointer ${buttonStyle}`}
                    >
                      <span className="text-sm sm:text-base">{opt}</span>
                      {hasAnsweredCurrent && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {hasAnsweredCurrent && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Doğru Cevap Açıklaması */}
              {hasAnsweredCurrent && (
                <div
                  className={`p-5 rounded-2xl border ${
                    currentSelectedOption === currentQuestion.correctIndex
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                      : 'bg-amber-50/90 border-amber-200 text-amber-950'
                  }`}
                >
                  <p className="font-bold text-sm mb-1">
                    {currentSelectedOption === currentQuestion.correctIndex
                      ? 'Doğru Yanıt! Bilimsel / Hukuki Açıklama:'
                      : 'Yanlış Yanıt. Doğru Cevap Açıklaması:'}
                  </p>
                  <p className="text-sm leading-relaxed">{currentQuestion.explanation}</p>
                </div>
              )}

              {/* Alt Gezinme Butonları */}
              <div className="pt-4 flex items-center justify-between gap-4">
                <button
                  onClick={() => setCurrentQuestionIdx((prev) => Math.max(0, prev - 1))}
                  disabled={currentQuestionIdx === 0}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm disabled:opacity-40 cursor-pointer"
                >
                  Önceki Soru
                </button>

                {currentQuestionIdx < QUIZ_QUESTIONS.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIdx((prev) => prev + 1)}
                    disabled={!hasAnsweredCurrent}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-sm disabled:opacity-40 transition cursor-pointer"
                  >
                    <span>Sonraki Soru</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setQuizCompleted(true)}
                    disabled={!hasAnsweredCurrent}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm disabled:opacity-40 transition cursor-pointer"
                  >
                    <Award className="w-4 h-4" />
                    <span>Testi Tamamla ve Sonucu Gör</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* SONUÇ EKRANI */
            <div className="mt-8 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-[#F97316]/15 text-[#F97316] flex items-center justify-center mx-auto">
                <Award className="w-10 h-10" />
              </div>

              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#1B4332] text-white text-xs font-bold uppercase tracking-wider">
                  {getResultMessage(quizScoreStats.points).badge}
                </span>
                <h2
                  className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mt-3"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Toplam Puanın: {quizScoreStats.points} / 100
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <p className="text-2xl font-extrabold text-emerald-700">
                    {quizScoreStats.correct}
                  </p>
                  <p className="text-xs font-bold text-emerald-900 mt-1">Doğru Cevap</p>
                </div>
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                  <p className="text-2xl font-extrabold text-rose-700">{quizScoreStats.wrong}</p>
                  <p className="text-xs font-bold text-rose-900 mt-1">Yanlış Cevap</p>
                </div>
              </div>

              <div className="max-w-xl mx-auto p-6 rounded-2xl bg-[#FAF8F5] border border-slate-200 text-sm sm:text-base text-[#1E293B] leading-relaxed">
                {getResultMessage(quizScoreStats.points).message}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  onClick={handleResetQuiz}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm transition cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Testi Yeniden Çöz</span>
                </button>

                <button
                  onClick={() => navigateTo('knowledge')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-sm transition cursor-pointer"
                >
                  <span>Bilgi Merkezine Göz At</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSurveyPage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      {/* Başlık */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-md border border-[#1B4332]/10">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2D6A4F] bg-[#2D6A4F]/10 px-3 py-1 rounded-full">
          <BarChart3 className="w-4 h-4" />
          TÜBİTAK Veri Toplama ve Farkındalık Anketi
        </span>
        <h1
          className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] mt-3"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Toplumsal Farkındalık Anketi ve Veri Görselleştirme
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#1E293B]/80 max-w-3xl">
          Görüşleriniz tamamen anonim olarak değerlendirilir. Aşağıdaki 5 temel boyutta katılım
          düzeyinizi seçerek anketi gönderdiğinizde sonuçlar anında aşağıdaki gerçek oturum
          grafiklerine yansıtılır.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ANKET FORMU */}
        <form
          onSubmit={handleSurveySubmit}
          className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#1B4332]/10 space-y-6"
        >
          <h2 className="text-xl font-extrabold text-[#0F172A]">
            Anonim Farkındalık Değerlendirme Formu
          </h2>
          <p className="text-xs text-slate-500">
            Ölçek: 1 = Kesinlikle Katılmıyorum • 3 = Kararsızım • 5 = Kesinlikle Katılıyorum
          </p>

          {SAMPLE_REFERENCE_SURVEY.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200/70">
              <label className="block text-sm font-semibold text-[#0F172A] mb-3">
                {item.label}
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((val) => (
                  <button
                    type="button"
                    key={val}
                    onClick={() => setSurveyForm((prev) => ({ ...prev, [item.id]: val }))}
                    className={`py-2.5 rounded-xl text-sm font-bold border transition cursor-pointer ${
                      surveyForm[item.id] === val
                        ? 'bg-[#1B4332] text-white border-[#1B4332]'
                        : 'bg-white text-[#1E293B] border-slate-200 hover:border-[#2D6A4F]'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div>
            <label className="block text-sm font-semibold text-[#0F172A] mb-2">
              Eklemek İstediğiniz Görüş veya Öneri (İsteğe Bağlı)
            </label>
            <textarea
              rows={3}
              value={surveyForm.comment}
              onChange={(e) => setSurveyForm((prev) => ({ ...prev, comment: e.target.value }))}
              placeholder="Hayvan hakları konusunda okulunuzda veya şehrinizde yapılmasını istediğiniz bir çalışmayı yazabilirsiniz..."
              className="w-full p-3.5 rounded-2xl bg-[#FAF8F5] border border-slate-200 text-sm focus:outline-none focus:border-[#2D6A4F]"
            />
          </div>

          {surveySubmittedBanner && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                Teşekkürler! Anonim yanıtınız kaydedildi ve sağdaki "Gerçek Oturum Verileri"
                grafiğine eklendi.
              </span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-base shadow-md transition cursor-pointer"
          >
            Anket Yanıtımı Gönder
          </button>
        </form>

        {/* VERİ GÖRSELLEŞTİRME ALANI (GERÇEK VERİ vs TEMSİLİ ÖRNEK VERİ NET AYRIMI) */}
        <div className="lg:col-span-6 space-y-6">
          {/* 1. KUTU: GERÇEK OTURUM VERİLERİ */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-[#2D6A4F]">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#2D6A4F] text-white text-xs font-bold">
                GERÇEK KULLANICI YANITLARI (CANLI OTURUM)
              </span>
              <span className="text-xs font-bold text-[#0F172A]">
                Katılımcı Sayısı: {realSessionResponses.length}
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-[#0F172A] mt-2">
              Bu Oturumda Toplanan Gerçek Anket Ortalamaları (5 Üzerinden)
            </h3>

            {realSessionResponses.length === 0 ? (
              <div className="mt-4 p-6 rounded-2xl bg-[#FAF8F5] border border-dashed border-slate-300 text-center">
                <p className="text-sm font-semibold text-[#0F172A]">
                  Henüz gerçek anket yanıtı gönderilmedi.
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Soldaki formu doldurup gönderdiğinizde gerçek veriler burada anlık grafik olarak
                  oluşturulacaktır.
                </p>
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                {SAMPLE_REFERENCE_SURVEY.map((item) => {
                  const avg = realSessionAverages[item.id];
                  const widthPct = (avg / 5) * 100;
                  return (
                    <div key={item.id}>
                      <div className="flex justify-between text-xs font-semibold text-[#0F172A] mb-1">
                        <span className="line-clamp-1 pr-2">{item.label}</span>
                        <span className="text-[#2D6A4F] font-extrabold shrink-0">{avg} / 5.0</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#2D6A4F] rounded-full transition-all duration-500"
                          style={{ width: `${widthPct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 2. KUTU: TEMSİLİ ÖRNEK DAĞILIM (AÇIKÇA ETİKETLİ) */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                ÖRNEK REFERANS DAĞILIMI (TEMSİLİ GÖSTERİM)
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              * Uyarı: Aşağıdaki grafik gerçek bir saha araştırması sonucu değildir; yalnızca
              platformun veri görselleştirme modelini göstermek amacıyla hazırlanmış temsili referans
              değerleridir.
            </p>

            <div className="space-y-4">
              {SAMPLE_REFERENCE_SURVEY.map((item) => {
                const widthPct = (item.sampleAvg / 5) * 100;
                return (
                  <div key={item.id}>
                    <div className="flex justify-between text-xs font-medium text-[#1E293B] mb-1">
                      <span className="line-clamp-1 pr-2">{item.label}</span>
                      <span className="text-[#EA580C] font-bold shrink-0">
                        {item.sampleAvg} / 5.0
                      </span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#F97316]/80 rounded-full"
                        style={{ width: `${widthPct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTubitakPage = () => (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      {/* Üst Bilgi Kartı */}
      <div className="bg-gradient-to-r from-[#1B4332] to-[#0F172A] rounded-3xl p-8 sm:p-10 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#F97316] text-xs font-bold mb-3">
              <FlaskConical className="w-4 h-4" />
              <span>TÜBİTAK 2204-A LİSE ÖĞRENCİLERİ ARAŞTIRMA PROJELERİ FORMATI</span>
            </span>
            <h1
              className="text-2xl sm:text-4xl font-extrabold"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Bilimsel Araştırma Proje Raporu
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#FAF8F5]/85 max-w-2xl">
              9. sınıf araştırmacısının kendi gerçek saha ve anket bulgularıyla güncelleyebileceği
              bilimsel proje şablonu. Uydurma deney veya anket sonucu içermez.
            </p>
          </div>

          <div className="shrink-0">
            {!isEditingTubitak ? (
              <button
                onClick={() => setIsEditingTubitak(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm transition cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
                <span>Araştırmacı Notlarını Düzenle</span>
              </button>
            ) : (
              <button
                onClick={handleSaveTubitak}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Değişiklikleri Kaydet</span>
              </button>
            )}
          </div>
        </div>

        {tubitakSavedNotice && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-100 text-xs sm:text-sm font-semibold">
            Bilimsel proje raporu metinleri güncellendi ve önizlemeye yansıtıldı.
          </div>
        )}
      </div>

      {/* 9 Bilimsel Bölüm */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tubitakSections.map((sec, idx) => (
          <div
            key={sec.key}
            className={`bg-white rounded-3xl p-6 sm:p-7 shadow-md border border-[#1B4332]/10 ${
              idx === tubitakSections.length - 1 ? 'md:col-span-2' : ''
            }`}
          >
            <h2
              className="text-lg font-extrabold text-[#1B4332] mb-3"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {sec.title}
            </h2>

            {isEditingTubitak ? (
              <textarea
                rows={4}
                value={sec.content}
                onChange={(e) => handleTubitakChange(idx, e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#2D6A4F] text-sm text-[#0F172A] leading-relaxed focus:outline-none"
              />
            ) : (
              <p className="text-sm sm:text-base text-[#1E293B]/85 leading-relaxed whitespace-pre-line">
                {sec.content}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderGalleryPage = () => {
    const galleryCats = ['Tümü', 'Sokak Dostlarımız', 'Yaban Hayatı', 'Koruma ve Sevgi'];
    const filteredGallery =
      galleryCategory === 'Tümü'
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((item) => item.category === galleryCategory);

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-fadeIn">
        {/* Farkındalık Posterleri Bölümü */}
        <section>
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F97316] bg-[#F97316]/10 px-3 py-1 rounded-full">
              <Sparkles className="w-4 h-4" />
              Kampanya ve Slogan Panosu
            </span>
            <h1
              className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] mt-3"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Hayvan Hakları Farkındalık Posterleri
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#1E293B]/80">
              Okul panolarında veya sosyal medyada paylaşabileceğiniz özgün farkındalık mesajları.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {AWARENESS_POSTERS.map((poster) => (
              <div
                key={poster.id}
                className={`${poster.theme} rounded-3xl p-6 shadow-lg flex flex-col justify-between min-h-[310px] relative overflow-hidden`}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-white/15">
                      {poster.badge}
                    </span>
                    <PawPrint className="w-5 h-5 opacity-75" />
                  </div>

                  <h2
                    className="text-xl font-extrabold mt-5 leading-snug"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {poster.slogan}
                  </h2>

                  <p className="text-xs sm:text-sm text-white/85 mt-3 leading-relaxed">
                    {poster.subtext}
                  </p>
                </div>

                <div className="relative z-10 pt-5 mt-5 border-t border-white/15 flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold text-white/80">{poster.footer}</span>
                  <button
                    onClick={() => handleCopyPosterSlogan(poster)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition cursor-pointer shrink-0"
                  >
                    {copiedPosterId === poster.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Kopyalandı</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Sloganı Kopyala</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fotoğraf Galerisi Bölümü */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Doğa ve Yaşam Fotoğraf Galerisi
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {galleryCats.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                    galleryCategory === cat
                      ? 'bg-[#1B4332] text-white'
                      : 'bg-white text-[#1E293B] hover:bg-[#1B4332]/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden shadow-md border border-[#1B4332]/10 group"
              >
                <div className="h-60 overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0F172A]/80 text-white text-xs font-bold">
                    {item.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-extrabold text-lg text-[#0F172A]">{item.title}</h3>
                  <p className="text-sm text-[#1E293B]/80 mt-1.5 leading-relaxed">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  };

  const renderReferencesPage = () => (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-md border border-[#1B4332]/10">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2D6A4F] bg-[#2D6A4F]/10 px-3 py-1 rounded-full">
          <BookOpen className="w-4 h-4" />
          Bilimsel ve Hukuki Kaynakça
        </span>
        <h1
          className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] mt-3"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Referanslar ve Güvenilir Kurum Bağlantıları
        </h1>
        <p className="mt-2 text-sm sm:text-base text-[#1E293B]/80 max-w-3xl">
          PATİ İZİ platformunda yer alan tüm hukuki maddeler, hayvan refahı standartları ve
          bilimsel açıklamalar aşağıdaki doğrulanmış kurum ve yayınlara dayanmaktadır.
        </p>
      </div>

      <div className="space-y-8">
        {REFERENCES_LIST.map((group, gIdx) => (
          <div
            key={gIdx}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#1B4332]/10"
          >
            <h2
              className="text-xl font-extrabold text-[#1B4332] mb-5 pb-3 border-b border-slate-100"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {group.category}
            </h2>

            <div className="space-y-4">
              {group.items.map((ref, rIdx) => (
                <div
                  key={rIdx}
                  className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#EA580C]">{ref.institution}</span>
                    <h3 className="font-bold text-sm sm:text-base text-[#0F172A]">{ref.title}</h3>
                    <p className="text-xs sm:text-sm text-[#1E293B]/80 leading-relaxed">
                      {ref.description}
                    </p>
                  </div>

                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-bold shrink-0 transition"
                  >
                    <span>Kaynağı Aç</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ==========================================================================
  // ANA YERLEŞİM (NAVBAR + İÇERİK + FOOTER)
  // ==========================================================================

  return (
    <div
      className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#0F172A] selection:bg-[#F97316] selection:text-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* SABİT ÜST NAVİGASYON */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#1B4332]/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-3">
            {/* Marka / Logo */}
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] text-white flex items-center justify-center shadow-md group-hover:scale-105 transition">
                <PawPrint className="w-6 h-6 text-[#F97316]" />
              </div>
              <div>
                <span
                  className="block text-xl font-extrabold tracking-tight text-[#0F172A] leading-none"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  PATİ İZİ
                </span>
                <span className="block text-[11px] font-semibold text-[#2D6A4F] mt-1">
                  Onların Sesi Ol, Haklarını Koru!
                </span>
              </div>
            </button>

            {/* Masaüstü Navigasyon */}
            <nav className="hidden xl:flex items-center gap-1" aria-label="Ana Menü">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#1B4332] text-white shadow-sm'
                        : 'text-[#1E293B] hover:bg-[#FAF8F5] hover:text-[#1B4332]'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F97316]' : ''}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Tablet / Mobil Menü Açma Butonu */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Menüyü Aç veya Kapat"
              className="xl:hidden p-2.5 rounded-xl bg-[#FAF8F5] text-[#0F172A] hover:bg-[#1B4332]/10 transition cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobil / Tablet Açılır Menü */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-slate-100 px-4 py-4 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition cursor-pointer ${
                      isActive
                        ? 'bg-[#1B4332] text-white'
                        : 'bg-[#FAF8F5] text-[#0F172A] hover:bg-[#1B4332]/10'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#F97316]' : 'text-[#2D6A4F]'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* ANA SAYFA İÇERİĞİ */}
      <main className="flex-1">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'knowledge' && renderKnowledgeCenter()}
        {activeTab === 'law' && renderLawPage()}
        {activeTab === 'report' && renderReportGuide()}
        {activeTab === 'volunteer' && renderVolunteerPage()}
        {activeTab === 'quiz' && renderQuizPage()}
        {activeTab === 'survey' && renderSurveyPage()}
        {activeTab === 'tubitak' && renderTubitakPage()}
        {activeTab === 'gallery' && renderGalleryPage()}
        {activeTab === 'references' && renderReferencesPage()}
      </main>

      {/* ALT BİLGİ (FOOTER) */}
      <footer className="bg-[#0F172A] text-[#FAF8F5] border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-white/10">
            <div className="md:col-span-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1B4332] flex items-center justify-center">
                  <PawPrint className="w-5 h-5 text-[#F97316]" />
                </div>
                <div>
                  <span
                    className="text-lg font-extrabold text-white"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    PATİ İZİ
                  </span>
                  <p className="text-xs text-[#F97316] font-semibold">
                    Onların Sesi Ol, Haklarını Koru!
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                9. Sınıf TÜBİTAK Öğrenci Araştırma Projesi kapsamında hazırlanan bilimsel ve
                toplumsal farkındalık platformudur. Tüm içerikler doğrulanmış ulusal ve uluslararası
                kaynaklar ışığında hazırlanmıştır.
              </p>
            </div>

            <div className="md:col-span-4 space-y-2">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Hızlı Erişim
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-1">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className="text-left hover:text-[#F97316] transition cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Acil Durum İhbar Hatları
              </h3>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                <p className="font-bold text-[#F97316]">• 112 Acil Çağrı Merkezi</p>
                <p className="font-bold text-white">• EGM HAYDİ Mobil Uygulaması</p>
                <p className="text-slate-300">• Belediye Veteriner İşleri (ALO 153)</p>
                <p className="text-slate-300">• Tarım ve Orman Bakanlığı DKMP</p>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© {new Date().getFullYear()} PATİ İZİ – Hayvan Haklarını Koruma ve Toplumsal Farkındalık Platformu.</p>
            <p>Bilim, Hukuk ve Empati ile Daha Yaşanabilir Bir Dünya İçin.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}