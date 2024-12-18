import { type BlocksContent } from "@strapi/blocks-react-renderer";

export interface MediaProps {
    data: {
        id: string;
        attributes: {
            url: string;
            name: string;
            alternativeText: string;
        };
    };
}

export interface ButtonProps {
    id: number;
    text: string;
    newTab: boolean;
    link: string;
    icon?: string | undefined;
    type: 'Hollow' | 'Solid';
    divBG?: string | undefined;
}

export interface ButtonGroupProps {
    buttons?: Array<ButtonProps>;
    divBG?: string | undefined;
}

export interface Picture {
    data: {
        id: string;
        attributes: {
            url: string;
            name: string;
            alternativeText: string;
            formats: {
                thumbnail: {
                    url: string;
                },
                small: {
                    url: string;
                },
                medium: {
                    url: string;
                },
                large: {
                    url: string;
                }
            }
        };
    };
}

export interface HeroProps {
    data: {
        id: string;
        heading: string;
        subheading: string;
        image: Picture;
    }
}

export interface LinkPicture {
    id: number;
    link: string;
    newTab: boolean;
    image: Picture;
}

export interface FooterProps {
    data: {
        id: number;
        middleTopTitle: string;
        middleTopLogos: Array<LinkPicture>;
        middleBottomTitle: string;
        middleBottomLogos: Array<LinkPicture>;
        middleBottomLogoSpotlight: LinkPicture;
        left: {
            id: number;
            heading: string;
            content: BlocksContent;
            sponsoredLogo: Picture;
        },
        right: {
            id: number;
            heading: string;
            content: BlocksContent;
            copyright: string;
            developedByText: string;
            developedBy: string;
            developedByLink: string;
            copyrightLink: string;
        }
    }
}

export interface BlobWithBGProps {
    background: string;
    layout: string;
    blobColor: string;
    heading: string;
    anchor: string;
    content: BlocksContent;
    image: MediaProps;
    buttons?: Array<ButtonProps>;
}

export interface BlobHomepageProps {
    heading: string;
    anchor: string;
    content: any;
    image?: any;
    buttons?: Array<ButtonProps>;
    imagePosition?: 'Left' | 'Right';
    blobColor: string;
    layout: 'Stor bild' | 'Liten bild';
    background: string;
}

export interface CourseTextBlockProps {
    id: string;
    heading: string;
    level: number;
    content: BlocksContent;
    sidenote: Array<NoteProps>;
    dictionaryItems: Array<string>;
}

export interface NoteProps {
    id: string;
    heading: string;
    type: string;
    content: BlocksContent;
}

export interface FullWidthTextProps {
    id: string;
    heading: string;
    anchor: string;
    content: BlocksContent;
    buttons?: Array<ButtonProps>;
}

export interface BannerProps {
    data: {
        heading: string;
        content: string;
        type: string;
        startDate: string;
        endDate: string;
        link: {
            id: number;
            text: string;
            link: string;
            newTab: boolean;
        }
    } | null;
}

export interface TwoColProps {
    heading: string;
    background: string;
    leftColumnWidth: number;
    leftContent: BlocksContent;
    rightContent: BlocksContent;
    buttons: Array<ButtonProps>;
}

export interface WordHighlightProps {
    word: string;
    aliases: string[];
    description: string;
}