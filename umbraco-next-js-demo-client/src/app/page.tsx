import { GetDescendantsOfDocument, GetPageAsync } from "@/services/services.umbraco/services.umbraco.content";
import SiteMap from "./Common/sitemap";
import Link from "next/link";
import RenderDefaultUmbracoProperties from "./Common/render-default-umb-properties";



const Home = async () => {
  const thisPage = await GetPageAsync('/');

  const thisPageDescendants = await GetDescendantsOfDocument('c59a3527-d045-4ef3-826b-e969aeb4245f');


  return (<>
    <h1 className="text-3xl mb-4">This is the nextjs/Umbraco app</h1>

    <div>
      {thisPageDescendants.items && (
        <>
          <ol className='grid grid-cols-2 gap-4'>
            {thisPageDescendants.items.map((childPage: any) => (

              <section key={childPage.id} className="gap-7 mb-6 space-y-6">
                <Link href={childPage.route.path}>
                  <div className='block max-w-sm p-6 bg-white border border-gray-200 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{childPage.name}</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">{childPage.properties.metaDescription}</p>
                  </div>
                </Link>
              </section>
            ))}
          </ol>
        </>
      )}
    </div>

    <div className='col-span-2  border-solid border-2 border-indigo-600 p-2 space-y-6'>
                    <h3 className='text-xl'>Umbraco Properties for page</h3>
                    <p className=''>This page is a dynamic [...slug], rendered by <code>./src/app/[...slug]/page.tsx</code></p>
                    <p className=''>This page is of type <code>{thisPage.contentType}</code></p>
                    <p className=''>This page has <code>{thisPageDescendants.total}</code> child pages</p>

                    <RenderDefaultUmbracoProperties umbProps={thisPage} />
                    <SiteMap />

                </div>  </>
  );
}



export default Home;
