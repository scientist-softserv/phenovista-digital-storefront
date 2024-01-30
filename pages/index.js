import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import {
  Image,
  ItemGroup,
  Notice,
  SearchBar,
  TitledTextBox,
} from '@scientist-softserv/webstore-component-library'
import hero from '../assets/img/pv-hero-image-1280x720.jpg'
import {
  configureErrors,
  configureServices,
  useAllWares,
  FEATURED_SERVICE_PATH,
  ABOUT_US_TEXT,
  ABOUT_US_TITLE,
  APP_TITLE,
} from '../utils'

const Home = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const { wares, isLoading, isError } = useAllWares(session?.accessToken)
  const DESIRED_SERVICES = [
    'Ready-2-Go Lung Fibrosis Assay Service',
    'Ready-2-Go Neurite Network Dynamics Assay Service',
    'Custom Assay Services'
  ]
  const searchPlaceholder = 'Search for a service e.g., cell painting, lung fibrosis, custom assays, etc.'
  const filteredServices = wares?.filter(ware => DESIRED_SERVICES.includes(ware.name))
  const featuredServices = configureServices({ data: filteredServices, path: FEATURED_SERVICE_PATH })
  const handleOnSubmit = ({ value }) => router.push(
    { pathname: '/browse', query: { q: value } },
    (value.length > 0 ? `/browse?q=${value}` : '/browse')
  )

  return (
    <>
      <Head>
        <title>{APP_TITLE}</title>
        <link rel='icon' href='favicon.png' />
      </Head>
      <div className='hero-image'>
        <Image
          alt='Scientific image'
          src={hero.src}
          height={400}
          width='100%'
          style={{ objectFit: 'cover' }}
        />
        <div class='hero-text'>{`WELCOME TO PHENOVISTA'S WEB STORE`}</div>
      </div>
      <div className='container'>
        <SearchBar 
          onSubmit={handleOnSubmit}
          placeholder={searchPlaceholder}
        />
        <TitledTextBox title={ABOUT_US_TITLE} text={ABOUT_US_TEXT} dataCy='about-us-section'/>
        {isError ? (
          <Notice
            alert={configureErrors([isError])}
            withBackButton={false}
            addClass='my-5'
          />
        ) : (
          <>
            <ItemGroup
              items={featuredServices}
              isLoading={isLoading}
              withTitleLink={true}
            />
          </>
        )}
      </div>
    </>
  )
}

export default Home
