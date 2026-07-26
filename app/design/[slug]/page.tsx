import ProjectDetail from "../project-detail";

const projectSlugs = [
  "levitation",
  "grow-with-you",
  "hopelumina",
  "pebble",
  "protecting-health",
  "shifter",
];

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export default async function DesignProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProjectDetail slug={slug} />;
}
