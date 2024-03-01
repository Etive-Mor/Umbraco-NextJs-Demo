import Link from "next/link";
import Image from 'next/image';

export default function RenderImageRow(content: any) {
    const UMBRACO_MEDIA_URL = 'http://localhost:59970';
    const mediaItem = `${UMBRACO_MEDIA_URL}${content.properties.mediaElement[0].url}`;
    const mediaItemCropped = `${UMBRACO_MEDIA_URL}${content.properties.mediaElement[0].url}?width=500`;

    return (
        <>
            <Link href={mediaItem} target="_blank">

                <div className='p-10 bg-slate-200 group hover:bg-slate-300 '>

                    <div className='flex justify-center items-center mb-3'>
                        <Image
                            src={mediaItemCropped}
                            width='500'
                            height='500'
                            alt='not implemented'
                            className=''
                            unoptimized
                        />
                    </div>
                    <p className='italic text-center text-sm text-slate-800'>{content.properties.caption} (click to open)</p>

                </div>
            </Link>

        </>
    )
}
