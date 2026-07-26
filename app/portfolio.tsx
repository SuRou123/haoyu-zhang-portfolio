"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

type PageKind = "home" | "academic" | "design" | "profile";

const navItems = [
  { href: "/", cn: "主页", en: "Home" },
  { href: "/academic", cn: "学术研究", en: "Research" },
  { href: "/design", cn: "设计实践", en: "Design" },
  { href: "/profile", cn: "个人履历", en: "Profile" },
];

const competitionCertificates = [
  {
    year: "2025",
    event: "全国三维数字化创新设计大赛",
    award: "龙鼎奖 · 全国总决赛一等奖",
    project: "E-Vbell 穿戴式漏斗胸矫正产品",
    role: "第一作者",
    image: "/assets/certificates/competition-3d-national-first.jpg",
    thumb: "/assets/certificates/thumb-competition-3d-national-first.webp",
  },
  {
    year: "2026",
    event: "米兰设计周中国高校设计学科师生优秀作品展",
    award: "全国决赛一等奖",
    project: "SHIFTER 多功能移位轮椅",
    role: "第一作者",
    image: "/assets/certificates/competition-milan-shifter-national-first.png",
    thumb: "/assets/certificates/thumb-competition-milan-shifter-national-first.webp",
  },
  {
    year: "2025",
    event: "全国高校数字艺术设计大赛",
    award: "全国总决赛一等奖",
    project: "Shift-X 行动障碍老年人家居轮椅设计",
    role: "第二作者",
    image: "/assets/certificates/full/ncda-shift-x-national-first.pdf",
    thumb: "/assets/certificates/thumbs/ncda-shift-x-national-first.webp",
  },
  {
    year: "2025",
    event: "DNA Paris Design Awards",
    award: "Product Design Winner",
    project: "Grow With You 成长型假肢",
    role: "第三作者",
    image: "/assets/certificates/full/dna-paris-grow-with-you-winner.pdf",
    thumb: "/assets/certificates/thumbs/dna-paris-grow-with-you-winner.webp",
  },
  {
    year: "2026",
    event: "米兰设计周中国高校设计学科师生优秀作品展",
    award: "全国决赛二等奖",
    project: "ROLLOVER ASSIST 翻身辅助床",
    role: "第一作者",
    image: "/assets/certificates/competition-milan-rollover-national-second.png",
    thumb: "/assets/certificates/thumb-competition-milan-rollover-national-second.webp",
  },
  {
    year: "2026",
    event: "米兰设计周中国高校设计学科师生优秀作品展",
    award: "全国决赛二等奖",
    project: "Shift-X 行动障碍老年人家居轮椅",
    role: "第一作者",
    image: "/assets/certificates/competition-milan-shiftx-national-second.png",
    thumb: "/assets/certificates/thumb-competition-milan-shiftx-national-second.webp",
  },
  {
    year: "2025",
    event: "第六届东方创意之星创新设计大赛",
    award: "全国总决赛银奖",
    project: "面向青少年患者的穿戴式漏斗胸矫正产品",
    role: "第一作者",
    image: "/assets/certificates/full/orient-star-chest-silver.jpg",
    thumb: "/assets/certificates/thumbs/orient-star-chest-silver.webp",
  },
  {
    year: "2025",
    event: "东方设计奖·全国高校创新设计大赛",
    award: "全国决赛二等奖",
    project: "针对偏远地区轨道的无人检修车",
    role: "第一作者",
    image: "/assets/certificates/full/orient-design-rail-national-second.jpg",
    thumb: "/assets/certificates/thumbs/orient-design-rail-national-second.webp",
  },
  {
    year: "2025",
    event: "中国研究生“美丽中国”创新设计大赛",
    award: "全国决赛二等奖",
    project: "面向青少年患者的穿戴式漏斗胸矫正产品",
    role: "第一作者",
    image: "/assets/certificates/full/beautiful-china-chest-national-second.jpg",
    thumb: "/assets/certificates/thumbs/beautiful-china-chest-national-second.webp",
  },
  {
    year: "2025",
    event: "全国高校数字艺术设计大赛",
    award: "全国总决赛二等奖",
    project: "Grow With You 成长型假肢",
    role: "第二作者",
    image: "/assets/certificates/full/ncda-grow-with-you-national-second.pdf",
    thumb: "/assets/certificates/thumbs/ncda-grow-with-you-national-second.webp",
  },
  {
    year: "2025",
    event: "中国好创意暨全国数字艺术设计大赛",
    award: "国赛二等奖",
    project: "远洋船舶除锈机器人",
    role: "第二作者",
    image: "/assets/certificates/full/china-creativity-ship-national-second.jpg",
    thumb: "/assets/certificates/thumbs/china-creativity-ship-national-second.webp",
  },
  {
    year: "2025",
    event: "蓝桥杯全国软件和信息技术专业人才大赛",
    award: "全国总决赛二等奖",
    project: "远洋船舶除锈机器人",
    role: "第三作者",
    image: "/assets/certificates/full/bluebridge-ship-national-second.jpg",
    thumb: "/assets/certificates/thumbs/bluebridge-ship-national-second.webp",
  },
  {
    year: "2025",
    event: "第六届东方创意之星创新设计大赛",
    award: "全国总决赛银奖",
    project: "子母式山区医疗系统设计",
    role: "第四作者",
    image: "/assets/certificates/full/orient-star-medical-silver.jpg",
    thumb: "/assets/certificates/thumbs/orient-star-medical-silver.webp",
  },
  {
    year: "2025",
    event: "全国大学生数字媒体科技作品及创意竞赛",
    award: "全国总决赛三等奖",
    project: "铁幕游侠——偏远地区轨道无人检修车",
    role: "第一作者",
    image: "/assets/certificates/competition-cmit-tiemu-national-third.jpg",
    thumb: "/assets/certificates/thumb-competition-cmit-tiemu-national-third.webp",
  },
  {
    year: "2025",
    event: "全国高校数字艺术设计大赛",
    award: "全国总决赛三等奖",
    project: "针对偏远地区轨道的无人检修车",
    role: "第一作者",
    image: "/assets/certificates/full/ncda-rail-inspection-national-third.pdf",
    thumb: "/assets/certificates/thumbs/ncda-rail-inspection-national-third.webp",
  },
  {
    year: "2025",
    event: "蓝桥杯全国软件和信息技术专业人才大赛",
    award: "全国总决赛三等奖",
    project: "针对偏远地区轨道的无人检修车",
    role: "第一作者",
    image: "/assets/certificates/full/bluebridge-rail-national-third.jpg",
    thumb: "/assets/certificates/thumbs/bluebridge-rail-national-third.webp",
  },
  {
    year: "2025",
    event: "全国大学生数字媒体科技作品及创意竞赛",
    award: "全国总决赛三等奖",
    project: "LEVITATION 镜像复健外骨骼",
    role: "第二作者",
    image: "/assets/certificates/full/cmit-levitation-national-third.jpg",
    thumb: "/assets/certificates/thumbs/cmit-levitation-national-third.webp",
  },
  {
    year: "2025",
    event: "全国大学生数字媒体科技作品及创意竞赛",
    award: "全国总决赛三等奖",
    project: "子母式山区医疗系统设计",
    role: "第二作者",
    image: "/assets/certificates/full/cmit-mountain-medical-national-third.jpg",
    thumb: "/assets/certificates/thumbs/cmit-mountain-medical-national-third.webp",
  },
  {
    year: "2025",
    event: "东方设计奖·全国高校创新设计大赛",
    award: "全国决赛三等奖",
    project: "SpotlessMate 远洋船舶除锈机器人",
    role: "第二作者",
    image: "/assets/certificates/full/orient-design-spotlessmate-national-third.jpg",
    thumb: "/assets/certificates/thumbs/orient-design-spotlessmate-national-third.webp",
  },
  {
    year: "2025",
    event: "全国大学生数字媒体科技作品及创意竞赛",
    award: "全国总决赛三等奖",
    project: "COMBO-LIFE 模块化移位轮椅",
    role: "第三作者",
    image: "/assets/certificates/full/cmit-combo-life-national-third.jpg",
    thumb: "/assets/certificates/thumbs/cmit-combo-life-national-third.webp",
  },
  {
    year: "2025",
    event: "James Dyson Award",
    award: "中国区前 50 强入围",
    project: "Row With You 成长型假肢",
    role: "第一作者",
    image: "/assets/certificates/full/james-dyson-row-with-you-top-50.png",
    thumb: "/assets/certificates/thumbs/james-dyson-row-with-you-top-50.webp",
  },
  {
    year: "2025",
    event: "第六届东方创意之星创新设计大赛",
    award: "国赛参评作品",
    project: "远洋船舶除锈车",
    role: "第二作者",
    image: "/assets/certificates/full/orient-star-ship-participation.pdf",
    thumb: "/assets/certificates/thumbs/orient-star-ship-participation.webp",
  },
  {
    year: "2025",
    event: "金芦苇工业设计奖",
    award: "入围作品",
    project: "LEVITATION 镜像复健外骨骼",
    role: "第三作者",
    image: "/assets/certificates/full/goldreed-levitation-shortlist.jpg",
    thumb: "/assets/certificates/thumbs/goldreed-levitation-shortlist.webp",
  },
];

