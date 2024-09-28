import Hero from "../components/sections/Hero";
import BlobWithBG from "../components/sections/BlobWithBG";
import CourseTextBlock from "../components/sections/CourseTextBlock";
import FullWidthText from "../components/sections/FullWidthText";
import IngressText from "../components/sections/IngressText";
import TwoCols from "../components/sections/TwoCols";
import BlobHomepage from "../components/sections/BlobHomepage";

export function sectionRenderer(section: any, index: number, dictionaryItems?: string[]) {
    switch (section.__component) {

        // General sections
        case "sections.hero":
            return <Hero key={index} data={section} />;

        case "sections.blob-with-bg":
            return <BlobWithBG key={index} {...section} />;
        
        case "sections.blob-homepage":
            return <BlobHomepage key={index} {...section} />;

        case "sections.two-cols":
            return <TwoCols key={index} {...section} />;

        case "sections.html-utan-marginaler":
            return <div key={index} dangerouslySetInnerHTML={{__html: section.content}} className="bg-white"/>;


        // Course sections
        case "course-elements.course-text":
            const mergedData = { ...section, dictionaryItems };
            return <CourseTextBlock key={index} {...mergedData} />;

        case "sections.full-width-text":
            return <FullWidthText key={index} {...section} />;

        case "sections.ingress-text":
            return <IngressText key={index} {...section} />;


        // Default
        default:
            return null;
    }
}