import RenderRichTextRow from "./BlockListComponents/render-rich-text-row";
import RenderImageRow from "./BlockListComponents/render-image-row";
import { GenerateDynamicUmbracoMetadataAsync } from "./Helpers/generate-dynamic-umbraco-metadata";


export interface UmbracoBlocklistRowItem {
    content: any
    settings: any
}


export default function RenderUmbracoBlocklistRow({ content, settings }: UmbracoBlocklistRowItem) {

    /** 
     * If the block is configured as hidden, do not render it
     */
    if (settings?.properties?.hide) {
        return;
    }

    switch (content.contentType) {
        case 'rTEElement': {
            return RenderRichTextRow(content);
        }
        case 'mediaItem': {
            return RenderImageRow(content);
        }
        default:
            console.error(`did not render content of type [${content.contentType}]`)
            break;
    }

    return (<>
        <p>rendering {content.id} of type {content.contentType}</p>
    </>
    )
}