const honorCertificates = [
  {
    year: "2025",
    title: "湖北工业大学研究生“十大学术新星”",
    issuer: "湖北工业大学",
    image: "/assets/certificates/honor-academic-star-2025.jpg",
    thumb: "/assets/certificates/thumb-honor-academic-star-2025.webp",
  },
  {
    year: "2025",
    title: "第29届全国工业设计学术年会优秀论文",
    issuer: "全国工业设计学术年会",
    image: "/assets/certificates/honor-acidc-excellent-paper.jpg",
    thumb: "/assets/certificates/thumb-honor-acidc-excellent-paper.webp",
  },
  {
    year: "2024—2025",
    title: "湖北工业大学优秀研究生",
    issuer: "湖北工业大学",
    image: "/assets/certificates/honor-outstanding-postgraduate.jpg",
    thumb: "/assets/certificates/thumb-honor-outstanding-postgraduate.webp",
  },
  {
    year: "2024—2025",
    title: "一等硕士学业奖学金",
    issuer: "湖北工业大学",
    image: "/assets/certificates/honor-first-class-scholarship.jpg",
    thumb: "/assets/certificates/thumb-honor-first-class-scholarship.webp",
  },
  {
    year: "2024",
    title: "安徽省普通高等学校优秀毕业生",
    issuer: "安徽省教育厅等",
    image: "/assets/certificates/honor-provincial-graduate.jpg",
    thumb: "/assets/certificates/thumb-honor-provincial-graduate.webp",
  },
  {
    year: "2022—2023",
    title: "国家励志奖学金",
    issuer: "安徽省教育厅",
    image: "/assets/certificates/honor-national-inspiration-scholarship.jpg",
    thumb: "/assets/certificates/thumb-honor-national-inspiration-scholarship.webp",
  },
];

const publications = [
  {
    number: "01",
    key: "BreatheBuddy",
    title:
      "Gamified Feedback-Based Training System for Pediatric Asthma Inhaler Use: Mixed Methods Randomized Crossover Study",
    venue: "JMIR Serious Games · 2026 · Q1",
    role: "FIRST AUTHOR",
    authors: "Haoyu Zhang, Xiaoying Li",
    method: "n = 20 · Repeated-measures · RESP + PENS / GUESS / SUS",
    summary:
      "将吸气、屏息与呼气行为映射为实时游戏反馈，以混合方法验证儿童吸入训练的准确性、参与度与可用性。",
    image: "/assets/research/breathebuddy-v2.webp",
    doi: "https://doi.org/10.2196/85673",
    doiCode: "10.2196/85673",
    pdf: "/downloads/breathebuddy-asthma-training.pdf",
    accent: "cyan",
  },
  {
    number: "02",
    key: "Digital Prayer Beads",
    title:
      "Digital Prayer Beads: Adaptive Kinesthetic Mindfulness Device for Emotion Regulation and Stress Relief",
    venue: "International Journal of Human–Computer Interaction · 2026 · Q1",
    role: "FIRST AUTHOR",
    authors: "Haoyu Zhang, Xiaoying Li",
    method: "n = 30 · Three conditions · STAI-S + EDA + HRV",
    summary:
      "以拇指拨动为核心具身动作，融合自适应视听反馈，研究动觉正念对焦虑缓解与情绪调节的作用。",
    image: "/assets/research/prayer-beads.webp",
    doi: "https://doi.org/10.1080/10447318.2026.2674839",
    doiCode: "10.1080/10447318.2026.2674839",
    pdf: "/downloads/digital-prayer-beads.pdf",
    accent: "violet",
  },
  {
    number: "03",
    key: "METUX Visual Training",
    title:
      "A Three-Stage Visual Training Evaluation Based on the METUX Model: Motivation, Engagement, and Well-Being",
    venue: "International Journal of Human–Computer Interaction · 2026 · Q1",
    role: "SECOND AUTHOR",
    authors: "Xiaoying Li, Haoyu Zhang, Guangran Li",
    method: "n = 20 · Eye tracking + EDA · Three-stage evaluation",
    summary:
      "基于 METUX 构建“动机—参与—福祉”递进式评价框架，以眼动控制与生理数据检验视觉训练体验。",
    image: "/assets/research/metux.webp",
    doi: "https://doi.org/10.1080/10447318.2026.2638553",
    doiCode: "10.1080/10447318.2026.2638553",
    pdf: "/downloads/metux-visual-training.pdf",
    accent: "blue",
  },
  {
    number: "04",
    key: "HopeLumina",
    title:
      "A Family Emotional Support System for MCS Patients Based on an EEG-to-Visual Translation Mechanism",
    venue: "Applied Sciences · 2025",
    role: "FIRST AUTHOR",
    authors: "Haoyu Zhang, Xiaoying Li",
    method: "EEG-to-visual mapping · TouchDesigner · User evaluation",
    summary:
      "将脑电特征转译为可感知的动态视觉意象，为最低意识状态患者家庭提供情绪理解与支持的新媒介。",
    image: "/assets/research/hopelumina.webp",
    doi: "https://doi.org/10.3390/app152011149",
    doiCode: "10.3390/app152011149",
    pdf: "/downloads/hopelumina-eeg-visual.pdf",
    accent: "violet",
  },
  {
    number: "05",
    key: "BioFit KG",
    title:
      "Biodata-Driven Knowledge Graph Recommendation System: Fusing Foot and Leg Characteristics for Personalised Shoe Recommendation",
    venue: "Applied Sciences · 2025",
    role: "FIRST AUTHOR",
    authors: "Haoyu Zhang, Xiaoying Li",
    method: "Plantar pressure + Depth camera · Knowledge graph",
    summary:
      "融合足底压力、腿部形态与鞋款属性，构建可解释的知识图谱推荐系统，拓展人体数据驱动的个性化设计。",
    image: "/assets/research/shoe-graph.webp",
    doi: "https://doi.org/10.3390/app152011281",
    doiCode: "10.3390/app152011281",
    pdf: "/downloads/biofit-knowledge-graph.pdf",
    accent: "cyan",
  },
  {
    number: "06",
    key: "Parametric Helmet",
    title: "头部数字化和规则驱动的头盔参数化设计",
    venue: "机械设计 · 2025 · CSCD",
    role: "SECOND AUTHOR",
    authors: "李晓英, 张浩宇, 尹昊",
    method: "SFM / MVS · Grasshopper · Jack ergonomics simulation",
    summary:
      "由多视角图像重建个体头型，并以关键解剖点驱动头盔内衬与外壳参数化生成，支持低成本在线定制。",
    image: "/assets/research/helmet.webp",
    doi: "https://doi.org/10.13841/j.cnki.jxsj.2025.12.039",
    doiCode: "10.13841/j.cnki.jxsj.2025.12.039",
    pdf: "/downloads/parametric-helmet.pdf",
    accent: "blue",
  },
];

