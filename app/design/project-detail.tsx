"use client";

import Link from "next/link";
import { Arrow, Footer, Header } from "../portfolio";

const projects = [
  {
    index: "01",
    slug: "levitation",
    title: "LEVITATION",
    subtitle: "镜像康复外骨骼",
    english: "Mirror Rehabilitation Exoskeleton",
    type: "医疗康复 × 智能硬件",
    year: "2025",
    role: "Research · Product Design · System Design",
    description:
      "基于镜像疗法，将健侧上肢姿态传递至患侧外骨骼，为偏瘫患者构建可自主控制的个性化训练闭环。项目覆盖机电结构、控制逻辑、佩戴方式、交互界面与康复场景验证。",
    cover: "/assets/design/levitation.webp",
    images: [
      "/assets/gallery/levitation/board-02.webp",
      "/assets/gallery/levitation/board-03.webp",
      "/assets/gallery/levitation/board-04.webp",
      "/assets/gallery/levitation/board-05.webp",
      "/assets/gallery/levitation/board-06.webp",
      "/assets/gallery/levitation/board-07.webp",
    ],
  },
  {
    index: "02",
    slug: "grow-with-you",
    title: "Grow With You",
    subtitle: "儿童成长型假肢系统",
    english: "Growth-Oriented Prosthetics for Disabled Children",
    type: "包容性产品 × 儿童健康",
    year: "2025",
    role: "User Research · Inclusive Design · Product Design",
    description:
      "面向肢体残障儿童随身体成长频繁更换假肢的问题，提出可随生长调节的结构系统，在适配儿童身体变化的同时降低长期使用成本与家庭照护负担。",
    cover: "/assets/design/grow-with-you.webp",
    images: [
      "/assets/gallery/grow-with-you/board-08.webp",
      "/assets/gallery/grow-with-you/board-09.webp",
      "/assets/gallery/grow-with-you/board-10.webp",
    ],
  },
  {
    index: "03",
    slug: "hopelumina",
    title: "HopeLumina",
    subtitle: "脑电情绪可视化系统",
    english: "EEG-to-Visual Emotional Support System",
    type: "生理信号 × 情绪媒介",
    year: "2025",
    role: "Research · Hardware · Visual Interaction · Evaluation",
    description:
      "连接脑电采集、情绪特征分析与实时粒子视觉，将最低意识状态患者不可见的内部状态转化为家庭成员可理解、可回应的情感媒介。",
    cover: "/assets/design/hopelumina.webp",
    images: [
      "/assets/gallery/hopelumina/board-11.webp",
      "/assets/gallery/hopelumina/board-12.webp",
      "/assets/gallery/hopelumina/board-13.webp",
      "/assets/gallery/hopelumina/board-14.webp",
    ],
  },
  {
    index: "04",
    slug: "pebble",
    title: "Pebble",
    subtitle: "代际支持陪伴机器人",
    english: "Intergenerational Support Companion Robot",
    type: "服务机器人 × 思辨设计",
    year: "2025",
    role: "Speculative Design · Robot Design · Interaction Design",
    description:
      "以儿童化身为叙事线索，探索陪伴机器人如何介入代际支持、情绪照护与主动老龄化议题，并通过产品形态和应用界面建立连续的陪伴体验。",
    cover: "/assets/design/pebble.webp",
    images: [
      "/assets/gallery/pebble/board-15.webp",
      "/assets/gallery/pebble/board-16.webp",
      "/assets/gallery/pebble/board-17.webp",
      "/assets/gallery/pebble/board-18.webp",
      "/assets/gallery/pebble/board-19.webp",
    ],
  },
  {
    index: "05",
    slug: "protecting-health",
    title: "Protecting Health",
    subtitle: "社区废水健康监测终端",
    english: "Community Wastewater Health Monitoring System",
    type: "公共健康 × 服务系统",
    year: "2024",
    role: "Service Design · Product Design · UI/UX",
    description:
      "围绕社区废水采样、监测与健康信息呈现，整合硬件终端、采样流程、维护机制及多端交互界面，形成面向社区公共健康的产品服务系统。",
    cover: "/assets/design/protecting-health.webp",
    images: [
      "/assets/gallery/protecting-health/board-20.webp",
      "/assets/gallery/protecting-health/board-21.webp",
      "/assets/gallery/protecting-health/board-22.webp",
      "/assets/gallery/protecting-health/board-23.webp",
    ],
  },
  {
    index: "06",
    slug: "shifter",
    title: "SHIFTER",
    subtitle: "多功能床椅转换系统",
    english: "Multifunctional Bed-Wheelchair System",
    type: "适老化 × 移动辅具",
    year: "2025",
    role: "User Research · Product Design · CMF · Ergonomics",
    description:
      "通过分体式结构实现轮椅、床边移动与生活辅助场景之间的转换，回应行动不便人群在居家照护中对连续移动、舒适支撑和生活自理的需求。",
    cover: "/assets/design/shifter.webp",
    orientation: "portrait",
    images: [
      "/assets/gallery/shifter/board-04.webp",
      "/assets/gallery/shifter/board-05.webp",
      "/assets/gallery/shifter/board-06.webp",
      "/assets/gallery/shifter/board-07.webp",
    ],
  },
];

