export type ServiceKey = "consulting" | "safety" | "supervision" | "interior" | "factory" | "modon";

export const servicesData: Record<ServiceKey, {
  slug: ServiceKey;
  title: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  description: { ar: string; en: string };
  image: string;
  features: { ar: string; en: string }[];
  deliverables: { ar: string; en: string }[];
  expertise: { ar: string; en: string }[];
}> = {
  consulting: {
    slug: "consulting",
    title: { ar: "الاستشارات الهندسية", en: "Engineering Consulting" },
    subtitle: { ar: "تصميم متكامل لمشاريعك الهندسية", en: "Comprehensive design for your engineering projects" },
    description: {
      ar: "نقدم خدمات الاستشارات الهندسية الشاملة التي تغطي جميع جوانب مشروعك من البداية إلى النهاية. فريقنا متخصص في التصميم المعماري والإنشائي والأنظمة الكهروميكانيكية بما يتوافق مع أعلى المعايير الهندسية.",
      en: "We provide comprehensive engineering consulting services that cover all aspects of your project from start to finish. Our team specializes in architectural and structural design and electromechanical systems aligned with the highest engineering standards."
    },
    image: "/images/service-bg-1.svg",
    features: [
      { ar: "تصميم معماري مبتكر", en: "Innovative Architectural Design" },
      { ar: "تصميم إنشائي آمن وفعال", en: "Safe and Efficient Structural Design" },
      { ar: "أنظمة كهروميكانيكية متطورة", en: "Advanced Electromechanical Systems" },
      { ar: "توافق كامل مع الأكواد السعودية", en: "Full Compliance with Saudi Building Codes" }
    ],
    deliverables: [
      { ar: "الرسومات المعمارية التفصيلية", en: "Detailed Architectural Drawings" },
      { ar: "الحسابات الإنشائية الهندسية", en: "Structural Engineering Calculations" },
      { ar: "مخططات الأنظمة الكهروميكانيكية", en: "MEP System Plans" },
      { ar: "المواصفات الفنية الشاملة", en: "Comprehensive Technical Specifications" },
      { ar: "جداول الكميات والتكاليف", en: "Bill of Quantities and Cost Estimates" }
    ],
    expertise: [
      { ar: "المباني السكنية والتجارية", en: "Residential and Commercial Buildings" },
      { ar: "المجمعات والمنتجعات", en: "Complexes and Resorts" },
      { ar: "المشاريع الصناعية", en: "Industrial Projects" },
      { ar: "البنية التحتية والمشاريع العامة", en: "Infrastructure and Public Projects" }
    ]
  },
  safety: {
    slug: "safety",
    title: { ar: "هندسة السلامة", en: "Safety Engineering" },
    subtitle: { ar: "نظم حماية شاملة من الحريق والكوارث", en: "Comprehensive fire and disaster protection systems" },
    description: {
      ar: "متخصصون في تصميم وتنفيذ أنظمة الحماية من الحريق والسلامة الشاملة. نوفر دراسات الجدوى الأمنية والامتثال الكامل لمتطلبات الدفاع المدني وجميع اللوائح الحكومية.",
      en: "Specialized in designing and implementing fire protection and comprehensive safety systems. We provide security feasibility studies and full compliance with Civil Defense requirements and all government regulations."
    },
    image: "/images/service-bg-2.svg",
    features: [
      { ar: "أنظمة إطفاء الحريق المتطورة", en: "Advanced Fire Suppression Systems" },
      { ar: "أنظمة الإنذار والتحذير", en: "Alarm and Warning Systems" },
      { ar: "دراسات التقييم الأمني", en: "Security Risk Assessment" },
      { ar: "توافق كامل مع الدفاع المدني", en: "Full Civil Defense Compliance" }
    ],
    deliverables: [
      { ar: "تقرير الدراسة الأمنية الشامل", en: "Comprehensive Security Assessment Report" },
      { ar: "مخططات أنظمة الحماية من الحريق", en: "Fire Protection System Plans" },
      { ar: "دليل التشغيل والصيانة", en: "Operation and Maintenance Manual" },
      { ar: "شهادات الامتثال الحكومية", en: "Government Compliance Certificates" },
      { ar: "برنامج التدريب للعاملين", en: "Staff Training Program" }
    ],
    expertise: [
      { ar: "الفنادق والمنتجعات السياحية", en: "Hotels and Resorts" },
      { ar: "المستشفيات ومراكز الرعاية الصحية", en: "Hospitals and Healthcare Facilities" },
      { ar: "المراكز التجارية والمكاتب", en: "Commercial Centers and Offices" },
      { ar: "المخازن والمصانع", en: "Warehouses and Factories" }
    ]
  },
  supervision: {
    slug: "supervision",
    title: { ar: "الإشراف الهندسي", en: "Engineering Supervision" },
    subtitle: { ar: "متابعة احترافية لضمان جودة التنفيذ", en: "Professional supervision to ensure execution quality" },
    description: {
      ar: "فريق خبرتنا في الإشراف الهندسي يضمن تنفيذ المشاريع وفقاً للمواصفات الهندسية والجداول الزمنية المتفق عليها. نوفر إشرافاً شاملاً لمشاريع القطاعين الحكومي والخاص بأعلى معايير الجودة.",
      en: "Our supervision team ensures projects are executed according to engineering specifications and agreed timelines. We provide comprehensive supervision of government and private sector projects with the highest quality standards."
    },
    image: "/images/service-bg-3.svg",
    features: [
      { ar: "متابعة يومية للموقع", en: "Daily Site Monitoring" },
      { ar: "فحص المواد والمقاولين", en: "Material and Contractor Inspection" },
      { ar: "ضمان الجودة والسلامة", en: "Quality and Safety Assurance" },
      { ar: "تقارير دورية شاملة", en: "Comprehensive Periodic Reports" }
    ],
    deliverables: [
      { ar: "خطة الإشراف الشاملة", en: "Comprehensive Supervision Plan" },
      { ar: "تقارير المتابعة الأسبوعية والشهرية", en: "Weekly and Monthly Progress Reports" },
      { ar: "سجلات فحص الجودة", en: "Quality Inspection Records" },
      { ar: "تقرير الاستلام النهائي", en: "Final Handover Report" },
      { ar: "توثيق الأصول والوثائق", en: "Project Documentation Files" }
    ],
    expertise: [
      { ar: "المشاريع الإنشائية الكبرى", en: "Large Construction Projects" },
      { ar: "مشاريع الحكومة والبلديات", en: "Government and Municipal Projects" },
      { ar: "المشاريع السكنية والتجارية", en: "Residential and Commercial Projects" },
      { ar: "المشاريع الصناعية والخاصة", en: "Industrial and Private Projects" }
    ]
  },
  interior: {
    slug: "interior",
    title: { ar: "التصميم الداخلي", en: "Interior Design" },
    subtitle: { ar: "تصاميم فريدة توازن بين الجمال والوظيفة", en: "Unique designs that balance beauty and functionality" },
    description: {
      ar: "خدمات التصميم الداخلي الإبداعية التي تحول المساحات إلى بيئات جذابة وعملية. نجمع بين الإبداع والتصميم الدقيق لإنشاء مساحات تعكس رؤيتك.",
      en: "Creative interior design services that transform spaces into attractive and practical environments. We combine creativity and precise design to create spaces that reflect your vision."
    },
    image: "/images/service-bg-1.svg",
    features: [
      { ar: "تصميم مساحات سكنية وتجارية", en: "Residential and Commercial Spaces" },
      { ar: "مخططات ثنائية وثلاثية الأبعاد", en: "2D and 3D Floor Plans" },
      { ar: "اختيار المواد والألوان المناسبة", en: "Material and Color Selection" },
      { ar: "إدارة المشروع من البداية للنهاية", en: "Full Project Management" }
    ],
    deliverables: [
      { ar: "الرسومات ثنائية الأبعاد التفصيلية", en: "Detailed 2D Drawings" },
      { ar: "التصورات ثلاثية الأبعاد الواقعية", en: "Realistic 3D Visualizations" },
      { ar: "جداول المواد والألوان", en: "Material and Color Palette Schedules" },
      { ar: "قائمة الأثاث والإكسسوارات", en: "Furniture and Accessories Lists" },
      { ar: "جدول الكميات والتكاليف", en: "Bills of Quantities and Cost Estimates" }
    ],
    expertise: [
      { ar: "الشقق والفيلات السكنية", en: "Apartments and Residential Villas" },
      { ar: "المكاتب التجارية والمؤسسات", en: "Commercial Offices and Institutions" },
      { ar: "الفنادق والمطاعم", en: "Hotels and Restaurants" },
      { ar: "المتاجر والعيادات الطبية", en: "Retail Stores and Medical Clinics" }
    ]
  },
  factory: {
    slug: "factory",
    title: { ar: "تصميم المصانع", en: "Factory Design" },
    subtitle: { ar: "تصاميم صناعية متقدمة لتحسين الإنتاجية", en: "Advanced industrial designs to enhance productivity" },
    description: {
      ar: "متخصصون في تصميم المصانع والمنشآت الصناعية بما يتوافق مع متطلبات هيئة المدن الصناعية والأكواس الهندسية. نوفر حلولاً صناعية متكاملة تحسن الإنتاجية والكفاءة.",
      en: "Specialized in designing factories and industrial facilities in compliance with Saudi Industrial Cities Authority and engineering codes. We provide integrated industrial solutions that improve productivity and efficiency."
    },
    image: "/images/service-bg-2.svg",
    features: [
      { ar: "تصميم معماري صناعي متطور", en: "Advanced Industrial Architectural Design" },
      { ar: "أنظمة الأمان والسلامة الصناعية", en: "Industrial Safety and Security Systems" },
      { ar: "تخطيط خطوط الإنتاج", en: "Production Line Planning" },
      { ar: "توافق مع معايير MODON والأكواد", en: "MODON and Code Compliance" }
    ],
    deliverables: [
      { ar: "المخططات المعمارية الصناعية", en: "Industrial Architectural Plans" },
      { ar: "تصاميم الأساسات والأعمدة", en: "Foundation and Column Designs" },
      { ar: "مخططات التهوية والأنظمة الكهروميكانيكية", en: "Ventilation and MEP Plans" },
      { ar: "دراسة الجدوى الاقتصادية", en: "Economic Feasibility Study" },
      { ar: "شهادات الامتثال الصناعي", en: "Industrial Compliance Certifications" }
    ],
    expertise: [
      { ar: "مصانع الألبان والمواد الغذائية", en: "Dairy and Food Factories" },
      { ar: "مصانع البلاستيك والكيماويات", en: "Plastic and Chemical Plants" },
      { ar: "منشآت الخدمات اللوجستية", en: "Logistics Facilities" },
      { ar: "المنشآت الصناعية المتعددة", en: "Multi-Purpose Industrial Facilities" }
    ]
  },
  modon: {
    slug: "modon",
    title: { ar: "التوافق مع MODON", en: "MODON Compliance" },
    subtitle: { ar: "امتثال كامل لمتطلبات هيئة المدن الصناعية", en: "Full compliance with MODON requirements" },
    description: {
      ar: "نوفر خدمات متخصصة لضمان امتثال المشاريع الصناعية الكاملة لمتطلبات هيئة المدن الصناعية (MODON) والكود السعودي. فريقنا على اطلاع دائم بآخر التعديلات والمعايير.",
      en: "We provide specialized services to ensure complete compliance of industrial projects with MODON (Saudi Industrial Cities Authority) requirements and the Saudi Building Code. Our team stays updated with the latest amendments and standards."
    },
    image: "/images/service-bg-3.svg",
    features: [
      { ar: "معرفة عميقة بمتطلبات MODON", en: "In-Depth MODON Requirements Knowledge" },
      { ar: "توافق مع الكود السعودي الجديد", en: "Saudi Building Code Compliance" },
      { ar: "معالجة المستندات والترخيص", en: "Documentation and Licensing Processing" },
      { ar: "استشارات دورية ومحدثة", en: "Periodic Updated Consultations" }
    ],
    deliverables: [
      { ar: "دراسة الجدوى الموافقة", en: "Approved Feasibility Study" },
      { ar: "المخططات المعتمدة من MODON", en: "MODON-Approved Plans" },
      { ar: "شهادة التوافق", en: "Compliance Certificate" },
      { ar: "ملف المشروع الكامل", en: "Complete Project File" },
      { ar: "دعم في عملية الموافقة", en: "Approval Process Support" }
    ],
    expertise: [
      { ar: "مراكز وهيئات MODON المختلفة", en: "Various MODON Centers and Authorities" },
      { ar: "المشاريع الصناعية الناشئة", en: "Start-up Industrial Projects" },
      { ar: "التوسع والتطوير الصناعي", en: "Industrial Expansion and Development" },
      { ar: "الاستشارات القانونية والتقنية", en: "Legal and Technical Consultations" }
    ]
  }
};

export function getServiceBySlug(slug: string): typeof servicesData[ServiceKey] | null {
  if (slug in servicesData) {
    return servicesData[slug as ServiceKey];
  }
  return null;
}

export function getAllServiceSlugs(): ServiceKey[] {
  return Object.keys(servicesData) as ServiceKey[];
}