const designCases = [
  {
    index: "01",
    slug: "levitation",
    title: "LEVITATION",
    subtitle: "镜像康复外骨骼",
    type: "医疗康复 × 智能硬件",
    description:
      "基于镜像疗法，将健侧上肢姿态传递至患侧外骨骼，为偏瘫患者构建可自主控制的个性化训练闭环。",
    image: "/assets/design/levitation.webp",
  },
  {
    index: "02",
    slug: "grow-with-you",
    title: "Grow With You",
    subtitle: "儿童成长型假肢系统",
    type: "包容性产品 × 儿童健康",
    description:
      "面向肢体残障儿童随成长频繁更换假肢的问题，以可调节结构延长产品使用周期，降低家庭负担。",
    image: "/assets/design/grow-with-you.webp",
  },
  {
    index: "03",
    slug: "hopelumina",
    title: "HopeLumina",
    subtitle: "脑电情绪可视化系统",
    type: "生理信号 × 情绪媒介",
    description:
      "连接脑电采集、情绪特征与实时粒子视觉，使不可见的状态成为家庭成员可理解、可回应的情感媒介。",
    image: "/assets/design/hopelumina.webp",
  },
  {
    index: "04",
    slug: "pebble",
    title: "Pebble",
    subtitle: "代际支持陪伴机器人",
    type: "服务机器人 × 思辨设计",
    description:
      "以儿童化身为叙事线索，探索陪伴机器人如何介入代际支持、情绪照护与主动老龄化议题。",
    image: "/assets/design/pebble.webp",
  },
  {
    index: "05",
    slug: "protecting-health",
    title: "Protecting Health",
    subtitle: "社区废水健康监测终端",
    type: "公共健康 × 服务系统",
    description:
      "围绕社区废水采样、监测与健康信息呈现，整合硬件终端、操作流程和多端交互界面。",
    image: "/assets/design/protecting-health.webp",
  },
  {
    index: "06",
    slug: "shifter",
    title: "SHIFTER",
    subtitle: "多功能床椅转换系统",
    type: "适老化 × 移动辅具",
    description:
      "通过分体式结构实现轮椅、床边移动与生活辅助场景之间的转换，回应行动不便人群的连续照护需求。",
    image: "/assets/design/shifter.webp",
  },
];

const currentResearch = [
  {
    code: "R·01",
    title: "DrawnToLife",
    subtitle: "Fostering Agency in Autistic Children",
    text: "以 2D 绘画到 3D 增强现实创作为媒介，通过“意愿—表达—存在”三阶外化支架激发孤独症儿童能动性。",
    tags: ["Autism", "Agency", "AR", "Creative HCI"],
  },
  {
    code: "R·02",
    title: "BubbleSeal",
    subtitle: "Tactile Seeking & Co-Regulation",
    text: "将儿童挤压行为转化为连续泡泡反馈，并以双人同步模式支持触觉寻求、模仿与成人—儿童共调节。",
    tags: ["Tangible", "Co-regulation", "ASD", "Sensing"],
  },
  {
    code: "R·03",
    title: "Emotion Sprite",
    subtitle: "Emotion Recognition & Intervention",
    text: "围绕线索学习、情绪归类与情境理解构建游戏化评估和纵向干预，探索更可参与的情绪学习路径。",
    tags: ["Emotion", "Serious Game", "Children", "Evaluation"],
  },
];

export function Arrow({ down = false }: { down?: boolean }) {
  return (
    <span aria-hidden="true" className={down ? "arrow arrow-down" : "arrow"}>
      {down ? "↓" : "↗"}
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="返回张浩宇个人主页">
        <span className="brand-mark">HZ</span>
        <span className="brand-text">
          <strong>张浩宇</strong>
          <small>RESEARCH × DESIGN</small>
        </span>
      </Link>

      <button
        className="menu-button"
        type="button"
        aria-label="打开导航"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <i />
        <i />
      </button>

      <nav className={open ? "main-nav is-open" : "main-nav"} aria-label="主导航">
        {navItems.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={active ? "nav-link is-active" : "nav-link"}
              onClick={() => setOpen(false)}
            >
              <span>{item.cn}</span>
              <small>{item.en}</small>
            </Link>
          );
        })}
      </nav>

      <a className="header-contact" href="mailto:102411488@hbut.edu.cn">
        <span>Let&apos;s talk</span>
        <Arrow />
      </a>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <p className="eyebrow">OPEN TO PHD OPPORTUNITIES · 2027</p>
        <h2>
          让严谨研究成为
          <br />
          <span>可被体验的未来。</span>
        </h2>
      </div>
      <div className="footer-contact">
        <p>Academic collaboration · PhD opportunities · Design research</p>
        <a href="mailto:102411488@hbut.edu.cn">
          102411488@hbut.edu.cn <Arrow />
        </a>
        <div className="footer-links">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.en}
            </Link>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Haoyu Zhang</span>
        <span>Wuhan, China · GMT+8</span>
        <a href="#top">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}

function SectionIntro({
  code,
  label,
  title,
  text,
}: {
  code: string;
  label: string;
  title: ReactNode;
  text?: string;
}) {
  return (
    <div className="section-intro reveal">
      <div className="section-kicker">
        <span>{code}</span>
        <p>{label}</p>
      </div>
      <div>
        <h2>{title}</h2>
        {text && <p className="section-description">{text}</p>}
      </div>
    </div>
  );
}