export default function ProjectDetail({ slug }: { slug: string }) {
  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const project = projects[projectIndex];

  if (!project) {
    return (
      <div className="site-shell">
        <Header />
        <main className="project-not-found">
          <p>PROJECT NOT FOUND</p>
          <h1>未找到该项目</h1>
          <Link className="button button-primary" href="/design">
            返回设计实践 <Arrow />
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <div className="site-shell page-project">
      <div className="pointer-glow" aria-hidden="true" />
      <div className="noise-layer" aria-hidden="true" />
      <Header />
      <main id="top">
        <section className="project-hero page-frame">
          <div className="project-breadcrumb">
            <Link href="/design">DESIGN PRACTICE</Link>
            <span>/</span>
            <p>{project.index}</p>
          </div>
          <div className="project-title-block">
            <p>{project.type}</p>
            <h1>{project.title}</h1>
            <h2>
              {project.subtitle}
              <span>{project.english}</span>
            </h2>
          </div>
          <div className="project-intro">
            <p>{project.description}</p>
            <div className="project-facts">
              <div>
                <small>YEAR</small>
                <strong>{project.year}</strong>
              </div>
              <div>
                <small>ROLE</small>
                <strong>{project.role}</strong>
              </div>
              <div>
                <small>FULL PROJECT</small>
                <strong>{String(project.images.length).padStart(2, "0")} BOARDS</strong>
              </div>
            </div>
          </div>
          <div className="project-cover">
            <img src={project.cover} alt={`${project.title} 项目封面`} />
            <div className="project-cover-grid" />
            <span>{project.index} / CASE STUDY</span>
          </div>
          <div className="project-scroll">
            <span>SCROLL TO VIEW ALL BOARDS</span>
            <i>↓</i>
          </div>
        </section>

        <section className="project-gallery-section">
          <div className="page-frame">
            <div className="project-gallery-heading">
              <div>
                <span>FULL PROJECT ARCHIVE</span>
                <h2>完整项目展板</h2>
              </div>
              <p>
                以下内容按原始作品集顺序完整呈现。点击任意展板，可单独打开高清图。
              </p>
            </div>
            <div
              className={
                project.orientation === "portrait"
                  ? "project-gallery project-gallery-portrait"
                  : "project-gallery"
              }
            >
              {project.images.map((image, index) => (
                <figure className="project-board" key={image}>
                  <a href={image} target="_blank" rel="noreferrer">
                    <img
                      src={image}
                      alt={`${project.title} 完整项目展板 ${index + 1}`}
                      loading={index > 1 ? "lazy" : "eager"}
                    />
                    <span className="board-open">OPEN FULL SIZE ↗</span>
                  </a>
                  <figcaption>
                    <span>
                      BOARD {String(index + 1).padStart(2, "0")} /{" "}
                      {String(project.images.length).padStart(2, "0")}
                    </span>
                    <p>{project.title}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="next-project">
          <div className="page-frame">
            <p>NEXT PROJECT / {nextProject.index}</p>
            <Link href={`/design/${nextProject.slug}`}>
              <span>{nextProject.subtitle}</span>
              <strong>{nextProject.title}</strong>
              <Arrow />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
