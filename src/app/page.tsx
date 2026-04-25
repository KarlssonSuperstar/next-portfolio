// Server Component - no "use client" directive
// Fetches all CMS data at request time and passes it down as props.

import HeroSection from "@/components/HeroSection";
import ContactForm from "@/components/ContactForm";
import CaseStudy from "@/components/CaseStudy";
import AboutSection from "@/components/AboutSection";
import IndexMenu from "@/components/IndexMenu";
import MobileMenu from "@/components/MobileMenu";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import type { NavItem } from "@/components/IndexMenu";

import {
  fetchProjects,
  fetchNarrative,
  fetchSiteSettings,
  toCarouselItem,
  toMediaContent,
  resolveNarrativeImageSrc,
} from "@/sanity/queries";

export const revalidate = 0; // Disable caching for this page

// Horizontal Divider (pure server-side, no hooks)
function HorizontalDivider({
  color = "#050505",
  align = "split",
}: {
  color?: string;
  align?: "split" | "center";
}) {
  return (
    <div
      className={`w-full relative z-30 flex items-center justify-center pointer-events-none ${
        align === "split" ? "pb-12 md:pb-0" : "py-8"
      }`}
    >
      <div
        className={`flex flex-col md:flex-row w-full relative ${
          align === "split"
            ? "gap-8 md:gap-16 max-w-screen-2xl mx-auto px-6 md:px-12"
            : "max-w-6xl mx-auto px-6"
        }`}
      >
        {align === "split" && (
          <div className="hidden md:flex flex-col items-center w-32 flex-shrink-0 pointer-events-none" />
        )}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="w-full h-[1px] bg-white/10" />
          <div
            className="absolute w-8 h-8 rounded-full border border-white/20 flex items-center justify-center rotate-45 z-10"
            style={{ backgroundColor: color }}
          >
            <div className="w-1.5 h-1.5 border border-white/40" />
            <div className="w-1.5 h-1.5 border border-white/40 absolute -left-1" />
            <div className="w-1.5 h-1.5 border border-white/40 absolute -right-1" />
            <div className="w-1.5 h-1.5 border border-white/40 absolute -top-1" />
            <div className="w-1.5 h-1.5 border border-white/40 absolute -bottom-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function Home() {
  // Fetch all CMS content in parallel
  const [projects, narrative, settings] = await Promise.all([
    fetchProjects(),
    fetchNarrative(),
    fetchSiteSettings(),
  ]);

  // Build dynamic nav items derived from CMS projects
  const projectNavItems: NavItem[] = projects.map((p) => ({
    label: `${p.number} ${p.title.toUpperCase()}`,
    id: p.sectionId?.current ?? p.title.toLowerCase().replace(/\s+/g, "-"),
  }));

  const navItems: NavItem[] = [
    { label: "NARRATIVE", id: "about" },
    ...projectNavItems,
    { label: "APPS & TOOLS", id: "tools" },
    { label: "CONTACT", id: "contact" },
  ];

  const mobileNavItems: NavItem[] = [
    { label: "Narrative", id: "about" },
    ...projects.map((p) => ({
      label: `${p.number} ${p.title}`,
      id: p.sectionId?.current ?? p.title.toLowerCase().replace(/\s+/g, "-"),
    })),
    { label: "Apps & Tools", id: "tools" },
    { label: "Contact", id: "contact" },
  ];

  // Resolve tools list (CMS or fallback)
  const tools = settings?.tools ?? [
    "Figma", "Figma Make", "Lovable", "Spline", "Framer", "Webflow",
    "Antigravity", "React", "Next.js", "Creative Cloud", "Vercel",
    "Tailwind CSS", "WCAG",
  ];

  // Resolve narrative image
  const narrativeImageSrc = narrative
    ? resolveNarrativeImageSrc(narrative)
    : "/Images/Me/jag.png";

  return (
    <main className="min-h-screen text-white selection:bg-white/20 selection:text-white font-sans bg-[#d9e4ec]">

      {/* Mobile nav */}
      <MobileMenu navItems={mobileNavItems} />

      {/* Desktop overlay */}
      <div className="fixed inset-0 pointer-events-none z-[200] hidden md:flex justify-center px-4 md:px-0">
        <div className="w-full lg:w-[calc(100%-48px)] max-w-[1440px] h-full relative">
          <a
            href="/"
            className="absolute top-12 left-4 pointer-events-auto text-white hover:text-white/70 transition-colors"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Images/Me/Artboard 1.svg"
              alt="Karlsson"
              className="w-20 h-auto"
              style={{ filter: "invert(1)" }}
            />
          </a>
          <IndexMenu navItems={navItems} />
          <ScrollToTopButton mode="desktop" />
        </div>
      </div>

      <ScrollToTopButton mode="mobile" />

      <div className="w-full lg:w-[calc(100%-48px)] max-w-[1440px] mx-auto bg-[#050505] min-h-screen relative lg:my-6">

        {/* Hero — client component (scroll animations) */}
        <HeroSection />

        {/* Content sections */}
        <div className="relative z-50 w-full -mt-1">

          {/* About / Narrative */}
          <div id="about" className="bg-[#3d7db3] pt-1 relative">
            <AboutSection
              bio={narrative?.bio}
              bioLine2={narrative?.bioLine2}
              name={narrative?.name}
              role={narrative?.role}
              imageSrc={narrativeImageSrc}
            />
            <div className="absolute top-full -mt-[1px] left-0 w-full z-50 pointer-events-none text-[#3d7db3]">
              <svg
                viewBox="0 0 1440 200"
                preserveAspectRatio="none"
                className="w-full h-[100px] md:h-[150px] lg:h-[200px]"
              >
                <path d="M0,0 L0,200 C500,200 900,40 1440,40 L1440,0 Z" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* CMS-driven projects (or hardcoded fallback) */}
          {projects.length > 0 ? (
            projects.map((project, index) => {
              const sectionId =
                project.sectionId?.current ??
                project.title.toLowerCase().replace(/\s+/g, "-");

              const carouselMedia =
                project.mediaLayout === "carousel" && project.carouselMedia
                  ? project.carouselMedia.map(toCarouselItem)
                  : undefined;

              const heroSplitMedia =
                project.mediaLayout === "heroSplit" && project.heroSplitMedia
                  ? project.heroSplitMedia.map(toMediaContent)
                  : undefined;

              const subImages =
                project.hasSubImages && project.subImages
                  ? project.subImages.map(toMediaContent)
                  : undefined;

              const dividerColor = project.color;

              return (
                <div key={project._id}>
                  <div id={sectionId} className="relative w-full">
                    <CaseStudy
                      number={project.number}
                      title={project.title}
                      category={project.category}
                      description={project.description}
                      href={project.ctaLink ?? "#"}
                      color={project.color}
                      media={carouselMedia}
                      heroSplitMedia={heroSplitMedia as Parameters<typeof CaseStudy>[0]["heroSplitMedia"]}
                      heroSplitReverse={project.heroSplitReverse}
                      subImages={subImages as Parameters<typeof CaseStudy>[0]["subImages"]}
                      reverseSubImages={project.reverseSubImages}
                      ctaText={project.ctaText ?? "View Case Study"}
                      externalLink={project.externalLink}
                      hideCta={project.hideCta}
                      className={index === 0 ? "!pt-[10rem] md:!pt-[21.3rem]" : ""}
                    />
                  </div>
                  <HorizontalDivider color={dividerColor} />
                </div>
              );
            })
          ) : (
            /* Hardcoded fallback — shown while CMS is not yet connected */
            <>
              <div id="mind-climber" className="relative w-full">
                <CaseStudy
                  number="01"
                  title="Mind Climber"
                  category="Brand Identity, UI/UX Design"
                  description="Mind Climber is a digital mental health concept where biomarkers and behavioral data are used to guide users toward activities that may improve their well-being. To make a complex and heavy subject feel more approachable, I used mountain climbing as a metaphor for recovery, building a visual direction around support, guidance, and step-by-step progress. In this project, I worked on the concept, UX, and visual identity."
                  href="https://www.figma.com/proto/pBSVkPTwRstkDhVUToUfIF/Erik_Karlsson_Mind_Climber?node-id=477-9911&viewport=6743%2C526%2C0.51&t=6X6NP3jk7zavxHAq-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=477%3A9911&show-proto-sidebar=1&page-id=477%3A7527"
                  ctaText="View Prototype"
                  externalLink={true}
                  color="#160800"
                  media={[
                    { src: "/Images/MindClimber/Loggo.mp4", type: "video", description: "Mind Climber logo animation." },
                    { src: "/Images/MindClimber/Promo.mp4", type: "video", description: "Mind Climber app promo." },
                    { src: "/Images/MindClimber/mobile1.png", type: "image" },
                    { src: "/Images/MindClimber/mobile2.png", type: "image" },
                    { src: "/Images/MindClimber/mobile3.png", type: "image" },
                  ]}
                  subImages={[
                    { src: "/Images/MindClimber/Mindclimber-ProductLine.png", caption: "Mind Climber Product Line", objectPosition: "40% center" },
                    { src: "/Images/MindClimber/MindTether.png", caption: "Mind Tether Details", objectPosition: "center 70%" },
                  ]}
                  className="!pt-[10rem] md:!pt-[21.3rem]"
                />
              </div>

              <HorizontalDivider color="#050a1a" />

              <div id="t-suite">
                <CaseStudy
                  number="02"
                  title="T-Suite"
                  category="Creative Direction, Motion Graphics"
                  description={'T-Suite Wrapped 2026 was a concept project for T-Hive where I transformed operational data and annual statistics into an engaging, shareable experience. Instead of a traditional corporate expression, I created a "wrapped" inspired by 90s retro games, using pixel graphics, animation, and sound to give the data more personality and stronger storytelling.'}
                  href="#thive"
                  hideCta={true}
                  color="#050a1a"
                  heroSplitReverse={true}
                  heroSplitMedia={[
                    { src: "/Images/T-HiveWrapped/Erik_Karlsson_T-Hive-Wrapped.mp4", type: "video", objectFit: "contain", className: "!h-auto w-full md:!h-[600px] md:!w-auto object-bottom object-left", description: "T-Suite Wrapped 2026 promotional video.", caption: "T-Suite Wrapped 2026", containerClassName: "w-full md:w-auto flex-shrink-0 flex flex-col" },
                    { src: "/Images/T-HiveWrapped/T-hive-mobile.png", type: "image", caption: "T-Suite Wrapped 2026 on mobile", containerClassName: "w-full md:flex-1 flex flex-col" },
                  ]}
                />
              </div>

              <HorizontalDivider color="#1a1c29" />

              <div id="vyse-tech">
                <CaseStudy
                  number="03"
                  title="Vyse Tech"
                  category="research, UX/UI Design"
                  description="Helped a startup develop a new website to better highlight their product and make it more alive. Through analysis of their target audience and competitors, we developed a page that better highlighted their brand and product."
                  href="https://wondrous-intuition-914204.framer.app/"
                  ctaText="View Webpage"
                  externalLink={true}
                  color="#1a1c29"
                  media={[
                    { src: "/Images/Vyse Tech/vyse techOver.png", type: "image" },
                    { src: "/Images/Vyse Tech/vyse tech2.png", type: "image" },
                    { src: "/Images/Vyse Tech/vysetech.png", type: "image" },
                  ]}
                  subImages={[
                    { src: "/Images/Vyse Tech/vyse techOver2.png", type: "image", caption: "Vyse Tech loading interface view.", containerClassName: "w-full md:flex-1 flex flex-col" },
                    { src: "/Images/Vyse Tech/Instagram.mp4", type: "video", objectFit: "contain", className: "!h-auto w-full md:!w-auto md:!h-[600px] object-bottom md:object-right", caption: "Loading page mobile", containerClassName: "w-full md:w-auto flex flex-col" },
                  ]}
                />
              </div>

              <HorizontalDivider color="#1a1c29" />
            </>
          )}

          {/* Tools section */}
          <section
            id="tools"
            className="py-16 md:py-32 px-6 w-full text-center bg-[#050505] min-h-[50vh] flex flex-col justify-center border-t border-white/5 relative z-20"
          >
            <h2 className="text-5xl md:text-[6rem] font-black tracking-tighter uppercase mb-16 leading-none">
              The Apps &amp; Tools I Use
            </h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-6xl mx-auto relative z-20">
              {tools.map((tool) => (
                <div
                  key={tool}
                  className="py-4 px-8 border border-white/10 rounded-full text-2xl md:text-3xl font-light text-white hover:bg-white hover:text-black transition-colors cursor-pointer pointer-events-auto"
                >
                  {tool}
                </div>
              ))}
            </div>
          </section>

          <HorizontalDivider align="center" />
        </div>

        {/* Contact */}
        <div id="contact" className="relative z-10 bg-[#050505]">
          <ContactForm
            contactEmail={settings?.contactEmail}
            socialLinks={settings?.socialLinks}
          />
        </div>

      </div>

      {/* Desktop frame overlay */}
      <div
        className="hidden lg:block fixed z-[100] pointer-events-none rounded-[2rem] border border-white/5 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-[1440px]"
        style={{ top: "24px", bottom: "24px", boxShadow: "0 0 0 100vmax #d9e4ec" }}
      />
    </main>
  );
}