function HeroOrbit() {
  return (
    <div className="orbit-stage reveal" role="img" aria-label="张浩宇研究方向图谱">
      <div className="orbit-grid" />
      <div className="orbit-ring orbit-ring-a" />
      <div className="orbit-ring orbit-ring-b" />
      <div className="orbit-ring orbit-ring-c" />
      <div className="portrait-shell">
        <img
          src="/assets/profile/haoyu-lifestyle-beijing.jpg"
          alt="张浩宇生活照"
          width="1536"
          height="2048"
        />
        <span className="portrait-scan" />
      </div>
      <div className="orbit-node node-a">
        <i />
        <span>HCI</span>
      </div>
      <div className="orbit-node node-b">
        <i />
        <span>DIGITAL HEALTH</span>
      </div>
      <div className="orbit-node node-c">
        <i />
        <span>EMBODIED INTERACTION</span>
      </div>
      <div className="orbit-node node-d">
        <i />
        <span>INCLUSIVE DESIGN</span>
      </div>
      <div className="orbit-readout">
        <span>RESEARCHER</span>
        <b>04</b>
        <span>MAKER</span>
      </div>
    </div>
  );
}

function HomePage() {
  const evidence = [
    {
      key: "R",
      title: "Research Framing",
      cn: "研究问题与理论构建",
      text: "从真实情境出发，将行为、心理与交互机制转化为可验证的研究命题。",
    },
    {
      key: "P",
      title: "Prototype Making",
      cn: "软硬件原型实现",
      text: "贯通传感器、交互程序、智能硬件与高保真视觉，独立完成研究原型。",
    },
    {
      key: "E",
      title: "Empirical Evaluation",
      cn: "多模态实验验证",
      text: "结合实验设计、行为观察、主观量表与 EEG / EDA / HRV / 眼动数据。",
    },
    {
      key: "T",
      title: "Translation",
      cn: "成果转化与落地",
      text: "将研究输出为论文、系统、产品与真实项目，形成从证据到应用的闭环。",
    },
  ];

  return (
    <>
      <main id="top">
        <section className="home-hero page-frame">
          <div className="hero-copy">
            <p className="eyebrow reveal">HAOYU ZHANG · PORTFOLIO 2026</p>
            <h1 className="reveal">
              以设计理解人，
              <br />
              以研究
              <br />
              <span>验证未来。</span>
            </h1>
            <p className="hero-summary reveal">
              工业设计工程硕士研究生，聚焦
              <strong>数字健康、人机交互、具身交互与包容性智能硬件</strong>。
              我将设计洞察转化为可运行系统，再用实证研究检验其真实价值。
            </p>
            <div className="hero-actions reveal">
              <Link className="button button-primary" href="/academic">
                进入学术主页 <Arrow />
              </Link>
              <Link className="button button-ghost" href="/design">
                查看设计实践 <span>→</span>
              </Link>
            </div>
            <div className="hero-meta reveal">
              <span>01 / CHILD HEALTH</span>
              <span>02 / NEURODIVERSITY</span>
              <span>03 / EMBODIED SYSTEMS</span>
            </div>
          </div>
          <HeroOrbit />
          <div className="scroll-cue">
            <span>SCROLL TO EXPLORE</span>
            <Arrow down />
          </div>
        </section>

        <section className="proof-strip">
          {[
            ["06", "篇论文", "PUBLISHED / ACCEPTED"],
            ["20", "项国家级奖项", "NATIONAL AWARDS"],
            ["44", "项省级及国际奖项", "PROVINCIAL / GLOBAL"],
            ["03", "项企业落地项目", "DELIVERED PROJECTS"],
          ].map(([value, label, en]) => (
            <div className="proof-item reveal" key={en}>
              <b>{value}</b>
              <div>
                <span>{label}</span>
                <small>{en}</small>
              </div>
            </div>
          ))}
        </section>

        <section className="page-section page-frame">
          <SectionIntro
            code="01"
            label="PHD-READY PROFILE"
            title={
              <>
                不只是展示成果，
                <br />
                更展示<span>如何完成研究。</span>
              </>
            }
            text="网站的信息顺序围绕博士申请评审逻辑展开：明确的研究议程、稳定的实证能力、完整的实现能力，以及跨场景转化潜力。"
          />
          <div className="evidence-grid">
            {evidence.map((item, index) => (
              <article
                className="evidence-card reveal"
                key={item.key}
                style={{ "--delay": `${index * 70}ms` } as CSSProperties}
              >
                <div className="evidence-top">
                  <span>{item.key}</span>
                  <i>0{index + 1}</i>
                </div>
                <h3>{item.title}</h3>
                <h4>{item.cn}</h4>
                <p>{item.text}</p>
                <div className="card-line" />
              </article>
            ))}
          </div>
        </section>

        <section className="page-section featured-research">
          <div className="page-frame">
            <SectionIntro
              code="02"
              label="SELECTED RESEARCH"
              title={
                <>
                  从交互概念到
                  <br />
                  <span>可复核的证据。</span>
                </>
              }
              text="代表性研究覆盖儿童数字健康、动觉正念与意识障碍家庭支持，均以可运行原型连接设计问题与实证评估。"
            />
            <div className="research-stack">
              {publications.slice(0, 3).map((paper) => (
                <article className="research-feature reveal" key={paper.key}>
                  <div className="feature-index">
                    <span>{paper.number}</span>
                    <small>{paper.role}</small>
                  </div>
                  <div className="feature-visual">
                    <img src={paper.image} alt={`${paper.key} 研究图示`} />
                    <div className="image-sheen" />
                  </div>
                  <div className="feature-copy">
                    <p>{paper.venue}</p>
                    <h3>{paper.key}</h3>
                    <h4>{paper.title}</h4>
                    <p className="feature-summary">{paper.summary}</p>
                    <span className="method-chip">{paper.method}</span>
                    <a href={paper.doi} target="_blank" rel="noreferrer">
                      DOI / READ PAPER <Arrow />
                    </a>
                  </div>
                </article>
              ))}
            </div>
            <div className="section-action reveal">
              <p>完整论文、研究方法与当前研究议程</p>
              <Link className="text-link" href="/academic">
                VIEW ACADEMIC PROFILE <Arrow />
              </Link>
            </div>
          </div>
        </section>

        <section className="page-section page-frame">
          <SectionIntro
            code="03"
            label="DESIGN AS EVIDENCE"
            title={
              <>
                设计不是包装，
                <br />
                而是<span>研究发生的界面。</span>
              </>
            }
            text="从康复外骨骼、成长型假肢到情绪可视化和公共健康系统，我持续探索产品形态、技术机制与社会价值之间的连接。"
          />
          <div className="home-design-grid">
            {designCases.slice(0, 4).map((item, index) => (
              <Link
                className={`home-design-card home-design-card-${index + 1} reveal`}
                href={`/design/${item.slug}`}
                key={item.title}
              >
                <img src={item.image} alt={`${item.title} ${item.subtitle}`} />
                <div className="design-card-overlay">
                  <span>{item.index} / {item.type}</span>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="capability-marquee reveal" aria-label="专业能力">
            <div>
              <span>USER RESEARCH</span>
              <i>✦</i>
              <span>EXPERIMENTAL DESIGN</span>
              <i>✦</i>
              <span>INTELLIGENT HARDWARE</span>
              <i>✦</i>
              <span>PHYSIOLOGICAL SENSING</span>
              <i>✦</i>
              <span>INTERACTION PROTOTYPING</span>
              <i>✦</i>
              <span>DATA ANALYSIS</span>
            </div>
          </div>
        </section>

        <section className="page-section research-process">
          <div className="page-frame">
            <SectionIntro
              code="04"
              label="END-TO-END CAPABILITY"
              title={
                <>
                  一条完整的
                  <br />
                  <span>研究—设计闭环。</span>
                </>
              }
            />
            <div className="process-track reveal">
              {[
                ["01", "Field Inquiry", "情境观察 / 访谈 / 需求洞察"],
                ["02", "Research Framing", "理论建构 / 假设 / 指标设计"],
                ["03", "System Making", "软硬件原型 / 交互实现"],
                ["04", "Empirical Study", "实验 / 生理数据 / 混合方法"],
                ["05", "Knowledge Output", "论文 / 设计成果 / 项目落地"],
              ].map(([number, title, text]) => (
                <div className="process-step" key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function AcademicPageContent() {
  return (
    <>
      <main id="top">
        <section className="inner-hero academic-hero page-frame">
          <div className="inner-hero-copy">
            <p className="eyebrow reveal">ACADEMIC PROFILE / 学术主页</p>
            <h1 className="reveal">
              Designing interactive systems
              <br />
              <span>that can be tested.</span>
            </h1>
            <p className="reveal">
              研究聚焦于数字健康、具身交互与包容性 HCI：以人本问题定义技术，
              以工作原型承载机制，以混合方法与多模态数据验证真实影响。
            </p>
          </div>
          <div className="academic-signal reveal">
            <div className="signal-orbit signal-orbit-a" />
            <div className="signal-orbit signal-orbit-b" />
            <div className="signal-core">
              <span>RESEARCH</span>
              <b>06</b>
              <small>PEER-REVIEWED WORKS</small>
            </div>
            <div className="signal-label label-a">HEALTH</div>
            <div className="signal-label label-b">AGENCY</div>
            <div className="signal-label label-c">EMBODIMENT</div>
          </div>
        </section>

        <section className="academic-stats">
          {[
            ["06", "PUBLISHED / ACCEPTED", "已发表及录用论文"],
            ["06", "FIRST / CORRESPONDING AUTHOR", "第一作者 / 通讯作者论文"],
            ["03", "Q1 JOURNAL WORKS", "Q1 期刊成果"],
            ["05+", "EMPIRICAL SYSTEMS", "实证型交互系统"],
          ].map(([value, en, cn]) => (
            <div className="academic-stat reveal" key={en}>
              <b>{value}</b>
              <p>{en}</p>
              <span>{cn}</span>
            </div>
          ))}
        </section>

        <section className="page-section page-frame agenda-section">
          <SectionIntro
            code="A·01"
            label="RESEARCH AGENDA"
            title={
              <>
                当前议程：
                <br />
                <span>儿童健康、孤独症与能动性。</span>
              </>
            }
            text="下一阶段将围绕特殊儿童的非语言表达、感觉调节与社会互动，探索具身、可触、可共创的智能交互系统。"
          />
          <div className="agenda-grid">
            {currentResearch.map((item, index) => (
              <article
                className="agenda-card reveal"
                key={item.title}
                style={{ "--delay": `${index * 80}ms` } as CSSProperties}
              >
                <div className="agenda-code">
                  <span>{item.code}</span>
                  <small>WORK IN PROGRESS</small>
                </div>
                <div className="agenda-visual">
                  <i />
                  <i />
                  <i />
                  <span>{index + 1}</span>
                </div>
                <h3>{item.title}</h3>
                <h4>{item.subtitle}</h4>
                <p>{item.text}</p>
                <div className="tag-row">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="page-section publications-section">
          <div className="page-frame">
            <SectionIntro
              code="A·02"
              label="PUBLICATIONS"
              title={
                <>
                  论文不是终点，
                  <br />
                  而是<span>可复核的研究记录。</span>
                </>
              }
              text="六项成果形成从儿童行为训练、心理调节、情绪支持，到人体数据驱动设计的连续研究轨迹。"
            />
            <div className="publication-list">
              {publications.map((paper) => (
                <article
                  className={`publication-card accent-${paper.accent} reveal`}
                  key={paper.key}
                >
                  <div className="publication-image">
                    <img src={paper.image} alt={`${paper.key} 论文图示`} />
                    <span>{paper.number}</span>
                  </div>
                  <div className="publication-body">
                    <div className="publication-meta">
                      <span>{paper.role}</span>
                      <p>{paper.venue}</p>
                    </div>
                    <h3>{paper.title}</h3>
                    <p className="publication-authors">{paper.authors}</p>
                    <p className="publication-summary">{paper.summary}</p>
                    <a
                      className="doi-display"
                      href={paper.doi}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`打开 DOI ${paper.doiCode}`}
                    >
                      <small>DOI</small>
                      <strong>{paper.doiCode}</strong>
                    </a>
                    <div className="publication-bottom">
                      <span>{paper.method}</span>
                      <div className="publication-actions">
                        <a href={paper.doi} target="_blank" rel="noreferrer">
                          OPEN DOI <Arrow />
                        </a>
                        <a href={paper.pdf} download>
                          DOWNLOAD PDF <span aria-hidden="true">↓</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section page-frame methods-section">
          <SectionIntro
            code="A·03"
            label="RESEARCH METHODS"
            title={
              <>
                从人的体验，
                <br />
                到<span>多模态证据。</span>
              </>
            }
          />
          <div className="methods-layout">
            <div className="method-radar reveal">
              <div className="radar-grid" />
              <div className="radar-shape" />
              <span className="radar-label radar-label-a">DESIGN</span>
              <span className="radar-label radar-label-b">SENSING</span>
              <span className="radar-label radar-label-c">ANALYSIS</span>
              <span className="radar-label radar-label-d">MAKING</span>
              <span className="radar-label radar-label-e">FIELDWORK</span>
              <div className="radar-center">MIXED<br />METHODS</div>
            </div>
            <div className="method-groups">
              {[
                [
                  "01 / DISCOVER",
                  "形成性研究",
                  "情境观察、半结构访谈、用户旅程、探针测试、需求归纳",
                ],
                [
                  "02 / BUILD",
                  "研究型原型",
                  "React、Godot、TouchDesigner、Arduino、Raspberry Pi、UE5",
                ],
                [
                  "03 / SENSE",
                  "多模态采集",
                  "EEG、Eye Tracking、EDA、HRV、RESP、EMG、PPG",
                ],
                [
                  "04 / EVALUATE",
                  "实证与分析",
                  "被试内实验、随机交叉、行为编码、量表、Python、SPSS",
                ],
              ].map(([code, title, text]) => (
                <article className="method-row reveal" key={code}>
                  <span>{code}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section contribution-section">
          <div className="page-frame">
            <SectionIntro
              code="A·04"
              label="RESEARCH POSITIONING"
              title={
                <>
                  我希望持续回答：
                  <br />
                  <span>技术如何让人更有能力行动？</span>
                </>
              }
              text="面向儿童、孤独症群体及健康照护情境，研究不仅追求性能提升，也关注参与者是否获得表达、选择、理解与共同调节的空间。"
            />
            <div className="positioning-grid">
              <div className="positioning-statement reveal">
                <span>01</span>
                <h3>Human Agency</h3>
                <p>从“完成系统任务”转向“支持人表达意愿、留下创造痕迹并感知自身影响”。</p>
              </div>
              <div className="positioning-statement reveal">
                <span>02</span>
                <h3>Embodied Evidence</h3>
                <p>把呼吸、目光、动作、压力和生理状态转化为可体验、可分析的交互材料。</p>
              </div>
              <div className="positioning-statement reveal">
                <span>03</span>
                <h3>Careful Technology</h3>
                <p>让技术顺应脆弱情境中的感官差异、关系结构与伦理边界，而非增加负担。</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function DesignPageContent() {
  return (
    <>
      <main id="top">
        <section className="inner-hero design-hero page-frame">
          <div className="inner-hero-copy">
            <p className="eyebrow reveal">DESIGN PRACTICE / 设计实践</p>
            <h1 className="reveal">
              From research question
              <br />
              <span>to working system.</span>
            </h1>
            <p className="reveal">
              工业设计训练赋予我对形态、结构、情境与制造的敏感度；HCI
              研究则让我持续追问，每一个设计决策是否真正改善了人的体验与行动。
            </p>
          </div>
          <div className="design-hero-board reveal">
            <div className="board-window board-window-a">
              <img src="/assets/design/levitation.webp" alt="LEVITATION 康复外骨骼" />
            </div>
            <div className="board-window board-window-b">
              <img src="/assets/design/pebble.webp" alt="Pebble 陪伴机器人" />
            </div>
            <div className="board-axis board-axis-x" />
            <div className="board-axis board-axis-y" />
            <span className="board-note note-a">FORM / 01</span>
            <span className="board-note note-b">SYSTEM / 02</span>
            <span className="board-cursor">+</span>
          </div>
        </section>

        <section className="design-disciplines">
          {[
            ["01", "Healthcare Product", "医疗与康复产品"],
            ["02", "Intelligent Hardware", "智能硬件与传感"],
            ["03", "Interaction System", "交互系统与界面"],
            ["04", "Parametric Design", "参数化与数字建模"],
          ].map(([number, en, cn]) => (
            <div className="discipline reveal" key={number}>
              <span>{number}</span>
              <h3>{en}</h3>
              <p>{cn}</p>
            </div>
          ))}
        </section>

        <section className="page-section page-frame">
          <SectionIntro
            code="D·01"
            label="SELECTED WORKS"
            title={
              <>
                形态、机制与体验，
                <br />
                在真实问题中<span>汇合。</span>
              </>
            }
            text="精选项目覆盖康复辅具、儿童包容性产品、情感化计算、服务机器人与公共健康服务系统。"
          />
          <div className="case-grid">
            {designCases.map((item, index) => (
              <Link
                className={`case-card case-card-${index + 1} reveal`}
                key={item.title}
                href={`/design/${item.slug}`}
                aria-label={`查看 ${item.title} 完整项目`}
              >
                <div className="case-image">
                  <img src={item.image} alt={`${item.title} ${item.subtitle}`} />
                  <div className="case-crosshair">+</div>
                  <span className="case-number">{item.index}</span>
                </div>
                <div className="case-copy">
                  <span>{item.type}</span>
                  <h3>{item.title}</h3>
                  <h4>{item.subtitle}</h4>
                  <p>{item.description}</p>
                  <span className="case-view">
                    VIEW FULL PROJECT <Arrow />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="page-section design-process-section">
          <div className="page-frame">
            <SectionIntro
              code="D·02"
              label="COMPETITION RECOGNITION"
              title={
                <>
                  设计实践经由竞赛检验，
                  <br />
                  获得<span>多层级专业认可。</span>
                </>
              }
              text="硕士期间累计获得国家级奖项 20 项、国外及省级奖项 44 项。"
            />
            <div className="design-certificate-gallery">
              {competitionCertificates.map((item, index) => (
                <a
                  className={`certificate-card competition-certificate reveal ${
                    index < 2 ? "certificate-card-featured" : ""
                  }`}
                  href={item.image}
                  target="_blank"
                  rel="noreferrer"
                  key={`${item.project}-${item.award}`}
                  aria-label={`查看${item.project}${item.award}证书原图`}
                >
                  <div className="certificate-visual">
                    <img
                      src={item.thumb}
                      alt={`${item.project} ${item.award}证书`}
                      loading="lazy"
                    />
                    <span className="certificate-open">VIEW CERTIFICATE ↗</span>
                  </div>
                  <div className="certificate-meta">
                    <div>
                      <span>{item.year}</span>
                      <span>{item.role}</span>
                    </div>
                    <strong>{item.award}</strong>
                    <h3>{item.project}</h3>
                    <p>{item.event}</p>
                  </div>
                </a>
              ))}
            </div>
            <div className="design-award-layout design-award-index design-award-index-compact">
              <div className="design-award-list">
                {competitionCertificates.map((item, index) => (
                  <article className="design-award-row reveal" key={`${item.project}-index`}>
                    <span>A / {String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{item.project}</h3>
                      <p>
                        {item.award} · {item.role}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="page-section design-process-section">
          <div className="page-frame">
            <SectionIntro
              code="D·03"
              label="DESIGN PROCESS"
              title={
                <>
                  我以系统思维，
                  <br />
                  管理<span>从模糊到具体。</span>
                </>
              }
            />
            <div className="design-process-grid">
              {[
                ["01", "UNDERSTAND", "理解情境", "用户研究 / 利益相关者 / 行为与痛点"],
                ["02", "FRAME", "定义机会", "问题重构 / 产品策略 / 研究目标"],
                ["03", "MAKE", "构建原型", "形态 / CMF / 结构 / 交互 / 硬件"],
                ["04", "TEST", "验证迭代", "可用性 / 工效 / 实验 / 数据分析"],
                ["05", "DELIVER", "沟通落地", "PRD / 工程协同 / 视觉叙事 / 转化"],
              ].map(([number, en, cn, text]) => (
                <article className="design-process-card reveal" key={number}>
                  <span>{number}</span>
                  <div>
                    <small>{en}</small>
                    <h3>{cn}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="page-section page-frame toolkit-section">
          <SectionIntro
            code="D·04"
            label="TOOLKIT"
            title={
              <>
                设计、开发与实验，
                <br />
                <span>在同一工作流中。</span>
              </>
            }
          />
          <div className="toolkit-grid">
            {[
              ["3D & PRODUCT", "Rhino · SolidWorks · C4D · KeyShot · Grasshopper", "形态、结构、参数化与可视化"],
              ["INTERACTION", "Figma · TouchDesigner · Godot · UE5 · React", "界面、动态视觉与交互原型"],
              ["HARDWARE", "Arduino · Raspberry Pi · Sensors · 3D Printing", "传感、控制、结构打样与集成"],
              ["RESEARCH", "Python · SPSS · Origin · Multimodal Sensing", "数据处理、统计分析与实验验证"],
            ].map(([title, tools, text], index) => (
              <article className="toolkit-card reveal" key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <b>{tools}</b>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ProfilePageContent() {
  const experiences = [
    {
      year: "2025.12—2026.04",
      company: "苏州东方智旅信息科技有限公司",
      project: "景区无人驾驶游览车",
      result: "已落地",
      text: "结合数字交互与具身交互输出产品需求文档（PRD）；负责驾乘交互体验流程、外观造型、CMF 色彩材质设计与优化；结合智能硬件特性完成景区场景落地性分析。",
      tags: ["PRD", "驾乘交互", "外观造型", "CMF", "场景落地"],
    },
    {
      year: "2025.05—2025.11",
      company: "武汉联合智渔装备有限公司",
      project: "养殖尾水处理装备研发与设计",
      result: "已落地",
      text: "承担造型建模与结构仿真，通过结构强度分析优化核心结构并验证设计合理性；结合养殖场景、成本控制与技术可行性梳理研发难点，推动工程转化。",
      tags: ["造型建模", "结构仿真", "强度验证", "成本控制", "工程转化"],
    },
    {
      year: "2024.08—2024.12",
      company: "武汉中科瑞华生态科技股份有限公司",
      project: "鱼类识别计数产品",
      result: "已落地",
      text: "结合数据驱动与智能协同交互方向完成 PRD；制定产品设计和迭代策略，组织头脑风暴与方案评审；从造型、CMF、结构和使用流程等维度推动产品改良。",
      tags: ["PRD", "产品规划", "方案评审", "结构设计", "使用流程"],
    },
  ];

  const researchProjects = [
    {
      code: "01",
      title: "从缺陷补偿到体验共融：孤独症儿童社会参与的包容性设计方法研究",
      category: "国家社科基金艺术学项目 · 2026BG06527",
      work: "以“体验共融”为范式核心，面向孤独症儿童社会参与情境，参与包容性设计框架及配套工具包构建。",
    },
    {
      code: "02",
      title: "认知—认同—创新—传播：全链式大学美育浸润路径的实践与创新研究",
      category: "省级教学改革研究项目 · 2025279",
      work: "参与全链式美育课程设计与沉浸式教学实践，开发互动教具并参与教学效果评估。",
    },
    {
      code: "03",
      title: "荆楚文化融入学生跨文化能力培养的新路径研究——基于博物馆场域的实践探索",
      category: "荆楚文化对外传播专项课题",
      work: "依托博物馆场域，通过文化符号解码、数字文创设计与跨文化实践，探索学生跨文化能力培养路径。",
    },
    {
      code: "04",
      title: "数字化赋能湖北省工业文化遗产中华民族共同体故事传播研究",
      category: "湖北省新型智库（培育）建设专项课题",
      work: "围绕工业文化遗产中的中华民族共同体故事传播切口，参与数字化传播研究与内容构建。",
    },
  ];

  return (
    <>
      <main id="top">
        <section className="profile-hero page-frame">
          <div className="profile-portrait reveal">
            <div className="profile-image-shell">
              <img
                src="/assets/profile/haoyu-zhang-v2.webp"
                alt="张浩宇"
                width="672"
                height="696"
              />
              <div className="profile-coordinates">
                <span>30.5928° N</span>
                <span>114.3055° E</span>
              </div>
            </div>
            <div className="profile-role">
              <span>RESEARCHER</span>
              <i />
              <span>DESIGNER</span>
              <i />
              <span>MAKER</span>
            </div>
          </div>
          <div className="profile-hero-copy">
            <p className="eyebrow reveal">PROFILE / 个人履历</p>
            <h1 className="reveal">
              张浩宇
              <small>HAOYU ZHANG</small>
            </h1>
            <h2 className="reveal">工业设计工程硕士研究生 · HCI 研究者 · 设计实践者</h2>
            <p className="reveal">
              我擅长在设计学与计算技术之间建立可验证的连接：从理解人的需要，到构建软硬件系统，
              再到通过实验检验其有效性。当前计划申请 2027
              级博士，持续深耕数字健康、具身交互与特殊儿童包容性设计。
            </p>
            <div className="profile-quick reveal">
              <div>
                <span>BASED IN</span>
                <b>Wuhan, China</b>
              </div>
              <div>
                <span>CURRENT</span>
                <b>HBUT · M.Eng.</b>
              </div>
              <div>
                <span>FOCUS</span>
                <b>HCI × Health × Design</b>
              </div>
            </div>
            <a className="button button-primary reveal" href="mailto:102411488@hbut.edu.cn">
              联系我 <Arrow />
            </a>
          </div>
        </section>

        <section className="profile-manifesto">
          <p className="reveal">
            “我相信好的研究不仅解释世界，
            <span>也应创造一种更好的行动方式。</span>”
          </p>
        </section>

        <section className="profile-proof-strip">
          {[
            ["06", "篇核心论文", "均已见刊"],
            ["04", "项课题申报", "国社科 / 省级 / 教改"],
            ["64", "项竞赛奖项", "国家级 20 + 国外省级 44"],
            ["03", "项专利申请", "设计与技术转化"],
            ["03", "项企业落地", "从 PRD 到工程交付"],
          ].map(([number, label, note]) => (
            <div className="profile-proof reveal" key={label}>
              <b>{number}</b>
              <span>{label}</span>
              <small>{note}</small>
            </div>
          ))}
        </section>

        <section className="page-section page-frame">
          <SectionIntro
            code="P·01"
            label="EDUCATION"
            title={
              <>
                设计训练与研究能力，
                <br />
                <span>沿同一方向生长。</span>
              </>
            }
          />
          <div className="education-timeline">
            <article className="education-item reveal">
              <span className="education-year">2024—2027</span>
              <div className="education-dot" />
              <div>
                <p>HUBEI UNIVERSITY OF TECHNOLOGY</p>
                <h3>湖北工业大学 · 工业设计工程硕士</h3>
                <h4>School of Industrial Design</h4>
                <ul>
                  <li>研究方向：数字健康、人机交互、具身交互与智能硬件</li>
                  <li>2025 湖北工业大学十大“学术新星” · 优秀研究生</li>
                  <li>第29届全国工业设计学术年会优秀论文汇报展览</li>
                  <li>平均成绩 85.143 · 学业一等奖学金 · 优秀共青团员</li>
                </ul>
              </div>
            </article>
            <article className="education-item reveal">
              <span className="education-year">2020—2024</span>
              <div className="education-dot" />
              <div>
                <p>ANHUI JIANZHU UNIVERSITY CITY CONSTRUCTION COLLEGE</p>
                <h3>安徽建筑大学城市建设学院 · 工业设计学士</h3>
                <h4>Industrial Design</h4>
                <ul>
                  <li>安徽省普通高等学校优秀毕业生</li>
                  <li>国家励志奖学金 · 校级优秀毕业论文 · 优秀学生干部</li>
                  <li>平均成绩 85.98 · 三次一等奖学金 · 一次二等奖学金</li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section className="page-section profile-awards-section">
          <div className="page-frame">
            <SectionIntro
              code="P·02"
              label="RECOGNITION"
              title={
                <>
                  持续产出，
                  <br />
                  也持续<span>接受评审。</span>
                </>
              }
            />
            <div className="award-overview">
              <div className="award-big reveal">
                <b>20</b>
                <p>国家级奖项</p>
                <span>其中第一作者 10 项，前三作者 9 项</span>
              </div>
              <div className="award-big reveal">
                <b>44</b>
                <p>国外及省级奖项</p>
                <span>覆盖工业设计、数字艺术与创新创业</span>
              </div>
              <div className="award-list">
                {competitionCertificates.map((item) => (
                  <div
                    className="award-row reveal"
                    key={`${item.event}-${item.project}-${item.award}-profile`}
                  >
                    <span>{item.year}</span>
                    <h3>{item.project}</h3>
                    <p>
                      {item.award} · {item.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="profile-certificate-heading reveal">
              <span>VERIFIED ACADEMIC HONORS</span>
              <h3>荣誉证书逐项对应</h3>
              <p>按学术影响与培养阶段排序；点击证书可查看原图。</p>
            </div>
            <div className="honor-certificate-gallery">
              {honorCertificates.map((item, index) => (
                <a
                  className={`certificate-card honor-certificate reveal ${
                    index < 2 ? "certificate-card-featured" : ""
                  }`}
                  href={item.image}
                  target="_blank"
                  rel="noreferrer"
                  key={item.title}
                  aria-label={`查看${item.title}证书原图`}
                >
                  <div className="certificate-visual">
                    <img src={item.thumb} alt={`${item.title}证书`} loading="lazy" />
                    <span className="certificate-open">VIEW CERTIFICATE ↗</span>
                  </div>
                  <div className="certificate-meta">
                    <div>
                      <span>{item.year}</span>
                      <span>{item.issuer}</span>
                    </div>
                    <h3>{item.title}</h3>
                  </div>
                </a>
              ))}
            </div>
            <div className="honor-index">
              {honorCertificates.map((item, index) => (
                <article className="honor-index-item reveal" key={`${item.year}-${item.title}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <b>{item.year}</b>
                  <p>{item.title}</p>
                </article>
              ))}
            </div>
            <div className="profile-certificate-heading field-heading reveal">
              <span>SELECTED FIELD EVIDENCE</span>
              <h3>现场评审与学术陈述</h3>
              <p>仅保留两张能够直接呈现评审、汇报与专业交流状态的现场影像。</p>
            </div>
            <div className="field-evidence-grid">
              <figure className="field-evidence-card reveal">
                <img
                  src="/assets/evidence/field-award-ceremony.webp"
                  alt="第29届全国工业设计学术年会优秀论文颁奖现场"
                />
                <figcaption>
                  <span>01 / AWARD CEREMONY</span>
                  <strong>第29届全国工业设计学术年会优秀论文颁奖现场</strong>
                </figcaption>
              </figure>
              <figure className="field-evidence-card reveal">
                <img
                  src="/assets/evidence/field-podium-presentation.webp"
                  alt="张浩宇进行学术汇报"
                />
                <figcaption>
                  <span>02 / ACADEMIC PRESENTATION</span>
                  <strong>学术汇报现场：研究陈述与现场交流</strong>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="page-section page-frame">
          <SectionIntro
            code="P·03"
            label="FUNDED & COLLABORATIVE RESEARCH"
            title={
              <>
                从论文之外，
                <br />
                进入<span>真实科研协作。</span>
              </>
            }
            text="以学生核心撰稿与研究参与身份，参与国家社科基金艺术学项目、省级教学改革、文化传播与智库专项等 4 项课题申报及方案构建。"
          />
          <div className="research-involvement">
            {researchProjects.map((item) => (
              <article className="research-project-row reveal" key={item.code}>
                <span>{item.code}</span>
                <div>
                  <p>{item.category}</p>
                  <h3>{item.title}</h3>
                  <b>{item.work}</b>
                </div>
              </article>
            ))}
          </div>
          <figure className="research-project-evidence reveal">
            <img
              src="/assets/evidence/research-projects.webp"
              alt="国家社科基金、省级教改与其他课题参与情况"
            />
            <figcaption>
              RESEARCH INVOLVEMENT / 课题参与与合作发表材料
            </figcaption>
          </figure>
        </section>

        <section className="page-section page-frame">
          <SectionIntro
            code="P·04"
            label="INDUSTRY PRACTICE"
            title={
              <>
                在真实约束中，
                <br />
                <span>把方案推进到落地。</span>
              </>
            }
            text="三项企业合作覆盖智慧文旅、环保装备与智能识别产品，均完成从需求、产品定义到设计交付的关键环节。"
          />
          <div className="experience-list">
            {experiences.map((item, index) => (
              <article className="experience-item reveal" key={item.project}>
                <div className="experience-number">0{index + 1}</div>
                <div className="experience-time">
                  <span>{item.year}</span>
                  <b>{item.result}</b>
                </div>
                <div className="experience-main">
                  <p>{item.company}</p>
                  <h3>{item.project}</h3>
                  <span>{item.text}</span>
                  <div className="experience-tags">
                    {item.tags.map((tag) => (
                      <i key={tag}>{tag}</i>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <figure className="industry-evidence reveal">
            <img
              src="/assets/evidence/industry-projects.webp"
              alt="景区无人驾驶游览车、养殖尾水处理装备与鱼类识别计数产品项目图"
            />
            <figcaption>DELIVERED INDUSTRY PROJECTS / 企业项目设计与落地证据</figcaption>
          </figure>
        </section>

        <section className="page-section profile-capabilities">
          <div className="page-frame">
            <SectionIntro
              code="P·05"
              label="CAPABILITY MAP"
              title={
                <>
                  跨越研究、设计与技术的
                  <br />
                  <span>T-shaped 能力结构。</span>
                </>
              }
            />
            <div className="capability-map">
              <div className="capability-core reveal">
                <div className="capability-core-head">
                  <span>CORE DISCIPLINE</span>
                  <b>05</b>
                </div>
                <h3>Human-Centered<br />Interaction Design</h3>
                <p>以人的行为、体验与福祉为共同坐标，将研究证据转化为可验证的交互与产品方案。</p>
                <div className="capability-core-tags" aria-label="核心研究方向">
                  <i>BEHAVIOR</i>
                  <i>EXPERIENCE</i>
                  <i>WELL-BEING</i>
                </div>
              </div>
              <div className="capability-stack">
                {[
                  ["RESEARCH", "研究", "形成性研究 / 实验设计 / 论文写作 / 混合方法"],
                  ["SENSING", "感知", "EEG / Eye Tracking / EDA / HRV / RESP / EMG / PPG"],
                  ["MAKING", "实现", "React / Godot / TouchDesigner / UE5 / Arduino / Raspberry Pi"],
                  ["DESIGN", "设计", "Rhino / SolidWorks / C4D / Grasshopper / CMF / UIUX"],
                  ["ANALYSIS", "分析", "Python / SPSS / Origin / 行为编码 / 统计检验"],
                ].map(([title, cn, text], index) => (
                  <article className="capability-node reveal" key={title}>
                    <span>0{index + 1}</span>
                    <div>
                      <h3>{title}</h3>
                      <b>{cn}</b>
                    </div>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function PortfolioPage({ page }: { page: PageKind }) {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const onPointerMove = (event: PointerEvent) => {
      root.style.setProperty("--pointer-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      root.style.setProperty("--scroll-progress", `${progress}`);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -7% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div className={`site-shell page-${page}`}>
      <div className="pointer-glow" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />
      <div className="noise-layer" aria-hidden="true" />
      <Header />
      {page === "home" && <HomePage />}
      {page === "academic" && <AcademicPageContent />}
      {page === "design" && <DesignPageContent />}
      {page === "profile" && <ProfilePageContent />}
    </div>
  );
}
