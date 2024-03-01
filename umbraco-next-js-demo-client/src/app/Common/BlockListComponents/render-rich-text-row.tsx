

export default function RenderRichTextRow(content: any) {
    return (
        <>
            <div className='prose  lg:prose-xl prose-invert' dangerouslySetInnerHTML={{ __html: content?.properties?.richText?.markup ?? 'No HTML' }}></div>
        </>
    )
}
