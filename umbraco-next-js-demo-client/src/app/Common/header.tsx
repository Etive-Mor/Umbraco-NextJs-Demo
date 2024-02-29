import { GetAncestorsOfDocument } from "@/services/services.umbraco/services.umbraco.content";
import Link from "next/link";


const Header = async ({ thisPage }: { thisPage: any }) => {
    const pageAncestors = await GetAncestorsOfDocument(thisPage.id);

    return (
        <>
            <h1 className='text-5xl mb-4'>{thisPage.name}</h1>


            <ol className='inline-flex items-center space-x-1'>
                {pageAncestors.items.reverse().map((ancestor: any) => (
                    <li key={ancestor.id} className='inline-flex items-center'>
                        <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                        </svg>
                        <Link href={ancestor.route.path}>
                            {ancestor.name}
                        </Link>
                    </li>
                ))}
                <li className='inline-flex items-center italic'>
                    <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                    </svg>
                    {thisPage.name}
                </li>
            </ol>
        </>
    )
}

export default Header;