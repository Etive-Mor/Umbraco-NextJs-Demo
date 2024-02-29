
export interface UmbracoContentRowItem {
    content: any
    settings: any
}


export default function RenderUmbracoContentRows({content, settings}: UmbracoContentRowItem) {

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
    



    return(<>
            <p>rendering {content.id} of type {content.contentType}</p>
        </>
    )
}


function RenderRichTextRow(content:  any){
    return (
        <>
            <div className='prose  lg:prose-xl prose-invert' dangerouslySetInnerHTML={{ __html: content?.properties?.richText?.markup ?? 'No HTML'}}></div>
        </>
    )
}


function RenderImageRow(content: any) {
    return <><p>{content.contentType} not implemented</p></>
    // const mediaItem = `${UMBRACO_MEDIA_URL}${content.properties.image[0].url}`;
    // const mediaItemCropped = `${UMBRACO_MEDIA_URL}${content.properties.image[0].url}?width=500`;

    // return (
    //     <>
    //             <Link href={mediaItem} target="_blank">

    //         <div className='p-10 bg-slate-200 group hover:bg-slate-300 '>

    //                 <div className='flex justify-center items-center mb-3'>
    //                     <Image
    //                         src={mediaItemCropped}
    //                         width='500'
    //                         height='500'
    //                         alt={content.properties.caption}
    //                         className=''
    //                         unoptimized
    //                     />
    //                 </div>
    //                 <p className='italic text-center text-sm text-slate-800'>{content.properties.caption} (click to open)</p>

    //         </div>
    //         </Link>

    //     </>
    // )
}
