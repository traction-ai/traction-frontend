import { projects } from "@/lib/mock-data";
import { ProjectsGallery } from "@/components/projects/projects-gallery";

export default function ProjectsPage() {
    return (
        <div className="min-h-full">
            <ProjectsGallery projects={projects} />
        </div>
    );
}
